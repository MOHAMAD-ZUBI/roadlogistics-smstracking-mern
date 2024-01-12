import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Dropdown = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 0.5 },
        }}
        className=" absolute bg-primaryBgColor rounded-2xl top-14 shadow-2xl shadow-primaryBgColor z-[999999] right-0"
      >
        <div className="flex flex-col">
          <button
            onClick={signOut}
            className="text-center text-white/70 hover:text-white px-10 py-2 text-[17px] hover:bg-white/10 rounded-2xl duration-500 items-center justify-center h-full"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Dropdown;
