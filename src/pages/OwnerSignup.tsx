import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  ShieldCheck, 
  Smartphone, 
  User as UserIcon,
  FileText,
  Camera,
  Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/src/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function OwnerSignup() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    aadhaar: "",
    ownershipProof: ""
  });
  const [hasUploadedProof, setHasUploadedProof] = useState(false);

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        phone: formData.phone,
        role: "owner",
        isVerified: false,
        verificationDoc: "pending",
        ownershipProof: "pending_upload", // Mocking upload for now
        updatedAt: new Date().toISOString()
      });
      navigate("/owner");
    } catch (error) {
      console.error("Error signing up owner", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_50%,_#111_0%,_#000_100%)]">
      <div className="max-w-xl w-full">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-muted mb-8 italic">
            <ShieldCheck className="w-3 h-3 text-emerald-500" /> Executive Onboarding
          </div>
          <h1 className="text-5xl font-display font-black tracking-tighter uppercase mb-4">Owner Registration.</h1>
          <p className="text-muted text-sm font-medium uppercase tracking-[0.1em]">Complete your verification to join the elite network.</p>
        </header>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-16">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={`h-0.5 flex-1 transition-all duration-700 ${i <= step ? "bg-white" : "bg-border"}`} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 1 && (
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                    <Smartphone className="w-3 h-3" /> Communication Node
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black border border-border p-6 text-sm font-bold focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <p className="text-[10px] text-muted font-medium italic">We'll send a high-priority OTP to this number for encrypted verification.</p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                    <UserIcon className="w-3 h-3" /> Identity Extraction (Government ID)
                  </label>
                  <div className="p-16 border-2 border-dashed border-border flex flex-col items-center justify-center text-center space-y-6 hover:border-white transition-colors cursor-pointer group">
                    <Upload className="w-6 h-6 text-muted group-hover:text-white transition-colors" />
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest mb-1">Aadhaar / Voter ID / Passport</h3>
                      <p className="text-[9px] text-muted font-medium uppercase tracking-[0.2em]">MAX 5MB • PDF / PNG / JPG</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                    <Camera className="w-3 h-3" /> Biometric Sync (Live Selfie)
                  </label>
                  <div className="aspect-square max-w-[300px] mx-auto bg-zinc-900 border border-border flex items-center justify-center relative overflow-hidden group">
                     <div className="w-full h-full border-[20px] border-black absolute z-10 pointer-events-none" />
                     <Camera className="w-8 h-8 text-muted group-hover:text-white transition-colors" />
                     <div className="absolute inset-x-0 bottom-8 text-center z-20">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white animate-pulse">Scanning...</p>
                     </div>
                  </div>
                  <button className="w-full py-4 border border-border text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Initialize Capture</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                    <FileText className="w-3 h-3" /> Asset Authority (Property Proof)
                  </label>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Ownership Deed, Tax Receipt, or Valid Rental Agreement.</p>
                  <div 
                    onClick={() => setHasUploadedProof(true)}
                    className={`p-16 border-2 border-dashed flex flex-col items-center justify-center text-center space-y-6 transition-all cursor-pointer group ${hasUploadedProof ? "border-emerald-500 bg-emerald-500/10" : "border-border hover:border-emerald-500 bg-emerald-500/5"}`}
                  >
                    {hasUploadedProof ? (
                      <Check className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <Upload className="w-6 h-6 text-emerald-500 group-hover:scale-110 transition-transform" />
                    )}
                    <div>
                      <h3 className={`text-xs font-black uppercase tracking-widest mb-1 italic ${hasUploadedProof ? "text-emerald-500" : "text-emerald-500"}`}>
                        {hasUploadedProof ? "Asset Document Synchronized" : "Critical Asset Verification"}
                      </h3>
                      <p className="text-[9px] text-muted font-medium uppercase tracking-[0.2em]">
                        {hasUploadedProof ? "Ready for network integration" : "Mandatory for compliance."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-zinc-900 border border-border border-l-emerald-500 border-l-4">
                  <p className="text-[10px] text-muted font-medium leading-relaxed italic">
                    "I hereby certify that the uploaded document represents my legal authority over the asset being listed on the RentMate network."
                  </p>
                </div>
              </div>
            )}

            <footer className="mt-20 flex justify-between gap-4">
              <button 
                onClick={prevStep}
                disabled={step === 1 || loading}
                className="flex items-center gap-3 px-8 py-5 border border-border text-[10px] font-black uppercase tracking-widest text-muted hover:text-white hover:border-white transition-all disabled:opacity-0"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              
              {step < totalSteps ? (
                <button 
                  onClick={nextStep}
                  className="flex-1 flex items-center justify-center gap-3 px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all group"
                >
                  Encrypt & Proceed <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={loading || !hasUploadedProof}
                  className="flex-1 flex items-center justify-center gap-3 px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Complete Integration"} <Check className="w-4 h-4" />
                </button>
              )}
            </footer>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Background Accents */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-1/4 -left-20 w-64 h-64 border border-zinc-800 rotate-45" />
         <div className="absolute bottom-1/4 -right-20 w-96 h-96 border border-zinc-800 -rotate-12" />
      </div>
    </div>
  );
}
