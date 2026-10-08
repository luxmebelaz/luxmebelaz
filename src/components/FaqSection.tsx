import React from 'react';
import { Plus, Clock } from 'lucide-react';

const faqs = [
  "How long does delivery take?",
  "Which bulb and colour temperature should I use?",
  "Can you help me plan the lighting for a whole room?",
  "Do the lamps come ready to install?",
  "What is your returns and warranty policy?",
  "Do you ship internationally?"
];

export default function FaqSection() {
  return (
    <section className="bg-[#dcd8d3] text-black pt-32 pb-16 px-8 md:px-16 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-8">
        
        {/* Left Side */}
        <div className="flex-1 md:pr-16">
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-gray-800">
            Good to know
          </h4>
          <h2 className="text-5xl md:text-6xl font-medium tracking-tighter leading-[1.1] mb-8">
            Everything about lead times, light and living with our lamps.
          </h2>
          <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
            Still unsure about a fixture, a ceiling height or a finish? Write to us and the studio replies with a concrete recommendation.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
            <Clock className="w-4 h-4" />
            <span>Studio replies within one business day</span>
          </div>
        </div>

        {/* Right Side - Accordion */}
        <div className="flex-1 flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-[#e8e6e1] rounded-2xl p-6 flex justify-between items-center cursor-pointer hover:bg-[#eae8e3] transition-colors"
            >
              <span className="font-medium text-gray-900">{faq}</span>
              <Plus className="w-5 h-5 text-gray-600" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
