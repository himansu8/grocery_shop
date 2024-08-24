import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Components/layout/Layout';
import { ShieldCheckIcon, LockClosedIcon, TruckIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import useProducts from '../hooks/useproducts';
import Spinner from '../Components/Spinner';
import ProductCard from '../Components/layout/ProductCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} btn bg-green p-2 rounded-full z-50`}
      style={{
        ...style,
        display: "block",
        top: "50%",
        transform: "translateY(-50%)",
        marginLeft: "10px"
      }}
      onClick={onClick}
    >
      <FaAngleRight className="h-8 w-8 p-1 text-white" />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} btn bg-gray-400 p-2 rounded-full z-50`}
      style={{
        ...style,
        display: "block",
        top: "50%",
        transform: "translateY(-50%)",
        marginRight: "10px"
      }}
      onClick={onClick}
    >
      <FaAngleLeft className="h-8 w-8 p-1 text-white" />
    </div>
  );
};

function Home() {
  const topRatedSlider = useRef(null);
  const popularSlider = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const products = useProducts();


  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };

  const popularSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
          <div className='hidden md:flex flex-wrap justify-center gap-4 mt-0'>
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
          <div className='mt-12'>
            <div className='flex items-center justify-between mb-6 px-4'>
              <h2 className='text-3xl font-bold'>Top Rated Products</h2>
              <div className='flex space-x-4'>
                <button onClick={() => topRatedSlider?.current?.slickPrev()} className="btn bg-gray-400 p-2 rounded-full">
                  <FaAngleLeft className="h-8 w-8 p-1 text-white" />
                </button>
                <button className="bg-green btn p-2 rounded-full" onClick={() => topRatedSlider?.current?.slickNext()}>
                  <FaAngleRight className="h-8 w-8 p-1 text-white" />
                </button>
              </div>
            </div>
            <Slider ref={topRatedSlider} {...sliderSettings} className="overflow-hidden mt-10 space-x-5">
              {products
                ?.filter(product => product.rating >= 0)
                .map(product => (
                  <div key={product.id}>
                    <ProductCard product={product} basePath="/single" />
                  </div>
                ))}
            </Slider>
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className='flex justify-center items-center py-24'>
              <Spinner />
            </div>
          ) : (
            <>
              {/* Popular Categories Section */}
              <div className='mt-12 mb-8 '>
                <div className='flex items-center justify-between mb-6 px-4'>
                  <h2 className='text-3xl font-bold'>Popular Categories</h2>
                  <div className='flex space-x-4'>
                    <button onClick={() => popularSlider?.current?.slickPrev()} className="btn bg-gray-400 p-2 rounded-full">
                      <FaAngleLeft className="h-8 w-8 p-1 text-white" />
                    </button>
                    <button className="bg-green btn p-2 rounded-full" onClick={() => popularSlider?.current?.slickNext()}>
                      <FaAngleRight className="h-8 w-8 p-1 text-white" />
                    </button>
                  </div>
                </div>
                <Slider ref={popularSlider} {...popularSliderSettings} className="overflow-hidden mt-10 space-x-5  ">
                  {products
                    ?.filter(product => product.category)
                    .map(product => (
                      <div key={product.id}>
                        <ProductCard product={product} basePath="/single" />
                      </div>
                    ))}
                </Slider>
              </div>
            </>
          )}

          {/* Brand Feature Section */}
          <div className='mt-16 mb-8'>
  <h2 className='text-3xl font-bold mb-6 px-4'>Our Brand Partners</h2>
  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4'>
    {brandLogos.map(brand => (
      <div key={brand.id} className='w-full h-44 flex items-center justify-center p-4 bg-white rounded-lg shadow'>
        <img src={brand.src} alt={brand.alt} className='max-w-full max-h-full object-contain' />
      </div>
    ))}
  </div>
</div>

        </div>
      </Layout>
    </div>
  );
}

export default Home;
