import { useState, useEffect } from 'react'

interface Game {
  id: number
  title: string
  category: string
  release_year: number
  rating: number
  is_multiplayer: boolean
}

export function useGames() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('https://game-library-api-a0uf.onrender.com/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching games:', error)
        setLoading(false)
      })
  }, [])

  return { games, loading }
}