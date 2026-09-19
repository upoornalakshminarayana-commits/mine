// ── ROLE-AWARE ASSESSMENT ENGINE (PHASE 2) ─────────────────────────────────
// This engine implements:
// 1. Employee-specific Assessment Generation (Department + Role -> Blueprint -> Questions)
// 2. Adaptive Difficulty Progression (EASY <-> MEDIUM <-> HARD)
// 3. Competency-wise Scoring
// 4. Skill Gap Severity & Classification
// 5. Tailored iGOT / NSSTA Course Recommendations

import { ROLE_BLUEPRINTS, getProficiencyLevel } from '../data/roleBlueprints';
import { STRUCTURED_QUESTION_BANK } from '../data/questionBank';
import { ALL_COURSES_CATALOG } from '../data/portalData';

/**
 * 1. Generate an initial diagnostic assessment for a specific demo employee.
 * Selects 10 questions covering all 5 competencies in the employee's role blueprint (2 per competency).
 * Starts at MEDIUM difficulty where available.
 */
export function generateEmployeeAssessment(employeeId) {
  const blueprint = ROLE_BLUEPRINTS[employeeId] || ROLE_BLUEPRINTS['demo-employee-01'];
  const pool = STRUCTURED_QUESTION_BANK.filter(
    q => q.roleId === blueprint.roleId && q.status === 'APPROVED'
  );

  const selectedQuestions = [];
  const usedIds = new Set();

  // For each competency in the role blueprint, select 2 questions (preferably 1 MEDIUM, 1 EASY/HARD)
  blueprint.competencies.forEach((comp) => {
    const compPool = pool.filter(q => q.competencyId === comp.id);

    // Prefer MEDIUM first
    let q1 = compPool.find(q => q.difficulty === 'MEDIUM' && !usedIds.has(q.id));
    if (!q1) q1 = compPool.find(q => !usedIds.has(q.id));
    if (q1) {
      selectedQuestions.push(q1);
      usedIds.add(q1.id);
    }

    // Pick second question (EASY or HARD or any remaining)
    let q2 = compPool.find(q => q.difficulty === 'EASY' && !usedIds.has(q.id));
    if (!q2) q2 = compPool.find(q => q.difficulty === 'HARD' && !usedIds.has(q.id));
    if (!q2) q2 = compPool.find(q => !usedIds.has(q.id));
    if (q2) {
      selectedQuestions.push(q2);
      usedIds.add(q2.id);
    }
  });

  return {
    assessmentId: `asmt-${employeeId}-${Date.now()}`,
    employeeId,
    roleTitle: blueprint.roleTitle,
    departmentName: blueprint.departmentName,
    ministry: blueprint.ministry,
    benchmark: blueprint.benchmark,
    totalQuestions: selectedQuestions.length,
    questions: selectedQuestions,
    createdAt: new Date().toISOString(),
  };
}

/**
 * 2. Adaptive Difficulty Next-Question Selector
 * If the current question was answered correctly:
 *   EASY -> MEDIUM -> HARD
 * If incorrect:
 *   HARD -> MEDIUM -> EASY
 */
export function getAdaptiveNextQuestion(employeeId, competencyId, currentDifficulty, wasCorrect, answeredQuestionIds) {
  const blueprint = ROLE_BLUEPRINTS[employeeId] || ROLE_BLUEPRINTS['demo-employee-01'];
  
  let targetDifficulty = 'MEDIUM';
  if (wasCorrect) {
    targetDifficulty = currentDifficulty === 'EASY' ? 'MEDIUM' : 'HARD';
  } else {
    targetDifficulty = currentDifficulty === 'HARD' ? 'MEDIUM' : 'EASY';
  }

  const pool = STRUCTURED_QUESTION_BANK.filter(
    q => q.roleId === blueprint.roleId &&
         q.competencyId === competencyId &&
         !answeredQuestionIds.includes(q.id) &&
         q.status === 'APPROVED'
  );

  let nextQ = pool.find(q => q.difficulty === targetDifficulty);
  if (!nextQ) nextQ = pool.find(q => q.difficulty === 'MEDIUM');
  if (!nextQ) nextQ = pool[0];

  return nextQ || null;
}

/**
 * 3. Compute Competency-Wise Scores and Skill Gaps from Assessment Answers
 * answersMap: { [questionId]: selectedOptionId }
 */
