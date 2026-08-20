import React from "react";
import Hero from "@/components/commode/Hero";
import StrategicIntent from "@/components/commode/StrategicIntent";
import InquiryPortal from "@/components/commode/InquiryPortal";
import GlobalPulse from "@/components/commode/GlobalPulse";
import CornerMenu from "@/components/commode/CornerMenu";
import HorizonScan from "@/components/commode/HorizonScan";

export default function ComingSoon() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <HorizonScan />
      <CornerMenu />
      <Hero />
      <StrategicIntent />
      <InquiryPortal />
      <GlobalPulse />
    </main>
  );
}
