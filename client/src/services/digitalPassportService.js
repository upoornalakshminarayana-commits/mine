// ── DIGITAL PROFESSIONAL PASSPORT SERVICE & DATA ARCHITECTURE ───────────────
// Synthesizes employee identity, competency DNA, evolving timeline,
// multidimensional skills matrix, learning journey statistics, verified achievements,
// priority development areas, future role readiness, and AI-driven next best moves.

import { getDepartmentConfig } from './domainConfigEngine';

/**
 * Returns professional maturity band based on overall score.
 */
export function getProfessionalMaturity(score = 65) {
  if (score >= 85) return { band: 'EXPERT', label: 'Expert Level', color: 'emerald', progress: 95 };
  if (score >= 75) return { band: 'ADVANCED', label: 'Advanced Professional', color: 'blue', progress: 80 };
  if (score >= 60) return { band: 'PROFICIENT', label: 'Proficient Officer', color: 'amber', progress: 65 };
  if (score >= 45) return { band: 'DEVELOPING', label: 'Developing Practitioner', color: 'orange', progress: 50 };
  return { band: 'FOUNDATIONAL', label: 'Foundational Stage', color: 'slate', progress: 30 };
}

/**
 * Contextual skills matrix mapping per department.
 */
const DEPARTMENT_SKILL_MATRICES = {
  'demo-employee-01': {
    core: ['Statistical Reasoning', 'Data Analysis', 'Problem Solving', 'Quantitative Synthesis'],
    technical: ['Python / R', 'SQL Querying', 'Microdata Tabulation', 'CAPI Digital Interviewing', 'Data Anonymization'],
    domain: ['Stratified Multi-Stage Sampling', 'Survey Operations', 'NSS Household Schedules', 'CPI Index Calculation', 'Data Quality & Imputation'],
    professional: ['Civil Service Ethics', 'Cross-cadre Communication', 'Field Enumeration Supervision', 'Analytical Report Drafting'],
  },
  'demo-employee-02': {
    core: ['Agri-Economic Analysis', 'Spatial Data Reasoning', 'Quantitative Synthesis', 'Agronomic Assessment'],
    technical: ['GIS & Remote Sensing', 'FASAL Satellite Modeling', 'Excel Statistical Tools', 'GPS Geo-tagging'],
    domain: ['Crop Cutting Experiments (CCE)', 'Agricultural Census', 'Yield Estimation Modeling', 'Mandi Price Indices', 'Soil Health Metrics'],
    professional: ['Farmer Outreach & Engagement', 'Inter-departmental Coordination', 'District Field Management', 'Technical Policy Briefing'],
  },
  'demo-employee-03': {
    core: ['Epidemiological Reasoning', 'Public Health Analytics', 'Health Metrics Synthesis', 'Critical Evaluation'],
    technical: ['HMIS Portal Navigation', 'Biostatistical Modeling', 'Health Data Visualization', 'Data Cleansing Scripts'],
    domain: ['Maternal & Child Health Indicators', 'Disease Surveillance Metrics', 'NFHS Household Health Data', 'Facility Data Quality Audit', 'Immunization Registry Analytics'],
    professional: ['Healthcare Cadre Communication', 'Public Health Governance', 'Data-driven Decision Making', 'Ethical Patient Data Handling'],
  },
  'demo-employee-04': {
    core: ['Labour Market Economics', 'Wage Index Modeling', 'Data Synthesis', 'Socio-economic Problem Solving'],
    technical: ['PLFS Microdata Analysis', 'Statistical Software (Stata/R)', 'Survey Data Verification', 'CPI-IW Calculation Tools'],
    domain: ['Periodic Labour Force Survey (PLFS)', 'Informal Sector Dynamics', 'Occupational Wage Indexing', 'Labour Bureau Methodologies', 'Social Security Data Metrics'],
    professional: ['Tripartite Stakeholder Negotiation', 'Industrial Survey Ethics', 'Technical Documentation', 'Field Team Supervision'],
  },
  'demo-employee-05': {
    core: ['Educational Measurement', 'Institutional Analytics', 'Cognitive Assessment Design', 'Policy Evaluation'],
    technical: ['UDISE+ Portal Management', 'Psychometric Scoring', 'Educational Data Tabulation', 'SPSS / R Analysis'],
    domain: ['Gross Enrolment Ratio (GER)', 'National Achievement Survey (NAS)', 'School Infrastructure Audits', 'Foundational Literacy Metrics', 'AISHE Higher Ed Statistics'],
    professional: ['Educational Leadership', 'Teacher Cadre Training Support', 'Public Reporting Transparency', 'Institutional Assessment Governance'],
  },
};

