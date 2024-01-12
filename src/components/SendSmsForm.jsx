"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SendSmsForm = () => {
  const [phone, setPhone] = useState("");
  const [orderId, setOrderId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const userName = session.data.user.userName;
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `http://api.roadco-smstracking.online/api/roadco/?phone=${phone}&oid=${orderId}&byUser=${userName}`;

    try {
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        setSuccessMessage("SMS sent successfully!");
        console.log("Request successful!");
        console.log("Response data:", response.data);
        router.refresh();
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during request:", error);
    } finally {
      setLoading(false);
    }

    useEffect(() => {
      if (successMessage) {
        const timeoutId = setTimeout(() => {
          setSuccessMessage("");
        }, 30000); // 30 seconds

        return () => clearTimeout(timeoutId);
      }
    }, [successMessage]);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full mt-4">
      <div className="mb-5">
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Client's Phone
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="enter phone"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="orderId"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          OrderId
        </label>
        <input
          type="text"
          id="OrderId"
          name="OrderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="enter orderId"
          required
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {loading ? "Sending Sms..." : "Send Sms"}
      </button>
      {successMessage && (
        <p className="text-green-500 pt-2">{successMessage}</p>
      )}
    </form>
  );
};

export default SendSmsForm;
