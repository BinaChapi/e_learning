import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { hp } from "../utils/responsivescreen";
import colors from "../styles/colors";

const Collapsible = ({ title, children, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ 
        marginBottom: "16px",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        borderWidth:0.1,
        borderColor: colors.lightblue ,
        borderStyle:"solid"
      }}
    >
      <motion.button
        whileHover={{ backgroundColor: isOpen ? colors.lightblue : "#f1f5f9" }}
        whileTap={{ scale: 0.98 }}
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "16px 24px",
          textAlign: "left",
          backgroundColor: isOpen ? colors.lightblue : "#fff",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "600",
          fontSize: "16px",
          color: isOpen ? colors.primary : "#334155",
          transition: "all 0.3s ease"
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {title}
        </span>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <ChevronUp size={24} color={colors.primary} />
          ) : (
            <ChevronDown size={24} color="#64748b" />
          )}
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.2 },
                opacity: { duration: 0.1 }
              }
            }}
            style={{ 
              overflow: "hidden",
              borderTop: isOpen ? "1px solid #e2e8f0" : "none",
              backgroundColor: "#fff"
            }}
          >
            <div style={{ padding: "20px 24px" }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Collapsible;
