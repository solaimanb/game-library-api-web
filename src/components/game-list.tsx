'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useGames } from '@/hooks/useGames'
import Loading from '@/app/loading'

export default function GameList() {
  const { games, loading } = useGames()
  console.log(games)

  if (loading) {
    return <Loading />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {games.map(game => (
        <Card key={game.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">{game.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary">{game.category}</Badge>
              <Badge variant="secondary">{game.release_year}</Badge>
              <Badge variant="secondary">{game.is_multiplayer ? 'Multiplayer' : 'Single Player'}</Badge>
            </div>
            <div className="text-sm text-gray-600">
              Rating: <span className="font-semibold">{game.rating}/10</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}