export interface GuideSection {
  id: number
  title: string
  icon: string
  content: {
    intro: string
    features?: string[]
    tip?: string
    reassurance?: string
    examples?: string[]
    insight?: string
  }
  interactive: {
    buttonText: string
    action: string
  }
}

export const guideSections: GuideSection[] = [
  {
    id: 1,
    title: "Say Hello to Kai 👋",
    icon: "/icons/kai.svg",
    content: {
      intro: "Meet Kai, your personal ADHD-aware assistant who gets how your brain works. Kai is designed to be supportive, non-judgmental, and adaptive to your unique needs.",
      features: [
        "Never judges your struggles or setbacks",
        "Learns from your preferences (privately on your device)",
        "Adapts responses based on your energy and focus levels",
        "Available 24/7 for support and guidance"
      ],
      tip: "💡 Pro tip: You can talk to Kai like a friend. Say things like 'I'm feeling overwhelmed' or 'I don't know where to start' and Kai will help you break things down."
    },
    interactive: {
      buttonText: "Chat with Kai Now",
      action: "/kaihelp"
    }
  },
  {
    id: 2,
    title: "Your Daily Command Center",
    icon: "/icons/home_active.svg",
    content: {
      intro: "Your Home dashboard is designed to be your calm, organized starting point every day. No overwhelming lists or harsh reminders - just gentle guidance.",
      features: [
        "Personal greeting that adapts to your timezone",
        "Today's schedule at a glance",
        "A few manageable tasks (never overwhelming)",
        "Habit tracking that celebrates small wins",
        "Clean design with gentle, ADHD-friendly colors"
      ],
      insight: "🧠 ADHD Insight: Visual calm reduces decision fatigue and helps you focus on what matters most."
    },
    interactive: {
      buttonText: "See My Dashboard",
      action: "/"
    }
  },
  {
    id: 3,
    title: "Your Overwhelm Rescue System ⚡",
    icon: "/icons/lightning.svg",
    content: {
      intro: "The orange lightning button is your secret weapon when everything feels like too much. It's designed specifically for those ADHD moments when you need help but don't know where to start.",
      features: [
        "Appears when you might need extra support",
        "Asks gentle questions to understand your state",
        "Suggests one tiny, achievable action",
        "Never adds pressure - always offers relief"
      ],
      reassurance: "🤗 Remember: There's no such thing as 'failing' with the orange button. It's there to help, not to judge. Use it whenever you need it - that's what it's for!"
    },
    interactive: {
      buttonText: "Try the Orange Button",
      action: "/just-one-thing"
    }
  },
  {
    id: 4,
    title: "Start Small, Win Big 🌱",
    icon: "/icons/habits_active.svg",
    content: {
      intro: "Our habits system is built on the '2-minute rule' - if it takes less than 2 minutes, you can build momentum without overwhelm. Perfect for ADHD brains that thrive on quick wins.",
      examples: [
        "Drink one glass of water",
        "Write down one thing you're grateful for",
        "Do 5 jumping jacks",
        "Take three deep breaths",
        "Send one encouraging text"
      ],
      tip: "🌟 Success Story: 'I started with just drinking water. Six months later, I have 5 solid habits that happen automatically!' - Jamie, Joidu user",
      insight: "🧠 Why it works: Small wins release dopamine, which ADHD brains crave. Each tiny success makes the next one easier."
    },
    interactive: {
      buttonText: "Create My First Habit",
      action: "/habits"
    }
  },
  {
    id: 5,
    title: "Hyperfocus vs. Healthy Focus 🎯",
    icon: "/icons/focus_active.svg",
    content: {
      intro: "Our focus timer helps you harness your natural ADHD superpowers while protecting you from burnout. It's designed to work with your brain, not against it.",
      features: [
        "Gentle preparation phase to ease into focus",
        "Clean, distraction-free interface",
        "Hyperfocus protection (suggests breaks)",
        "Energy-aware suggestions for optimal timing"
      ],
      insight: "🧠 ADHD Insight: Your brain craves novelty and stimulation. Our timer includes subtle engagement elements to keep you focused without being distracting."
    },
    interactive: {
      buttonText: "Try a Focus Session",
      action: "/focus"
    }
  },
  {
    id: 6,
    title: "Tasks That Don't Overwhelm 📝",
    icon: "/icons/tasks_active.svg",
    content: {
      intro: "Task management that actually reduces stress instead of adding to it. Smart categorization, gentle reminders, and celebration of every win - no matter how small.",
      features: [
        "Smart categorization by energy and context",
        "Action-oriented language (not judgemental)",
        "Time and energy matching suggestions",
        "Confetti celebrations for dopamine hits"
      ],
      tip: "🎉 Celebration Note: Every completed task triggers confetti because ADHD brains need and deserve those dopamine rewards!",
      examples: [
        "Instead of 'Clean room' → 'Put 5 items away'",
        "Instead of 'Exercise' → 'Take a 10-minute walk'",
        "Instead of 'Study' → 'Read one chapter'"
      ]
    },
    interactive: {
      buttonText: "Create My First Task",
      action: "/add-task"
    }
  },
  {
    id: 7,
    title: "Making It Your Own 🎨",
    icon: "/icons/preferences.svg",
    content: {
      intro: "Joidu works best when it's tailored to your unique ADHD needs. Explore settings that help you customize everything from Kai's communication style to visual preferences.",
      features: [
        "ADHD preferences (interruption handling, breakdown level)",
        "Kai settings (encouragement style, response length)",
        "Appearance options (themes, gentle animations)",
        "Notification preferences (supportive, not overwhelming)"
      ],
      tip: "📚 Homework (Optional): Take 5 minutes to explore the Settings menu. No pressure to change anything - just see what's available when you're ready!"
    },
    interactive: {
      buttonText: "Explore Settings",
      action: "/settings"
    }
  }
]

export const welcomeContent = {
  title: "Welcome to Your ADHD-Friendly Productivity Partner!",
  subtitle: "Let's set you up for success with gentle, brain-friendly productivity",
  introText: "Hi there! 👋 We know starting something new can feel overwhelming, especially for ADHD brains. That's why we've made this guide super gentle and flexible.",
  additionalText: "You can always come back to any section, skip things that don't feel right, or just jump straight into using Joidu. There's no wrong way to do this!",
  paths: [
    { id: 'quick', text: 'Get me started in 5 minutes', color: '#2847ef' },
    { id: 'complete', text: 'I want the full tour', color: '#fa772c' },
    { id: 'skip', text: "I'll figure it out myself", color: '#e2e2e2', textColor: '#4c4c4c' }
  ]
}

export const completionContent = {
  title: "Welcome to Your ADHD Productivity Journey! 🎉",
  subtitle: "You're all set up and ready to activate your potential",
  checklist: [
    "Chat with Kai whenever you need support",
    "Use your Home dashboard as your daily starting point",
    "Hit the orange button when feeling overwhelmed",
    "Build habits starting with just 2 minutes",
    "Focus in a brain-friendly way",
    "Manage tasks without stress",
    "Customize everything to work for YOU"
  ],
  reminders: [
    "There's no wrong way to use Joidu",
    "You can always return to this guide",
    "Kai is here to support you 24/7",
    "Small progress is still progress",
    "Celebrate every win, no matter how tiny"
  ]
}