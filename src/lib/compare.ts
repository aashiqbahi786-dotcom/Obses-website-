/** Comparison criteria and Obsess's own column (from the founder brief). */
export type CellValue = 'yes' | 'no' | 'coming-soon' | 'unknown';

export const criteria = [
  { id: 'chat-build', label: 'Builds websites and web apps from a chat description' },
  { id: 'android', label: 'Builds Android apps' },
  { id: 'live-preview', label: 'Live preview while building' },
  { id: 'indic-languages', label: 'Replies in Hinglish, Hindi and Banglish' },
  { id: 'cost-estimate', label: 'Cost estimate before every task' },
  { id: 'security-scan', label: 'Security scan before publishing' },
  { id: 'free-plan', label: 'Free plan' },
  { id: 'custom-domain', label: 'Custom domain' },
  { id: 'backend', label: 'Built-in database and login' },
  { id: 'export', label: 'Code export or GitHub sync' },
  { id: 'visual-editor', label: 'Visual (click-to-edit) editor' },
] as const;

export type CriterionId = (typeof criteria)[number]['id'];

export const obsessColumn: Record<CriterionId, { value: CellValue; note?: string }> = {
  'chat-build': { value: 'yes' },
  android: { value: 'yes', note: 'Build and phone-frame preview; APK and Play Store coming soon' },
  'live-preview': { value: 'yes' },
  'indic-languages': { value: 'yes' },
  'cost-estimate': { value: 'yes' },
  'security-scan': { value: 'yes' },
  'free-plan': { value: 'coming-soon', note: 'Planned; Obsess is in invite-only Alpha' },
  'custom-domain': { value: 'coming-soon' },
  backend: { value: 'coming-soon' },
  export: { value: 'coming-soon' },
  'visual-editor': { value: 'coming-soon' },
};

export const valueLabel: Record<CellValue, string> = {
  yes: 'Yes',
  no: 'No',
  'coming-soon': 'Coming soon',
  unknown: '—',
};
