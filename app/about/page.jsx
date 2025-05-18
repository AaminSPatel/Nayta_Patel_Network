"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaUsers,
  FaHandshake,
  FaGraduationCap,
  FaLeaf,
  FaChartLine,
  FaHeart,
} from "react-icons/fa";
import { usePatel } from "../../components/patelContext";
import Head from "next/head";

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      name: "Imran Khan",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Former agricultural scientist with 15 years of experience in rural development projects.",
    },
    {
      name: "Fatima Begum",
      role: "Community Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Rural education advocate with deep connections to women's self-help groups across the region.",
    },
    {
      name: "Abdul Hameed",
      role: "Agricultural Expert",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Agricultural engineer specializing in sustainable farming techniques and water conservation.",
    },
    {
      name: "Zainab Khatoon",
      role: "Education Lead",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Former teacher dedicated to bringing quality education and digital literacy to rural areas.",
    },
  ];

  // Values data
 const values = [
  {
    icon: FaUsers,
    title: "Community First",
    description: "हम समाज-आधारित परिवर्तन और सामूहिक ज्ञान की शक्ति में विश्वास रखते हैं।",
  },
  {
    icon: FaHandshake,
    title: "Transparency",
    description: "हम अपने सभी कार्यों, निर्णयों और मूल्य निर्धारण में पूर्ण पारदर्शिता बनाए रखते हैं।",
  },
  {
    icon: FaGraduationCap,
    title: "Education",
    description: "हम ज्ञान और सीख को स्थायी विकास की नींव मानते हैं।",
  },
  {
    icon: FaLeaf,
    title: "Sustainability",
    description: "हम अपने सभी प्रयासों में पर्यावरण के प्रति जिम्मेदार और टिकाऊ तरीकों को बढ़ावा देते हैं।",
  },
  {
    icon: FaChartLine,
    title: "Economic Empowerment",
    description: "हम नायता पटेल समाज को न्यायसंगत बाज़ार और आर्थिक अवसर प्रदान करने के लिए कार्यरत हैं।",
  },
  {
    icon: FaHeart,
    title: "Inclusivity",
    description: "हमारा प्लेटफ़ॉर्म हर सदस्य के लिए सुलभ और लाभकारी है — सभी को साथ लेकर चलना ही हमारा उद्देश्य है।",
  },
];


  const { siteUrl } = usePatel();
  return (
    <div className="container mx-auto px-4 py-12">
      <Head>
        <title>
          About Us | Nayta Patel Samaj & Rural Upliftment in Madhya Pradesh
        </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index, follow" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#4CAF50" />
        <meta
          name="description"
          content="Learn about the Nayta Patel Samaj initiative focused on farming, milk production, mandi price updates, and empowering over 250 villages in Indore, Ujjain, Dhar, Dewas, and Ratlam."
        />
        <meta
          name="keywords"
          content="about Nayta Patel, rural development, agriculture, milk production, village upliftment, community building, Indore, Ujjain, Dhar, Dewas, Ratlam, MP villages,nayata samaj vikas, nayata patel samaj."
        />
        <meta name="author" content="Nayta Patel Network" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/about`} />
        <meta
          property="og:title"
          content="About Us | Nayta Patel Samaj & Rural Upliftment in Madhya Pradesh"
        />
        <meta
          property="og:description"
          content="Know more about our work in farming, mandi prices, and rural awareness across MP's villages."
        />
        <meta property="og:image" content={`${siteUrl}/about.jpg`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${siteUrl}/about`} />
        <meta
          name="twitter:title"
          content="About Us | Nayta Patel Community & Village Empowerment"
        />
        <meta
          name="twitter:description"
          content="Empowering 250+ villages with updated mandi rates, farming knowledge, and rural development programs."
        />
        <meta name="twitter:image" content={`${siteUrl}/about.jpg`} />

        {/* Canonical URL */}
        <link rel="canonical" href={`${siteUrl}/about`} />

        {/* Favicon */}
        <link rel="icon" href={`${siteUrl}/favicon.ico`} />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">About Apna Gaon Network</h1>
        <p className="text-gray-600 mb-8">
          Learn about our mission, vision, and the team behind Apna Gaon
          Network.
        </p>

        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">
              {/* Our Mission */} हमारा उद्देश्य है
            </h2>
            <p className="text-gray-700 mb-4">
              {/* To empower rural Muslim communities through digital connectivity, knowledge sharing, and fair market
              access, enabling sustainable economic growth and social development. */}
              नायता पटेल समाज को डिजिटल जुड़ाव, सच्ची जानकारी के आदान-प्रदान और
              न्यायसंगत बाज़ार पहुंच के माध्यम से सशक्त बनाना। हमारा सपना है कि
              समाज के हर किसान, हर युवा और हर परिवार को अपने विकास के समान अवसर
              मिलें – जहाँ आर्थिक तरक्की, शैक्षिक समृद्धि, और सामाजिक एकता एक
              साथ कदम बढ़ाएं।
            </p>
            <p className="text-gray-700">
              {/* We aim to bridge the digital divide, provide accurate information on fair prices, and create a supportive
              community platform where members can learn, share, and grow together. */}
              हम एक ऐसे भविष्य की कल्पना करते हैं जहाँ ग्रामीण समाज डिजिटल रूप
              से मजबूत, आर्थिक रूप से आत्मनिर्भर और सामाजिक रूप से एक-दूसरे से
              जुड़े हुए हों। एक ऐसा समाज जहाँ हर हाथ को काम मिले, हर बच्चे को
              शिक्षा और हर किसान को उसकी मेहनत का उचित मूल्य।
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">{/* Our Vision */} हमारा विज़न </h2>
            <p className="text-gray-700 mb-4">
              {/* A future where rural communities are digitally empowered, economically self-sufficient, and socially
              connected, with equal access to opportunities and resources. */}
              हम चाहते हैं कि नायता पटेल समाज की परंपरागत समझदारी और आधुनिक
              नवाचार एक साथ मिलकर एक नई सोच, एक नई दिशा दें। हमारा लक्ष्य है एक
              ऐसा मंच बनाना जहाँ:
            </p>
            <p className="text-gray-700 whitespace-pre-line">
              {/*  We envision vibrant rural economies where farmers receive fair prices, youth have access to quality
              education, and traditional knowledge is preserved while embracing modern innovations. */}
              किसानों को सही और ताज़ा भाव की जानकारी मिले, युवा पीढ़ी को
              गुणवत्ता वाली शिक्षा तक पहुँच हो, महिलाएं आत्मनिर्भर बनें, और पूरा
              समाज मिलकर सीखने, साझा करने और साथ आगे बढ़ने की संस्कृति अपनाए।
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Story</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <div className="relative h-64 md:h-full">
                  <Image
                    src="/prices.avif"
                    alt="Apna Gaon community members"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <p className="text-gray-700 mb-4 hidden">
                  {/* Apna Gaon Network began in 2020 when a group of concerned individuals witnessed the challenges faced
                  by rural Muslim farming communities during the pandemic. With markets disrupted and information
                  scarce, farmers were selling their produce at unfair prices and struggling to access essential
                  resources. */}
                  2020 में जब महामारी ने ग्रामीण मुस्लिम समाज को गहरे संकट में
                  डाल दिया था, उस समय एक छोटे से व्हाट्सऐप ग्रुप से हमने शुरुआत
                  की। किसानों को बाज़ार के सही भाव तक पहुँच नहीं थी, और
                  बिचौलियों के कारण उन्हें नुकसान हो रहा था। हमने रोज़ाना के भाव
                  साझा करना शुरू किया और धीरे-धीरे यह एक डिजिटल सामुदायिक अभियान
                  बन गया।{" "}
                </p>
                
               
                <p className="text-gray-700 mb-4">
                  {/* What started as a WhatsApp group sharing daily market prices soon evolved into a comprehensive
                  community platform. We began organizing training sessions on farming techniques, creating women's
                  self-help groups, and establishing direct connections between farmers an creating women's self-help
                  groups, and establishing direct connections between farmers and urban consumers. */}
                  हमने 2024 में एक साधारण वेबसाइट के ज़रिए केवल मंडी भाव दिखाने
                  की सेवा शुरू की थी। लेकिन समाज के भरोसे, जुड़ाव और ज़रूरत ने
                  इसे एक व्यापक मंच में बदल दिया। आज, 500+ सदस्य हमारे साथ हैं –
                  और यह संख्या हर दिन बढ़ रही है। यह सिर्फ आंकड़ा नहीं, यह
                  भरोसे, सेवा और अपनेपन की जीत है।
                </p>
                 <p className="text-gray-700 mb-4">
                  {/* Apna Gaon Network began in 2020 when a group of concerned individuals witnessed the challenges faced
                  by rural Muslim farming communities during the pandemic. With markets disrupted and information
                  scarce, farmers were selling their produce at unfair prices and struggling to access essential
                  resources. */}
                  आज, <span className="text-emerald-400 font-semibold">"नायता पटेल नेटवर्क"</span>  नायता पटेल समाज के हज़ारों सदस्यों को
                  जोड़ रहा है, जो अलग-अलग गाँवों में रहते हैं। यह मंच एक डिजिटल
                  परिवार की तरह है – जहाँ हर सदस्य जानकारी पाता है, सीखता है और
                  समाज को आगे ले जाने में भागीदार बनता है।
                </p>
                <p className="text-gray-700">
                  {/*   Today, Apna Gaon Network serves thousands of community members across multiple villages, providing a
                  digital platform for information sharing, education, market access, and community support. Our journey
                  continues as we expand our reach and deepen our impact, always guided by our core values and the needs
                  of our community. */}
                  हमारी राह में कई चुनौतियाँ हैं, लेकिन हमारा संकल्प अडिग है।
                  नायता पटेल समाज के हर सदस्य के जीवन में बदलाव लाना ही हमारा
                  लक्ष्य है। आइए, जुड़िए इस डिजिटल परिवार से – ताकि हम सब मिलकर
                  बना सकें एक मजबूत, शिक्षित और आत्मनिर्भर समाज।
                </p>{" "}
                <p className="text-gray-700">
                  {/*   Today, Apna Gaon Network serves thousands of community members across multiple villages, providing a
                  digital platform for information sharing, education, market access, and community support. Our journey
                  continues as we expand our reach and deepen our impact, always guided by our core values and the needs
                  of our community. */}
                </p>{" "}
                <p className="text-gray-700">
                  {/*   Today, Apna Gaon Network serves thousands of community members across multiple villages, providing a
                  digital platform for information sharing, education, market access, and community support. Our journey
                  continues as we expand our reach and deepen our impact, always guided by our core values and the needs
                  of our community. */}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
       <div className="mb-16">
  <h2 className="text-2xl font-bold mb-6">हमारे मूल सिद्धांत</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {values.map((value, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="flex items-center mb-4">
          <div className="bg-emerald-100 p-3 rounded-full mr-4">
            <value.icon className="text-emerald-500 text-xl" />
          </div>
          <h3 className="text-xl font-bold">{value.title}</h3>
        </div>
        <p className="text-gray-700">
          {value.description || "हम समाज, शिक्षा और तकनीक के माध्यम से नायता पटेल समाज को आगे बढ़ाने के लिए प्रतिबद्ध हैं।"}
        </p>
      </motion.div>
    ))}
  </div>
