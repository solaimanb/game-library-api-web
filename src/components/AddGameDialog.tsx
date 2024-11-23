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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import useGameCategories from '@/hooks/useGameCategories';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const { categories, loading, error } = useGameCategories();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (title.length < 2 || title.length > 100) {
      newErrors.title = 'Title must be between 2 and 100 characters.';
    }
    if (!category) {
      newErrors.category = 'Category is required.';
    }
    if (releaseYear <= 1970 || releaseYear >= 2025) {
      newErrors.release_year = 'Release year must be between 1971 and 2024.';
    }
    if (rating < 0 || rating > 10) {
      newErrors.rating = 'Rating must be between 0 and 10.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddGame = () => {
    if (!validateForm()) {
      return;
    }

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

  const handleScroll = (event: React.WheelEvent) => {
    event.stopPropagation();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="border border-[#A1FF00]/10 bg-[#A1FF00]/20 hover:bg-[#A1FF00]/10 hover:text-[#A1FF00] transition-all duration-300">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-sm sm:max-w-sm bg-zinc-400/20 backdrop-blur-2xl text-white border-[#A1FF00]/10 border-2">
        <DialogHeader>
          <DialogTitle>Add New Game</DialogTitle>
          <DialogDescription className="text-xs">
            Fill out the form to add a new game to your library.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="title" className="text-left">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter game title"
              className="col-span-3 border border-[#A1FF00]/40 placeholder:text-xs"
            />
            {errors.title && <p className="col-span-4 text-red-500 text-xs">{errors.title}</p>}
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="category" className="text-left">
              Category
            </Label>
            <Select
              value={category}
              onValueChange={(value: string) => setCategory(value)}
            >
              <SelectTrigger className="col-span-3 border border-[#A1FF00]/40">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-40 overflow-hidden" onWheel={handleScroll}>
                  {categories?.map((cat: string) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
            {errors.category && <p className="col-span-4 text-red-500 text-xs">{errors.category}</p>}
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="release-year" className="text-left">
              Release Year
            </Label>
            <Select
              value={releaseYear.toString()}
              onValueChange={(value: string) => setReleaseYear(parseInt(value))}
            >
              <SelectTrigger className="col-span-3 border border-[#A1FF00]/40">
                <SelectValue placeholder="Select a year" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-40 overflow-hidden" onWheel={handleScroll}>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
            {errors.release_year && <p className="col-span-4 text-red-500 text-xs">{errors.release_year}</p>}
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="rating" className="text-left">
              Rating
            </Label>
            <Input
              id="rating"
              type="number"
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
              placeholder="Enter rating (0-10)"
              className="col-span-3 border border-[#A1FF00]/40"
            />
            {errors.rating && <p className="col-span-4 text-red-500 text-xs">{errors.rating}</p>}
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="is-multiplayer" className="text-left">
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