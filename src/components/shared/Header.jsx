"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

import Dropdown from "./Dropdown";

const Header = ({ handleSidebar }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  return (
    <div className="flex flex-row justify-between items-center">
      <div>
        <button
          className="md:hidden p-2 bg-white/10 rounded-xl"
          onClick={handleSidebar}
        >
          <HiBars3BottomLeft size={35} />
        </button>
      </div>
      <div className="relative">
        <button
          onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          className="flex  flex-row gap-2  items-center "
        >
          <Image
            height={45}
            width={45}
            className="rounded-xl ring-4 ring-white/20"
            src={"/1.jpg"}
            priority
            alt="user"
          />
          <MdArrowDropDown
            size={20}
            className={`${
              isUserDropdownOpen ? "rotate-180" : "rotate-0"
            } duration-500`}
          />
        </button>
        {isUserDropdownOpen && <Dropdown />}
      </div>
      <AnimatePresence>
        {isUserDropdownOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="h-screen w-screen z-[99999] absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm transition-all duration-500"
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
