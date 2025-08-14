import React from 'react'

interface IconProps {
  name: string
  className?: string
  size?: number
  color?: string
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  className = '', 
  size = 24, 
  color = 'currentColor' 
}) => {
  const iconMap: Record<string, string> = {
    // Navigation icons with active/inactive variants
    'home-active': '/icons/home_active.svg',
    'home-inactive': '/icons/home_inactive.svg',
    'tasks-active': '/icons/tasks_active.svg',
    'tasks-inactive': '/icons/tasks_inactive.svg',
    'focus-active': '/icons/focus_active.svg',
    'focus-inactive': '/icons/focus_inactive.svg',
    'habits-active': '/icons/habits_active.svg',
    'habits-inactive': '/icons/habits_inactive.svg',
    'kaihelp-active': '/icons/kaihelp_active.svg',
    'kaihelp-inactive': '/icons/kaihelp_inactive.svg',
    
    // Other icons
    work: '/icons/work.svg',
    health: '/icons/health.svg',
    personal: '/icons/personal.svg',
    social: '/icons/social.svg',
    creative: '/icons/creative.svg',
    finance: '/icons/finance.svg',
    timer: '/icons/timer.svg',
    schedule: '/icons/schedule.svg',
    twinkle: '/icons/twinkle.svg',
    joidu_logo: '/icons/joidu_drop_logo.svg',
  }

  const iconPath = iconMap[name]
  if (!iconPath) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return (
    <img 
      src={iconPath} 
      alt={name}
      className={className}
      style={{ 
        width: size, 
        height: size,
        color: color 
      }}
    />
  )
}

// Navigation icon components with active/inactive variants
export const HomeIcon: React.FC<{ 
  className?: string; 
  size?: number; 
  color?: string;
  variant?: 'active' | 'inactive';
}> = ({ variant = 'inactive', ...props }) => (
  <Icon name={`home-${variant}`} {...props} />
)

export const TasksIcon: React.FC<{ 
  className?: string; 
  size?: number; 
  color?: string;
  variant?: 'active' | 'inactive';
}> = ({ variant = 'inactive', ...props }) => (
  <Icon name={`tasks-${variant}`} {...props} />
)

export const FocusIcon: React.FC<{ 
  className?: string; 
  size?: number; 
  color?: string;
  variant?: 'active' | 'inactive';
}> = ({ variant = 'inactive', ...props }) => (
  <Icon name={`focus-${variant}`} {...props} />
)

export const HabitsIcon: React.FC<{ 
  className?: string; 
  size?: number; 
  color?: string;
  variant?: 'active' | 'inactive';
}> = ({ variant = 'inactive', ...props }) => (
  <Icon name={`habits-${variant}`} {...props} />
)

export const KaiHelpIcon: React.FC<{ 
  className?: string; 
  size?: number; 
  color?: string;
  variant?: 'active' | 'inactive';
}> = ({ variant = 'inactive', ...props }) => (
  <Icon name={`kaihelp-${variant}`} {...props} />
)

export const JoiduLogo: React.FC<{ className?: string; size?: number; color?: string }> = (props) => (
  <Icon name="joidu_logo" {...props} />
) 