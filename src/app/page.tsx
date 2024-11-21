'use client';

import AddGameDialog from "@/components/AddGameDialog";
import GameList from "@/components/GameList";
import { useGames } from "@/hooks/useGames";
import Loading from "./loading";

export default function Home() {
  const { games, loading, addGame } = useGames();

  if (loading) {
    return <Loading />
  }

  return (
    <main className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between mb-10 border border-[#A1FF00]/10 p-2 rounded-sm">
          <h1 className="text-2xl font-bold text-center text-white">GAME-LIBRARY-API WEB</h1>
          <AddGameDialog onAddGame={addGame} />
        </div>
        <GameList games={games} loading={loading} />
      </div>
    </main>
  );
}
