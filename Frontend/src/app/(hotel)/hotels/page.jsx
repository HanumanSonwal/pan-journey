import HotelContent from "@/modules/hotel/pages/Hotel";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HotelContent />
    </Suspense>
  );
}
