'use client';

import React, { useState, useCallback } from 'react';
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
} from "@/components/ui/select";
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
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    releaseYear: 0,
    rating: 0,
    isMultiplayer: false,
  });
  const { categories } = useGameCategories();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (formData.title.length < 2 || formData.title.length > 100) {
      newErrors.title = 'Title must be between 2 and 100 characters.';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required.';
    }
    if (formData.releaseYear <= 1970 || formData.releaseYear >= 2025) {
      newErrors.release_year = 'Release year must be between 1971 and 2024.';
    }
    if (formData.rating < 0 || formData.rating > 10) {
      newErrors.rating = 'Rating must be between 0 and 10.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddGame = useCallback(() => {
    if (!validateForm()) {
      return;
    }

    onAddGame({
      title: formData.title,
      category: formData.category,
      release_year: formData.releaseYear,
      rating: formData.rating,
      is_multiplayer: formData.isMultiplayer,
    });
    setFormData({
      title: '',
      category: '',
      releaseYear: 0,
      rating: 0,
      isMultiplayer: false,
    });
    setOpen(false);
  }, [formData, onAddGame]);

  const handleScroll = (event: React.WheelEvent) => {
    event.stopPropagation();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="border border-glagreen/10 bg-glagreen/20 hover:bg-glagreen/10 hover:text-glagreen transition-all duration-300">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-sm sm:max-w-sm bg-zinc-400/20 backdrop-blur-2xl text-white border-glagreen/10 border-2">
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
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter game title"
              className="col-span-3 border border-glagreen/40 placeholder:text-xs"
            />
            {errors.title && <p className="col-span-4 text-red-500 text-xs">{errors.title}</p>}
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="category" className="text-left">
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value: string) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="col-span-3 border border-glagreen/40">
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
              value={formData.releaseYear.toString()}
              onValueChange={(value: string) => setFormData({ ...formData, releaseYear: parseInt(value) })}
            >
              <SelectTrigger className="col-span-3 border border-glagreen/40">
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
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              placeholder="Enter rating (0-10)"
              className="col-span-3 border border-glagreen/40"
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
                checked={formData.isMultiplayer}
                onChange={(e) => setFormData({ ...formData, isMultiplayer: e.target.checked })}
              />
              <label htmlFor="is-multiplayer" className="text-white">
                Yes
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddGame} className='text-glagreen bg-glagreen/20 hover:bg-glagreen/20 font-bold'>
            Save Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGameDialog;