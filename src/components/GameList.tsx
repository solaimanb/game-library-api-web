'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Skeleton } from './ui/skeleton'

interface Game {
  id: number
  title: string;
  rating: number;
  release_year: number;
  category: string;
  isLoading?: boolean;
}

interface GameListProps {
  games: Game[];
  loading: boolean;
}

export default function GameList({ games, loading }: GameListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {loading ? (
        [...Array(4)].map((_, index) => <GameCardSkeleton key={index} />)
      ) : (
        games.map(game => (
          game.isLoading ? (
            <GameCardSkeleton key={`loading-${game.id}`} />
          ) : (
            <GameCard key={game.id} game={game} />
          )
        ))
      )}
    </div>
  )
}

const GameCard = ({ game }: { game: Game }) => (
  <Card
    key={game.id}
    className="bg-black text-white hover:shadow-lg border-glagreen/20 hover:border-glagreen/40 hover:cursor-pointer duration-300 transition-all rounded-sm flex flex-col justify-between"
  >
    <CardHeader className="overflow-hidden">
      <p className="text-glagreen text-7xl opacity-10 font-bold">
        {game.rating.toFixed(1)}
      </p>
    </CardHeader>
    <CardContent className='p-2'>
      <CardContent className="px-4 py-3">
        <div className="flex items-center justify-between gap-4 mb-2">
          <Badge variant="default" className="text-glagreen text-[10px] font-bold uppercase">
            {game.category}
          </Badge>
          <span className="text-glagreen text-[10px] font-bold">
            {game.release_year}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{game.title}</h3>
      </CardContent>
      <CardFooter className="bg-[#1A1A1A] mt-auto px-2 py-3 flex items-center justify-between">
        <span className="text-glagreen text-xs font-semibold">
          Metacritic Score
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge className="text-[10px] font-bold uppercase bg-glagreen text-black hover:text-glagreen transition-all duration-300 px-2 py-1 space-x-2">
                <span className="flex items-center">
                  View Details <ArrowUpRight size={18} />
                </span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Available on v0.2</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </CardContent>
  </Card>
)

const GameCardSkeleton = () => (
  <Card className="bg-black text-white border-glagreen/20 rounded-none flex flex-col justify-between">
    <CardHeader className="overflow-hidden">
      <Skeleton className="h-24 w-full bg-gray-700/20" />
    </CardHeader>
    <CardContent className='p-2'>
      <CardContent className="px-4 py-3">
        <div className="flex items-center justify-between gap-4 mb-2">
          <Skeleton className="h-5 w-20 bg-gray-700/20" />
          <Skeleton className="h-5 w-16 bg-gray-700/20" />
        </div>
        <Skeleton className="h-8 w-3/4 bg-gray-700/20 mb-2" />
      </CardContent>
      <CardFooter className="bg-[#1A1A1A] mt-auto px-2 py-3 flex items-center justify-between">
        <Skeleton className="h-4 w-28 bg-gray-700/20" />
        <Skeleton className="h-6 w-24 bg-gray-700/20" />
      </CardFooter>
    </CardContent>
  </Card>
)