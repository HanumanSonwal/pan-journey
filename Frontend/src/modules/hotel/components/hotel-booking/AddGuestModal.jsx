"use client";

import RHFInput from "@/components/ui/RHFinputs/RHFInput";
import RHFSelect from "@/components/ui/RHFinputs/RHFSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Modal } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { guestSchema } from "../../schema/guest.schema";

export default function AddGuestModal({ open, onClose, onSave, guestNo }) {
  const methods = useForm({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      title: "Mr",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      isChild: false,
    },
  });

  const { handleSubmit, setValue, watch, reset } = methods;

  const submit = (data) => {
    onSave(data);

    reset();

    onClose();
  };

  return (
    <Modal open={open} footer={null} onCancel={onClose} width={820} centered>
      <div className="m-5 p-5">
        <h2 className="mb-2 text-[28px] font-semibold">Add Guest {guestNo}</h2>

        <p className="mb-7 text-[#555]">
          Name should be as per official govt. ID & travelers below 18 years of
          age cannot travel alone
        </p>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submit)}>
            <div className="grid gap-5 md:grid-cols-3">
              <RHFSelect
                name="title"
                label="Gender"
                options={[
                  {
                    label: "Mr",
                    value: "Mr",
                  },
                  {
                    label: "Mrs",
                    value: "Mrs",
                  },
                  {
                    label: "Miss",
                    value: "Miss",
                  },
                ]}
              />

              <RHFInput name="firstName" label="First Name" />

              <RHFInput name="lastName" label="Last Name" />

              <RHFInput name="mobile" label="Mobile No." />

              <RHFInput name="email" label="Email" />
            </div>

            <div className="mt-5">
              <Checkbox
                checked={watch("isChild")}
                onChange={(e) => setValue("isChild", e.target.checked)}
              >
                Below 12 years
              </Checkbox>
            </div>

            <Button
              htmlType="submit"
              type="primary"
              className="!mt-7 !h-[46px] !rounded-xl"
            >
              Save Details
            </Button>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
}
