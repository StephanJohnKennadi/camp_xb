import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import AppRoutes from './routes/AppRoutes';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import WhatsAppButton from './components/common/WhatsAppButton';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex flex-col min-h-screen bg-sand text-primary-dark antialiased">
          
          {/* Global Sticky Navigation blur-header */}
          <Navbar />

          {/* Interactive Slide-out Shopping Cart Drawer */}
          <CartDrawer />

          {/* Dynamic Page Router container */}
          <main className="flex-grow">
            <AppRoutes />
          </main>

          {/* Floating dynamic WhatsApp contact badge */}
          <WhatsAppButton />

          {/* Earthy massive 4-column Footer */}
          <Footer />

        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
