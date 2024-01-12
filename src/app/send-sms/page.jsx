import React from "react";
import axios from "axios";
import SmsTable from "../../components/SmsTable";

const page = async () => {
  const { data } = await axios.get(
    "http://api.roadco-smstracking.online/api/sms/getRecentSms"
  );

  return (
    <div className="">
      <SmsTable data={data}></SmsTable>
    </div>
  );
};

export default page;
