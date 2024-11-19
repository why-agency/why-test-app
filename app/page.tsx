import FilterList from "@/components/FilterList";
import CatCardGrid from "../components/CatCardGrid";

export default function CatGrid() {
  return (
    <main className="min-h-screen mx-6">
      <h1 className="mt-6 mb-10 text-xl">My cat collection</h1>
      <div className="flex gap-6 lg:max-w-screen-xl lg:mx-auto">
        <FilterList />
        <CatCardGrid />
      </div>
    </main>
  );
}