export function evaluateEmployeeAssessment(employeeId, answersMap) {
  const blueprint = ROLE_BLUEPRINTS[employeeId] || ROLE_BLUEPRINTS['demo-employee-01'];
  const pool = STRUCTURED_QUESTION_BANK.filter(q => q.roleId === blueprint.roleId);

  // Group performance by competency
  const compStats = {};
  blueprint.competencies.forEach((comp) => {
    compStats[comp.id] = {
      id: comp.id,
      name: comp.name,
      description: comp.description,
      required: comp.requiredProficiency,
      weight: comp.weight,
      color: comp.color,
      totalCount: 0,
      correctCount: 0,
      answeredCount: 0,
    };
  });

  let totalQuestionsAnswered = 0;
  let totalCorrect = 0;

  Object.entries(answersMap).forEach(([qId, selectedOption]) => {
    const question = pool.find(q => q.id === qId);
    if (!question) return;

    totalQuestionsAnswered++;
    const isCorrect = question.correctOption === selectedOption;
    if (isCorrect) totalCorrect++;

    const comp = compStats[question.competencyId];
    if (comp) {
      comp.totalCount++;
      comp.answeredCount++;
      if (isCorrect) comp.correctCount++;
    }
  });

  // Calculate scores per competency
  // Baseline scaling: 35% base + (correctPct * 0.60)
  // If zero answered or no questions in category, assign calibrated baseline
  const competencyBreakdown = blueprint.competencies.map((compDef) => {
    const stats = compStats[compDef.id];
    let scorePct = 0;
    if (stats.totalCount > 0) {
      const rawPct = (stats.correctCount / stats.totalCount) * 100;
      scorePct = Math.round(35 + (rawPct * 0.60));
    } else {
      scorePct = 55; // default developing baseline
    }

    const required = compDef.requiredProficiency;
    const gap = Math.max(0, required - scorePct);
    const profLevel = getProficiencyLevel(scorePct);

    let category = 'developing';
    let statusText = 'Developing Competency';
    let color = '#D97706'; // amber

    if (scorePct >= required) {
      category = 'strong';
      statusText = 'Strong / Proficient';
      color = '#15803D'; // green
    } else if (gap >= 15 || scorePct < 58) {
      category = 'critical';
      statusText = 'Critical Gap';
      color = '#B91C1C'; // red
    }

    return {
      id: compDef.id,
      name: compDef.name,
      description: compDef.description,
      current: scorePct,
      required,
      gap,
      category,
      statusText,
      proficiencyLabel: profLevel.label,
      badgeClass: profLevel.badgeClass,
      color,
      weight: compDef.weight,
    };
  });

  // Weighted Overall Competency Score
  let overallScore = 0;
  competencyBreakdown.forEach((c) => {
    overallScore += c.current * c.weight;
  });
  overallScore = Math.round(overallScore);

  const criticalGaps = competencyBreakdown.filter(c => c.category === 'critical');
  const developingGaps = competencyBreakdown.filter(c => c.category === 'developing');
  const strongAreas = competencyBreakdown.filter(c => c.category === 'strong');

  // Matched Learning Recommendations based on actual gaps
  const recommendedCourses = getPersonalizedRecommendations(blueprint, competencyBreakdown);

  // Personalized Learning Path based on prioritized gaps
  const learningPath = generatePersonalizedLearningPath(blueprint, competencyBreakdown, recommendedCourses);

  return {
    employeeId,
    departmentName: blueprint.departmentName,
    roleTitle: blueprint.roleTitle,
    targetRoleTitle: blueprint.targetRoleTitle,
    benchmark: blueprint.benchmark,
    overallScore,
    totalQuestionsAnswered,
    totalCorrect,
    competencyBreakdown,
    criticalGaps,
    developingGaps,
    strongAreas,
    recommendedCourses,
    learningPath,
    aiSummary: `Diagnostic evaluation for ${blueprint.roleTitle} (${blueprint.departmentName}) shows an overall competency score of ${overallScore}% against the Ministry benchmark of ${blueprint.benchmark}%. Identified ${criticalGaps.length} critical gap(s) and ${developingGaps.length} developing area(s). Tailored training pathways have been mapped directly to iGOT Karmayogi modules below.`,
    evaluatedAt: new Date().toISOString(),
  };
}

/**
 * 4. Tailored Course Recommendations matching specific role gaps
 */
