import React, { useState } from 'react'

interface StarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
  size?: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, size = 40 }) => {
  const [hoverRating, setHoverRating] = useState(0)

  const ratingLabels = {
    1: "Needs work",
    2: "Could be better", 
    3: "It's good",
    4: "Really like it",
    5: "Love it!"
  }

  const currentRating = hoverRating || rating
  const currentLabel = currentRating > 0 ? ratingLabels[currentRating as keyof typeof ratingLabels] : ""

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Stars Row */}
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        marginBottom: '16px'
      }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              transition: 'transform 150ms ease-out',
              outline: 'none'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            <svg 
              width={size} 
              height={size} 
              viewBox="0 0 24 24" 
              fill={star <= currentRating ? '#fa772c' : 'none'}
              stroke={star <= currentRating ? '#fa772c' : '#e2e2e2'}
              strokeWidth="2"
            >
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          </button>
        ))}
      </div>

      {/* Rating Label */}
      <div style={{
        color: '#a5a5a5',
        fontSize: '14px',
        fontWeight: 400,
        minHeight: '20px'
      }}>
        {currentLabel}
      </div>
    </div>
  )
}

export default StarRating