/**
 * Realistic career & professional experience timeline.
 */
const DEPARTMENT_EXPERIENCE_TIMELINES = {
  'demo-employee-01': [
    {
      year: '2021',
      date: 'Aug 2021 – Present',
      role: 'Statistical Investigator',
      organization: 'National Statistical Office (NSO), MoSPI',
      type: 'Current Cadre Assignment',
      description: 'Supervises field surveys, executes primary data validation on socio-economic household rounds, and generates district data tabulations.',
      skills: ['Survey Sampling', 'Field Operations', 'CAPI Protocols'],
    },
    {
      year: '2022',
      date: 'Jan 2022 – Dec 2022',
      role: 'Junior Statistical Associate',
      organization: 'Field Operations Division (FOD), MoSPI',
      type: 'Operational Round Deployment',
      description: 'Conducted on-site enumerator audits across 48 Urban Frame Survey (UFS) blocks with zero non-sampling errors.',
      skills: ['Spot Inspection', 'Data Quality', 'Field Enumeration'],
    },
    {
      year: '2023',
      date: 'May 2023 – Nov 2023',
      role: 'Survey Sampling Trainee',
      organization: 'National Statistical Systems Training Academy (NSSTA)',
      type: 'Competency Milestone',
      description: 'Completed residential program on stratified sampling and probabilistic PPS sample allocation techniques.',
      skills: ['Stratified Sampling', 'Probability Models', 'Sample Weighting'],
    },
  ],
  'demo-employee-02': [
    {
      year: '2020',
      date: 'Mar 2020 – Present',
      role: 'Agricultural Statistics Officer',
      organization: 'Directorate of Economics & Statistics, Ministry of Agriculture',
      type: 'Current Cadre Assignment',
      description: 'Oversees block-level crop area estimation, supervises Crop Cutting Experiments (CCE), and validates state yield models.',
      skills: ['Crop Estimation', 'FASAL Integration', 'Agri Census'],
    },
    {
      year: '2022',
      date: 'Jun 2022 – Jul 2023',
      role: 'Remote Sensing Agri-Data Fellow',
      organization: 'Mahalanobis National Crop Forecast Centre (MNCFC)',
      type: 'Specialized Technical Deployment',
      description: 'Integrated satellite optical and SAR telemetry to calibrate Kharif season acreage predictions across 12 agro-climatic zones.',
      skills: ['Remote Sensing', 'GIS Mapping', 'Satellite Data'],
    },
  ],
  'demo-employee-03': [
    {
      year: '2019',
      date: 'Nov 2019 – Present',
      role: 'Health Statistics Officer',
      organization: 'Ministry of Health & Family Welfare (MoHFW)',
      type: 'Current Cadre Assignment',
      description: 'Audits HMIS facility submissions, tracks National Health Mission primary health indicators, and compiles maternal health indices.',
      skills: ['HMIS Analytics', 'Public Health Data', 'Health Survey Statistics'],
    },
    {
      year: '2021',
      date: 'Mar 2021 – Sep 2022',
      role: 'Epidemiological Surveillance Analyst',
      organization: 'National Centre for Disease Control (NCDC)',
      type: 'Disease Surveillance Cell',
      description: 'Managed real-time weekly outbreak surveillance reports across 700+ district public health centers during national response.',
      skills: ['Epidemiological Metrics', 'Surveillance Tabulation', 'Statistical Quality'],
    },
  ],
  'demo-employee-04': [
    {
      year: '2021',
      date: 'Jan 2021 – Present',
      role: 'Labour Statistics Officer',
      organization: 'Labour Bureau, Ministry of Labour & Employment',
      type: 'Current Cadre Assignment',
      description: 'Validates Periodic Labour Force Survey (PLFS) schedules and compiles Industrial Workers Consumer Price Index (CPI-IW).',
      skills: ['PLFS Survey', 'Wage Indices', 'Labour Economics'],
    },
    {
      year: '2022',
      date: 'Feb 2022 – Oct 2023',
      role: 'Informal Sector Survey Specialist',
      organization: 'Central Labour Service Cell',
      type: 'Field Research Fellowship',
      description: 'Piloted unorganized sector gig-worker socio-economic surveys across metro regions.',
      skills: ['Informal Sector Survey', 'Occupational Wage Survey'],
    },
  ],
  'demo-employee-05': [
    {
      year: '2022',
      date: 'Jun 2022 – Present',
      role: 'Education Statistics Officer',
      organization: 'Department of School Education & Literacy, MoE',
      type: 'Current Cadre Assignment',
      description: 'Analyzes UDISE+ annual school data, calculates retention and transition metrics, and supports state-level educational ranking frameworks.',
      skills: ['UDISE+ Analytics', 'School Indicators', 'Educational Evaluation'],
    },
    {
      year: '2023',
      date: 'Jan 2023 – Dec 2023',
      role: 'National Achievement Survey (NAS) Analyst',
      organization: 'NCERT / MoE Statistical Wing',
      type: 'Assessment Program Lead',
      description: 'Calibrated foundational literacy and numeracy (FLN) test score outcomes across 12,000 schools in 18 states.',
      skills: ['Psychometrics', 'NAS Testing', 'Data Tabulation'],
    },
  ],
};

