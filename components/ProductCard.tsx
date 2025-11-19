import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* Image Container */}
      <div 
        className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        
        {/* Quick Add Button - Visible on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-indigo-600 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="Add to cart"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-medium text-indigo-500 uppercase tracking-wide">{product.category}</p>
          <div className="flex items-center text-amber-400">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
          </div>
        </div>
        
        <h3 
          className="text-lg font-semibold text-gray-900 mb-1 cursor-pointer hover:text-indigo-600 transition-colors"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => onViewDetails(product)}
            className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};