import {
  Apple,
  Car,
  Component,
  Dog,
  Flag,
  Lightbulb,
  PersonStanding,
  Smile,
  Volleyball,
} from "lucide-react";
import { useState } from "react";
import {
  activities,
  animalsnature,
  flags,
  fooddrink,
  objects,
  peoplebody,
  smilesemotions,
  symbols,
  travelplaces,
} from "~/data/emoji";

interface Props {
  onSelection: (emoji: string) => void;
}
export default function EmojiPicker({ onSelection }: Props) {
  const [Category, setCategory] = useState(0);

  return (
    <div className="absolute">
      <div className="flex justify-evenly bg-neutral-200 w-96">
        <div
          className="p-2 hover:text-primary cursor-pointer"
          onClick={() => setCategory(0)}
        >
          <Smile />
        </div>
        <div
          className="p-2 hover:text-primary cursor-pointer"
          onClick={() => setCategory(1)}
        >
          <PersonStanding />
        </div>
        <div
          className="p-2 hover:text-primary cursor-pointer"
          onClick={() => setCategory(2)}
        >
          <Dog />
        </div>
        <div
          className="p-2 hover:text-primary cursor-pointer"
          onClick={() => setCategory(3)}
        >
          <Apple />
        </div>
        <div
          className="p-2 hover:text-primary cursor-pointer"
          onClick={() => setCategory(4)}
        >
          <Car />
        </div>
        <div
          className="p-2 hover:text-primary cursor-pointer"
          onClick={() => setCategory(5)}
        >
          <Volleyball />
        </div>
        <div
          className="p-2 hover:text-primary cursor-pointer"
          onClick={() => setCategory(6)}
        >
          <Lightbulb />
        </div>
        <div
          className="p-2 hover:text-primary cursor-pointer"
          onClick={() => setCategory(7)}
        >
          <Component />
        </div>
        <div
          className="p-2 hover:text-primary cursor-pointer"
          onClick={() => setCategory(8)}
        >
          <Flag />
        </div>
      </div>
      <div className="bg-white w-96 overflow-auto h-48 grid grid-cols-12 px-2">
        {Category == 0 &&
          smilesemotions.map((subcategory) => {
            return subcategory.map((emoji) => {
              return (
                <div
                  className="hover:scale-150 inline-block cursor-pointer"
                  onClick={() => onSelection(emoji.emoji)}
                  key={emoji.emoji}
                >
                  {emoji.emoji}
                </div>
              );
            });
          })}
        {Category == 1 &&
          peoplebody.map((subcategory) => {
            return subcategory.map((emoji) => {
              return (
                <div
                  className="hover:scale-150 inline-block cursor-pointer"
                  onClick={() => onSelection(emoji.emoji)}
                  key={emoji.emoji}
                >
                  {emoji.emoji}
                </div>
              );
            });
          })}
        {Category == 2 &&
          animalsnature.map((subcategory) => {
            return subcategory.map((emoji) => {
              return (
                <div
                  className="hover:scale-150 inline-block cursor-pointer"
                  onClick={() => onSelection(emoji.emoji)}
                  key={emoji.emoji}
                >
                  {emoji.emoji}
                </div>
              );
            });
          })}
        {Category == 3 &&
          fooddrink.map((subcategory) => {
            return subcategory.map((emoji) => {
              return (
                <div
                  className="hover:scale-150 inline-block cursor-pointer"
                  onClick={() => onSelection(emoji.emoji)}
                  key={emoji.emoji}
                >
                  {emoji.emoji}
                </div>
              );
            });
          })}
        {Category == 4 &&
          travelplaces.map((subcategory) => {
            return subcategory.map((emoji) => {
              return (
                <div
                  className="hover:scale-150 inline-block cursor-pointer"
                  onClick={() => onSelection(emoji.emoji)}
                  key={emoji.emoji}
                >
                  {emoji.emoji}
                </div>
              );
            });
          })}
        {Category == 5 &&
          activities.map((subcategory) => {
            return subcategory.map((emoji) => {
              return (
                <div
                  className="hover:scale-150 inline-block cursor-pointer"
                  onClick={() => onSelection(emoji.emoji)}
                  key={emoji.emoji}
                >
                  {emoji.emoji}
                </div>
              );
            });
          })}
        {Category == 6 &&
          objects.map((subcategory) => {
            return subcategory.map((emoji) => {
              return (
                <div
                  className="hover:scale-150 inline-block cursor-pointer"
                  onClick={() => onSelection(emoji.emoji)}
                  key={emoji.emoji}
                >
                  {emoji.emoji}
                </div>
              );
            });
          })}
        {Category == 7 &&
          symbols.map((subcategory) => {
            return subcategory.map((emoji) => {
              return (
                <div
                  className="hover:scale-150 inline-block cursor-pointer"
                  onClick={() => onSelection(emoji.emoji)}
                  key={emoji.emoji}
                >
                  {emoji.emoji}
                </div>
              );
            });
          })}
        {Category == 8 &&
          flags.map((subcategory) => {
            return subcategory.map((emoji) => {
              return (
                <div
                  className="hover:scale-150 inline-block cursor-pointer"
                  onClick={() => onSelection(emoji.emoji)}
                  key={emoji.emoji}
                >
                  {emoji.emoji}
                </div>
              );
            });
          })}
      </div>
    </div>
  );
}
