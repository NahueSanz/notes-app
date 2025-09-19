import { Button } from "@/components/ui/button";
import type { FilterBarProps } from "../types";

export default function FilterBar({
  filter,
  setFilter,
  allTags,
  filterTag,
  setFilterTag,
  showArchived,
  setShowArchived,
}: FilterBarProps) {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <input
        type="text"
        placeholder="Filter by title or tag"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border px-2 py-1 rounded w-full max-w-md"
      />

      <div className="flex gap-2 flex-wrap">
        {allTags.map((tag) => (
          <Button
            key={tag}
            size="sm"
            variant={filterTag === tag ? "default" : "outline"}
            onClick={() => setFilterTag(filterTag === tag ? null : tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant={!showArchived ? "default" : "outline"}
          onClick={() => setShowArchived(false)}
        >
          Active
        </Button>
        <Button
          size="sm"
          variant={showArchived ? "default" : "outline"}
          onClick={() => setShowArchived(true)}
        >
          Archived
        </Button>
      </div>
    </div>
  );
}
