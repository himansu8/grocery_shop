import React from 'react';
import Layout from '../Components/layout/Layout';


function About() {
  return (
    <Layout title={"About Us - Grocery App"}>
      <div className="flex items-center justify-center min-h-screen mt-12">
        <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 py-12 flex items-center justify-center">
          <div className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="md:w-1/2  my-auto">
              <img
                src="/about.jpeg"
                alt="About Us"
                className="w-full h-full object-cover "
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-12 text-justify " >
              <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left mb-6">
                About Us
              </h1>
              <p className="text-gray-600 leading-relaxed ">
                Welcome to Merakirana App, your one-stop solution for all your grocery needs! We are dedicated to providing you with the freshest produce, high-quality products, and the best prices right at your fingertips.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Our mission is to make grocery shopping as convenient and enjoyable as possible. Whether you're looking for daily essentials, exotic ingredients, or just some special treats, we have you covered. With our easy-to-use platform, you can browse a wide range of products, compare prices, and have everything delivered straight to your door.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                At Grocery App, we value your satisfaction and strive to offer exceptional service. Our team is committed to ensuring that you have a seamless shopping experience, from placing your order to receiving it at your doorstep. Thank you for choosing us as your grocery partner. We look forward to serving you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
