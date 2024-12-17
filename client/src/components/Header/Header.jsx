import React from 'react'
import { Container, Logo, LogoutBtn } from '..'
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: "Home", // home page
      slug: "/",
      active: true
    },
    {
      name: "Feed", // all blogs of everyone
      slug: "/feed",
      active: true
    },
    ...(authStatus ? [
      { 
        name: "Create Blog",
        slug: "/api/v1/post/create",
        active: true
      }
    ] : []),
    {
      name: "Login", 
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Sign up",
      slug: "/signup",
      active: !authStatus
    } 
  ]

  return (
    <header className='py-4 shadow-md bg-bgColor text-textColor sticky top-0 z-50 border-b border-gray-600'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='mr-4'>
            <Link to="/">
            <Logo width='70px'/>
            </Link>
          </div>

          <ul className='flex items-center gap-6'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button 
                onClick={() => navigate(item.slug)}
                className='px-4 py-2 text-lg font-medium rounded-3xl hover:bg-btnColor hover:text-black text-textColor transition duration-200'
                >
                  {item.name}
                </button>
              </li>
            ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header