"use client";

import LoginSuccessModal from "@/components/common/LoginSuccessModal";
import { useUpdateProfile } from "@/modules/profile/hooks/useProfile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
export default function ProfileCompletionHandler() {
  const { data: session, status } =
    useSession();
  const router = useRouter();
  const [open, setOpen] =
    useState(false);
  const alreadyCheckedRef =
    useRef(false);
  // UPDATE PROFILE
  const {
    mutate: updateProfile,
    isPending,
  } = useUpdateProfile();

  // CHECK POPUP
  useEffect(() => {
    if (
      status !== "authenticated"
    ) {
      return;
    }

    // PREVENT MULTIPLE RUNS
    if (
      alreadyCheckedRef.current
    ) {
      return;
    }

    alreadyCheckedRef.current =
      true;

    const shouldShow =
      !session?.user
        ?.profileCompleted &&
      !session?.user
        ?.profilePopupDismissed;

    if (shouldShow) {
      setOpen(true);
    }
  }, [session, status]);

  // CONTINUE BROWSING
  const handleClose = () => {
    updateProfile(
      {
        profilePopupDismissed:
          true,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  // PROFILE
  const handleProfile = () => {
    setOpen(false);

    router.push("/profile");
  };

  return (
    <LoginSuccessModal
      open={open}
      onClose={handleClose}
      onProfile={handleProfile}
      loading={isPending}
    />
  );
}