/**
 * Professional milestones and achievements.
 */
const DEPARTMENT_ACHIEVEMENTS = {
  'demo-employee-01': [
    { id: 'ach-1', title: 'Diagnostic Assessment Completed', category: 'Assessment', date: 'August 2024', status: 'Verified on iGOT', icon: 'ClipboardCheck' },
    { id: 'ach-2', title: 'Survey Sampling Advanced Proficiency', category: 'Competency DNA', date: 'October 2024', status: '87% Benchmark Achieved', icon: 'Award' },
    { id: 'ach-3', title: 'National Accounts Fundamentals', category: 'Course Completion', date: 'November 2024', status: 'NSSTA Certified', icon: 'BookOpen' },
    { id: 'ach-4', title: 'District Survey Virtual Lab', category: 'Practical Simulation', date: 'January 2025', status: '5/5 Tasks Approved', icon: 'FlaskConical' },
    { id: 'ach-5', title: 'Data Quality Anomaly Audit', category: 'Milestone', date: 'February 2025', status: 'Zero Error Validation Badge', icon: 'ShieldCheck' },
    { id: 'ach-6', title: 'Senior Statistical Officer Pathway', category: 'Career Readiness', date: 'March 2025', status: '68% Eligibility Benchmark', icon: 'Target' },
  ],
  'demo-employee-02': [
    { id: 'ach-1', title: 'Crop Cutting Experiments (CCE) Protocol Certification', category: 'Field Operations', date: 'July 2024', status: 'Verified by DA&FW', icon: 'Award' },
    { id: 'ach-2', title: 'Remote Sensing & FASAL Integration Lab', category: 'Practical Simulation', date: 'November 2024', status: 'Completed', icon: 'FlaskConical' },
    { id: 'ach-3', title: 'Agri-Census Sampling Masterclass', category: 'Course Completion', date: 'January 2025', status: 'iGOT Karmayogi', icon: 'BookOpen' },
    { id: 'ach-4', title: 'Senior Agricultural Economist Pathway', category: 'Career Readiness', date: 'February 2025', status: '58% Eligibility Benchmark', icon: 'Target' },
  ],
  'demo-employee-03': [
    { id: 'ach-1', title: 'NFHS-5 Demographic Indicator Mastery', category: 'Competency DNA', date: 'June 2024', status: 'Scored 92%', icon: 'Award' },
    { id: 'ach-2', title: 'HMIS Facility Anomaly Audit Milestone', category: 'Data Quality', date: 'September 2024', status: 'Verified by MoHFW', icon: 'ShieldCheck' },
    { id: 'ach-3', title: 'Epidemiological Metrics Simulation', category: 'Practical Simulation', date: 'December 2024', status: 'Completed', icon: 'FlaskConical' },
    { id: 'ach-4', title: 'Deputy Director (Health Analytics) Pathway', category: 'Career Readiness', date: 'January 2025', status: '70% Eligibility Benchmark', icon: 'Target' },
  ],
  'demo-employee-04': [
    { id: 'ach-1', title: 'PLFS Quarterly Microdata Certification', category: 'Survey Analytics', date: 'May 2024', status: 'Verified by Labour Bureau', icon: 'Award' },
    { id: 'ach-2', title: 'CPI-IW Base Year Calibration Lab', category: 'Practical Simulation', date: 'August 2024', status: 'Completed', icon: 'FlaskConical' },
    { id: 'ach-3', title: 'Informal Sector Survey Framework Lead', category: 'Milestone', date: 'November 2024', status: 'Commendation Awarded', icon: 'ShieldCheck' },
    { id: 'ach-4', title: 'Senior Research Officer (Labour) Pathway', category: 'Career Readiness', date: 'January 2025', status: '51% Eligibility Benchmark', icon: 'Target' },
  ],
  'demo-employee-05': [
    { id: 'ach-1', title: 'UDISE+ School Infrastructure Evaluation Cert', category: 'Assessment', date: 'July 2024', status: 'Scored 88%', icon: 'Award' },
    { id: 'ach-2', title: 'National Achievement Survey (NAS) Analysis Lab', category: 'Practical Simulation', date: 'October 2024', status: 'Completed', icon: 'FlaskConical' },
    { id: 'ach-3', title: 'Foundational Literacy Metrics Module', category: 'Course Completion', date: 'December 2024', status: 'iGOT Karmayogi', icon: 'BookOpen' },
    { id: 'ach-4', title: 'Senior Planning & Statistical Officer Pathway', category: 'Career Readiness', date: 'February 2025', status: '62% Eligibility Benchmark', icon: 'Target' },
  ],
};

