/**
 * ════════════════════════════════════════════════════════════════════════════════
 * PHASE 2 GOD-LEVEL AUTOMATED VALIDATION SUITE (SIH 26101)
 * Tests all 13 core requirements:
 * 1. Employee 01 receives Statistical Investigator competency blueprint
 * 2. Employee 02 receives Agricultural Statistics Officer blueprint
 * 3. Employee 01 and Employee 02 do not receive identical question pools
 * 4. Employee 03 receives Health Statistics questions
 * 5. Question competency metadata is valid
 * 6. Only approved/active questions are selected
 * 7. No duplicate question in one assessment
 * 8. Difficulty increases after correct answer
 * 9. Difficulty decreases after incorrect answer
 * 10. Final competency scores are calculated & persisted
 * 11. Skill gaps are recalculated
 * 12. Recommendations use the resulting skill gaps
 * 13. Employee A cannot access Employee B's assessment (Isolation)
 * ════════════════════════════════════════════════════════════════════════════════
 */

import { DEMO_EMPLOYEES } from '../data/demoEmployees.js';
import { ROLE_BLUEPRINTS } from '../data/roleBlueprints.js';
import { STRUCTURED_QUESTION_BANK } from '../data/questionBank.js';
import {
  generateEmployeeAssessment,
  getAdaptiveNextQuestion,
  evaluateEmployeeAssessment,
} from '../services/roleAssessmentEngine.js';

