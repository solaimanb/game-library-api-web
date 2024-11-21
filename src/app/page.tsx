import GameList from "@/components/game-list";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">GAME-LIBRARY-API WEB</h1>
        <GameList />
      </div>
    </main>
  );
}
