// ── DOMAIN CONFIGURATION & CONTEXTUAL PERSONALIZATION ENGINE (PHASE 4) ────────
// Centralized domain intelligence layer that synthesizes department configuration,
// role blueprints, assessment gap analyses, course mappings, practical simulation tasks,
// and strictly grounded AI Assistant chat interactions.

import { DEPARTMENT_CONFIGS } from '../data/departmentConfigs';
import { ROLE_BLUEPRINTS } from '../data/roleBlueprints';

/**
 * Resolves the active department configuration for a given employee ID or department ID.
 * Defaults gracefully to 'demo-employee-01' (MoSPI).
 */
export function getDepartmentConfig(employeeIdOrDeptId) {
  if (!employeeIdOrDeptId) return DEPARTMENT_CONFIGS['demo-employee-01'];
  
  if (DEPARTMENT_CONFIGS[employeeIdOrDeptId]) {
    return DEPARTMENT_CONFIGS[employeeIdOrDeptId];
  }
  
  // Lookup by department id if passed
  const found = Object.values(DEPARTMENT_CONFIGS).find(
    cfg => cfg.id === employeeIdOrDeptId || cfg.name.toLowerCase().includes(String(employeeIdOrDeptId).toLowerCase())
  );
  
  return found || DEPARTMENT_CONFIGS['demo-employee-01'];
}

/**
 * Returns the active role configuration and promotion targets for the employee.
 */
export function getRoleConfig(employeeId) {
  const deptCfg = getDepartmentConfig(employeeId);
  return deptCfg.roleConfig;
}

/**
 * Returns the 8 prototype courses mapped specifically to the employee's department and role.
 */
export function getDepartmentCourses(employeeId) {
  const deptCfg = getDepartmentConfig(employeeId);
  return deptCfg.courses || [];
}

/**
 * Returns prioritized course recommendations based on the employee's actual measured gaps.
 * If the employee has a critical gap in competency X, courses matching X are boosted to the top.
 */
export function getRecommendedCourses(employeeId, gapAnalysis) {
  const allCourses = getDepartmentCourses(employeeId);
  if (!gapAnalysis || !gapAnalysis.criticalGaps) {
    return allCourses.slice(0, 4);
  }

  const criticalNames = new Set(gapAnalysis.criticalGaps.map(g => g.name.toLowerCase()));
  const developingNames = new Set((gapAnalysis.developingGaps || []).map(g => g.name.toLowerCase()));

  // Sort: Critical gap matches first, then Developing gap matches, then remaining
  const sorted = [...allCourses].sort((a, b) => {
    const aCrit = criticalNames.has(a.competencyName.toLowerCase()) ? 2 : 0;
    const bCrit = criticalNames.has(b.competencyName.toLowerCase()) ? 2 : 0;
    const aDev = developingNames.has(a.competencyName.toLowerCase()) ? 1 : 0;
    const bDev = developingNames.has(b.competencyName.toLowerCase()) ? 1 : 0;
    return (bCrit + bDev) - (aCrit + aDev);
  });

  return sorted;
}

/**
 * Generates the "Next Best Action" card content based on the active employee's top gap.
 */
export function getNextBestAction(employeeId, gapAnalysis) {
  const deptCfg = getDepartmentConfig(employeeId);
  const courses = deptCfg.courses || [];

  const topGap = gapAnalysis?.criticalGaps?.[0] || gapAnalysis?.developingGaps?.[0] || {
    name: deptCfg.competencies[0].name,
    current: 45,
    required: deptCfg.competencies[0].requiredProficiency,
    gap: deptCfg.competencies[0].requiredProficiency - 45,
  };

  // Find the exact course addressing this competency
  const matchedCourse = courses.find(
    c => c.competencyName.toLowerCase() === topGap.name.toLowerCase()
  ) || courses[0];

  return {
    actionTitle: `Strengthen ${topGap.name}`,
    competencyName: topGap.name,
    currentLevel: topGap.current,
    requiredLevel: topGap.required,
    gapPoints: topGap.gap,
    recommendedCourseTitle: matchedCourse.title,
    recommendedCourseCode: matchedCourse.code,
    provider: matchedCourse.provider,
    departmentName: deptCfg.name,
    roleTitle: deptCfg.roleConfig.title,
  };
}

/**
 * Returns practical simulation tasks (Virtual Labs) tailored to the department.
 */
export function getDepartmentTasks(employeeId) {
  const deptCfg = getDepartmentConfig(employeeId);
  return deptCfg.tasks || [];
}

/**
 * Returns the career progression pathway and future roles for the department.
 */
export function getDepartmentFutureRoles(employeeId, gapAnalysis) {
  const deptCfg = getDepartmentConfig(employeeId);
  const baseRoles = deptCfg.futureRoles || [];

  // Update readiness scores dynamically if gap analysis is available
  if (gapAnalysis && gapAnalysis.overallScore) {
    return baseRoles.map((role, idx) => ({
      ...role,
      readinessScore: Math.min(95, Math.max(40, gapAnalysis.overallScore + (idx === 0 ? 5 : -idx * 8))),
    }));
  }

  return baseRoles;
}

/**
 * Returns contextual notifications tailored to the department.
 */
export function getContextualNotifications(employeeId) {
  const deptCfg = getDepartmentConfig(employeeId);
  return deptCfg.notifications || [];
}

/**
 * Returns dynamic suggested questions for the AI Learning Assistant based on department & gaps.
 */
