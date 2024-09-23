import React, { useState, useEffect } from 'react';
import Layout from '../Components/layout/Layout';
import { ShieldCheckIcon, LockClosedIcon, TruckIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import useProducts from '../hooks/useproducts';
import Spinner from '../Components/Spinner';
import ProductCard from '../Components/layout/ProductCard';
import axios from 'axios';
import { toast } from 'react-toastify';

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPageTopRated, setCurrentPageTopRated] = useState(1);
  const [currentPagePopular, setCurrentPagePopular] = useState(1);
  const [itemsPerPage] = useState(10);
  const [recentProducts, setRecentProducts] = useState([]);
  const products = useProducts();

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  // Get the array of slugs from local storage and fetch the recent products
  useEffect(() => {
    const slugs = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    console.log(slugs)
    if (slugs.length > 0) {
      fetchRecentProducts(slugs);
    }
  }, []);


  const fetchRecentProducts = async (slugs) => {
    try {
      const productPromises = slugs.map(slug =>
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/single-product/${slug}`)
      );
      const responses = await Promise.all(productPromises);
      setRecentProducts(responses.map(response => response.data.product));
    } catch (error) {
      toast.error('Failed to fetch recent products');
    }
  };

  // Pagination logic for top rated and popular products
  const indexOfLastProductTopRated = currentPageTopRated * itemsPerPage;
  const indexOfFirstProductTopRated = indexOfLastProductTopRated - itemsPerPage;
  const currentTopRatedProducts = products
    .filter(product => product.rating >= 0)
    .slice(indexOfFirstProductTopRated, indexOfLastProductTopRated);

  const indexOfLastProductPopular = currentPagePopular * itemsPerPage;
  const indexOfFirstProductPopular = indexOfLastProductPopular - itemsPerPage;
  const currentPopularProducts = products
    .filter(product => product.isPopular)
    .slice(indexOfFirstProductPopular, indexOfLastProductPopular);

  const paginateTopRated = (pageNumber) => setCurrentPageTopRated(pageNumber);
  const paginatePopular = (pageNumber) => setCurrentPagePopular(pageNumber);

  const totalPagesTopRated = Math.ceil(products.filter(product => product.rating >= 0).length / itemsPerPage);
  const totalPagesPopular = Math.ceil(products.filter(product => product.isPopular).length / itemsPerPage);

  const brandLogos = [
    { id: 1, src: '/brand/everest.png', alt: 'Brand 1' },
    { id: 2, src: '/brand/freedom.png', alt: 'Brand 2' },
    { id: 3, src: '/brand/gohnson.png', alt: 'Brand 3' },
    { id: 4, src: '/brand/huggiesss.png', alt: 'Brand 4' },
    { id: 5, src: '/brand/mdh.png', alt: 'Brand 5' },
    { id: 6, src: '/brand/pamper.jpg', alt: 'Brand 6' },
    { id: 7, src: '/brand/ruchi.png', alt: 'Brand 7' },
    { id: 8, src: '/brand/surf.jpeg', alt: 'Brand 8' },
    { id: 9, src: '/brand/tide.png', alt: 'Brand 9' },
  ];

  return (
    <div>
      <Layout>
        <div className='max-w-screen-2xl container mx-auto xl:px-24 mt-24 bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]'>


          <div className='py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-8'>
            <div className="md:w-1/2 flex items-center justify-center">
              <img src='/buybanner.png' alt='bannerimg' />
            </div>
            <div className="md:w-1/2 px-4 space-y-7">
              <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                Dive into the Freshness of Quality <span className="text-green">Groceries</span>
              </h2>
              <p className="text-[#4A4A4A] text-xl">
                Where Every Item Reflects Tradition and Quality in Every Selection
              </p>
              <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full"
                onClick={() => navigate("/allproducts")}>
                Order Now
              </button>
            </div>
          </div>

          {/* Cards Section */}
          <div className='hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 px-4'>
            {/* Card 1 */}
            <div className='bg-white p-6 rounded-lg shadow-md flex items-center space-x-4'>
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

          {/* Top Products Section */}
          <div className='mt-12 p-4'>
            <div className='flex items-center justify-between mb-6 px-4'>
              <h2 className='text-3xl font-bold'>Top Rated Products</h2>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-4'>
              {currentTopRatedProducts.map(product => (
                <div key={product.id}>
                  <ProductCard product={product} basePath="/single" />
                </div>
              ))}
            </div>
            {/* Pagination for Top Rated Products */}
            <div className='flex justify-center mt-6'>
              {Array.from({ length: totalPagesTopRated }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginateTopRated(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-full ${currentPageTopRated === index + 1 ? 'bg-green text-white' : 'bg-gray-300'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Categories Section */}
          {currentPopularProducts.length > 0 && (
            <>
              <div className='mt-12 p-4'>
                <div className='flex items-center justify-between mb-6 px-4'>
                  <h2 className='text-3xl font-bold'>Popular Categories</h2>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-4'>
                  {currentPopularProducts.map(product => (
                    <div key={product.id}>
                      <ProductCard product={product} basePath="/single" />
                    </div>
                  ))}
                </div>
                {/* Pagination for Popular Categories */}
                <div className='flex justify-center mt-6'>
                  {Array.from({ length: totalPagesPopular }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => paginatePopular(index + 1)}
                      className={`px-4 py-2 mx-1 rounded-full ${currentPagePopular === index + 1 ? 'bg-green text-white' : 'bg-gray-300'}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          {/* Display Recently Viewed Products if available */}
          {recentProducts.length > 0 && (
            <div className='mt-6 p-4 bg-white shadow-md rounded-lg'>
              <h2 className='text-2xl font-bold'>Recently Viewed Products</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
                {recentProducts.map(product => (
                  <div key={product._id} className='flex items-center space-x-4'>
                    <Link to={`single/products/${product.slug}`}>
                    <img src={`${process.env.REACT_APP_BASE_URL}/api/product/product-photo/${product._id}`} alt={product.name} className='w-24 h-24 object-cover rounded' />
                    </Link>
                    <div>
                    <Link to={`single/products/${product.slug}`}>
                    <h3 className='text-lg font-semibold'>{product.name}</h3>
                    </Link>
                      <p className='text-gray-900'>Price: ₹{product.price}.00</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Brand Logos Section */}
          <div className='my-12 '>
            <h2 className='text-3xl font-bold mb-4'>Brands We Trust</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 '>
              {brandLogos.map(logo => (
                <img key={logo.id} src={logo.src} alt={logo.alt} className='h-24 object-contain mx-auto' />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
