"use client";

import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { cn } from "@/lib/utils";

import TextEditorMenuBar from "./text-editor-menu-bar";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const PrescriptionTextEditor = ({
  value,
  onChange,
  className,
}: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: `focus:outline-none h-full p-4 ${className}`,
      },
    },
    onCreate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    autofocus: false,
  });

  return (
    <div className={cn("bg-blue-50 border border-muted rounded-md w-full flex flex-col", className)}>
      <TextEditorMenuBar editor={editor} />
      <div className="h-full [&>div]:h-full flex flex-col overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
export default PrescriptionTextEditor;
