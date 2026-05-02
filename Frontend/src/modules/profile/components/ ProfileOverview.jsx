"use client";

import { EditOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  useProfile,
  useSendEmailOtp,
  useSendMobileOtp,
  useUpdateProfile,
  useVerifyEmail,
  useVerifyMobile,
} from "../hooks/useProfile";

export default function ProfileOverview() {
  const { data: user, isLoading } = useProfile();

  const updateProfile = useUpdateProfile();
  const sendEmailOtp = useSendEmailOtp();
  const verifyEmail = useVerifyEmail();
  const sendMobileOtp = useSendMobileOtp();
  const verifyMobile = useVerifyMobile();

  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  const [showEmailOtp, setShowEmailOtp] = useState(false);
  const [showMobileOtp, setShowMobileOtp] = useState(false);

  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");

  const fileRef = useRef();

  // 🔥 FIX: DATA LOAD
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>No data</div>;

  const currentAvatar = avatarPreview || user.avatar;

  const handleEdit = () => setIsEdit(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    updateProfile.mutate({
      name: form.name,
      email: form.email,
      mobile: form.mobile,
    });

    setIsEdit(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 items-center">
          <div
            className="relative w-16 h-16 cursor-pointer"
            onClick={() => isEdit && fileRef.current.click()}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-[#4A9BB5] flex items-center justify-center text-white font-semibold">
              {currentAvatar ? (
                <img
                  src={currentAvatar}
                  className="w-full h-full object-cover"
                />
              ) : (
                user.name?.[0]
              )}
            </div>

            {isEdit && (
              <div className="absolute bottom-0 right-0 bg-white text-xs px-1 rounded shadow">
                edit
              </div>
            )}

            <input
              type="file"
              hidden
              ref={fileRef}
              onChange={handleImageChange}
            />
          </div>

          <div>
            <h2 className="font-semibold text-lg">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email || user.mobile}</p>
          </div>
        </div>

        {!isEdit && (
          <Button icon={<EditOutlined />} onClick={handleEdit}>
            Edit
          </Button>
        )}
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* NAME */}
        <div>
          <label>Name</label>
          <Input
            disabled={!isEdit}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* EMAIL */}
        <div>
          <label>Email</label>

          <div className="flex gap-2 items-center">
            <Input
              disabled={!isEdit}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="flex-1"
            />

            {isEdit && (
              <Button
                size="small"
                onClick={() => {
                  sendEmailOtp.mutate({ email: form.email });
                  setShowEmailOtp(true);
                }}
              >
                Verify
              </Button>
            )}

            {showEmailOtp && (
              <>
                <Input
                  size="small"
                  placeholder="OTP"
                  className="w-24"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                />
                <Button
                  size="small"
                  onClick={() =>
                    verifyEmail.mutate({
                      email: form.email,
                      otp: emailOtp,
                    })
                  }
                >
                  OK
                </Button>
              </>
            )}
          </div>
        </div>

        {/* MOBILE */}
        <div>
          <label>Mobile</label>

          <div className="flex gap-2 items-center">
            <Input
              disabled={!isEdit}
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              className="flex-1"
            />

            {isEdit && (
              <Button
                size="small"
                onClick={() => {
                  sendMobileOtp.mutate({ mobile: form.mobile });
                  setShowMobileOtp(true);
                }}
              >
                Verify
              </Button>
            )}

            {showMobileOtp && (
              <>
                <Input
                  size="small"
                  placeholder="OTP"
                  className="w-24"
                  value={mobileOtp}
                  onChange={(e) => setMobileOtp(e.target.value)}
                />
                <Button
                  size="small"
                  onClick={() =>
                    verifyMobile.mutate({
                      mobile: form.mobile,
                      otp: mobileOtp,
                    })
                  }
                >
                  OK
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ACTION */}
      {isEdit && (
        <div className="mt-6 flex gap-3">
          <Button onClick={() => setIsEdit(false)}>Cancel</Button>
          <Button
            type="primary"
            className="bg-[#4A9BB5]"
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}
