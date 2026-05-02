"use client";

import { useState } from "react";
import { Input, Button, Card, message } from "antd";
import { useUpdateProfile } from "@/modules/auth/hooks/useProfile";
import { useRouter } from "next/navigation";

export default function CompleteProfile() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [type, setType] = useState("customer");

  const updateProfile = useUpdateProfile();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await updateProfile.mutateAsync({ name, mobile, type });

      message.success("Profile updated");
      router.push("/");
    } catch (err) {
      message.error("Error updating profile");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-96">

        <Input
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          className="mb-3"
        />

        <Input
          placeholder="Mobile"
          onChange={(e) => setMobile(e.target.value)}
          className="mb-3"
        />

        <Button type="primary" block onClick={handleSubmit}>
          Save
        </Button>

      </Card>
    </div>
  );
}