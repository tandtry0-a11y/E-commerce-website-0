import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { ChatAssistant } from './components/ChatAssistant';
import { AdminDashboard } from './components/AdminDashboard';
import { ProductModal } from './components/ProductModal';
import { MOCK_PRODUCTS } from './constants';
import { Product, CartItem, ViewState } from './types';

function App() {
  const [viewState, setViewState] = useState<ViewState>(ViewState.SHOP);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navbar 
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => setIsChatOpen(!isChatOpen)}
        viewState={viewState}
        setViewState={setViewState}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main>
        {viewState === ViewState.ADMIN ? (
          <AdminDashboard />
        ) : (
          <>
            <Hero />
            
            <div id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? `Search results for "${searchQuery}"` : "Featured Collection"}
                </h2>
                <span className="text-sm text-gray-500">{filteredProducts.length} products</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                    onViewDetails={setSelectedProduct}
                  />
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                   <p className="text-gray-500 text-lg">No products found. Try searching for something else or ask our AI assistant!</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

      <ChatAssistant 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <footer className="bg-white border-t border-gray-100 mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Lumina Store. All rights reserved.</p>
          <p className="mt-2">Powered by Google Gemini</p>
        </div>
      </footer>
    </div>
  );
}

export default App;