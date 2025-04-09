import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchExpanded, setSearchExpanded] = useState(false);

  const handleSearchClick = () => setSearchExpanded((prev) => !prev);

  return (
    <div className="ml-auto flex-1 sm:flex-initial relative">
      <div className="flex items-center">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleSearchClick}
          className="relative z-10"
        >
          <Search />
          <span className="sr-only">Search Providers</span>
        </Button>

        <div
          className={`absolute right-0 top-0 flex items-center overflow-hidden transition-all duration-300 ${
            searchExpanded
              ? "w-full opacity-100 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              : "w-0 opacity-0"
          }`}
        >
          <form className="w-full pl-8" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="search"
              placeholder="Search providers..."
              className="w-full !ring-0"
              onChange={(e) => onSearch(e.target.value)}
              onBlur={() => setSearchExpanded(false)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
