import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
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
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { buildStructuredData } from "@/lib/structuredData";

export default function Home() {
  const structuredData = buildStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
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
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