function getPersonalizedRecommendations(blueprint, competencyBreakdown) {
  const allCourses = ALL_COURSES_CATALOG;

  // Filter or match courses according to the department and competency
  const matched = [];

  competencyBreakdown.forEach((comp) => {
    if (comp.category === 'critical' || comp.category === 'developing') {
      // Find course in catalog that matches competency or keywords
      const found = allCourses.find(c => 
        c.competency.toLowerCase().includes(comp.name.toLowerCase()) ||
        c.title.toLowerCase().includes(comp.name.toLowerCase())
      );

      if (found) {
        matched.push({
          ...found,
          targetGap: comp.name,
          gapSeverity: comp.category,
          priority: comp.category === 'critical' ? 'High' : 'Medium',
          reason: `Directly addresses identified ${comp.category} gap in ${comp.name} (${comp.current}% vs required ${comp.required}%).`,
        });
      } else {
        // Generate a synthetic iGOT standard recommendation for this specific gap
        matched.push({
          id: `rec-${blueprint.roleId}-${comp.id}`,
          title: `Professional Mastery in ${comp.name}`,
          provider: 'iGOT Karmayogi / NSSTA',
          providerType: 'igot',
          competency: comp.name,
          category: blueprint.departmentName,
          difficulty: comp.current < 50 ? 'Beginner' : 'Intermediate',
          duration: '14 Hours',
          durationHours: 14,
          modulesCount: 6,
          rating: 4.8,
          reviewsCount: 1240,
          enrolledCount: 4200,
          isEnrolled: false,
          progress: 0,
          badge: comp.category === 'critical' ? 'Priority Mandatory' : 'Recommended',
          description: `Comprehensive training curated for ${blueprint.roleTitle} covering ${comp.description}`,
          tags: [comp.name, blueprint.departmentName, 'Civil Services'],
          targetGap: comp.name,
          gapSeverity: comp.category,
          priority: comp.category === 'critical' ? 'High' : 'Medium',
          reason: `Mandated capacity building module for ${blueprint.roleTitle} to bridge ${comp.name} deficiency.`,
        });
      }
    }
  });

  return matched.slice(0, 4);
}

/**
 * 5. Generate Ordered Personalized Learning Path (Step 12)
 */
export function generatePersonalizedLearningPath(blueprint, competencyBreakdown, recommendedCourses) {
  const steps = [];

  // Sort gaps by priority: critical first (largest deficit), then developing
  const sortedGaps = [...competencyBreakdown]
    .filter(c => c.gap > 0)
    .sort((a, b) => b.gap - a.gap);

  sortedGaps.forEach((gap, index) => {
    const course = recommendedCourses.find(r => r.targetGap === gap.name) || {
      title: `Capacity Building in ${gap.name}`,
      duration: '12 Hours',
      provider: 'iGOT Karmayogi / National Academy',
    };

    let action = 'Strengthen';
    if (gap.category === 'critical') action = 'Urgent: Master';
    else if (index === 1) action = 'Improve';
    else if (index >= 2) action = 'Practice & Consolidate';

    steps.push({
      stepNumber: index + 1,
      title: `${action} ${gap.name}`,
      competency: gap.name,
      courseTitle: course.title,
      courseDuration: course.duration,
      provider: course.provider,
      priority: gap.category === 'critical' ? 'Critical' : 'High',
      badgeClass: gap.category === 'critical' ? 'bg-gov-red text-white' : 'bg-gov-amber text-white',
      currentLevel: `${gap.current}% (${gap.proficiencyLabel || 'Developing'})`,
      targetLevel: `${gap.required}% (Benchmark)`,
      description: `Targeted module to close the ${gap.gap}% proficiency gap in ${gap.name} required for ${blueprint.roleTitle}.`,
    });
  });

  // Always append final formal promotion reassessment milestone
  steps.push({
    stepNumber: steps.length + 1,
    title: 'Complete Validation Assessment & Role Elevation Certification',
    competency: 'All Blueprint Competencies',
    courseTitle: `${blueprint.roleTitle} Formal Advancement Exam`,
    courseDuration: '45 mins',
    provider: 'iGOT Karmayogi / Departmental Promotion Board',
    priority: 'Milestone Goal',
    badgeClass: 'bg-gov-green text-white',
    currentLevel: 'In Progress',
    targetLevel: `${blueprint.benchmark}% Ministry Benchmark`,
    description: `Formal summative assessment to confirm all deficits are cleared and certify readiness for ${blueprint.targetRoleTitle}.`,
  });

  return steps;
}
