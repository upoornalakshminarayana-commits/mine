// ── LEADERBOARD SERVICE & DATA ARCHITECTURE ──────────────────────────────────
// Provides transparent point calculation, department-aware rankings,
// dynamic user ranking, and persistent integration with the competency lifecycle.

import { DEMO_EMPLOYEES } from '../data/demoEmployees';
import { DEPARTMENT_CONFIGS } from '../data/departmentConfigs';

/**
 * Transparent Point Calculation Formula:
 * - Competency Assessment (40%): overallCompetency / 100 * 60,000 pts
 * - Course Completion (25%): coursesCompleted * 2,500 pts (capped at 37,500 pts)
 * - Assessment / Quiz Performance (20%): avgScore / 100 * 30,000 pts
 * - Skill Improvement (15%): improvementPercentage * 1,500 pts (capped at 22,500 pts)
 * Total Max: ~150,000 Competency Points
 */
export function calculateCompetencyPoints({
  overallCompetency = 60,
  coursesCompleted = 10,
  assessmentScore = 80,
  skillImprovement = 8,
}) {
  const compPts = Math.round((overallCompetency / 100) * 60000);
  const coursePts = Math.round(Math.min(coursesCompleted * 2500, 37500));
  const assessPts = Math.round((assessmentScore / 100) * 30000);
  const skillPts = Math.round(Math.min(skillImprovement * 1500, 22500));

  return compPts + coursePts + assessPts + skillPts;
}

/**
 * Realistic department-specific employee benchmarks to populate the 
 * leaderboard across MoSPI, Agriculture, Health, Labour, and Education.
 */
