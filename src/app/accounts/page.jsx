import React from "react";
import ServiceTable from "../../components/ServicesTable";
import axios from "axios";

const page = async () => {
  const { data } = await axios.get(
    "http://api.roadco-smstracking.online/api/auth/"
  );

  return (
    <div>
      <h2 className="text-center text-2xl">All Accounts</h2>

      <ServiceTable servicesData={data}></ServiceTable>
    </div>
  );
};

export default page;