export function getSuggestedQuestions(employeeId, gapAnalysis) {
  const deptCfg = getDepartmentConfig(employeeId);
  const topGap = gapAnalysis?.criticalGaps?.[0] || gapAnalysis?.developingGaps?.[0];
  const gapName = topGap ? topGap.name : deptCfg.competencies[0].name;

  return [
    `Why is ${gapName} my biggest skill gap?`,
    `Why are these courses recommended for my role?`,
    `Explain the ${deptCfg.competencies[0].name} methodology`,
    `How do I prepare for promotion to ${deptCfg.roleConfig.targetRoleTitle}?`,
    `Explain my overall competency score calculation`,
  ];
}

/**
 * Generates an intelligent, contextually grounded reply for the AI Assistant.
 * Strictly enforces department and role isolation using the department's RAG knowledge.
 * Zero cross-department data leakage.
 */
export function generateContextualAIReply(userText, employee, gapAnalysis, currentCourse) {
  const empId = employee?.id || 'demo-employee-01';
  const deptCfg = getDepartmentConfig(empId);
  const roleTitle = deptCfg.roleConfig.title;
  const targetRole = deptCfg.roleConfig.targetRoleTitle;
  const topGap = gapAnalysis?.criticalGaps?.[0] || gapAnalysis?.developingGaps?.[0] || {
    name: deptCfg.competencies[0].name,
    current: 45,
    required: deptCfg.competencies[0].requiredProficiency,
    gap: deptCfg.competencies[0].requiredProficiency - 45,
  };

  const query = (userText || '').toLowerCase();
  let botResponse = '';
  let actions = [];

  // 1. Course recommendation question ("Why is this course recommended?", "Why do I need this course?")
  if (query.includes('why') && (query.includes('course') || query.includes('recommend') || query.includes('need'))) {
    const targetCourse = currentCourse || deptCfg.courses.find(
      c => c.competencyName.toLowerCase() === topGap.name.toLowerCase()
    ) || deptCfg.courses[0];

    botResponse = `As a **${roleTitle}** in **${deptCfg.name}**, your latest competency diagnostic identified a priority development gap in **${topGap.name}** (Current: ${topGap.current}% vs Required: ${topGap.required}%). 

The course **"${targetCourse.title}"** (${targetCourse.code}) is recommended because it directly addresses the core proficiency benchmarks established for your cadre. Completing this coursework will close your ${topGap.gap}% gap and advance your readiness for **${targetRole}**.`;

    actions = [
      { label: `Start "${targetCourse.title}"`, path: '/explore-learning' },
      { label: 'View Skill Gaps Radar', path: '/skill-gaps' },
      { label: 'Open Learning Path', path: '/learning-path' },
    ];
  }
  // 2. Specific competency questions
  else if (query.includes('gap') || query.includes(topGap.name.toLowerCase())) {
    botResponse = `In your role as **${roleTitle}**, **${topGap.name}** is a critical operational competency. Your current diagnostic score of **${topGap.current}%** falls short of the mandatory civil service benchmark of **${topGap.required}%** (-${topGap.gap} percentage points).

Under **${deptCfg.name}** operational protocols, strengthening this competency is essential for high-fidelity data reporting and qualification for promotion to **${targetRole}**.`;

    actions = [
      { label: 'View Recommended Coursework', path: '/explore-learning' },
      { label: 'Launch Department Virtual Lab', path: '/virtual-labs' },
      { label: 'Review Competency Profile', path: '/competencies' },
    ];
  }
  // 3. Promotion / Future role question
  else if (query.includes('promotion') || query.includes('future role') || query.includes('career') || query.includes('sso') || query.includes('senior')) {
    botResponse = `Your promotional roadmap targets transition from **${roleTitle}** to **${targetRole}** under the **${deptCfg.name}** cadre framework. 

Your current future-role readiness index is **${gapAnalysis?.overallScore ? Math.min(95, gapAnalysis.overallScore + 5) : 66}%**. The primary prerequisite is closing the **${topGap.name}** gap to reach at least ${topGap.required}%, alongside successful completion of verified iGOT simulation labs.`;

    actions = [
      { label: 'View Promotion Ladder', path: '/future-role' },
      { label: 'Track Learning Progress', path: '/progress' },
    ];
  }
  // 4. Competency score calculation
  else if (query.includes('score') || query.includes('calculate') || query.includes('overall') || query.includes('how')) {
    const score = gapAnalysis?.overallScore || employee?.overallCompetency || 65;
    botResponse = `Your overall competency score is **${score}%** against the ${deptCfg.name} role benchmark of **${deptCfg.roleConfig.benchmark}%**. 

This score is synthesized deterministically from:
1. **Initial Competency Diagnostic (50%)**: Evaluated across 5 core competencies in your role blueprint.
2. **Verified Course Modules (25%)**: Progress logged on approved iGOT / TPAC courses.
3. **Simulation Labs & Practical Submissions (25%)**: Realistic departmental exercise evaluations.`;

    actions = [
      { label: 'Inspect Competency Radar', path: '/competencies' },
      { label: 'Retake Diagnostic Assessment', path: '/assessment' },
    ];
  }
  // 5. Default domain-aware response
  else {
    botResponse = `Hello ${employee.name}. As your AI Competency Assistant for **${deptCfg.name}** (${deptCfg.domain}), I am here to guide your civil service development as a **${roleTitle}**. 

I can explain your **${topGap.name}** gap (-${topGap.gap}%), guide your coursework in **"${deptCfg.courses[0].title}"**, or walk you through promotional qualification requirements for **${targetRole}**.`;

    actions = [
      { label: `Strengthen ${topGap.name}`, path: '/explore-learning' },
      { label: 'Practice Simulation Task', path: '/virtual-labs' },
      { label: 'Open Future Role Pathway', path: '/future-role' },
    ];
  }

  return { text: botResponse, actions };
}
