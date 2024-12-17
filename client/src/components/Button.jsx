import React from 'react'

function Button({
    children, // text
    type = 'button',
    bgColor = "bg-btnColor",
    textColor = "text-textColor",
    className = "",
    ...props
    
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button