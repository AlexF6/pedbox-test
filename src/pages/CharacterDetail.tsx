// src/pages/CharacterDetail.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import type { CharacterDetail as ICharacterDetail } from "../types";
import { ArrowLeft, Calendar, Film, Globe } from "lucide-react";

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<ICharacterDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await api.get(`/characters/${id}`);
        setCharacter(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load character details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2D323E] border-t-[#97ce4c] drop-shadow-[0_0_10px_rgba(151,206,76,0.5)]"></div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5">
          <p className="text-sm font-medium text-red-400">{error || "Subject not found in local universe."}</p>
        </div>
        <Link to="/" className="inline-flex items-center text-sm font-semibold text-[#97ce4c] transition-colors hover:text-white">
          <ArrowLeft size={18} className="mr-2" /> Back to database
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 font-sans selection:bg-[#97ce4c] selection:text-black">
      <Link 
        to="/" 
        className="group inline-flex items-center text-sm font-bold tracking-wide text-gray-400 transition-colors hover:text-white"
      >
        <div className="mr-2 rounded-full border border-[#2D323E] bg-[#1C1F26] p-1.5 transition-all group-hover:border-[#97ce4c] group-hover:text-[#97ce4c]">
          <ArrowLeft size={16} />
        </div>
        Back to Database
      </Link>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        
        <div className="relative overflow-hidden rounded-2xl border border-[#2D323E] bg-[#1C1F26] p-6 shadow-xl flex flex-col items-center">
          <div className="absolute top-0 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#97ce4c] opacity-[0.15] blur-3xl"></div>

          <div className="relative h-48 w-48 shrink-0 rounded-full border-4 border-[#13151A] bg-[#13151A] shadow-inner">
            <img
              src={character.image}
              alt={character.name}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          
          <h1 className="mt-5 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {character.name}
          </h1>
          
          <div className="mt-3 flex items-center space-x-2 rounded-full bg-[#13151A] px-4 py-1.5 border border-[#2D323E]">
            <span
              className={`h-2.5 w-2.5 rounded-full shadow-sm ${
                character.status === "Alive"
                  ? "bg-[#97ce4c] shadow-[#97ce4c]/50"
                  : character.status === "Dead"
                  ? "bg-red-500 shadow-red-500/50"
                  : "bg-gray-500"
              }`}
            />
            <span className="text-sm font-semibold tracking-wide text-gray-300">
              {character.status} — {character.species}
            </span>
          </div>

          <div className="mt-8 w-full space-y-3 rounded-xl bg-[#13151A] p-4 border border-[#2D323E]/50">
            <div className="flex justify-between border-b border-[#2D323E]/50 pb-2 text-sm">
              <span className="text-gray-500">Gender</span>
              <span className="font-semibold text-white">{character.gender}</span>
            </div>
            {character.type && (
              <div className="flex justify-between pt-1 text-sm">
                <span className="text-gray-500">Sub-Type</span>
                <span className="font-semibold text-white text-right wrap-break-word max-w-[60%]">{character.type}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 md:col-span-2">
          
          {character.location && (
            <div className="rounded-2xl border border-[#2D323E] bg-[#1C1F26] p-6 shadow-xl">
              <h2 className="flex items-center text-lg font-bold tracking-tight text-white mb-5 border-b border-[#2D323E] pb-3">
                <Globe className="mr-2 text-[#97ce4c]" size={20} /> Spatial Coordinates
              </h2>
              <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-sm">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Name</p>
                  <p className="mt-1 font-semibold text-white">{character.location.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Planet Type</p>
                  <p className="mt-1 font-semibold text-white">{character.location.type || "Unknown Status"}</p>
                </div>
                <div className="col-span-2 rounded-lg bg-[#13151A] p-3 border border-[#2D323E]/50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Current Dimension</p>
                  <p className="mt-1 font-bold text-[#97ce4c]">{character.location.dimension || "Unknown Dimension"}</p>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-[#2D323E] bg-[#1C1F26] p-6 shadow-xl">
            <h2 className="flex items-center justify-between text-lg font-bold tracking-tight text-white mb-5 border-b border-[#2D323E] pb-3">
              <span className="flex items-center">
                <Film className="mr-2 text-[#97ce4c]" size={20} />
                Sightings Log
              </span>
              <span className="rounded-full bg-[#13151A] px-3 py-1 text-xs text-gray-400 border border-[#2D323E]">
                {character.characterEpisodes?.length || 0} Records
              </span>
            </h2>
            
            {character.characterEpisodes && character.characterEpisodes.length > 0 ? (
              <div className="max-h-64 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
                {character.characterEpisodes.map(({ episode }) => (
                  <div 
                    key={episode.id} 
                    className="flex items-center justify-between gap-4 rounded-xl bg-[#13151A] p-3 transition-colors hover:bg-[#2D323E]/50 border border-transparent hover:border-[#2D323E]"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-white">{episode.name}</p>
                      <p className="mt-1 flex items-center text-xs font-medium text-gray-500">
                        <Calendar size={12} className="mr-1 text-gray-400" /> {episode.airDate}
                      </p>
                    </div>
                    <span className="shrink-0 rounded bg-[#97ce4c]/10 px-2 py-1 text-xs font-bold tracking-wider text-[#97ce4c] border border-[#97ce4c]/20">
                      {episode.episodeCode}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-[#2D323E] bg-[#13151A]">
                <p className="text-sm font-medium text-gray-500">No recorded timeline sightings.</p>
              </div>
            )}
          </div>

        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1C1F26; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2D323E; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #97ce4c; 
        }
      `}</style>
    </div>
  );
};