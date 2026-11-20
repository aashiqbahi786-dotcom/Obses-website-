/** The 7 USPs from the founder brief. `roadmap: true` → labelled Coming soon. */
export const usps = [
  {
    icon: 'languages',
    title: 'Built for non-coders, in their own language',
    text: 'Hinglish, Hindi and Banglish are first-class, not translations. The AI replies in the language and script you use.',
    meaning: 'You can explain your idea the way you talk, without learning tech words or switching to formal English.',
    roadmap: false,
  },
  {
    icon: 'smartphone',
    title: 'Phone-first',
    text: 'Build, preview and publish from a phone.',
    meaning: 'No laptop needed. Build between customers, on the bus, wherever you are.',
    roadmap: false,
  },
  {
    icon: 'layers',
    title: 'Five products in one place',
    text: 'Websites, web apps, Android apps, AI agents and 3D scroll websites — one chat for all five.',
    meaning: 'Start with a website, add an Android app or an AI agent later, with the same way of working.',
    roadmap: false,
  },
  {
    icon: 'badge-check',
    title: 'Honest checks',
    text: 'Changes are verified with a typecheck and a build before they are saved. The AI’s “done” is backed by a build.',
    meaning: 'Fewer broken versions, and one-tap Undo when you do not like a change.',
    roadmap: false,
  },
  {
    icon: 'calculator',
    title: 'Clear cost',
    text: 'A credit estimate before every task. You pay by task size.',
    meaning: 'No surprise bills. Small changes cost less than big builds.',
    roadmap: false,
  },
  {
    icon: 'key-round',
    title: 'Ownership',
    text: 'Your app, your data — export and move to your own accounts.',
    meaning: 'Planned: you will not be locked in. Export to zip or GitHub is coming soon.',
    roadmap: true,
  },
  {
    icon: 'megaphone',
    title: 'Launch, not just build',
    text: 'Launchpad for showcase, feedback and promotion.',
    meaning: 'Planned: help with finding your first users, not just publishing.',
    roadmap: true,
  },
] as const;

export const steps = [
  { icon: 'message-square-text', title: 'Describe', text: 'Type, speak, or attach a photo or PDF. Hinglish, Hindi, Banglish or English.' },
  { icon: 'shield-check', title: 'AI builds and checks', text: 'The AI plans and writes the app, then runs a typecheck and a build before saving.' },
  { icon: 'rocket', title: 'Publish', text: 'Preview it, then publish to a free address in one tap.' },
] as const;
