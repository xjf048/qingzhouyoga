import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import AffairsPage from './pages/Affairs';
import TransactionDetailPage from './pages/Affairs/Detail';
import OperationsPage from './pages/Operations';
import ModelPage from './pages/Model';
import StoryPage from './pages/Story';
import AdminDashboard from './pages/Admin';
import { ToastContainer } from './components/common/Toast';
import { useToastStore } from './stores/toastStore';
import useScrollReveal from './hooks/useScrollReveal';

export default function App() {
  const { toasts, removeToast } = useToastStore();

  // Wire reveal / count-up / bar-grow / draw-line / ring-fill / progress bar
  useScrollReveal();

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        {/* v2.1 top scroll progress bar */}
        <div id="progress-top" className="progress-top" />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/affairs" element={<AffairsPage />} />
            <Route path="/affairs/:id" element={<TransactionDetailPage />} />
            <Route path="/operations" element={<OperationsPage />} />
            <Route path="/model" element={<ModelPage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </Router>
  );
}