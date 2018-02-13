import React from 'react'

class Button extends React.Component {
  render() {
    const { children, props } = this.props
    return (
      <button
        style={{
          backgroundColor: '#e535ab',
          color: 'white',
          borderRadius: 30,
          padding: 15,
          textTransform: 'uppercase',
          fontWeight: 800,
          cursor: 'pointer',
          border: 'none',
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
}

export default Button
