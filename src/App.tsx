import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { LandingPage } from "@/src/pages/LandingPage";
import { SearchPage } from "@/src/pages/SearchPage";
import PropertyDetail from "@/src/pages/PropertyDetail";
import OwnerDashboard from "@/src/pages/OwnerDashboard";
import OwnerSignup from "@/src/pages/OwnerSignup";
import AddProperty from "@/src/pages/AddProperty";
import StudentDashboard from "@/src/pages/StudentDashboard";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { auth, db } from "@/src/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-white z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const userDoc = await getDoc(doc(db, "users", u.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().role);
          }
        } catch (e) {
          console.error("Error fetching role", e);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes with Navbar/Footer */}
        <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
        <Route path="/search" element={<PublicLayout><SearchPage /></PublicLayout>} />
        <Route path="/property/:id" element={<PublicLayout><PropertyDetail /></PublicLayout>} />

        {/* Dashboard Routes (No Public Navbar/Footer) */}
        <Route path="/owner" element={user ? <OwnerDashboard /> : <Navigate to="/" />} />
        <Route path="/owner/signup" element={user ? <OwnerSignup /> : <Navigate to="/" />} />
        <Route path="/owner/add" element={user ? (role === "owner" ? <AddProperty /> : <Navigate to="/owner/signup" />) : <Navigate to="/" />} />
        <Route path="/student" element={user ? <StudentDashboard /> : <Navigate to="/" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
