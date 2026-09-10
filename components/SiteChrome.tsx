import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/** Marketing chrome on every public page. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
