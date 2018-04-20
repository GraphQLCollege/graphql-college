import React from 'react'

const Triangle = ({ direction, height = '500', width = '500', style }) => (
  <svg
    viewBox="0 0 500 500"
    style={{
      transform: `rotate(${direction === 'right' ? '90' : '-90'}deg)`,
      ...style,
    }}
  >
    <polygon
      fill="rgb(229, 53, 171)"
      points="250,60 100,400 400,400"
      class="triangle"
    />
    {direction === 'right' ? '>' : '<'}
  </svg>
)

export default Triangle
