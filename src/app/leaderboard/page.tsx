'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

type Player = {
  id: string;
  rank: number;
  username: string;
  totalScore: number;
};

const Leaderboard = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(players.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPlayers = players.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePrev = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  if (loading) {
    return (
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-10 flex items-center justify-center">
        <p className="text-gray-400 text-lg italic font-bold uppercase tracking-widest animate-pulse">
          Loading Leaderboard...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-10 flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-5 border-b border-gray-700/50 pb-4">
        <Image
          src="/top500.png"
          alt="Top 500"
          width={60}
          height={60}
          className="drop-shadow-md object-contain shrink-0 sm:w-20 sm:h-20"
        />
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase italic tracking-normal sm:tracking-wide lg:tracking-widest leading-tight bg-gradient-to-r from-yellow-400 via-ow-orange to-red-500 bg-clip-text text-transparent pb-1 pr-2">
          Top 500 Leaderboard
        </h1>
      </div>

      {players.length === 0 ? (
        <p className="text-gray-400 text-center italic">No scores yet. Be the first!</p>
      ) : (
        <ol className="flex flex-col gap-3">
          {currentPlayers.map((player) => {
            let specialStyling = "bg-ow-blue/5 dark:bg-ow-blue/10 text-gray-400 border-gray-600/30";
            let rankTextStyling = "text-gray-500";

            if (player.rank === 1) {
              specialStyling = "bg-yellow-500/10 border-yellow-400 text-white shadow-[0_0_15px_rgba(250,204,21,0.15)]";
              rankTextStyling = "text-yellow-400";
            } else if (player.rank === 2) {
              specialStyling = "bg-gray-300/10 border-gray-300 text-white shadow-[0_0_15px_rgba(209,213,219,0.1)]";
              rankTextStyling = "text-gray-300";
            } else if (player.rank === 3) {
              specialStyling = "bg-amber-600/10 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.1)]";
              rankTextStyling = "text-amber-500";
            }

            return (
              <li
                key={player.id}
                tabIndex={0}
                aria-label={`Rank ${player.rank}, ${player.username}, Score ${player.totalScore.toLocaleString()} points`}
                className={`relative z-0 hover:z-10 focus:z-10 focus:outline-none focus:ring-2 focus:ring-ow-orange focus:scale-[1.02] focus:shadow-lg flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-sm border-l-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${specialStyling}`}
              >
                {/* Rank number */}
                <div className="w-8 sm:w-16 flex justify-center items-center shrink-0">
                  <span className={`font-black text-xl sm:text-3xl italic ${rankTextStyling}`} aria-hidden="true">
                    {player.rank}
                  </span>
                </div>

                {/* Username */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-black uppercase tracking-wider text-sm sm:text-xl truncate ${player.rank <= 3 ? 'text-white' : 'text-gray-300'}`} aria-hidden="true">
                    {player.username}
                  </h3>
                </div>

                {/* Score */}
                <div className="shrink-0 font-black italic tracking-wider text-base sm:text-2xl pr-1 sm:pr-4" aria-hidden="true">
                  <span className={player.rank <= 3 ? 'text-white' : 'text-gray-300'}>
                    {player.totalScore.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-sm text-ow-orange ml-1 opacity-80">PTS</span>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {/* Pagination */}
      <nav aria-label="Leaderboard Pagination" className="flex justify-between items-center mt-2 p-3 sm:p-4 bg-ow-blue/5 rounded-sm border border-gray-700/30">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-ow-dark-blue text-white hover:bg-ow-orange focus:outline-none focus:ring-2 focus:ring-ow-orange disabled:opacity-20 disabled:hover:bg-ow-dark-blue rounded-sm uppercase italic font-bold tracking-wider transition-colors text-sm sm:text-base"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" /> Prev
        </button>

        <span aria-live="polite" className="font-black text-base sm:text-xl italic tracking-widest text-gray-400">
          {currentPage} <span className="text-ow-orange mx-1 sm:mx-2" aria-hidden="true">/</span> {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-ow-dark-blue text-white hover:bg-ow-orange focus:outline-none focus:ring-2 focus:ring-ow-orange disabled:opacity-20 disabled:hover:bg-ow-dark-blue rounded-sm uppercase italic font-bold tracking-wider transition-colors text-sm sm:text-base"
        >
          Next <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

export default Leaderboard;