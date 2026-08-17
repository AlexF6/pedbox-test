// src/pages/CharacterList.tsx
import { useState, useEffect } from "react";
import type { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import type { Character, Pagination, CharacterFilters } from "../types";
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, X, MapPin, ArrowRight } from "lucide-react";

export const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [page, setPage] = useState(1);
  const [jumpPageInput, setJumpPageInput] = useState("");
  const [filters, setFilters] = useState<CharacterFilters>({
    name: "",
    status: "",
    species: "",
    gender: "",
  });

  const [inputName, setInputName] = useState("");

  const fetchCharacters = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/characters", {
        params: {
          page,
          limit: 12,
          ...filters,
        },
      });
      setCharacters(response.data.data);
      setPagination(response.data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.error || "Error loading characters from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [page, filters]);

  const handleSearchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, name: inputName }));
    setPage(1);
  };

  const handleFilterChange = (field: keyof CharacterFilters, value: string) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearAllFilters = () => {
    setInputName("");
    setPage(1);
    setFilters({ name: "", status: "", species: "", gender: "" });
  };

  const clearSearch = () => {
    setInputName("");
    setFilters((prev) => ({ ...prev, name: "" }));
    setPage(1);
  };

  // Direct Page Jump Handler
  const handleJumpToPage = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!pagination) return;

    const targetPage = parseInt(jumpPageInput, 10);
    if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= pagination.totalPages) {
      setPage(targetPage);
      setJumpPageInput("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const hasActiveFilters = Boolean(filters.status || filters.gender || filters.species);
  const isSearchActive = Boolean(filters.name || hasActiveFilters);

  const getPageNumbers = (currentPage: number, totalPages: number) => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="space-y-8 pb-12 font-sans selection:bg-[#97ce4c] selection:text-black">
      
      <div className="rounded-2xl border border-[#2D323E] bg-[#1C1F26] p-4 sm:p-5 shadow-lg relative z-10">
        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-3 h-5 w-5 transition-colors group-focus-within:text-[#97ce4c]" />
            <input
              type="text"
              placeholder="Search database..."
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="w-full rounded-xl border border-[#2D323E] bg-[#13151A] py-2.5 pl-11 pr-10 text-sm placeholder-gray-500 outline-none transition-all duration-300 focus:ring-1 focus:ring-[#97ce4c]"
            />
            {inputName && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-3 text-gray-500 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="hidden sm:block rounded-xl bg-[#97ce4c] px-6 py-2.5 text-sm font-bold text-[#13151A] transition-all hover:bg-[#86b843] active:scale-95 shadow-[0_0_10px_rgba(151,206,76,0.1)] hover:shadow-[0_0_15px_rgba(151,206,76,0.3)]"
          >
            Search
          </button>
          
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`h-full rounded-xl border px-3 sm:px-4 py-2.5 transition-all active:scale-95 flex items-center justify-center ${
                showFilters || hasActiveFilters
                  ? "border-[#97ce4c] bg-[#97ce4c]/10 text-[#97ce4c]" 
                  : "border-[#2D323E] bg-[#13151A] text-gray-400 hover:text-white hover:border-gray-500"
              }`}
            >
              <SlidersHorizontal size={20} />
            </button>
            {hasActiveFilters && !showFilters && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#97ce4c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#97ce4c]"></span>
              </span>
            )}
          </div>
        </form>

        {showFilters && (
          <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[#2D323E] pt-5 sm:grid-cols-2 md:grid-cols-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full rounded-lg border border-[#2D323E] bg-[#13151A] px-3 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#97ce4c] appearance-none cursor-pointer"
              >
                <option value="">Any Status</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase">Gender</label>
              <select
                value={filters.gender}
                onChange={(e) => handleFilterChange("gender", e.target.value)}
                className="w-full rounded-lg border border-[#2D323E] bg-[#13151A] px-3 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#97ce4c] appearance-none cursor-pointer"
              >
                <option value="">Any Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Genderless">Genderless</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-2 md:col-span-1">
              <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase">Species</label>
              <input
                type="text"
                value={filters.species}
                onChange={(e) => handleFilterChange("species", e.target.value)}
                placeholder="e.g. Human, Alien"
                className="w-full rounded-lg border border-[#2D323E] bg-[#13151A] px-3 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#97ce4c]"
              />
            </div>

            <div className="flex items-center justify-between sm:col-span-2 md:col-span-3 pt-2">
              <span className="text-xs text-gray-500">
                {hasActiveFilters ? "Filters are currently applied." : "No advanced filters applied."}
              </span>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-sm font-medium text-[#97ce4c] transition-colors hover:text-white flex items-center"
              >
                <X size={16} className="mr-1" /> Clear all
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-center">
          <p className="text-sm font-medium text-red-400">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex flex-row overflow-hidden rounded-2xl border border-[#2D323E] bg-[#1C1F26] sm:flex-col animate-pulse">
              <div className="h-28 w-28 shrink-0 bg-[#2D323E] sm:h-56 sm:w-full"></div>
              <div className="flex flex-1 flex-col justify-center p-4 space-y-3">
                <div className="h-5 bg-[#2D323E] rounded-md w-3/4"></div>
                <div className="h-3 bg-[#2D323E] rounded-md w-1/2"></div>
                <div className="h-3 bg-[#2D323E] rounded-md w-5/6 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : characters.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#2D323E] bg-[#1C1F26] py-24 text-center shadow-sm">
          <span className="text-5xl mb-4 opacity-40">🛰️</span>
          <h3 className="text-xl font-bold text-white">No signals found</h3>
          <p className="mt-2 max-w-sm text-sm text-gray-400">
            {isSearchActive 
              ? "We couldn't find any entities matching those coordinates or filters." 
              : "The multiverse database is empty. Click 'Sync Data' in the top bar to pull entities."}
          </p>
          {isSearchActive && (
            <button 
              onClick={clearAllFilters}
              className="mt-6 rounded-lg bg-[#2D323E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-600"
            >
              Clear Search & Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {characters.map((char) => (
              <Link
                key={char.id}
                to={`/character/${char.id}`}
                className="group flex flex-row overflow-hidden rounded-2xl border border-[#2D323E] bg-[#1C1F26] transition-all duration-300 hover:-translate-y-1 hover:border-[#97ce4c]/50 hover:shadow-[0_8px_30px_rgba(151,206,76,0.15)] sm:flex-col"
              >
                <div className="relative h-32 w-32 shrink-0 overflow-hidden sm:h-56 sm:w-full border-r border-[#2D323E] sm:border-r-0 sm:border-b">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-trom-[#1C1F26] via-transparent to-transparent opacity-90 sm:hidden"></div>
                </div>

                <div className="flex flex-1 flex-col justify-center p-4 sm:p-5 relative">
                  <h3 className="truncate text-lg font-bold text-white transition-colors group-hover:text-[#97ce4c]">
                    {char.name}
                  </h3>
                  
                  <div className="mt-1.5 flex items-center space-x-2 text-xs font-medium text-gray-400">
                    <span
                      className={`relative flex h-2.5 w-2.5 rounded-full ${
                        char.status === "Alive" ? "bg-[#97ce4c]" : char.status === "Dead" ? "bg-red-500" : "bg-gray-500"
                      }`}
                    >
                      {char.status === "Alive" && (
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#97ce4c] opacity-40"></span>
                      )}
                    </span>
                    <span className="truncate">
                      {char.status} — {char.species}
                    </span>
                  </div>

                  {char.location && (
                    <div className="mt-4 pt-4 border-t border-[#2D323E]/50">
                      <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1">Last Known Location</p>
                      <p className="flex items-center text-xs text-gray-300">
                        <MapPin size={12} className="mr-1.5 text-gray-500 shrink-0" />
                        <span className="truncate">{char.location.name}</span>
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between rounded-xl border border-[#2D323E] bg-[#1C1F26] p-3 shadow-lg">
              
              <button
                disabled={page === 1}
                onClick={() => {
                  setPage((p) => p - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center rounded-lg px-3 py-2 text-sm font-semibold text-gray-400 transition-colors hover:bg-[#2D323E] hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:px-4"
              >
                <ChevronLeft size={18} className="mr-1" /> <span className="hidden sm:inline">Prev</span>
              </button>
              
              <div className="hidden sm:flex items-center space-x-1">
                {getPageNumbers(page, pagination.totalPages).map((p, idx) => (
                  p === "..." ? (
                    <span key={idx} className="px-2 py-2 text-gray-500 tracking-widest">...</span>
                  ) : (
                    <button
                      key={idx}
                      onClick={() => {
                        setPage(p as number);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`min-w-9 rounded-lg px-3 py-2 text-sm font-bold transition-all ${
                        page === p 
                          ? "bg-[#97ce4c] text-[#13151A] shadow-[0_0_10px_rgba(151,206,76,0.3)]" 
                          : "text-gray-400 hover:bg-[#2D323E] hover:text-white"
                      }`}
                    >
                      {p}
                    </button>
                  )
                ))}
              </div>

              <div className="flex items-center space-x-3">
                <form onSubmit={handleJumpToPage} className="flex items-center space-x-1.5">
                  <span className="text-xs text-gray-500 hidden md:inline">Go to:</span>
                  <input
                    type="number"
                    min={1}
                    max={pagination.totalPages}
                    placeholder={`${page}`}
                    value={jumpPageInput}
                    onChange={(e) => setJumpPageInput(e.target.value)}
                    className="w-12 rounded-lg border border-[#2D323E] bg-[#13151A] py-1.5 text-center text-xs text-white outline-none [appearance:textfield]"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-[#2D323E] p-1.5 text-gray-300 transition-colors hover:bg-[#97ce4c] hover:text-[#13151A]"
                    title="Jump to page"
                  >
                    <ArrowRight size={14} />
                  </button>
                </form>

                <div className="flex sm:hidden items-center">
                  <span className="text-xs font-medium text-gray-500">
                    <span className="text-white font-bold">{pagination.page}</span> / {pagination.totalPages}
                  </span>
                </div>
              </div>
              
              <button
                disabled={page === pagination.totalPages}
                onClick={() => {
                  setPage((p) => p + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center rounded-lg px-3 py-2 text-sm font-semibold text-gray-400 transition-colors hover:bg-[#2D323E] hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:px-4"
              >
                <span className="hidden sm:inline">Next</span> <ChevronRight size={18} className="ml-1" />
              </button>

            </div>
          )}
        </>
      )}
    </div>
  );
};