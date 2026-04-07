import { useDraggable } from "@dnd-kit/react";

export function Draggable({ children }: { children: React.ReactNode }) {
  const { ref } = useDraggable({
    id: "draggable",
  });

  return <button ref={ref}>{children}</button>;
}
