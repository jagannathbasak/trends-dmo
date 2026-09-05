import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PredictionTimeline from "@/components/PredictionTimeline";
import SixDimensions from "@/components/SixDimensions";
import SignalBoard from "@/components/SignalBoard";
import AskNvile from "@/components/AskNvile";
import OpportunityReport from "@/components/OpportunityReport";
import DecisionCenter from "@/components/DecisionCenter";
import Comparison from "@/components/Comparison";
import TrackRecord from "@/components/TrackRecord";
import Roles from "@/components/Roles";
import MethodIntegrations from "@/components/MethodIntegrations";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PredictionTimeline />
        <SixDimensions />
        <SignalBoard />
        <AskNvile />
        <OpportunityReport />
        <DecisionCenter />
        <Comparison />
        <TrackRecord />
        <Roles />
        <MethodIntegrations />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
