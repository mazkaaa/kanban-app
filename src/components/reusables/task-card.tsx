"use client";
import { useDraggable } from "@dnd-kit/core";
import Link from "next/link";

interface PROPS {
  id: string;
  name: string;
  description: string;
  team: string[];
  href?: string;
}

export const TaskCard = ({ id, description, name, team, href }: PROPS) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="space-y-4 rounded-lg bg-zinc-800 p-4 text-background dark:bg-zinc-200"
    >
      <section className="">
        <Link href={href || "#"}>
          <h3 className="text-base font-bold underline">{name}</h3>
        </Link>
        {description && <p className="text-sm">{description}</p>}
      </section>
      {team.length > 0 && (
        <div className="text-sm">
          {team.map((item, index) => (
            <span
              key={index}
              className="border-b border-dashed border-background"
            >
              {item}
              {index !== team.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
