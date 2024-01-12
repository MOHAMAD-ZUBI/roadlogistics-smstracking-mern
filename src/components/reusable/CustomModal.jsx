"use client";
import React, { FC } from "react";
import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const CustomModal = ({ open, close, children, title, width }) => {
  const modalWidth = width ? width : 500;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className=" fixed inset-0 flex flex-col h-full w-full justify-center items-center md:p-10 p-5 backdrop-blur-[3px] z-[10000]"
        >
          <div
            onClick={close}
            className="absolute top-0 left-0 right-0 bottom-0 transition-opacity duration-500  "
          ></div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.4 }}
            style={{ maxWidth: modalWidth }}
            className={`bg-secondaryBgColor z-[9999999] max-h-screen overflow-y-auto w-full min-h-[200px] px-6 py-8 relative shadow-xl rounded-2xl shadow-primaryBgColor/50`}
          >
            <div className="flex flex-row justify-between mb-2">
              <div className="float-left">
                <h2 className=" capitalize text-white/70">{title}</h2>
              </div>
              <button
                onClick={close}
                className="text-white/50 hover:text-white/80 duration-500 float-right"
              >
                <MdClose size={20} />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
