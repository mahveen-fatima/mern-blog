import React from 'react'

function Footer() {
  return (
    <footer className="border-t border-gray-600 bg-bgColor text-textColor">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-4 text-sm">
      &copy; {new Date().getFullYear()} Blog. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer