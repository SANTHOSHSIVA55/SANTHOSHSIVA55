import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #020617 0%, #050816 40%, #071426 100%)" }}
        >
          {/* Background aurora blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00E5FF]/8 blur-[120px] animate-aurora" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/6 blur-[100px] animate-aurora-delayed" />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <div className="h-3 w-3 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#8B5CF6]" />
                <div className="absolute inset-0 h-3 w-3 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#8B5CF6] blur-md" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-[#F8FAFC]">
                santhosh<span className="text-[#94A3B8]">.dev</span>
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-[2px] rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#00E5FF] animate-loader" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-xs text-[#94A3B8] tracking-[0.2em] uppercase"
            >
              Loading
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
