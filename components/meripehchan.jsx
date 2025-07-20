import { Check, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function WorkerIdentityCard() {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header with worker images */}
      <div className="bg-amber-900 p-4">
        <div className="flex mb-4">
          <div className="aspect-square overflow-hidden w-1/3">
            <img
              src="/c2.jpg"
              alt="Farmer worker"
              
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden  w-1/3">
            <img
              src="/c3.png"
              alt="Construction worker"
              
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden  w-1/3">
            <img
              src="/c4.png"
              alt="Delivery worker"
              
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center text-white mt-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            मेरा काम मेरी पहचान
          </h1>
          <p className="text-lg md:text-xl font-semibold">
            समाज के मेहनती सितारों की सच्ची कहानियाँ
          </p>
        </div>
      </div>

      {/* Middle section */}
      <div className="bg-amber-50 p-6 text-center" style={{backgroundImage:`url('/br1.png')`}}>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          अब आपकी मेहनत को मिलेगी
          <br />
          असली पहचान !
        </h2>
        <p className="text-lg font-semibold text-gray-700 leading-relaxed">
          कोई भी काम छोटा नहीं होता - आपकी लगन और संघर्ष की कहानी
          <br />
          अब पहुंचेगी पूरे समाज तक ।
        </p>
      </div>

      {/* Information sections */}
      <div className="grid md:grid-cols-2 gap-0 bg-gradient-to-bl from-amber-700 to-amber-900">
        {/* Left section */}
        <div className=" text-white p-6">
          <h3 className="text-xl font-bold mb-4">भेजें ये जानकारी:</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span className="text-lg">नाम</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span className="text-lg">पिता का नाम</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span className="text-lg">मोबाइल नंबर</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span className="text-lg">व्हाट्सऐप नंबर</span>
            </div>
           
          </div>
        </div>

        {/* Right section */}
        <div className=" text-white p-6">
          <h3 className="text-xl font-bold mb-4 p-3"></h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span className="text-lg">1-2 फोटो</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 flex-shrink-0 mt-1" />
              <span className="text-lg leading-tight">
                एक छोटी सी मेहनत भरी कहानी
              
                जो समाज के लिए प्रेरणा हैं
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 flex-shrink-0 mt-1" />
              <span className="text-lg leading-tight">
                एक काम करते हुए वीडियो
                <br />
                (अगर हो तो)
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* WhatsApp contact section */}
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaWhatsapp className="w-8 h-8" />
            <span className="text-2xl font-bold">7747074810</span>
          </div>
          <div className=" max-h-12 max-w-12">
           <img src="/logo1.png" alt="" className="rounded-full"/>
          </div>
        </div>
      </div>
    </div>
  );
}
