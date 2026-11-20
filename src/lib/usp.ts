/** USPs (8). `roadmap: true` → labelled Coming soon (founder 2026-11-20: none). */
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
    text: 'Your app, your code, your data — export to zip or GitHub and move the backend to your own account.',
    meaning: 'You are never locked in. Leave any time with everything you built.',
    roadmap: false,
  },
  {
    icon: 'megaphone',
    title: 'Launch, not just build',
    text: 'Showcase on Launchpad, collect reviews and feedback, find early users for your MVP, and promote it with free ad credit.',
    meaning: 'Building is half the job. Obsess helps with the other half — getting seen and getting users.',
    roadmap: false,
  },
  {
    icon: 'waypoints',
    title: 'Smart code graph',
    text: 'A live map of your code, so the AI reads only what a task needs — fewer tokens and lower cost per task.',
    meaning: 'Your credits go further, and the AI makes fewer mistakes because it checks against your real code.',
    roadmap: false,
  },
] as const;

export const steps = [
  { icon: 'message-square-text', title: 'Describe', text: 'Type, speak, or attach a photo or PDF. Hinglish, Hindi, Banglish or English.' },
  { icon: 'shield-check', title: 'AI builds and checks', text: 'The AI plans and writes the app, then runs a typecheck and a build before saving.' },
  { icon: 'cloud-upload', title: 'Publish', text: 'Preview it, then publish in one tap — free address or your own domain.' },
  { icon: 'trending-up', title: 'Launch and grow', text: 'Showcase on Launchpad, get reviews and early users, promote it with free ad credit.' },
] as const;
