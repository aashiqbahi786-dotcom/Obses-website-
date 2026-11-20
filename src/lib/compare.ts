/** Comparison criteria and Obsess's own column (from the founder brief). */
export type CellValue = 'yes' | 'no' | 'coming-soon' | 'unknown';

export const criteria = [
  { id: 'chat-build', label: 'Builds websites and web apps from a chat description' },
  { id: 'android', label: 'Builds Android apps' },
  { id: 'agents', label: 'AI agent builder' },
  { id: '3d-websites', label: '3D scroll animation websites' },
  { id: 'live-preview', label: 'Live preview while building' },
  { id: 'indic-languages', label: 'Replies in Hinglish, Hindi and Banglish' },
  { id: 'cost-estimate', label: 'Cost estimate before every task' },
  { id: 'security-scan', label: 'Security scan before publishing' },
  { id: 'free-plan', label: 'Free plan' },
  { id: 'custom-domain', label: 'Custom domain' },
  { id: 'backend', label: 'Built-in database and login' },
  { id: 'export', label: 'Code export or GitHub sync' },
  { id: 'visual-editor', label: 'Visual (click-to-edit) editor' },
  { id: 'launchpad', label: 'Showcase and early-user feedback' },
  { id: 'promotion', label: 'Free ads promotion for your app' },
] as const;

export type CriterionId = (typeof criteria)[number]['id'];

export const obsessColumn: Record<CriterionId, { value: CellValue; note?: string }> = {
  'chat-build': { value: 'yes' },
  android: { value: 'yes', note: 'Phone-frame preview, APK and Google Play' },
  agents: { value: 'yes' },
  '3d-websites': { value: 'yes' },
  'live-preview': { value: 'yes' },
  'indic-languages': { value: 'yes' },
  'cost-estimate': { value: 'yes' },
  'security-scan': { value: 'yes' },
  'free-plan': { value: 'yes', note: '5 credits a day' },
  'custom-domain': { value: 'yes', note: 'Pro plan and above' },
  backend: { value: 'yes' },
  export: { value: 'yes', note: 'Zip and GitHub' },
  'visual-editor': { value: 'yes' },
  launchpad: { value: 'yes', note: 'Showcase, reviews, early users' },
  promotion: { value: 'yes', note: 'Promotion coupon on paid plans' },
};

export const valueLabel: Record<CellValue, string> = {
  yes: 'Yes',
  no: 'No',
  'coming-soon': 'Coming soon',
  unknown: '—',
};
