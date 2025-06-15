"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import { usePatel } from "../../components/patelContext";
import Head from "next/head";
import { Suspense } from 'react';

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading contact form...</div>}>
      <ContactContent />
    </Suspense>
  );
}
 function ContactContent() {
  const { siteUrl, path } = usePatel();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create FormData object
      /*  const formDataToSend = new FormData();
      // Append all fields including the image file
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email',formData.email);
      formDataToSend.append('mobile', formData.mobile);
      formDataToSend.append('message', formData.message);
console.log(formDataToSend); */

      const response = await fetch(path + "/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 201) {
        // console.log(response);
      }
    } catch (err) {
      console.error("Error creating feedback:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create Feedback"
      );
    } finally {
      setLoading(false);
      setFormStatus("success");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Head>
        <title>
          Contact Us | Connect for Farming Support & Village Development
        </title>
        <meta name="robots" content="index, follow" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="description"
          content="Reach out to the Nayta Patel Samaj team for any queries about farming help, mandi price updates, or community programs in your village."
        />
        <meta
          name="keywords"
          content="contact, reach Nayta Patel, farming support, mandi prices, community help, Indore, Ujjain, Dewas, Dhar, Ratlam, agriculture assistance"
        />
        <meta name="author" content="Nayta Patel Community" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/contact`} />
        <meta
          property="og:title"
          content="Contact Us | Connect for Farming Support & Village Development"
        />
        <meta
          property="og:description"
          content="We’re here to help farmers and communities in MP. Get in touch with us today!"
        />
        <meta property="og:image" content={`${siteUrl}/contact.jpg`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${siteUrl}/contact`} />
        <meta
          name="twitter:title"
          content="Contact Us | Farming Help & Rural Empowerment"
        />
        <meta
          name="twitter:description"
          content="Connect with Nayta Patel Samaj for farming support, price queries, or village development help."
        />
        <meta name="twitter:image" content={`${siteUrl}/contact.jpg`} />

        {/* Canonical URL */}
        <link rel="canonical" href={`${siteUrl}/contact`} />

        {/* Favicon */}
        <link rel="icon" href={`${siteUrl}/favicon.ico`} />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="text-center mb-12"
        >
          <motion.h2
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              },
            }}
            className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4"
          >
            संपर्क करें
          </motion.h2>
          <motion.p
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              },
            }}
            className="text-lg text-gray-700"
          >
            क्या आपके कोई सवाल या सुझाव हैं? हम आपकी आवाज सुनना चाहते हैं! नीचे
            दिए गए किसी भी तरीके से हमारी टीम से संपर्क करें।
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Office Address</h3>
                    <p className="text-gray-600">
                      Nayta Patel Network
                      <br />
                      No Any Office
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <FaPhoneAlt className="text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-600">
                      <a
                        href="tel:+917747074841"
                        className="hover:text-emerald-500"
                      >
                        +91 7747 074 841
                      </a>
                      <br />
                      <span className="text-sm">
                        (Monday to Saturday, 4PM to 6PM)
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a
                        href="mailto:naytapatelnetwork@gmail.com"
                        className="hover:text-emerald-500"
                      >
                        naytapatelnetwork@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <FaWhatsapp className="text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">WhatsApp</h3>
                    <p className="text-gray-600">
                      <a
                        href="https://wa.me/917747074841"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-emerald-500"
                      >
                        +91 7747 074 841
                      </a>
                      <br />
                      <span className="text-sm">
                        (For quick queries and support)
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-medium mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://wa.me/917747074841"
                    className="bg-emerald-100 p-3 rounded-full text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href="#"
                    className="bg-emerald-100 p-3 rounded-full text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="#"
                    className="bg-emerald-100 p-3 rounded-full text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Send Us a Message
              </h2>

              {formStatus === "success" && (
                <div className="bg-green-100 border-l-4 border-green-400 text-green-700 px-6 py-4 rounded-md mb-6">
                  <p>
                    आपका संदेश मिल गया है! हम जल्द ही आपसे संपर्क करेंगे। हमारी
                    टीम आपकी हर जरूरत का ध्यान रखेगी।
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 p-4 transition-all duration-200 ease-in-out"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 p-4 transition-all duration-200 ease-in-out"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 p-4 transition-all duration-200 ease-in-out"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 p-4 transition-all duration-200 ease-in-out"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white hidden rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-xl font-bold mb-6">Find Us</h2>
          <div className="h-96 bg-gray-200 rounded-lg">
            {/* In a real app, you would embed a Google Map or similar here */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <p>Map Embed Would Go Here</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">अकसर पूछे जाने वाले सवाल</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2">
                मैं नायता पटेल नेटवर्क से कैसे जुड़ सकता हूँ?
              </h3>
              <p className="text-gray-700">
                आप हमारे होमपेज पर मौजूद "Join Now" बटन पर क्लिक करके या
                रजिस्ट्रेशन पेज पर जाकर आसानी से जुड़ सकते हैं। पंजीकरण पूरी तरह
                निःशुल्क और सरल है।
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">
                क्या सदस्य बनने के लिए कोई शुल्क देना होता है?
              </h3>
              <p className="text-gray-700">
                नहीं, नायता पटेल नेटवर्क से जुड़ना पूरी तरह से मुफ्त है। हमारा
                उद्देश्य है कि हर समाज के सदस्य को समान और सरल संसाधन उपलब्ध
                हों।
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">
                मंडी भाव कितनी बार अपडेट किए जाते हैं?
              </h3>
              <p className="text-gray-700">
                मंडी भाव हर दिन सुबह और शाम को अपडेट किए जाते हैं, ताकि आपको
                सबसे सटीक और ताज़ा जानकारी मिल सके।
              </p>
            </div>

            <div className="hidden">
              <h3 className="font-bold mb-2 ">
                क्या मैं अपने उत्पाद नायता पटेल नेटवर्क पर बेच सकता हूँ?
              </h3>
              <p className="text-gray-700">
                हाँ, पंजीकृत सदस्य अपने कृषि उत्पाद, पशुधन या खेती से जुड़ी
                सामग्री को हमारे ऑनलाइन बाज़ार में मुफ्त में लिस्ट कर सकते हैं।
                आप अपने अकाउंट डैशबोर्ड से इन लिस्टिंग्स को आसानी से प्रबंधित कर
                सकते हैं।
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">
                क्या मैं भी इस प्लेटफॉर्म पर कुछ जानकारी साझा कर सकता हूँ?
              </h3>
              <p className="text-gray-700">
                बिल्कुल! आप अपने अनुभव, सफलता की कहानियाँ और ज्ञान हमारी
                कम्युनिटी वॉल पर साझा कर सकते हैं। यदि आप शैक्षिक जानकारी या
                ब्लॉग लेख साझा करना चाहते हैं, तो कृपया हमारी कंटेंट टीम से
                संपर्क करें:{" "}
                <a
                  href="mailto:naytapatelnetwork@gmail.com"
                  className="text-emerald-600 underline"
                >
                  naytapatelnetwork@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
        {/*  <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2">How can I join Apna Gaon Network?</h3>
              <p className="text-gray-700">
                You can join our network by clicking on the "Join Now" button on our homepage or visiting the signup
                page. The registration process is simple and free.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Is there a membership fee?</h3>
              <p className="text-gray-700">
                No, joining Apna Gaon Network is completely free. We believe in providing accessible resources to all
                community members.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">How often are the market prices updated?</h3>
              <p className="text-gray-700">
                Market prices are updated daily, usually in the morning and evening, to reflect the most current rates
                across different markets.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Can I sell my products through Apna Gaon Network?</h3>
              <p className="text-gray-700">
                Yes, registered members can list their agricultural products, livestock, and equipment on our
                marketplace for free. You can manage your listings through your account dashboard.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">How can I contribute content to the platform?</h3>
              <p className="text-gray-700">
                Members can share their knowledge, success stories, and insights through our community wall. If you're
                interested in contributing educational content or blog articles, please contact our content team at
                content@apnagaon.network.
              </p>
            </div>
          </div>
        </div> */}
      </motion.div>
    </div>
  );
}
