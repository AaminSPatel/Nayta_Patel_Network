'use client'
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import Head from 'next/head';

const WhatsAppGroupButton = () => {

  return (
    <>
      {/* SEO Meta Tags for WhatsApp Sharing */}
      <Head>
        <meta property="og:title" content="Join Our Nayta Patel Network WhatsApp Group" />
        <meta 
          property="og:description" 
          content="Connect with the Nayta Patel Network community. Share updates, discuss events, and network with members." 
        />
        <meta property="og:url" content={'https://chat.whatsapp.com/IABp5obYWKEIMcHLVTDkNs'} />
        <meta property="og:type" content="website" />
      </Head>

      {/* Fixed Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
        className="fixed bottom-6 right-6 z-50 sm:h-12 sm:w-12 h-10 w-10"
      >
        <a
          href={'https://chat.whatsapp.com/IABp5obYWKEIMcHLVTDkNs'}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Join Nayta Patel WhatsApp Group"
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold sm:py-3 sm:px-4 p-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaWhatsapp className="text-2xl" />
          </motion.div>
          <span className="hidden sm:inline-block">Join Group</span>
        </a>
      </motion.div>
    </>
  );
};

export default WhatsAppGroupButton;