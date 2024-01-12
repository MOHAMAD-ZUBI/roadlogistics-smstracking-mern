"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const CollapsableLink = ({ title, Icon, subLinks }) => {
  const session = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const matchingLink = subLinks.find((link) => link.path === pathname);
    if (matchingLink && !isOpen) {
      setIsOpen(true);
    }
    if (!matchingLink && isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);
  return (
    <div className="w-full relative ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full hover:scale-[1.05] flex text-white/70 hover:text-white flex-row p-3 text-[17px] hover:bg-white/10 rounded-lg duration-500 items-center justify-between"
      >
        <div className="flex flex-row gap-2 items-center">
          <Icon />
          {title}
        </div>
        <MdArrowDropDown
          size={20}
          className={`${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-all duration-500`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              height: { duration: 0.3 },
              opacity: { duration: 0.5 },
            }}
            className=" overflow-hidden flex flex-col gap-1 mt-1"
          >
            {subLinks.map((subLink) => {
              const { title, path, icon: Icon } = subLink;
              if (
                path === "/accounts" &&
                !session?.data?.user?.roles?.includes("Admin")
              ) {
                return;
              }

              return (
                <Link
                  key={title}
                  href={path}
                  className={`flex flex-row  hover:text-white px-6 py-3 text-[17px] rounded-lg duration-500 items-center gap-2 ${
                    pathname === path
                      ? "bg-white/10 text-white"
                      : "hover:bg-white/10 text-white/70 hover:text-white"
                  }`}
                >
                  <Icon className="" />
                  {title}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsableLink;
