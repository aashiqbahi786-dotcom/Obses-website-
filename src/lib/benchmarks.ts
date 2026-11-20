/**
 * Internal eval results. Copy exactly from the founder brief; never round up.
 * Add new runs as new entries with their own date — keep old ones.
 */
export const benchmarkRuns = [
  {
    date: '2026-11-19',
    model: 'Claude Sonnet 5.5',
    label: 'internal eval',
    results: [
      {
        id: 'android-requirements',
        headline: '30 of 30',
        title: 'Android apps met every requirement',
        detail:
          '10 real first requests (Hinglish, English, Hindi, Banglish), 3 runs each = 30 apps. 102 of 102 requirements met, checked in a real browser by what each app shows and does.',
      },
      {
        id: 'grader-validation',
        headline: '6 of 6',
        title: 'Deliberately broken apps caught by the grader',
        detail: 'The grader was validated by breaking six apps on purpose; all six were caught.',
      },
      {
        id: 'android-preview',
        headline: '10 of 10',
        title: 'Android preview running within 3 minutes',
        detail: 'Median time from request to running preview: 25.6 s (10 requests).',
      },
      {
        id: 'typecheck',
        headline: '10 of 10',
        title: 'Typecheck passed',
        detail: '10 Android requests.',
      },
      {
        id: 'publishing',
        headline: '16 of 16',
        title: 'Verified eval apps published successfully',
        detail: '16 verified eval apps.',
      },
    ],
    limits: [
      'Small samples (10 requests, 30 apps, 16 publishes).',
      'One model (Claude Sonnet 5.5).',
      'Short first requests, not long multi-step projects.',
      'Internal tests run by the Obsess team, not independent.',
    ],
  },
] as const;

export const latestRun = benchmarkRuns[0];
