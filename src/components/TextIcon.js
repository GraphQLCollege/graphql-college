import React from 'react'

const TextIcon = ({ direction, style, ...props }) => (
  <svg
    style={style}
    viewBox="0 0 300 185"
    {...props}
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fill="#E535AB">
        <rect x="0" y="0" width="300" height="25" />
        <rect x="0" y="80" width="300" height="25" />
        <rect x="0" y="160" width="300" height="25" />
      </g>
    </g>
  </svg>
)

export default TextIcon
