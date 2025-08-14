import React from 'react'

interface SuggestionFrequencySliderProps {
  value: 'minimal' | 'balanced' | 'frequent'
  onChange: (value: 'minimal' | 'balanced' | 'frequent') => void
}

export default function SuggestionFrequencySlider({ value, onChange }: SuggestionFrequencySliderProps) {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderValue = parseInt(e.target.value)
    if (sliderValue === 0) onChange('minimal')
    else if (sliderValue === 1) onChange('balanced')
    else onChange('frequent')
  }

  const getSliderValue = () => {
    if (value === 'minimal') return 0
    if (value === 'balanced') return 1
    return 2
  }

  return (
    <div 
      style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #e2e2e2',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '8px',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#2847ef'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e2e2e2'
        e.currentTarget.style.transform = 'translateY(0px)'
      }}
    >
      <h3 style={{
        color: '#4c4c4c',
        fontSize: '16px',
        fontWeight: 500,
        margin: 0,
        marginBottom: '4px'
      }}>
        Suggestion Frequency
      </h3>
      
      <p style={{
        color: '#a5a5a5',
        fontSize: '14px',
        fontWeight: 400,
        margin: 0,
        marginBottom: '18px'
      }}>
        How often should Kai offer help?
      </p>

      {/* Slider */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <input
          type="range"
          min="0"
          max="2"
          step="1"
          value={getSliderValue()}
          onChange={handleSliderChange}
          style={{
            width: '100%',
            height: '6px',
            background: '#e2e2e2',
            borderRadius: '3px',
            outline: 'none',
            appearance: 'none',
            WebkitAppearance: 'none'
          }}
          className="slider"
        />
        
        {/* Custom slider styles */}
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            background: #2847ef;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #2847ef;
            border-radius: 50%;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
        `}</style>
      </div>

      {/* Labels */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{
          color: value === 'minimal' ? '#2847ef' : '#a5a5a5',
          fontSize: '12px',
          fontWeight: 400
        }}>
          Minimal
        </span>
        <span style={{
          color: value === 'balanced' ? '#2847ef' : '#a5a5a5',
          fontSize: '12px',
          fontWeight: 400
        }}>
          Balanced
        </span>
        <span style={{
          color: value === 'frequent' ? '#2847ef' : '#a5a5a5',
          fontSize: '12px',
          fontWeight: 400
        }}>
          Frequent
        </span>
      </div>
    </div>
  )
}