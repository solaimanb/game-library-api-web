'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import Loading from '@/app/loading'

interface Game {
  id: number
  title: string;
  rating: number;
  release_year: number;
  category: string;
}

interface GameListProps {
  games: Game[];
  loading: boolean;
}

export default function GameList({ games, loading }: GameListProps) {

  if (loading) {
    return <Loading />
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {games.map(game => (
        <Card key={game.id} className="bg-black text-white hover:shadow-lg border-[#A1FF00]/10 hover:border-[#A1FF00]/20 hover:cursor-pointer duration-300 transition-all rounded-none flex flex-col justify-between">
          <CardHeader className="overflow-hidden">
            {/* <Image
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover"
              layout="fill"
            /> */}
            <p className="text-[#A1FF00] text-7xl opacity-5 font-bold">{game.rating.toFixed(1)}</p>
          </CardHeader>

          <CardContent className='p-2'>
            <CardContent className="px-4 py-3">
              <div className="flex items-center justify-betwee gap-4 mb-2">
                <Badge variant="default" className="text-[#A1FF00] text-[10px] font-bold uppercase">
                  {game.category}
                </Badge>
                <span className="text-[#A1FF00] text-[10px] font-bold">{game.release_year}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
            </CardContent>

            <CardFooter className="bg-[#1A1A1A] mt-auto px-4 py-3 flex items-center justify-between">
              <span className="text-[#A1FF00] text-xs font-semibold">Metacritic Score</span>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge className="text-xs font-bold uppercase bg-[#A1FF00] text-black hover:text-[#A1FF00] transition-all duration-300 px-2 py-1 space-x-2">
                      <span className="flex items-center">
                        View Details <ArrowUpRight />
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
      ))
      }
    </div >
  )
}