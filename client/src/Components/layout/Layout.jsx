import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({children}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div className='flex flex-col relative z-10 '>
        <Header className="mb-4 md:mb-0"/>
        <Navbar />
        </div>
               <main className='min-h-screen'>
            {children}
        </main>
        <Footer/>
    </div>
  )
}

export default Layout