export interface Note {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  tags: string[];
}

export interface NoteFormProps {
  editingNote: Note | null;
  onSave: (note: Partial<Note>) => void;
  onCancelEdit: () => void;
}

export interface FilterBarProps {
  filter: string;
  setFilter: (value: string) => void;
  allTags: string[];
  filterTag: string | null;
  setFilterTag: (tag: string | null) => void;
  showArchived: boolean;
  setShowArchived: (value: boolean) => void;
}

export interface NoteItemProps {
  note: Note;
  fetchNotes: () => void;
  handleEdit: (note: Note) => void;
  handleDelete: (id: number) => void;
}