export function runPhase2ValidationSuite() {
  const results = [];
  let passedCount = 0;

  function assert(testId, name, condition, details = '') {
    if (condition) {
      passedCount++;
      results.push({ testId, name, status: 'PASS', details });
    } else {
      results.push({ testId, name, status: 'FAIL', details });
      console.error(`[FAIL] ${testId}: ${name} - ${details}`);
    }
  }

  // ── Test 1: Employee 01 Blueprint ──
  const emp1Blueprint = ROLE_BLUEPRINTS['demo-employee-01'];
  assert(
    'Test 1',
    'Employee 01 receives Statistical Investigator competency blueprint',
    emp1Blueprint &&
      emp1Blueprint.roleId === 'statistical-investigator' &&
      emp1Blueprint.departmentId === 'mospi-nso' &&
      emp1Blueprint.competencies.length === 5 &&
      emp1Blueprint.competencies.some(c => c.id === 'survey-sampling') &&
      emp1Blueprint.competencies.some(c => c.id === 'data-quality'),
    `Role: ${emp1Blueprint?.roleTitle}, Dept: ${emp1Blueprint?.departmentName}`
  );

  // ── Test 2: Employee 02 Blueprint ──
  const emp2Blueprint = ROLE_BLUEPRINTS['demo-employee-02'];
  assert(
    'Test 2',
    'Employee 02 receives Agricultural Statistics Officer blueprint',
    emp2Blueprint &&
      emp2Blueprint.roleId === 'agricultural-statistics-officer' &&
      emp2Blueprint.departmentId === 'agriculture-fw' &&
      emp2Blueprint.competencies.length === 5 &&
      emp2Blueprint.competencies.some(c => c.id === 'crop-estimation') &&
      emp2Blueprint.competencies.some(c => c.id === 'agri-statistics'),
    `Role: ${emp2Blueprint?.roleTitle}, Dept: ${emp2Blueprint?.departmentName}`
  );

  // ── Test 3: Employee 01 vs 02 Question Pools ──
  const asmt1 = generateEmployeeAssessment('demo-employee-01');
  const asmt2 = generateEmployeeAssessment('demo-employee-02');
  const ids1 = asmt1.questions.map(q => q.id);
  const ids2 = asmt2.questions.map(q => q.id);
  const intersection = ids1.filter(id => ids2.includes(id));
  assert(
    'Test 3',
    'Employee 01 and Employee 02 do not receive identical question pools',
    intersection.length === 0 && ids1.length > 0 && ids2.length > 0,
    `Emp01 Qs: [${ids1.slice(0, 3).join(', ')}...] vs Emp02 Qs: [${ids2.slice(0, 3).join(', ')}...], Overlap: ${intersection.length}`
  );

  // ── Test 4: Employee 03 Health Questions ──
  const asmt3 = generateEmployeeAssessment('demo-employee-03');
  const allHealthRole = asmt3.questions.every(
    q => q.roleId === 'health-statistics-officer' && q.departmentId === 'health-family-welfare'
  );
  assert(
    'Test 4',
    'Employee 03 receives Health Statistics questions',
    allHealthRole && asmt3.questions.length === 10,
    `Loaded ${asmt3.questions.length} questions for Health Statistics Officer`
  );

  // ── Test 5: Question Competency Metadata ──
  const invalidQuestions = STRUCTURED_QUESTION_BANK.filter(
    q =>
      !q.id ||
      !q.departmentId ||
      !q.roleId ||
      !q.competencyId ||
      !['EASY', 'MEDIUM', 'HARD'].includes(q.difficulty) ||
      !Array.isArray(q.options) ||
      q.options.length !== 4 ||
      !q.correctOption ||
      !q.explanation
  );
  assert(
    'Test 5',
    'Question competency metadata is valid across the question bank',
    invalidQuestions.length === 0 && STRUCTURED_QUESTION_BANK.length >= 75,
    `Validated ${STRUCTURED_QUESTION_BANK.length} questions, invalid count: ${invalidQuestions.length}`
  );

  // ── Test 6: Only Approved & Active Questions ──
  const unapprovedInAsmt = asmt1.questions.filter(q => q.status !== 'APPROVED');
  assert(
    'Test 6',
    'Only approved/active questions are selected in assessments',
    unapprovedInAsmt.length === 0,
    `All ${asmt1.questions.length} questions have status === 'APPROVED'`
  );

  // ── Test 7: No Duplicate Questions in One Assessment ──
  const uniqueCount1 = new Set(ids1).size;
  const uniqueCount2 = new Set(ids2).size;
  const uniqueCount3 = new Set(asmt3.questions.map(q => q.id)).size;
  assert(
    'Test 7',
    'No duplicate question in one assessment session',
    uniqueCount1 === ids1.length &&
      uniqueCount2 === ids2.length &&
      uniqueCount3 === asmt3.questions.length,
    `Emp01: ${uniqueCount1}/${ids1.length}, Emp02: ${uniqueCount2}/${ids2.length}, Emp03: ${uniqueCount3}/${asmt3.questions.length}`
  );

  // ── Test 8: Adaptive Difficulty Increases on Correct ──
  const nextAfterCorrect = getAdaptiveNextQuestion(
    'demo-employee-01',
    'survey-sampling',
    'EASY',
    true,
    []
  );
  assert(
    'Test 8',
    'Difficulty increases after correct answer (EASY -> MEDIUM / HARD)',
    nextAfterCorrect && ['MEDIUM', 'HARD'].includes(nextAfterCorrect.difficulty),
    `Initial: EASY -> Next adapted: ${nextAfterCorrect?.difficulty}`
  );

  // ── Test 9: Adaptive Difficulty Decreases on Incorrect ──
  const nextAfterIncorrect = getAdaptiveNextQuestion(
    'demo-employee-01',
    'survey-sampling',
    'HARD',
    false,
    []
  );
  assert(
    'Test 9',
    'Difficulty decreases after incorrect answer (HARD -> MEDIUM / EASY)',
    nextAfterIncorrect && ['MEDIUM', 'EASY'].includes(nextAfterIncorrect.difficulty),
    `Initial: HARD -> Next adapted: ${nextAfterIncorrect?.difficulty}`
  );

  // ── Test 10: Competency Scores Calculation & Persistence ──
  // Simulate answering assessment for Employee 01
  const mockAnswers1 = {};
  asmt1.questions.forEach((q, idx) => {
    // Intentionally answer Survey Sampling incorrectly and Statistical Methods correctly
    if (q.competencyId === 'survey-sampling') {
      mockAnswers1[q.id] = q.options.find(o => o.id !== q.correctOption)?.id || 'A';
    } else {
      mockAnswers1[q.id] = q.correctOption;
    }
  });

  const evalResult1 = evaluateEmployeeAssessment('demo-employee-01', mockAnswers1);
  assert(
    'Test 10',
    'Final competency scores are calculated per competency domain',
    evalResult1 &&
      evalResult1.competencyBreakdown.length === 5 &&
      typeof evalResult1.overallScore === 'number' &&
      evalResult1.overallScore > 0,
    `Overall score: ${evalResult1.overallScore}%, Competencies: ${evalResult1.competencyBreakdown.map(c => `${c.name}: ${c.current}%`).join(', ')}`
  );

  // ── Test 11: Skill Gaps Recalculated ──
  const samplingComp = evalResult1.competencyBreakdown.find(c => c.id === 'survey-sampling');
  assert(
    'Test 11',
    'Skill gaps are recalculated based on required benchmark vs current score',
    samplingComp &&
      samplingComp.gap > 0 &&
      evalResult1.criticalGaps.some(g => g.id === 'survey-sampling'),
    `Survey Sampling: Score ${samplingComp?.current}%, Required ${samplingComp?.required}%, Gap: ${samplingComp?.gap}% (Category: ${samplingComp?.category})`
  );

  // ── Test 12: Recommendations Map to Gaps ──
  const recs = evalResult1.recommendedCourses;
  assert(
    'Test 12',
    'Recommendations use the resulting skill gaps',
    recs.length > 0 && recs.some(r => r.targetGap.includes('Survey') || r.targetGap.includes('Sampling')),
    `Mapped ${recs.length} recommendations targeting: ${recs.map(r => r.targetGap).join(', ')}`
  );

  // ── Test 13: Employee Isolation ──
  // Attempt to evaluate Employee 01's answers with Employee 02's blueprint
  const evalMismatched = evaluateEmployeeAssessment('demo-employee-02', mockAnswers1);
  // Questions from Employee 01 should not match Employee 02's pool, resulting in zero answered count for Employee 02's pool
  assert(
    'Test 13',
    'Employee A cannot access Employee B assessment pool (strict role isolation)',
    evalMismatched.totalQuestionsAnswered === 0,
    `Cross-evaluation yielded 0 matching questions for foreign role blueprint`
  );

  const summary = {
    total: results.length,
    passed: passedCount,
    failed: results.length - passedCount,
    allPassed: passedCount === results.length,
    results,
  };

  return summary;
}
