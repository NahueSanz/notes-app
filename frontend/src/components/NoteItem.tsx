import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";
import axios from "axios";
import type { NoteItemProps } from "../types";
import { API_URL } from "../lib/api";

export default function NoteItem({
  note,
  fetchNotes,
  handleEdit,
  handleDelete,
}: NoteItemProps) {
  const [tagInput, setTagInput] = useState("");

  const addTag = async (e: FormEvent) => {
    e.preventDefault();
    if (!tagInput) return;
    await axios.patch(`${API_URL}/${note.id}/tags`, {
      tag: tagInput,
      action: "add",
    });
    setTagInput("");
    fetchNotes();
  };

  const removeTag = async (tag: string) => {
    await axios.patch(`${API_URL}/${note.id}/tags`, {
      tag,
      action: "remove",
    });
    fetchNotes();
  };

  return (
    <Card className="w-full sm:w-80">
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{note.title}</h3>
          <div className="flex gap-1">
            <Button size="sm" onClick={() => handleEdit(note)}>
              Editar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(note.id)}
            >
              Eliminar
            </Button>
          </div>
        </div>
        <p className="text-gray-700 mb-2">{note.content}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {note.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center bg-gray-200 px-2 py-0.5 rounded-full text-xs"
            >
              <span>{tag}</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeTag(tag)}
                className="ml-1 text-red-500"
              >
                ×
              </Button>
            </div>
          ))}
        </div>

        {/* Agregar tag */}
        <form className="flex gap-2" onSubmit={addTag}>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Nuevo tag"
            className="border px-2 py-1 rounded flex-1"
          />
          <Button type="submit" size="sm">
            Agregar
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          size="sm"
          variant="outline"
          onClick={async () => {
            await axios.patch(`${API_URL}/${note.id}/archive`);
            fetchNotes();
          }}
        >
          {note.archived ? "Desarchivar" : "Archivar"}
        </Button>
      </CardFooter>
    </Card>
  );
}
