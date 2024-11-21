import CatCardGrid from "../components/CatCardGrid";

export default function Page({searchParams} : {searchParams: any}) {
  return (
    <main className="min-h-screen mx-6">
      <h1 className="mt-6 mb-10 text-xl">My cat collection</h1>
      <CatCardGrid filter={searchParams} />
    </main>
  );
}
