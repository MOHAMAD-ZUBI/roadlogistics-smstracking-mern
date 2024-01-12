"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdBusinessCenter, MdBusiness } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { TbMessages } from "react-icons/tb";

const AnalyticsCard = ({ textColor, bgColor, title, Icon, value }) => {
  return (
    <div className={`p-6 rounded-lg ${bgColor} ${textColor}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-lg font-semibold">{value}</div>
        </div>
      </div>
    </div>
  );
};

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://api.roadco-smstracking.online/api/auth/analytics"
        );
        setAnalyticsData(response.data.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, []);

  const AnalyticsList = [
    {
      title: "Accounts",
      textColor: "text-black",
      bgColor: "bg-purple-400",
      Icon: MdBusinessCenter,
      value: analyticsData?.userCount || 0,
    },
    {
      title: "Total Sms Sent",
      textColor: "text-black",
      bgColor: "bg-indigo-400",
      Icon: TbMessages,
      value: analyticsData?.smsCount || 0,
    },
  ];

  return (
    <div className="mt-10">
      <div className="mb-6">
        <h1 className="text-2xl text-white/90 font-semibold tracking-wider">
          Analytics Overview
        </h1>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {AnalyticsList.map((item) => (
          <AnalyticsCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Analytics;
