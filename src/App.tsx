import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import AffairsPage from './pages/Affairs';
import TransactionDetailPage from './pages/Affairs/Detail';
import OperationsPage from './pages/Operations';
import ModelPage from './pages/Model';
import AdminDashboard from './pages/Admin';
import { ToastContainer } from './components/common/Toast';
import { useToastStore } from './stores/toastStore';

export default function App() {
  const { toasts, removeToast } = useToastStore();

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/affairs" element={<AffairsPage />} />
            <Route path="/affairs/:id" element={<TransactionDetailPage />} />
            <Route path="/operations" element={<OperationsPage />} />
            <Route path="/model" element={<ModelPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </Router>
  );
}
