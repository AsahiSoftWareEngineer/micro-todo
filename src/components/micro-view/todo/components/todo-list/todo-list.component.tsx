import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Task } from "@/models/task";
import { XIcon } from "lucide-react";

type Props = {
  items: Task[];
  onItemClick?: (item: Task) => void;
  onRemoveItem?: (item: Task) => void;
};

export const TodolistComponent = ({ items, onItemClick, onRemoveItem }: Props) => {
  return (
    <div className="h-full overflow-scroll flex flex-col items-center">
      {!items.length && <Label className="text-gray-500 mt-12 text-lg">No Todos</Label>}
      {items.map((item) => (
        <div
          id={item.id}
          key={item.id}
          className={`shrink-0 w-11/12 no-drag rounded hover:bg-gray-100  text-gray-700 h-12 flex items-center ${
            item.isChecked ? "line-through text-gray-400 " : ""
          }`}
        >
          <div className="w-full relative h-full ">
            <span className="w-full absolute h-full overflow-hidden z-0 flex justify-start left-0">
              <span className={item.isChecked ? "animate-pulsate absolute top-0 w-full h-full" : ""}></span>
            </span>
            <span className="w-full absolute h-full block z-10">
              <Button
                variant={"ghost"}
                className="cursor-pointer no-drag top-0 z-10 h-full bg-transparent hover:bg-transparent py-2 px-2"
                onClick={() => onItemClick?.(item)}
              >
                <Label className={item.isChecked ? "line-through text-gray-400 " : ""}>{item.title}</Label>
              </Button>
            </span>
          </div>
          <Button className="right-0 no-drag cursor-pointer" variant={"ghost"} onClick={() => onRemoveItem?.(item)}>
            <XIcon />
          </Button>
        </div>
      ))}
    </div>
  );
};
