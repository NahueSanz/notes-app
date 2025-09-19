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
    <Card className="glass-panel card-elev w-full sm:w-80 text-slate-100">
      <CardContent>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold">{note.title}</h3>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="btn-accent"
              onClick={() => handleEdit(note)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="btn-accent"
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </Button>
          </div>
        </div>

        <p className="text-slate-300 mb-3">{note.content}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.map((tag) => (
            <div key={tag} className="tag-pill flex items-center gap-1">
              <span>{tag}</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeTag(tag)}
                className="ml-1 text-red-400 hover:text-red-300"
              >
                ×
              </Button>
            </div>
          ))}
        </div>

        {/* Add tag form */}
        <form className="flex gap-2" onSubmit={addTag}>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="New tag"
            className="glass-panel border border-slate-600/40 px-2 py-1 rounded flex-1 text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <Button type="submit" size="sm" className="btn-accent">
            Add
          </Button>
        </form>
      </CardContent>

      <CardFooter className="mt-2">
        <Button
          size="sm"
          variant="outline"
          onClick={async () => {
            await axios.patch(`${API_URL}/${note.id}/archive`);
            fetchNotes();
          }}
        >
          {note.archived ? "Unarchive" : "Archive"}
        </Button>
      </CardFooter>
    </Card>
  );
}
