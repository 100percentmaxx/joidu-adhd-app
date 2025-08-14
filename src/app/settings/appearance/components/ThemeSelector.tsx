import React from 'react'
import ThemeCard from './ThemeCard'

interface ThemeSelectorProps {
  selectedTheme: 'light' | 'dark' | 'auto'
  onThemeChange: (theme: 'light' | 'dark' | 'auto') => void
}

export default function ThemeSelector({ selectedTheme, onThemeChange }: ThemeSelectorProps) {
  const themes = [
    {
      key: 'light' as const,
      title: 'Light',
      subtitle: 'Bright and clean',
      iconSrc: '/icons/theme_light.svg'
    },
    {
      key: 'dark' as const,
      title: 'Dark',
      subtitle: 'Easy on the eyes',
      iconSrc: '/icons/theme_dark.svg'
    },
    {
      key: 'auto' as const,
      title: 'Auto',
      subtitle: 'Follow system',
      iconSrc: '/icons/theme_auto.svg'
    }
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px'
    }}>
      {themes.map((theme) => (
        <ThemeCard
          key={theme.key}
          theme={theme.key}
          title={theme.title}
          subtitle={theme.subtitle}
          iconSrc={theme.iconSrc}
          isSelected={selectedTheme === theme.key}
          onSelect={() => onThemeChange(theme.key)}
        />
      ))}
    </div>
  )
}