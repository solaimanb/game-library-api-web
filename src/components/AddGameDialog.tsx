'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface AddGameDialogProps {
  onAddGame: (game: {
    title: string;
    category: string;
    release_year: number;
    rating: number;
    is_multiplayer: boolean;
  }) => void;
}

const AddGameDialog: React.FC<AddGameDialogProps> = ({ onAddGame }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [releaseYear, setReleaseYear] = useState(0);
  const [rating, setRating] = useState(0);
  const [isMultiplayer, setIsMultiplayer] = useState(false);

  const handleAddGame = () => {
    onAddGame({
      title,
      category,
      release_year: releaseYear,
      rating,
      is_multiplayer: isMultiplayer,
    });
    setTitle('');
    setCategory('');
    setReleaseYear(0);
    setRating(0);
    setIsMultiplayer(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="bg-transparent border border-[#A1FF00]/10 hover:bg-[#A1FF00]/10 hover:text-[#A1FF00] transition-all duration-300">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-zinc-400/20 backdrop-blur-2xl text-white border-[#A1FF00]/10 border-2">
        <DialogHeader>
          <DialogTitle>Add New Game</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new game to your library.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3 border border-[#A1FF00]/40"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="col-span-3 border border-[#A1FF00]/40"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="release-year" className="text-right">
              Release Year
            </Label>
            <Input
              id="release-year"
              type="number"
              value={releaseYear}
              onChange={(e) => setReleaseYear(parseInt(e.target.value))}
              className="col-span-3 border border-[#A1FF00]/40"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-right">
              Rating
            </Label>
            <Input
              id="rating"
              type="number"
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
              className="col-span-3 border border-[#A1FF00]/40"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is-multiplayer" className="text-right">
              Multiplayer
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <input
                id="is-multiplayer"
                type="checkbox"
                checked={isMultiplayer}
                onChange={(e) => setIsMultiplayer(e.target.checked)}
              />
              <label htmlFor="is-multiplayer" className="text-white">
                Yes
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddGame} className='text-[#A1FF00] bg-[#A1FF00]/20 hover:bg-[#A1FF00]/20 font-bold'>
            Save Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGameDialog;