import React, { useState } from 'react';
import { X, ShoppingBag, Wand2, Check } from 'lucide-react';
import { Product } from '../types';
import { generateProductBlurb } from '../services/gemini';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [aiBlurb, setAiBlurb] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!product) return null;

  const handleGenerateBlurb = async () => {
    setIsGenerating(true);
    const blurb = await generateProductBlurb(product.name);
    setAiBlurb(blurb);
    setIsGenerating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px] animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-colors"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 bg-gray-100 h-64 md:h-auto relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <div className="flex items-center gap-2 mb-2">
             <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wide">
               {product.category}
             </span>
             <span className="text-sm text-gray-400">•</span>
             <span className="text-sm text-gray-500">{product.reviews} Reviews</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>

          <div className="prose prose-sm text-gray-600 mb-6">
            <p>{product.description}</p>
          </div>

          {/* AI Feature */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl mb-8 border border-indigo-100">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 text-indigo-700 font-medium text-sm">
                <Wand2 className="h-4 w-4" />
                AI Insight
              </div>
              {!aiBlurb && (
                <button 
                  onClick={handleGenerateBlurb}
                  disabled={isGenerating}
                  className="text-xs bg-white border border-indigo-200 text-indigo-600 px-2 py-1 rounded-md hover:bg-indigo-50 transition-colors disabled:opacity-50"
                >
                  {isGenerating ? 'Generating...' : 'Generate Blurb'}
                </button>
              )}
            </div>
            
            {isGenerating ? (
               <div className="h-12 flex items-center justify-center">
                 <div className="animate-pulse flex space-x-2">
                    <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full"></div>
                    <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full animation-delay-200"></div>
                    <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full animation-delay-400"></div>
                 </div>
               </div>
            ) : (
              <p className="text-sm text-indigo-900 leading-relaxed italic">
                {aiBlurb || "Click generate to see what our AI thinks about this product!"}
              </p>
            )}
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Price</p>
              <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            </div>
            
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 bg-gray-900 text-white h-14 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};