'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';

interface Game {
  id: number;
  title: string;
  category: string;
  release_year: number;
  rating: number;
  is_multiplayer: boolean;
}

interface NewGame {
  title: string;
  category: string;
  release_year: number;
  rating: number;
  is_multiplayer: boolean;
}

export function useGames() {
  const { toast } = useToast();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGames = useCallback(async () => {
    try {
      const response = await fetch('https://game-library-api-a0uf.onrender.com/games');
      if (!response.ok) throw new Error('Failed to fetch games');
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
      toast({
        title: "Error",
        description: "Failed to fetch games. Please refresh the page.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const addGame = async (newGame: NewGame) => {
    try {
      const response = await fetch('https://game-library-api-a0uf.onrender.com/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGame),
      });

      if (!response.ok) throw new Error('Failed to add game');
      const addedGame = await response.json();

      setGames(currentGames => [...currentGames, addedGame]);

      toast({
        title: "Success",
        description: "Game added successfully!",
      });

      return { success: true, addedGame };
    } catch (error) {
      console.error('Error adding game:', error);
      toast({
        title: "Error",
        description: "Failed to add game. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return { games, loading, addGame };
}