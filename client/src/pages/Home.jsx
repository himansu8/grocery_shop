import React from 'react'
import Layout from '../Components/layout/Layout'
import { ShieldCheckIcon, LockClosedIcon, TruckIcon, CreditCardIcon } from '@heroicons/react/24/outline'

function Home() {
  
  return (
    <div>
      <Layout>
        <div className='max-w-screen-2xl container mx-auto xl:px-24 mt-24 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
          <div className=' py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-8 '>
            {/* Banner image div */}
            <div className="md:w-1/2 flex items-center justify-center">
              <img src='/buybanner.png' alt='bannerimg' />
            </div>
            {/* Banner text div */}
            <div className="md:w-1/2 px-4 space-y-7">
              <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                Dive into the Freshness of Quality <span className="text-green">Groceries</span>
              </h2>
              <p className="text-[#4A4A4A] text-xl">
                Where Every Item Reflects Tradition and Quality in Every Selection
              </p>
              <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
                Order Now
              </button>
            </div>
          </div>
          
          {/* Cards section */}
          <div className=' hidden md:flex flex-wrap justify-center gap-4 mt-0 '>
            {/* Card 1 */}
            <div className='bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 '>
              <ShieldCheckIcon className='text-green h-6 w-6' />
              <div>
                <h3 className='text-lg font-semibold'>Reliable</h3>
                <p className='text-gray-600'>Reliable support on Hotline</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className='bg-white p-6 rounded-lg shadow-md flex items-center space-x-4'>
              <LockClosedIcon className='text-green h-6 w-6' />
              <div>
                <h3 className='text-lg font-semibold'>Secure</h3>
                <p className='text-gray-600'>Certified marketplace since 2010</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className='bg-white p-6 rounded-lg shadow-md flex items-center space-x-4'>
              <TruckIcon className='text-green h-6 w-6' />
              <div>
                <h3 className='text-lg font-semibold'>Shipping</h3>
                <p className='text-gray-600'>Shipping all over India</p>
              </div>
            </div>
            {/* Card 4 */}
            <div className='bg-white p-6 rounded-lg shadow-md flex items-center space-x-4'>
              <CreditCardIcon className='text-green h-6 w-6' />
              <div>
                <h3 className='text-lg font-semibold'>Payment</h3>
                <p className='text-gray-600'>Safe and secure payments</p>
              </div>
            </div>
          </div>
        </div>


      </Layout>
    </div>
  )
}

export default Home