const DEPARTMENT_COHORTS = {
  'demo-employee-01': {
    department: 'MoSPI / National Statistical Office',
    domain: 'Official Statistics',
    title: 'Official Statistics Learning Leaderboard',
    topCompetency: 'Survey Sampling & Statistical Analysis',
    peers: [
      {
        id: 'mospi-peer-01',
        name: 'Prakash Sanjay S P',
        initials: 'PS',
        role: 'Senior Statistical Officer',
        department: 'MoSPI / National Statistical Office',
        coursesCompleted: 18,
        assessmentScore: 94,
        skillImprovement: 18,
        overallCompetency: 92,
        learningHours: 48,
        competenciesImproved: 8,
        topCompetency: 'Survey Sampling',
        recentAchievement: 'Completed Advanced Survey Methodology',
        status: 'Active',
      },
      {
        id: 'mospi-peer-02',
        name: 'Aniket Karmakar',
        initials: 'AK',
        role: 'Statistical Officer',
        department: 'MoSPI / National Statistical Office',
        coursesCompleted: 17,
        assessmentScore: 92,
        skillImprovement: 15,
        overallCompetency: 88,
        learningHours: 42,
        competenciesImproved: 7,
        topCompetency: 'National Accounts',
        recentAchievement: 'Scored 95% in Macroeconomic Indicators',
        status: 'Active',
      },
      {
        id: 'mospi-peer-03',
        name: 'Suresh Chandra Panda',
        initials: 'SC',
        role: 'Research Officer',
        department: 'MoSPI / National Statistical Office',
        coursesCompleted: 16,
        assessmentScore: 91,
        skillImprovement: 14,
        overallCompetency: 86,
        learningHours: 39,
        competenciesImproved: 6,
        topCompetency: 'Index Number Construction',
        recentAchievement: 'CPI Anomaly Detection Simulation Complete',
        status: 'Active',
      },
      {
        id: 'mospi-peer-04',
        name: 'Kavitha Ramachandran',
        initials: 'KR',
        role: 'Statistical Investigator',
        department: 'MoSPI / National Statistical Office',
        coursesCompleted: 15,
        assessmentScore: 88,
        skillImprovement: 12,
        overallCompetency: 82,
        learningHours: 35,
        competenciesImproved: 5,
        topCompetency: 'Data Quality & Validation',
        recentAchievement: 'Validated 120 District Data Records',
        status: 'Active',
      },
      {
        id: 'mospi-peer-05',
        name: 'Deepak Bhattacharya',
        initials: 'DB',
        role: 'Statistical Investigator',
        department: 'MoSPI / National Statistical Office',
        coursesCompleted: 14,
        assessmentScore: 86,
        skillImprovement: 11,
        overallCompetency: 80,
        learningHours: 32,
        competenciesImproved: 5,
        topCompetency: 'Sampling Error Calibration',
        recentAchievement: 'Completed Multi-Stage Frame Design',
        status: 'Active',
      },
      {
        id: 'mospi-peer-06',
        name: 'Meenakshi Sundaram',
        initials: 'MS',
        role: 'Assistant Director (Stats)',
        department: 'MoSPI / National Statistical Office',
        coursesCompleted: 13,
        assessmentScore: 85,
        skillImprovement: 10,
        overallCompetency: 78,
        learningHours: 30,
        competenciesImproved: 4,
        topCompetency: 'Official Microdata Dissemination',
        recentAchievement: 'Completed iGOT Anonymization Lab',
        status: 'Active',
      },
      {
        id: 'mospi-peer-07',
        name: 'Rajeev Nambiar',
        initials: 'RN',
        role: 'Senior Statistical Officer',
        department: 'MoSPI / National Statistical Office',
        coursesCompleted: 12,
        assessmentScore: 84,
        skillImprovement: 9,
        overallCompetency: 75,
        learningHours: 28,
        competenciesImproved: 4,
        topCompetency: 'Data Analysis',
        recentAchievement: 'Published State Economic Digest',
        status: 'Active',
      },
      {
        id: 'mospi-peer-08',
        name: 'Pooja Vishwakarma',
        initials: 'PV',
        role: 'Statistical Investigator',
        department: 'MoSPI / National Statistical Office',
        coursesCompleted: 11,
        assessmentScore: 82,
        skillImprovement: 9,
        overallCompetency: 73,
        learningHours: 26,
        competenciesImproved: 3,
        topCompetency: 'Survey Operations',
        recentAchievement: 'Completed Field Enumeration Audit',
        status: 'Active',
      },
      {
        id: 'mospi-peer-09',
        name: 'Harish Babu K',
        initials: 'HB',
        role: 'Statistical Investigator',
        department: 'MoSPI / National Statistical Office',
        coursesCompleted: 10,
        assessmentScore: 80,
        skillImprovement: 8,
        overallCompetency: 70,
        learningHours: 24,
        competenciesImproved: 3,
        topCompetency: 'Statistical Methods',
        recentAchievement: 'Completed Descriptive Statistics Cert',
        status: 'Active',
      },
      {
        id: 'mospi-peer-10',
        name: 'Alok Ranjan Das',
        initials: 'AD',
        role: 'Statistical Assistant',
        department: 'MoSPI / National Statistical Office',
        coursesCompleted: 9,
        assessmentScore: 78,
        skillImprovement: 7,
        overallCompetency: 67,
        learningHours: 22,
        competenciesImproved: 2,
        topCompetency: 'Data Entry Quality',
        recentAchievement: 'Zero-Error Household Data Validation',
        status: 'Active',
      },
      {
        id: 'mospi-peer-11',
        name: 'Sunita Verma',
        initials: 'SV',
        role: 'Statistical Investigator',
        department: 'MoSPI / National Statistical Office',
        coursesCompleted: 7,
        assessmentScore: 72,
        skillImprovement: 5,
        overallCompetency: 61,
        learningHours: 19,
        competenciesImproved: 2,
        topCompetency: 'Field Operations',
        recentAchievement: 'Completed District Survey Basics',
        status: 'Active',
      },
      {
        id: 'mospi-peer-12',
        name: 'Tenzing Norbu',
        initials: 'TN',
        role: 'Statistical Investigator',
        department: 'MoSPI / National Statistical Office',
        coursesCompleted: 6,
        assessmentScore: 70,
        skillImprovement: 4,
        overallCompetency: 58,
        learningHours: 16,
        competenciesImproved: 1,
        topCompetency: 'Data Collection',
        recentAchievement: 'Completed CAPI Mobile Toolkit',
        status: 'Active',
      },
    ]
  },
  'demo-employee-02': {
    department: 'Agriculture',
    domain: 'Agricultural Statistics',
    title: 'Agricultural Statistics Learning Leaderboard',
    topCompetency: 'Crop Area Estimation & Yield Modeling',
    peers: [
      {
        id: 'agri-peer-01',
        name: 'Dr. Rameshwar Dayal',
        initials: 'RD',
        role: 'Senior Agricultural Economist',
        department: 'Agriculture',
        coursesCompleted: 19,
        assessmentScore: 96,
        skillImprovement: 19,
        overallCompetency: 94,
        learningHours: 51,
        competenciesImproved: 9,
        topCompetency: 'Crop Cutting Experiments (CCE)',
        recentAchievement: 'Published Kharif Yield Forecast Report',
        status: 'Active',
      },
      {
        id: 'agri-peer-02',
        name: 'Vandana Deshmukh',
        initials: 'VD',
        role: 'Agricultural Statistics Officer',
        department: 'Agriculture',
        coursesCompleted: 17,
        assessmentScore: 93,
        skillImprovement: 16,
        overallCompetency: 89,
        learningHours: 44,
        competenciesImproved: 7,
        topCompetency: 'Remote Sensing in Ag',
        recentAchievement: 'Mastered FASAL Satellite Integration',
        status: 'Active',
      },
      {
        id: 'agri-peer-03',
        name: 'Gurpreet Singh Brar',
        initials: 'GB',
        role: 'Agricultural Planning Officer',
        department: 'Agriculture',
        coursesCompleted: 16,
        assessmentScore: 90,
        skillImprovement: 14,
        overallCompetency: 85,
        learningHours: 38,
        competenciesImproved: 6,
        topCompetency: 'Soil Health Analytics',
        recentAchievement: 'Completed Agri-Data Telemetry Lab',
        status: 'Active',
      },
      {
        id: 'agri-peer-04',
        name: 'Naveen Choudhary',
        initials: 'NC',
        role: 'Agricultural Statistics Officer',
        department: 'Agriculture',
        coursesCompleted: 14,
        assessmentScore: 86,
        skillImprovement: 11,
        overallCompetency: 80,
        learningHours: 33,
        competenciesImproved: 5,
        topCompetency: 'Crop Estimation',
        recentAchievement: 'Verified Block Rabi Acreage',
        status: 'Active',
      },
      {
        id: 'agri-peer-05',
        name: 'Priyanka Patel',
        initials: 'PP',
        role: 'Statistical Officer (Agri)',
        department: 'Agriculture',
        coursesCompleted: 13,
        assessmentScore: 84,
        skillImprovement: 10,
        overallCompetency: 77,
        learningHours: 29,
        competenciesImproved: 4,
        topCompetency: 'Survey Methodology',
        recentAchievement: 'Completed Horticulture Census Lab',
        status: 'Active',
      },
      {
        id: 'agri-peer-06',
        name: 'Manish Tiwari',
        initials: 'MT',
        role: 'Field Statistical Assistant',
        department: 'Agriculture',
        coursesCompleted: 11,
        assessmentScore: 81,
        skillImprovement: 9,
        overallCompetency: 72,
        learningHours: 25,
        competenciesImproved: 3,
        topCompetency: 'Agri Census Protocols',
        recentAchievement: 'Completed Mobile CCE Geo-tagging',
        status: 'Active',
      },
      {
        id: 'agri-peer-07',
        name: 'Aparna Nair',
        initials: 'AN',
        role: 'Agricultural Statistics Officer',
        department: 'Agriculture',
        coursesCompleted: 9,
        assessmentScore: 76,
        skillImprovement: 7,
        overallCompetency: 66,
        learningHours: 21,
        competenciesImproved: 3,
        topCompetency: 'Price & Market Intelligence',
        recentAchievement: 'Completed Mandi Price Indices Module',
        status: 'Active',
      },
      {
        id: 'agri-peer-08',
        name: 'Rohit Khandelwal',
        initials: 'RK',
        role: 'Agricultural Statistics Officer',
        department: 'Agriculture',
        coursesCompleted: 7,
        assessmentScore: 71,
        skillImprovement: 4,
        overallCompetency: 57,
        learningHours: 17,
        competenciesImproved: 2,
        topCompetency: 'Sampling Protocols',
        recentAchievement: 'Completed Ag Sampling Basics',
        status: 'Active',
      },
    ]
  },
  'demo-employee-03': {
    department: 'Health & Family Welfare',
    domain: 'Health Statistics',
    title: 'Health Statistics Learning Leaderboard',
    topCompetency: 'Epidemiological Metrics & HMIS Analytics',
    peers: [
      {
        id: 'hlth-peer-01',
        name: 'Dr. Shalini Venkatesh',
        initials: 'SV',
        role: 'Deputy Director (Health Analytics)',
        department: 'Health & Family Welfare',
        coursesCompleted: 20,
        assessmentScore: 97,
        skillImprovement: 20,
        overallCompetency: 95,
        learningHours: 54,
        competenciesImproved: 9,
        topCompetency: 'Maternal & Child Health Indicators',
        recentAchievement: 'Completed NFHS-5 Indicator Calibration',
        status: 'Active',
      },
      {
        id: 'hlth-peer-02',
        name: 'Debabrata Mukherjee',
        initials: 'DM',
        role: 'Senior Health Analyst',
        department: 'Health & Family Welfare',
        coursesCompleted: 18,
        assessmentScore: 93,
        skillImprovement: 16,
        overallCompetency: 90,
        learningHours: 46,
        competenciesImproved: 8,
        topCompetency: 'Disease Outbreak Surveillance',
        recentAchievement: 'Published Vector-borne Disease Dashboard',
        status: 'Active',
      },
      {
        id: 'hlth-peer-03',
        name: 'Kavita Menon',
        initials: 'KM',
        role: 'Health Statistics Officer',
        department: 'Health & Family Welfare',
        coursesCompleted: 16,
        assessmentScore: 89,
        skillImprovement: 13,
        overallCompetency: 84,
        learningHours: 37,
        competenciesImproved: 6,
        topCompetency: 'HMIS Portal Data Quality',
        recentAchievement: 'Completed Facility Anomaly Audit',
        status: 'Active',
      },
      {
        id: 'hlth-peer-04',
        name: 'Ajay Pratap Singh',
        initials: 'AS',
        role: 'Public Health Statistical Officer',
        department: 'Health & Family Welfare',
        coursesCompleted: 14,
        assessmentScore: 85,
        skillImprovement: 11,
        overallCompetency: 79,
        learningHours: 31,
        competenciesImproved: 5,
        topCompetency: 'Public Health Data',
        recentAchievement: 'Completed Immunization Registry Analysis',
        status: 'Active',
      },
      {
        id: 'hlth-peer-05',
        name: 'Farzana Parveen',
        initials: 'FP',
        role: 'Health Statistics Officer',
        department: 'Health & Family Welfare',
        coursesCompleted: 12,
        assessmentScore: 82,
        skillImprovement: 9,
        overallCompetency: 74,
        learningHours: 27,
        competenciesImproved: 4,
        topCompetency: 'Statistical Reporting',
        recentAchievement: 'Completed Health Survey Analytics Lab',
        status: 'Active',
      },
      {
        id: 'hlth-peer-06',
        name: 'Pranab Dasgupta',
        initials: 'PD',
        role: 'District Health Data Analyst',
        department: 'Health & Family Welfare',
        coursesCompleted: 9,
        assessmentScore: 76,
        skillImprovement: 7,
        overallCompetency: 66,
        learningHours: 20,
        competenciesImproved: 2,
        topCompetency: 'District Health Metrics',
        recentAchievement: 'Completed Primary Health Reporting Course',
        status: 'Active',
      },
    ]
  },
  'demo-employee-04': {
    department: 'Labour & Employment',
    domain: 'Labour Statistics',
    title: 'Labour Statistics Learning Leaderboard',
    topCompetency: 'Workforce Participation & Wage Analytics',
    peers: [
      {
        id: 'labr-peer-01',
        name: 'Sudhir Kashyap',
        initials: 'SK',
        role: 'Senior Research Officer (Labour)',
        department: 'Labour & Employment',
        coursesCompleted: 19,
        assessmentScore: 95,
        skillImprovement: 18,
        overallCompetency: 92,
        learningHours: 49,
        competenciesImproved: 8,
        topCompetency: 'Periodic Labour Force Survey (PLFS)',
        recentAchievement: 'Completed Quarterly Urban PLFS Release',
        status: 'Active',
      },
      {
        id: 'labr-peer-02',
        name: 'Geeta Balasubramanian',
        initials: 'GB',
        role: 'Labour Statistics Officer',
        department: 'Labour & Employment',
        coursesCompleted: 17,
        assessmentScore: 91,
        skillImprovement: 15,
        overallCompetency: 87,
        learningHours: 41,
        competenciesImproved: 7,
        topCompetency: 'Informal Sector & Gig Economy',
        recentAchievement: 'Completed Gig Worker Survey Framework',
        status: 'Active',
      },
      {
        id: 'labr-peer-03',
        name: 'Mohammad Tariq',
        initials: 'MT',
        role: 'Research Officer (Wage Indices)',
        department: 'Labour & Employment',
        coursesCompleted: 15,
        assessmentScore: 87,
        skillImprovement: 12,
        overallCompetency: 82,
        learningHours: 35,
        competenciesImproved: 5,
        topCompetency: 'CPI-IW Base Year Calibration',
        recentAchievement: 'Completed Industrial Workers Index Course',
        status: 'Active',
      },
      {
        id: 'labr-peer-04',
        name: 'Chandana Ghosh',
        initials: 'CG',
        role: 'Labour Statistics Officer',
        department: 'Labour & Employment',
        coursesCompleted: 13,
        assessmentScore: 83,
        skillImprovement: 10,
        overallCompetency: 76,
        learningHours: 29,
        competenciesImproved: 4,
        topCompetency: 'Employment Data',
        recentAchievement: 'Completed Labour Bureau Sampling Module',
        status: 'Active',
      },
      {
        id: 'labr-peer-05',
        name: 'Laxman Rathore',
        initials: 'LR',
        role: 'Assistant Labour Analyst',
        department: 'Labour & Employment',
        coursesCompleted: 10,
        assessmentScore: 78,
        skillImprovement: 8,
        overallCompetency: 69,
        learningHours: 23,
        competenciesImproved: 3,
        topCompetency: 'Workforce Indicators',
        recentAchievement: 'Completed Occupational Wage Survey Lab',
        status: 'Active',
      },
      {
        id: 'labr-peer-06',
        name: 'Vinita Joshi',
        initials: 'VJ',
        role: 'Labour Statistics Officer',
        department: 'Labour & Employment',
        coursesCompleted: 7,
        assessmentScore: 69,
        skillImprovement: 4,
        overallCompetency: 52,
        learningHours: 15,
        competenciesImproved: 1,
        topCompetency: 'Data Verification',
        recentAchievement: 'Completed Shram Suvidha Field Entry',
        status: 'Active',
      },
    ]
  },
  'demo-employee-05': {
    department: 'Education',
    domain: 'Education Statistics',
    title: 'Education Statistics Learning Leaderboard',
    topCompetency: 'UDISE+ Analytics & Learning Outcome Metrics',
    peers: [
      {
        id: 'educ-peer-01',
        name: 'Prof. Hemant Acharya',
        initials: 'HA',
        role: 'Senior Planning & Statistical Officer',
        department: 'Education',
        coursesCompleted: 19,
        assessmentScore: 96,
        skillImprovement: 19,
        overallCompetency: 94,
        learningHours: 50,
        competenciesImproved: 9,
        topCompetency: 'UDISE+ School Indicators',
        recentAchievement: 'Completed Gross Enrolment Ratio (GER) Modeling',
        status: 'Active',
      },
      {
        id: 'educ-peer-02',
        name: 'Ritu Bhattacharya',
        initials: 'RB',
        role: 'Education Statistics Officer',
        department: 'Education',
        coursesCompleted: 17,
        assessmentScore: 92,
        skillImprovement: 15,
        overallCompetency: 88,
        learningHours: 43,
        competenciesImproved: 7,
        topCompetency: 'National Achievement Survey (NAS)',
        recentAchievement: 'Published District Learning Outcomes Report',
        status: 'Active',
      },
      {
        id: 'educ-peer-03',
        name: 'Kalyan Sundaram',
        initials: 'KS',
        role: 'Higher Education Data Specialist',
        department: 'Education',
        coursesCompleted: 15,
        assessmentScore: 88,
        skillImprovement: 13,
        overallCompetency: 83,
        learningHours: 36,
        competenciesImproved: 6,
        topCompetency: 'AISHE Institutional Metrics',
        recentAchievement: 'Completed University Faculty Ratios Lab',
        status: 'Active',
      },
      {
        id: 'educ-peer-04',
        name: 'Shilpa Kulkarni',
        initials: 'SK',
        role: 'Education Statistics Officer',
        department: 'Education',
        coursesCompleted: 14,
        assessmentScore: 85,
        skillImprovement: 11,
        overallCompetency: 79,
        learningHours: 31,
        competenciesImproved: 5,
        topCompetency: 'Education Indicators',
        recentAchievement: 'Completed Student Dropout Trajectory Study',
        status: 'Active',
      },
      {
        id: 'educ-peer-05',
        name: 'Nitin Gadkari Jr.',
        initials: 'NG',
        role: 'Statistical Officer (Schools)',
        department: 'Education',
        coursesCompleted: 11,
        assessmentScore: 81,
        skillImprovement: 8,
        overallCompetency: 72,
        learningHours: 25,
        competenciesImproved: 3,
        topCompetency: 'Survey Statistics',
        recentAchievement: 'Completed School Infrastructure Audit Lab',
        status: 'Active',
      },
      {
        id: 'educ-peer-06',
        name: 'Meera Nambiar',
        initials: 'MN',
        role: 'Education Statistics Officer',
        department: 'Education',
        coursesCompleted: 8,
        assessmentScore: 73,
        skillImprovement: 5,
        overallCompetency: 59,
        learningHours: 18,
        competenciesImproved: 2,
        topCompetency: 'Assessment & Evaluation',
        recentAchievement: 'Completed Foundational Literacy Analytics',
        status: 'Active',
      },
    ]
  }
};