</div>


       {/*   Our Team 
        <div className="mb-16 ">
          <h2 className="text-2xl font-bold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
 */}
        {/* Impact */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Impact</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  500+
                </div>
                <p className="text-gray-700">Community Members</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  25+
                </div>
                <p className="text-gray-700">Villages Connected</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  1000+
                </div>
                <p className="text-gray-700">Daily Visitors</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
             हमारी शुरुआत से अब तक,
हमने 500 से अधिक किसानों को उनकी उपज के लिए उचित मूल्य दिलवाने में मदद की है,
15 महिला स्वयं सहायता समूह (Self-Help Groups) बनाए हैं,
1,000+ युवाओं को डिजिटल साक्षरता का प्रशिक्षण दिया है
और 200 बच्चों को शिक्षा के लिए छात्रवृत्तियाँ उपलब्ध करवाई हैं।
            </p>
            <p className="text-gray-700">
             हमारे डिजिटल बाज़ार (Marketplace) ने किसानों को सीधे उपभोक्ताओं से जोड़ने का रास्ता दिया है,
जिससे बिचौलियों की भूमिका खत्म हुई और किसानों की आमदनी में औसतन 30% की बढ़ोतरी हुई है।

हमारी Community Wall के माध्यम से जानकारी साझा करने की प्रेरणा से
खेती की तकनीकों में सुधार हुआ है, और पूरे नेटवर्क में उत्पादन में उल्लेखनीय वृद्धि देखी गई है।
            </p>
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="bg-emerald-50 rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-2xl font-bold mb-2">Join Our Mission</h3>
              <p className="text-gray-600">
                Be part of our growing community and help us build a stronger,
                more connected rural network.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-md transition-colors whitespace-nowrap">
                  Become a Member
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-white border border-emerald-500 text-emerald-500 hover:bg-emerald-50 px-8 py-3 rounded-md transition-colors whitespace-nowrap">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
