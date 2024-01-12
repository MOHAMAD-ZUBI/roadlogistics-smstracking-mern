"use client";
import { format } from "date-fns";
import React, { useState } from "react";
import SendSmsForm from "../components/SendSmsForm";
import CustomModal from "./reusable/CustomModal";

const SmsTable = ({ data }) => {
  const [isModelOpen, setModelOpen] = useState(false); // createModel
  const closeModel = () => {
    setModelOpen(!isModelOpen);
  };
  return (
    <div className="pt-4">
      <h2 className="text-center text-2xl">SMS TRACKING & SENDING</h2>
      <div>
        <div className="p-4 flex justify-end">
          <button
            class="bg-[#06B6D4] hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-lg"
            onClick={closeModel}
          >
            Send Sms
          </button>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left text-sm  font-light">
                <thead class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      #
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Sender
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Receiver
                    </th>
                    <th scope="col" class="px-6 py-4">
                      OrderId
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((sms, i) => {
                    const { byUser, orderId, phone, _id, createdAt } = sms;
                    return (
                      <tr
                        key={_id}
                        class="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600"
                      >
                        <td class="whitespace-nowrap px-6 py-4 font-medium">
                          {++i}
                        </td>
                        <td class="whitespace-nowrap text-green-500 px-6 py-4">
                          Successful
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">{byUser}</td>
                        <td class="whitespace-nowrap px-6 py-4">{phone}</td>
                        <td class="whitespace-nowrap px-6 py-4">{orderId}</td>
                        <td class="whitespace-nowrap px-6 py-4">
                          {format(new Date(sms.createdAt), "dd MMM HH:mm")}
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
      <CustomModal open={isModelOpen} close={closeModel} title="Send Sms">
        <SendSmsForm />
      </CustomModal>
    </div>
  );
};

export default SmsTable;
