import React from 'react';
import Layout from '../Components/layout/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi';
import { FaWhatsapp } from 'react-icons/fa';

function Contact() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen lg:mt-12 mt-14">
        <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 py-12 flex items-center justify-center">
          <div className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="md:w-1/2">
              <img
                src="/contactus.jpeg"
                alt="Contact Us"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 rounded p-6 md:p-8">
              <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left mb-6 ">
                Contact Us
              </h1>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Have a question or need more information about our products? Feel free to reach out to us anytime. We're available 24/7 to assist you.
              </p>
              <div className="space-y-4">
                <p className="flex items-center text-gray-700">
                  <BiMailSend className="text-2xl text-blue-500 mr-3" />
                  <a href="mailto:mohammed.jaweed@merakirana.com" className="hover:underline">
                    mohammed.jaweed@merakirana.com
                  </a>
                </p>
                <p className="flex items-center text-gray-700">
                  <BiPhoneCall className="text-2xl text-green mr-3" />
                  <a href="tel:0123456789" className="hover:underline">
                    9052273317
                  </a>
                </p>
                <p className="flex items-center text-gray-700">
                  <BiSupport className="text-2xl text-red mr-3" />
                  <a href="tel:18000000000" className="hover:underline">
                    1800-0000-0000 (toll free)
                  </a>
                </p>
                <p className="flex items-center text-gray-700">
                  <FaWhatsapp className="text-2xl text-green-600 mr-3" />
                  <a href="https://wa.me/9052273317" className="hover:underline" target="_blank">
                    Chat with us on WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
