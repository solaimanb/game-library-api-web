'use client';

import AddGameDialog from "@/components/AddGameDialog";
import GameList from "@/components/GameList";
import { useGames } from "@/hooks/useGames";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { games, loading, addGame } = useGames();

  return (
    <main className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between mb-10 border border-glagreen/10 p-2 rounded-sm">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-center text-white">🎮 GAME-LIBRARY-API </h1>
            <sup>
              <Badge variant="default" className="text-glagreen font-bold lowercase">
                WEB
              </Badge>
            </sup>
          </div>
          <AddGameDialog onAddGame={addGame} />
        </div>
        <GameList games={games} loading={loading} />
      </div>
    </main>
  );
}
