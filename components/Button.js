import React from 'react'

class Button extends React.Component {
  render() {
    const { children, style, ...props } = this.props
    return (
      <button
        style={{
          backgroundColor: '#e535ab',
          color: 'white',
          borderRadius: 30,
          padding: 15,
          textTransform: 'uppercase',
          cursor: 'pointer',
          border: 'none',
          ...style
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
}

export default Button