/**
 * Generates dynamic leaderboard dataset based on current employee,
 * active filters (scope: 'dept' | 'org' | 'role', timePeriod: 'all' | 'year' | 'month').
 */
export function getLeaderboardData({
  currentEmployee,
  gapAnalysis,
  scope = 'dept', // 'dept' | 'org' | 'role'
  timePeriod = 'all', // 'all' | 'year' | 'month'
  searchQuery = '',
}) {
  const activeEmpId = currentEmployee?.id || 'demo-employee-01';
  const currentDeptKey = activeEmpId in DEPARTMENT_COHORTS ? activeEmpId : 'demo-employee-01';
  const cohort = DEPARTMENT_COHORTS[currentDeptKey];

  // Calculate current user's actual points from live context
  const currentUserGrowthNum = parseInt(currentEmployee?.competencyGrowth?.replace(/[^0-9]/g, '') || '8', 10);
  const currentUserScore = gapAnalysis?.overallScore || currentEmployee?.overallCompetency || 63;
  const currentUserCourses = currentEmployee?.activitiesCompleted || 8;
  const currentUserAssessScore = gapAnalysis?.overallScore || 78;

  let currentUserPoints = calculateCompetencyPoints({
    overallCompetency: currentUserScore,
    coursesCompleted: currentUserCourses,
    assessmentScore: currentUserAssessScore,
    skillImprovement: currentUserGrowthNum,
  });

  // Time period modifier
  let timeMultiplier = 1;
  if (timePeriod === 'year') timeMultiplier = 0.85;
  if (timePeriod === 'month') timeMultiplier = 0.28;

  const currentEmpEntry = {
    id: activeEmpId,
    employeeId: activeEmpId,
    name: currentEmployee?.name || 'Officer',
    initials: currentEmployee?.avatarInitials || 'OF',
    role: currentEmployee?.designation || 'Statistical Investigator',
    department: currentEmployee?.department || cohort.department,
    coursesCompleted: Math.round(currentUserCourses * (timePeriod === 'month' ? 0.3 : 1)),
    assessmentScore: currentUserAssessScore,
    skillImprovement: currentUserGrowthNum,
    overallCompetency: currentUserScore,
    learningHours: Math.round((currentEmployee?.learningHoursTotal || 34) * (timePeriod === 'month' ? 0.35 : 1)),
    competenciesImproved: Math.round(7 * (timePeriod === 'month' ? 0.4 : 1)),
    competencyPoints: Math.round(currentUserPoints * timeMultiplier),
    monthlyPointsGain: Math.round(126 * (timePeriod === 'month' ? 0.8 : 1)),
    topCompetency: cohort.topCompetency,
    recentAchievement: `Completed Diagnostic Assessment (${currentUserScore}% Overall)`,
    status: 'Active',
    isCurrentUser: true,
  };

  // Compile pool of candidate records
  let candidatePool = [];

  if (scope === 'dept') {
    // Current department peers + current user
    const peers = (cohort.peers || []).map(p => ({
      ...p,
      isCurrentUser: false,
      competencyPoints: Math.round(calculateCompetencyPoints(p) * timeMultiplier),
      coursesCompleted: Math.round(p.coursesCompleted * (timePeriod === 'month' ? 0.3 : 1)),
      learningHours: Math.round(p.learningHours * (timePeriod === 'month' ? 0.35 : 1)),
    }));
    candidatePool = [...peers, currentEmpEntry];
  } else if (scope === 'role') {
    // Peers across departments who share a similar rank or designation
    const allPeers = Object.values(DEPARTMENT_COHORTS).flatMap(c => c.peers);
    const sameRolePeers = allPeers
      .filter(p => p.role.toLowerCase().includes('officer') || p.role.toLowerCase().includes('investigator'))
      .map(p => ({
        ...p,
        isCurrentUser: false,
        competencyPoints: Math.round(calculateCompetencyPoints(p) * timeMultiplier),
        coursesCompleted: Math.round(p.coursesCompleted * (timePeriod === 'month' ? 0.3 : 1)),
        learningHours: Math.round(p.learningHours * (timePeriod === 'month' ? 0.35 : 1)),
      }));
    candidatePool = [...sameRolePeers, currentEmpEntry];
  } else {
    // Overall organization (MoSPI + allied Central ministries)
    const allPeers = Object.values(DEPARTMENT_COHORTS).flatMap(c => c.peers).map(p => ({
      ...p,
      isCurrentUser: false,
      competencyPoints: Math.round(calculateCompetencyPoints(p) * timeMultiplier),
      coursesCompleted: Math.round(p.coursesCompleted * (timePeriod === 'month' ? 0.3 : 1)),
      learningHours: Math.round(p.learningHours * (timePeriod === 'month' ? 0.35 : 1)),
    }));
    candidatePool = [...allPeers, currentEmpEntry];
  }

  // Deduplicate by ID
  const uniqueMap = new Map();
  candidatePool.forEach(item => {
    if (!uniqueMap.has(item.id)) {
      uniqueMap.set(item.id, item);
    }
  });
  let fullList = Array.from(uniqueMap.values());

  // Sort descending by competencyPoints
  fullList.sort((a, b) => b.competencyPoints - a.competencyPoints);

  // Assign clean 1-based ranks
  fullList = fullList.map((entry, idx) => ({
    ...entry,
    rank: idx + 1,
  }));

  // Find user's calculated rank and next rank gap
  const userIndex = fullList.findIndex(e => e.isCurrentUser);
  const currentUserFinal = userIndex !== -1 ? fullList[userIndex] : currentEmpEntry;
  const userRank = currentUserFinal.rank;

  let pointsToNextRank = 0;
  let nextRankNumber = Math.max(1, userRank - 1);
  let nextRankPoints = currentUserFinal.competencyPoints;
  let progressToNextPercent = 100;

  if (userIndex > 0) {
    const higherUser = fullList[userIndex - 1];
    pointsToNextRank = Math.max(12, higherUser.competencyPoints - currentUserFinal.competencyPoints);
    nextRankNumber = higherUser.rank;
    nextRankPoints = higherUser.competencyPoints;
    const lowerBound = userIndex + 1 < fullList.length ? fullList[userIndex + 1].competencyPoints : currentUserFinal.competencyPoints - pointsToNextRank;
    const range = nextRankPoints - lowerBound;
    const currentProgress = currentUserFinal.competencyPoints - lowerBound;
    progressToNextPercent = range > 0 ? Math.min(100, Math.max(15, Math.round((currentProgress / range) * 100))) : 85;
  }

  // Filter by search query if present
  let filteredList = fullList;
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filteredList = fullList.filter(
      e =>
        e.name.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q)
    );
  }

  // Top 3 Podium entries (from fullList before search filter for visual stability)
  const top1 = fullList[0] || null;
  const top2 = fullList[1] || null;
  const top3 = fullList[2] || null;

  return {
    cohortTitle: cohort.title,
    departmentName: cohort.department,
    domainName: cohort.domain,
    topPerformer: top1,
    podium: {
      rank1: top1,
      rank2: top2,
      rank3: top3,
    },
    currentUser: currentUserFinal,
    userRank,
    pointsToNextRank,
    nextRankNumber,
    nextRankPoints,
    progressToNextPercent,
    totalEmployees: fullList.length,
    filteredEmployees: filteredList,
  };
}