/**
 * Builds the complete, configuration-grounded Digital Professional Passport data object.
 */
export function buildDigitalPassportData({
  employee,
  gapAnalysis,
  departmentConfig,
  domainNextBestAction,
  domainFutureRoles,
}) {
  const empId = employee?.id || 'demo-employee-01';
  const deptCfg = departmentConfig || getDepartmentConfig(empId);

  // Digital Passport ID
  const deptShort = deptCfg.shortName ? deptCfg.shortName.replace(/[^A-Z]/gi, '').toUpperCase() : 'GOV';
  const empNum = employee?.employeeNumber || empId.replace(/[^0-9]/g, '') || '001';
  const passportId = `DP-${deptShort}-EMP-${empNum.padStart(3, '0')}`;

  // Competency DNA synthesizing departmentConfig + real gapAnalysis
  const baselineCompetencies = deptCfg.competencies || [];
  const competencyDNA = baselineCompetencies.map((comp) => {
    let current = 65;
    let status = 'Proficient';

    if (gapAnalysis && gapAnalysis.competencyScores && gapAnalysis.competencyScores[comp.name] !== undefined) {
      current = gapAnalysis.competencyScores[comp.name];
    } else if (comp.importance === 'CRITICAL') {
      current = 58;
    } else if (comp.importance === 'HIGH') {
      current = 74;
    } else {
      current = 82;
    }

    if (current >= 80) status = 'Advanced';
    else if (current >= 65) status = 'Proficient';
    else if (current >= 50) status = 'Developing';
    else status = 'Foundational';

    return {
      id: comp.id,
      name: comp.name,
      current,
      required: comp.requiredProficiency || 75,
      importance: comp.importance,
      status,
      color: comp.color || '#1D5F9E',
    };
  });

  // Calculate overall competency average
  const overallCompScore = competencyDNA.length > 0
    ? Math.round(competencyDNA.reduce((acc, c) => acc + c.current, 0) / competencyDNA.length)
    : (employee?.overallCompetency || 65);

  const maturity = getProfessionalMaturity(overallCompScore);

  // Competency Evolution Timeline
  const evolutionEvents = [
    { stage: 'Initial Diagnostic', score: Math.max(35, overallCompScore - 22), date: 'Diagnostic Baseline', delta: '0' },
    { stage: 'After Course Work', score: Math.max(48, overallCompScore - 11), date: 'iGOT Karmayogi Phase', delta: '+11' },
    { stage: 'Current Verified DNA', score: overallCompScore, date: 'Live Competency Index', delta: `+${Math.min(30, overallCompScore - (overallCompScore - 22))}` },
    { stage: 'Future Role Target', score: deptCfg.roleConfig?.benchmark || 85, date: `${deptCfg.roleConfig?.targetRoleTitle || 'Senior Role'} Benchmark`, delta: `+${(deptCfg.roleConfig?.benchmark || 85) - overallCompScore}` },
  ];

  // Skills Matrix
  const skills = DEPARTMENT_SKILL_MATRICES[empId] || DEPARTMENT_SKILL_MATRICES['demo-employee-01'];

  // Experience Timeline
  const experienceTimeline = DEPARTMENT_EXPERIENCE_TIMELINES[empId] || DEPARTMENT_EXPERIENCE_TIMELINES['demo-employee-01'];

  // Achievements
  const achievements = DEPARTMENT_ACHIEVEMENTS[empId] || DEPARTMENT_ACHIEVEMENTS['demo-employee-01'];

  // Learning Journey Metrics
  const coursesCompleted = employee?.activitiesCompleted || 8;
  const learningHours = employee?.learningHoursTotal || 34;
  const assessmentsCompleted = gapAnalysis?.totalQuestions ? Math.round(gapAnalysis.totalQuestions / 4) : 4;
  const certificatesEarned = Math.max(2, Math.round(coursesCompleted / 3));
  const competenciesImproved = competencyDNA.filter(c => c.current >= 65).length;

  // Priority Development Areas (connecting to gapAnalysis)
  let developmentAreas = [];
  if (gapAnalysis?.criticalGaps && gapAnalysis.criticalGaps.length > 0) {
    developmentAreas = gapAnalysis.criticalGaps.map(g => ({
      name: g.name,
      current: g.current,
      target: g.required,
      gap: g.gap,
      priority: 'HIGH',
      description: `Critical gap of ${g.gap} points against mandatory role qualification threshold.`,
    }));
  }
  if (gapAnalysis?.developingGaps && gapAnalysis.developingGaps.length > 0) {
    const dev = gapAnalysis.developingGaps.slice(0, 2).map(g => ({
      name: g.name,
      current: g.current,
      target: g.required,
      gap: g.gap,
      priority: 'MEDIUM',
      description: `Developing competency; improve by ${g.gap} points to achieve advanced proficiency.`,
    }));
    developmentAreas = [...developmentAreas, ...dev];
  }
  if (developmentAreas.length === 0) {
    // Fallback if no gaps recorded yet
    developmentAreas = [
      {
        name: competencyDNA[0]?.name || 'Data Quality',
        current: competencyDNA[0]?.current || 61,
        target: 80,
        gap: 80 - (competencyDNA[0]?.current || 61),
        priority: 'HIGH',
        description: 'Priority qualification requirement for next promotional grade eligibility.',
      }
    ];
  }

  // Future Role Readiness
  const futureRolesList = domainFutureRoles || deptCfg.futureRoles || [];
  const primaryFutureRole = futureRolesList[0] || {
    title: deptCfg.roleConfig?.targetRoleTitle || 'Senior Statistical Officer',
    cadre: deptCfg.roleConfig?.cadre || 'Civil Service Cadre',
    readinessScore: employee?.futureRoleReadiness || 68,
    mandatoryCompetencies: ['Survey Sampling (≥80%)', 'Statistical Methods (≥75%)'],
    description: 'Leads complex departmental survey execution and analytical decision briefs.',
  };

  const readinessScore = primaryFutureRole.readinessScore || employee?.futureRoleReadiness || 68;

  // Digital Passport Composite Score (Demo Readiness Indicator)
  const compWeight = Math.round(overallCompScore * 0.35);
  const learnWeight = Math.round(Math.min(95, (coursesCompleted / 12) * 100) * 0.25);
  const expWeight = 74 * 0.20; // Experience benchmark
  const futureWeight = readinessScore * 0.20;
  const overallPassportScore = Math.round(compWeight + learnWeight + expWeight + futureWeight);

  // Strongest Competency & Top Opportunity
  const sortedComp = [...competencyDNA].sort((a, b) => b.current - a.current);
  const strongestComp = sortedComp[0];
  const largestOpportunity = sortedComp[sortedComp.length - 1];

  // AI Professional Insight text
  const aiInsightText = `Your strongest verified capability is **${strongestComp.name}** (${strongestComp.current}% proficiency). Your primary growth opportunity is **${largestOpportunity.name}** (${largestOpportunity.current}% vs ${largestOpportunity.required}% target). Strengthening **${largestOpportunity.name}** via recommended coursework and simulation labs will boost your readiness for **${primaryFutureRole.title}** from ${readinessScore}% to over 80%.`;

  return {
    passportId,
    verifiedStatus: 'VERIFIED PROFILE',
    environmentBadge: employee?.badge || 'DEMO PROFILE',
    issuedDate: employee?.joiningDate || '12 August 2021',
    lastUpdated: '19 September 2026 (Live Synced)',
    employee: {
      name: employee?.name || 'Poorna Lakshmi Narayana',
      initials: employee?.avatarInitials || 'PL',
      role: employee?.designation || deptCfg.roleConfig?.title || 'Statistical Investigator',
      targetRole: primaryFutureRole.title,
      department: employee?.department || deptCfg.name,
      domain: deptCfg.domain,
      ministry: employee?.ministry || deptCfg.ministry,
      cadre: employee?.cadre || deptCfg.roleConfig?.cadre,
      experience: '3 Years Active Service',
      station: employee?.station || 'New Delhi Headquarters',
      igotId: employee?.igotId || 'IGOT-NIC-20240481',
      igotStatus: employee?.igotStatus || 'Connected & Synced',
    },
    maturity,
    overallCompScore,
    overallPassportScore,
    readinessScore,
    competencyDNA,
    evolutionEvents,
    skills,
    experienceTimeline,
    achievements,
    learningJourney: {
      coursesCompleted,
      learningHours,
      assessmentsCompleted,
      certificatesEarned,
      competenciesImproved,
      activeStreakDays: employee?.learningStreakDays || 14,
    },
    developmentAreas,
    primaryFutureRole,
    futureRolesList,
    domainNextBestAction,
    aiInsight: {
      strongestCompetency: strongestComp.name,
      largestOpportunity: largestOpportunity.name,
      summaryText: aiInsightText,
    },
  };
}
