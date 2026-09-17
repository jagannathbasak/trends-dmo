import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrendsHub from "@/components/trends/TrendsHub";

export default async function TrendsCategoryPage(props: PageProps<"/trends/category/[category]">) {
  const [{ category }, searchParams] = await Promise.all([props.params, props.searchParams]);

  return (
    <>
      <Navbar />
      <main className="font-trends-sans">
        <TrendsHub searchParams={searchParams} forcedCategory={category} />
      </main>
      <Footer />
    </>
  );
}
