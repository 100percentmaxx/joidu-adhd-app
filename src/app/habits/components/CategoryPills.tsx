'use client'

import React from 'react'
import { CategoryType, CATEGORY_CONFIGS } from '@/types/habits'

interface CategoryPillsProps {
  selectedCategory?: CategoryType
  onSelect: (category: CategoryType) => void
}

export default function CategoryPills({ selectedCategory, onSelect }: CategoryPillsProps) {
  const categories: CategoryType[] = ['work', 'health', 'personal', 'social', 'creative', 'finance']

  return (
    <div>
      {/* Label */}
      <label style={{
        fontSize: '16px',
        fontWeight: 500,
        color: '#4c4c4c',
        display: 'block',
        marginBottom: '12px'
      }}>
        Category
      </label>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '12px',
        marginBottom: '18px'
      }}>
        {categories.map((category) => {
          const config = CATEGORY_CONFIGS[category]
          const isSelected = selectedCategory === category
          
          return (
            <button
              key={category}
              onClick={() => onSelect(category)}
              style={{
                height: '40px',
                backgroundColor: config.lightColor,
                border: isSelected ? '2px solid #2847ef' : 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingLeft: '12px',
                paddingRight: '12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <img 
                src={`/icons/${config.icon}`}
                alt={config.name}
                style={{ width: '24px', height: '24px', flexShrink: 0 }}
              />
              <span style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#FFFFFF',
                textAlign: 'left',
                flex: 1
              }}>
                {config.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}