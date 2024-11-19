import CatCardGrid from "../components/CatCardGrid";

export default function CatGrid() {
  return (
    <main className="flex min-h-screen flex-col gap-6 items-center justify-between mx-6">
      <h1>My cat collection</h1>
      <CatCardGrid />
    </main>
  );
}
