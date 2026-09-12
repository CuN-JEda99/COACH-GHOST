import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import IaRecommender from './components/IaRecommender';
import ContactForm from './components/ContactForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'admin'
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');

  // Check URL path or hash on load
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes('/admin') || hash === '#admin') {
        const token = localStorage.getItem('coach_ghost_token');
        if (token) {
          setCurrentView('admin');
        } else {
          setShowLoginModal(true);
        }
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleOpenAdmin = () => {
    const token = localStorage.getItem('coach_ghost_token');
    if (token) {
      setCurrentView('admin');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setCurrentView('admin');
    window.location.hash = 'admin';
  };

  const handleExitAdmin = () => {
    setCurrentView('landing');
    window.location.hash = '';
  };

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyPositionToForm = (position) => {
    setSelectedPosition(position);
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#00FF88] selection:text-black">
      
      {/* If in admin view, render Admin Dashboard */}
      {currentView === 'admin' ? (
        <AdminDashboard onExit={handleExitAdmin} />
      ) : (
        /* Landing Page Layout */
        <>
          <Navbar onOpenAdmin={handleOpenAdmin} />
          
          <main className="flex-grow">
            <Hero />
            <HowItWorks />
            <Pricing onSelectPlan={handleSelectPlan} />
            <IaRecommender onApplyToForm={handleApplyPositionToForm} />
            <ContactForm 
              selectedPlan={selectedPlan} 
              selectedPosition={selectedPosition} 
            />
          </main>

          <Footer onOpenAdmin={handleOpenAdmin} />
        </>
      )}

      {/* Admin Login Modal */}
      {showLoginModal && (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onCancel={() => setShowLoginModal(false)}
        />
      )}

    </div>
  );
}
