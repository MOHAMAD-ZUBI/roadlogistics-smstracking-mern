import Link from "next/link";
import React from "react";

const SidebarLink = ({ title, Icon }) => {
  return (
    <Link
      href="/"
      className="flex hover:scale-[1.05] text-white/70 hover:text-white flex-row p-3 text-[17px] hover:bg-white/10 rounded-lg duration-500 items-center gap-2"
    >
      <Icon className="" />
      {title}
    </Link>
  );
};

export default SidebarLink;
