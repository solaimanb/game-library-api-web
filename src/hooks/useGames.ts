'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';
import axiosInstance from '@/lib/axiosInstance';
import axios from 'axios';

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
      const response = await axiosInstance.get('/games/');
      setGames(response.data);
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
      const response = await axiosInstance.post('/games/', newGame);
      const addedGame = response.data;

      setGames(currentGames => [...currentGames, addedGame]);

      toast({
        title: "Success",
        description: "Game added successfully!",
      });

      return { success: true, addedGame };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to add game. Please try again.';
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
          duration: 2000,
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
          duration: 2000,
        });
      }
      toast({
        title: "Error",
        description: "Failed to add game. Please try again.",
        variant: "destructive",
        duration: 2000,
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return { games, loading, addGame };
}