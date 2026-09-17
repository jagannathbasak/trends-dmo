import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrendsHub from "@/components/trends/TrendsHub";

export default async function TrendsPage(props: PageProps<"/trends">) {
  const searchParams = await props.searchParams;

  return (
    <>
      <Navbar />
      <main className="font-trends-sans">
        <TrendsHub searchParams={searchParams} />
      </main>
      <Footer />
    </>
  );
}
