import { useEffect, useState } from "react";
import axios from "axios";
import NoteItem from "./components/NoteItem";
import NoteForm from "./components/NoteForm";
import FilterBar from "./components/FilterBar";
import type { Note } from "./types";
import { Button } from "@/components/ui/button";
import { API_URL } from "../src/lib/api";

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [filter, setFilter] = useState("");
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  const fetchNotes = async () => {
    const res = await axios.get(API_URL);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const saveNote = async (note: Partial<Note>) => {
    if (note.id) {
      await axios.put(`${API_URL}/${note.id}`, note);
    } else {
      await axios.post(API_URL, note);
    }
    setEditingNote(null);
    fetchNotes();
  };

  const deleteNote = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchNotes();
  };

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));

  const filteredNotes = notes.filter((note) => {
    const tagMatch = filterTag ? note.tags.includes(filterTag) : true;
    const textMatch =
      note.title.toLowerCase().includes(filter.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()));
    const archivedMatch = showArchived ? note.archived : !note.archived;
    return tagMatch && textMatch && archivedMatch;
  });

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">📝 Notes App</h1>
        <Button
          onClick={() =>
            setEditingNote({
              id: 0,
              title: "",
              content: "",
              archived: false,
              tags: [],
            })
          }
        >
          Nueva Nota
        </Button>
      </header>

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        allTags={allTags}
        filterTag={filterTag}
        setFilterTag={setFilterTag}
        showArchived={showArchived}
        setShowArchived={setShowArchived}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            fetchNotes={fetchNotes}
            handleEdit={setEditingNote}
            handleDelete={deleteNote}
          />
        ))}
      </div>

      {editingNote && (
        <NoteForm
          editingNote={editingNote}
          onSave={saveNote}
          onCancelEdit={() => setEditingNote(null)}
        />
      )}
    </div>
  );
}
