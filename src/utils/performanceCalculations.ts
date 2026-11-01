import { SubjectRecord, PerformanceAnalysis } from '../types';

/**
 * Deterministic math calculations for student performance.
 * Never invents scores or claims weaknesses without mathematical evidence.
 */
export function calculatePerformanceMetrics(records: SubjectRecord[]): PerformanceAnalysis {
  if (!records || records.length === 0) {
    return {
      averagePercentage: 0,
      totalAssessments: 0,
      trend: 'insufficient_data',
      trendValue: 0,
      strongSubjects: [],
      weakSubjects: [],
      subjectAverages: [],
      warnings: ['No assessment data available. Add your first subject marks to generate an analysis.'],
      recommendations: []
    };
  }

  // Group by subject
  const subjectMap = new Map<string, { totalMarks: number; totalMax: number; count: number; difficultTopics: Set<string>; records: SubjectRecord[] }>();

  let totalObtainedAll = 0;
  let totalMaxAll = 0;

  for (const rec of records) {
    const validMax = rec.maxMarks > 0 ? rec.maxMarks : 100;
    const validObtained = Math.max(0, Math.min(rec.marksObtained, validMax));
    totalObtainedAll += validObtained;
    totalMaxAll += validMax;

    if (!subjectMap.has(rec.subject)) {
      subjectMap.set(rec.subject, {
        totalMarks: 0,
        totalMax: 0,
        count: 0,
        difficultTopics: new Set(),
        records: []
      });
    }
    const entry = subjectMap.get(rec.subject)!;
    entry.totalMarks += validObtained;
    entry.totalMax += validMax;
    entry.count += 1;
    entry.records.push(rec);

    if (rec.difficultTopics && Array.isArray(rec.difficultTopics)) {
      rec.difficultTopics.forEach(t => entry.difficultTopics.add(t));
    }
  }

  const overallAverage = totalMaxAll > 0 ? Math.round((totalObtainedAll / totalMaxAll) * 100 * 10) / 10 : 0;

  const subjectAverages = Array.from(subjectMap.entries()).map(([subject, data]) => {
    const avg = data.totalMax > 0 ? Math.round((data.totalMarks / data.totalMax) * 100 * 10) / 10 : 0;
    const sorted = [...data.records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return {
      subject,
      average: avg,
      count: data.count,
      latestDate: sorted[0]?.date || '',
      difficultTopics: Array.from(data.difficultTopics)
    };
  });

  // Calculate historical trend
  const sortedRecords = [...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  let trend: 'improving' | 'declining' | 'stable' | 'insufficient_data' = 'insufficient_data';
  let trendValue = 0;

  if (sortedRecords.length >= 2) {
    const half = Math.floor(sortedRecords.length / 2);
    const firstHalf = sortedRecords.slice(0, half);
    const secondHalf = sortedRecords.slice(half);

    const firstHalfAvg = firstHalf.reduce((acc, r) => acc + (r.marksObtained / (r.maxMarks || 100)) * 100, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((acc, r) => acc + (r.marksObtained / (r.maxMarks || 100)) * 100, 0) / secondHalf.length;

    trendValue = Math.round((secondHalfAvg - firstHalfAvg) * 10) / 10;
    if (trendValue > 2.5) trend = 'improving';
    else if (trendValue < -2.5) trend = 'declining';
    else trend = 'stable';
  }

  // Strong vs Weak subjects with evidence rules:
  // Strong: average >= 85% or count >= 1 and avg >= 80%
  // Weak: average < 75%
  const strongSubjects = subjectAverages
    .filter(s => s.average >= 82)
    .map(s => ({ subject: s.subject, average: s.average, count: s.count }));

  const weakSubjects = subjectAverages
    .filter(s => s.average < 75)
    .map(s => ({
      subject: s.subject,
      average: s.average,
      count: s.count,
      difficultTopics: s.difficultTopics
    }));

  const warnings: string[] = [];
  subjectAverages.forEach(s => {
    if (s.count === 1) {
      warnings.push(`"${s.subject}" only has 1 logged assessment. More submissions are required before trend confidence is high.`);
    }
  });

  // Actionable recommendations tied directly to data
  const recommendations: PerformanceAnalysis['recommendations'] = [];

  weakSubjects.forEach((ws, idx) => {
    recommendations.push({
      id: `rec-weak-${idx}`,
      type: 'revision',
      priority: 'high',
      subject: ws.subject,
      title: `Intensive Revision: ${ws.subject} (${ws.average}%)`,
      description: ws.difficultTopics.length > 0
        ? `Focus review on flagged pain points: ${ws.difficultTopics.join(', ')}. Schedule 2 spaced repetition sessions this week.`
        : `Assessment average is currently ${ws.average}%. Review core fundamentals and attempt chapter exercises.`
    });
  });

  // Practice recommendation for subjects with high confidence but recent slips
  subjectAverages.forEach((sa, idx) => {
    if (sa.average >= 75 && sa.average < 85) {
      recommendations.push({
        id: `rec-practice-${idx}`,
        type: 'practice',
        priority: 'medium',
        subject: sa.subject,
        title: `Targeted Practice: ${sa.subject} (${sa.average}%)`,
        description: `Solid baseline. Solving timed past exam problems or mock tests will push you into the 90%+ tier.`
      });
    }
  });

  return {
    averagePercentage: overallAverage,
    totalAssessments: records.length,
    trend,
    trendValue,
    strongSubjects,
    weakSubjects,
    subjectAverages,
    warnings,
    recommendations
  };
}
