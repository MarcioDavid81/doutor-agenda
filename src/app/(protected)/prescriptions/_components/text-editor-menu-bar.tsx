"use client";

import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

type MenuBarProps = {
  editor: Editor | null;
}

const TextEditorMenuBar = ({ editor }: MenuBarProps) => {
if (!editor) {
    return null;
  }

  const ACTIONS = [
  {
    label: "Negrito",
    icon: Bold,
    action: () => editor.chain().focus().toggleBold().run(),
    active: editor.isActive("bold"),
  },
  {
    label: "Itálico",
    icon: Italic,
    action: () => editor.chain().focus().toggleItalic().run(),
    active: editor.isActive("italic"),
  },
  {
    label: "Riscado",
    icon: Strikethrough,
    action: () => editor.chain().focus().toggleStrike().run(),
    active: editor.isActive("strike"),
  },
  {
    label: "Sublinhado",
    icon: Underline,
    action: () => editor.chain().focus().toggleUnderline().run(),
    active: editor.isActive("underline"),
  },
  {
    label: "Lista",
    icon: List,
    action: () => editor.chain().focus().toggleBulletList().run(),
    active: editor.isActive("bulletList"),
  },
  {
    label: "Lista ordenada",
    icon: ListOrdered,
    action: () => editor.chain().focus().toggleOrderedList().run(),
    active: editor.isActive("orderedList"),
  },
  {
    label: "Alinhar Esquerda",
    icon: AlignLeft,
    action: () => editor.chain().focus().setTextAlign("left").run(),
    active: editor.isActive({ textAlign: "left" }),
  },
  {
    label: "Alinhar Centro",
    icon: AlignCenter,
    action: () => editor.chain().focus().setTextAlign("center").run(),
    active: editor.isActive({ textAlign: "center" }),
  },
  {
    label: "Alinhar Direita",
    icon: AlignRight,
    action: () => editor.chain().focus().setTextAlign("right").run(),
    active: editor.isActive({ textAlign: "right" }),
  },
  {
    label: "Alinhar Justificado",
    icon: AlignJustify,
    action: () => editor.chain().focus().setTextAlign("justify").run(),
    active: editor.isActive({ textAlign: "justify" }),
  },
];

  return (
    <div className="flex items-center border-b p-2 flex-wrap">
      {ACTIONS.map(({ label, icon: Icon, action, active }) => (
        <Tooltip key={label}>
          <Button
          onClick={action}
          className={`p-2 rounded-md hover:bg-gray-200 focus:outline-none ${active ? "bg-gray-300" : ""}`}
          title={label}
          variant={active ? "secondary" : "ghost"}
          type="button"
          aria-label={label}
        >
          <Icon className="h-5 w-5" />
        </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default TextEditorMenuBar;
