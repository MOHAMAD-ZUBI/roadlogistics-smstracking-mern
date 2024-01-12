import React from "react";
import {
  MdDashboard,
  MdOutlineSettingsSuggest,
  MdKeyboardArrowUp,
  MdBusinessCenter,
  MdLaptopMac,
  MdBubbleChart,
  MdBarChart,
  MdClose,
} from "react-icons/md";
import { RiListSettingsFill } from "react-icons/ri";
import { FiSmartphone } from "react-icons/fi";
import { FaStore } from "react-icons/fa";
import { HiServer } from "react-icons/hi";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoMdAnalytics } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";

import SidebarLink from "./sidebarLinks/SidebarLink";
import { FcWorkflow } from "react-icons/fc";
import CollapsableLink from "./sidebarLinks/CollapsableLink";
import { useSession } from "next-auth/react";
const Links = [
  { title: "Dashboard", icon: MdDashboard, path: "/" },
  {
    title: "Services",
    icon: MdBusinessCenter,
    path: "/",
    subLinks: [
      { title: "Sms Track", path: "/send-sms", icon: IoMdAnalytics },
      { title: "Accounts", path: "/accounts", icon: MdManageAccounts },
    ],
  },
];
const Sidebar = ({ handleSidebar }) => {
  const session = useSession();
  return (
    <div className="p-6">
      <div className="flex flex-row justify-between items-center">
        <div className="p-3 flex flex-row gap-2">
          <FcWorkflow size={30} />
          <h1 className="text-2xl text-white font-semibold">
            Road SMS Tracking
          </h1>
        </div>
        <button
          onClick={handleSidebar}
          className="bg-white/20 sm:hidden rounded-xl p-1"
        >
          <MdClose size={23} />
        </button>
      </div>
      <div className="h-[1px] w-full bg-gray-500/10 my-8"></div>

      <button className="bg-white/10 w-full hover:scale-[1.05] duration-500 p-4 flex flex-row justify-between items-center rounded-lg">
        <div className="flex flex-row items-center gap-2">
          <div className=" bg-cyan-500 font-bold text-lg text-black rounded-full p-3">
            <MdBubbleChart />
          </div>
          <p className="capitalize">Road Logistics</p>
        </div>

        <div className="-space-y-2">
          <MdKeyboardArrowUp size={20} />
          <MdKeyboardArrowUp size={20} className=" rotate-180" />
        </div>
      </button>
      <div className="flex flex-col my-4 gap-1">
        {Links.map((link) => {
          const { title, path, icon, subLinks } = link;
          if (subLinks) {
            return (
              <CollapsableLink
                subLinks={subLinks}
                key={title}
                title={title}
                Icon={icon}
              />
            );
          }
          return <SidebarLink key={path} title={title} Icon={icon} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
