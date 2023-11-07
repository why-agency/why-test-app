import CatList from "./components/CatList";
import Sidebar from "./components/Sidebar";

export default function CatGrid() {
  return (
    <main className="flex md:gap-5 h-screen">
      <Sidebar />
      <CatList />
    </main>
  );
}
