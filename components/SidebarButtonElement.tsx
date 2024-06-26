import React from "react";
import { FormElement } from "./FormElement";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "../lib/utils";

function SidebarButtonElement({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerButtonElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"outline"}
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="w-8 h-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}
export function SidebarButtonElementDragOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerButtonElement;
  return (
    <Button
      variant={"outline"}
      className={cn("flex flex-col gap-2 h-[120px] w-[120px] cursor-grab")}
    >
      <Icon className="w-8 h-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}
export default SidebarButtonElement;
