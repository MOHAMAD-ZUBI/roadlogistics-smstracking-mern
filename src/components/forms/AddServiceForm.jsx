"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { Button, Form, Input, Modal, Radio } from "antd";

import CustomModal from "../reusable/CustomModal";
import axios from "axios";

import { useRouter } from "next/navigation";

const ServiceCreateForm = ({ open, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  return (
    <CustomModal open={open} title="Create a new collection" close={onCancel}>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="titleEn"
          label="Title (English)"
          rules={[
            {
              required: true,
              message: "Please input the title of the service!",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="titleAr"
          label="Title (Arabic)"
          rules={[
            {
              required: true,
              message: "Please input the title of the service!",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="descriptionEn"
          label="Description (English)"
        >
          <Input size="large" type="textarea" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="descriptionAr"
          label="Description (Arabic)"
        >
          <Input size="large" type="textarea" />
        </Form.Item>
        <Form.Item
          name="hasProviders"
          label="does this service has providers?"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group defaultValue={"true"}>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
          </Radio.Group>
        </Form.Item>
        <CustomModal></CustomModal>
        <Form.Item
          name="status"
          label="Status of the service"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group defaultValue={"active"}>
            <Radio value="active">Active</Radio>
            <Radio value="unactive">Unactive</Radio>
          </Radio.Group>
        </Form.Item>
        <Button
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                onCreate(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
          type="primary"
          className="w-full "
          size="large"
        >
          Create
        </Button>
      </Form>
    </CustomModal>
  );
};

const AddServiceForm = () => {
  const router = useRouter();
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);

  const openModal = () => {
    setIsModalFormOpen(true);
  };
  const closeModal = () => {
    setIsModalFormOpen(false);
  };

  const onCreate = async (values) => {
    console.log("Received values of form: ", values);
    try {
      await axios.post("https://api.tarkezy.com/services/create", values);
      setIsModalFormOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/*** form modal trigger ***/}
      <button
        onClick={openModal}
        className="bg-primaryColor hover:bg-cyan-600 duration-500 p-2.5  text-white/80 rounded-xl ring-4 ring-white/20 "
      >
        <AiOutlinePlus size={24} />
      </button>
      <ServiceCreateForm
        open={isModalFormOpen}
        onCreate={onCreate}
        onCancel={closeModal}
      />
    </div>
  );
};

export default AddServiceForm;
