import React from 'react'
import Layout from '../Components/layout/Layout'
import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <>
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-screen py-8">
                    <h1 className="text-8xl font-bold">404</h1>
                    <h2 className="font-normal text-2xl mt-4">Oops! Page Not Found</h2>
                    <Link to="/" className="mt-4 px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors duration-300">
                        Go Back
                    </Link>
                </div>
            </Layout>
        </>
    )
}

export default PageNotFound