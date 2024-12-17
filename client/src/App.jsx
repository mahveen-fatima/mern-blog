import React from 'react'
import { Header, Footer } from "./components/index"
import {Outlet} from "react-router-dom"

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-bgColor text-textColor'>
      {/* <div className='w-full block'> */}
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      {/* </div> */}
    </div>
  )
}

export default App