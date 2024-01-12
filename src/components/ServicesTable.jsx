"use client";
import React, { useEffect, useState } from "react";
import CustomModal from "./reusable/CustomModal";
import axios from "axios";
import { useRouter } from "next/navigation";

const ServicesTable = ({ servicesData }) => {
  const router = useRouter();
  const [isModelOpen, setModelOpen] = useState(false); // createModel
  const closeModel = () => {
    setModelOpen(!isModelOpen);
  };

  const [isEditModelOpen, setIsEditModelOpen] = useState(false); // Edit model
  const closeEditModel = () => {
    setIsEditModelOpen(!isEditModelOpen);
    setUserIdToEdit(null);
  };

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (userId) => {
    const apiUrl = `http://api.roadco-smstracking.online/api/auth/delete/${userId}`;

    try {
      setLoading(true);

      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        // Assuming the API returns a success message
        setSuccessMessage("User deleted successfully!");
        router.refresh();
        console.log("Request successful!");
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "http://api.roadco-smstracking.online/api/auth/register";
    const requestBody = {
      userName,
      password,
    };

    try {
      setLoading(true);

      const response = await axios.post(apiUrl, requestBody);

      if (response.status === 200) {
        setSuccessMessage("Account created successfully!");
        router.refresh();
        console.log("Request successful!");
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during request:", error);
    } finally {
      setLoading(false);
    }
  };

  const [userIdToEdit, setUserIdToEdit] = useState(null);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `http://api.roadco-smstracking.online/api/auth/editUser/${userIdToEdit}`;
    const requestBody = {
      password,
      role,
      userName,
    };

    try {
      setLoading(true);

      const response = await axios.patch(apiUrl, requestBody);

      if (response.status === 200) {
        setSuccessMessage("Account Edited successfully!");
        router.refresh();
      } else {
      }
    } catch (error) {
      console.error("Error during request:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timeoutId = setTimeout(() => {
        setSuccessMessage("");
      }, 30000); // 30 seconds

      return () => clearTimeout(timeoutId);
    }
  }, [successMessage]);

  return (
    <div>
      <div className="p-4 flex justify-end">
        <button
          className="bg-[#06B6D4] hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-lg"
          onClick={closeModel}
        >
          Add Account
        </button>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm  font-light">
                <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      username
                    </th>
                    <th scope="col" className="px-6 py-4">
                      role
                    </th>
                    <th scope="col" className="px-6 py-4">
                      status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      delete
                    </th>
                    <th scope="col" className="px-6 py-4">
                      edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {servicesData?.map((service, i) => {
                    const { userName, _id, permissions } = service;
                    return (
                      <tr
                        key={_id}
                        className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {++i}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {userName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {permissions}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">Active</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <button
                            className="bg-[#d41b06] hover:bg-red-700 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded-lg"
                            onClick={() => handleDelete(_id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="">
                            <button
                              className="bg-[#06B6D4] hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-lg"
                              onClick={() => {
                                setUserIdToEdit(_id);
                                setRole(permissions);
                                setIsEditModelOpen(true);
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <CustomModal open={isModelOpen} close={closeModel} title="Create Account">
        <form onSubmit={handleSubmit} className="w-full mt-4">
          <div className="mb-5">
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="enter username"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          {successMessage && (
            <p className="text-green-500 pt-2">{successMessage}</p>
          )}
        </form>
      </CustomModal>

      <CustomModal
        open={isEditModelOpen}
        close={closeEditModel}
        title="Edit Account"
      >
        <form onSubmit={handleEditSubmit} className="w-full mt-4">
          <div className="mb-5">
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="enter username"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="enter password"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Role
            </label>
            <select
              name="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? "Editing Account..." : "Edit Account"}
          </button>
          {successMessage && (
            <p className="text-green-500 pt-2">{successMessage}</p>
          )}
        </form>
      </CustomModal>
    </div>
  );
};

export default ServicesTable;
