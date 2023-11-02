"use client";
import { Item, items as itemsArray } from "@/constants";
import { useState, useRef } from "react";
import { arrayMoveImmutable } from "array-move";

export default function Home() {
  const [items, setItems] = useState(itemsArray);
  const [draggedItem, setDraggeditem] = useState<number>(0);
  const [draggedOverItem, setDraggedOveritem] = useState<number>(0);

  const handleDragStart = (index: number) => setDraggeditem(index);

  const handleDragEnter = (index: number) => setDraggedOveritem(index);

  //this is the sorting function
  const handleDragEnd = () => {
    // swap method - swap position between two items and do not affect other items
    // const clonedItems = [...items];
    // const temp = clonedItems[draggedItem];
    // clonedItems[draggedItem] = clonedItems[draggedOverItem];
    // clonedItems[draggedOverItem] = temp;
    // setItems(clonedItems);

    // array move method - move selected item to desired position and update other items position
    const clonedItems = [...items];
    const updateItemsList = arrayMoveImmutable(
      clonedItems,
      draggedItem,
      draggedOverItem
    );
    setItems(updateItemsList);
  };
  const handleDragOver = (event: any) => event.preventDefault();

  return (
    <main className="p-24">
      <h1 className="text-center text-4xl font-bold tracking-wider my-6">
        Drag and Drop Items
      </h1>
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="grid grid-cols-3 gap-8 border rounded-md p-12">
          {items.map((item: Item, index) => (
            <div
              key={item.id}
              className={`bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100 p-3 cursor-move ${
                index === 0 ? "col-span-2 row-span-2 bg-green-500" : ""
              }`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e)}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <h3 className="text-center">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
