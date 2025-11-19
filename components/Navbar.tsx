import React from 'react';
import { ShoppingBag, Menu, Search, Bot, LayoutDashboard } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenChat: () => void;
  viewState: ViewState;
  setViewState: (view: ViewState) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onOpenCart, 
  onOpenChat,
  viewState,
  setViewState,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => setViewState(ViewState.SHOP)}>
            <div className="bg-indigo-600 p-1.5 rounded-lg mr-2">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Lumina</span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Search className="h-4 w-4 text-gray-400" />
             </div>
             <input
               type="text"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
               placeholder="Search products..."
             />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
             <button 
              onClick={() => setViewState(viewState === ViewState.ADMIN ? ViewState.SHOP : ViewState.ADMIN)}
              className={`p-2 rounded-full transition-colors ${viewState === ViewState.ADMIN ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
              title="Toggle Admin Dashboard"
            >
              <LayoutDashboard className="h-5 w-5" />
            </button>

            <button 
              onClick={onOpenChat}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              title="AI Assistant"
            >
              <Bot className="h-5 w-5" />
            </button>

            <button 
              onClick={onOpenCart}
              className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors group"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            
            <div className="md:hidden">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};