import type { Metadata } from "next";
import { Showcase } from "@/components/Showcase";

export const metadata: Metadata = {
  title: "Product Catalog — Built on SuiNS",
  description:
    "Live products built on SuiNS — wallets, explorers, websites, and apps that resolve .sui names.",
};

export default function Products() {
  return (
    <main>
      <Showcase />
    </main>
  );
}
