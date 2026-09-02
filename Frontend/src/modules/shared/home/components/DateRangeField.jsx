"use client";

import useIsMobile from "@/hooks/useIsMobile";

import DesktopDateRangeField from "./DesktopDateRangeField";
import MobileDateRangeField from "./MobileDateRangeField";

export default function DateRangeField(props) {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return <DesktopDateRangeField {...props} />;
  }

  return isMobile ? (
    <MobileDateRangeField {...props} />
  ) : (
    <DesktopDateRangeField {...props} />
  );
}
