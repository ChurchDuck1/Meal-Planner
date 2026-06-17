"use client";

export default function Home() {
  const handleGoToProduct = () => {
    window.open(
      "https://www.walmart.com/ip/Foster-Farms-Honey-Crunchy-Corn-Dogs-42-72-oz-16-ct-Frozen/11027831",
      "_blank"
    );
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Meal Planner</h1>
      <p className="mt-4">First POC.</p>

      <button
        onClick={handleGoToProduct}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
      >
        Buy Corn Dogs on Walmart
      </button>
    </main>
  );
}