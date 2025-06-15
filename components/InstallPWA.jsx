'use client';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react'; // Or any close icon library you prefer

export default function InstallPWA() { 
  
  const [prompt, setPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      setIsVisible(true); // Reset visibility when new prompt comes
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!prompt) return;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setPrompt(null);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Optional: Store in localStorage to prevent showing again
    localStorage.setItem('pwaPromptClosed', 'true');
  };

  if (prompt || !isVisible) return null;

  return (
    <div className="fixed bottom-6 right-4 z-50 animate-fade-in">
      <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200 max-w-xs">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900">Install Our App</h3>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <p className="text-sm font-semibold text-gray-600 mb-4">
         जानिए अपने गाँव की ताकत, पढ़िए समाज के हीरो की कहानी – इंस्टॉल करें और जुड़ें!
        </p>
        <div className="flex gap-2">
          <button
            onClick={install}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Install Now
          </button>
          <button
            onClick={handleClose}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}