'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// temp data for leaderboard. General idea
const mockData = Array.from({ length: 35 }, (_, i) => ({
    id: i + 1,
    rank: i + 1,
    name: `Player_${i + 1}`,
    score: 5000 - (i * 45) 
}));

const Leaderboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(mockData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPlayers = mockData.slice(startIndex, startIndex + itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-10 flex flex-col gap-8">
            
            <div className="flex items-center gap-5 mb-3 border-b border-gray-700/50 pb-0">
                <Image 
                    src="/top500.png" 
                    alt="Top 500" 
                    width={80} 
                    height={80} 
                    className="drop-shadow-md object-contain shrink-0 mt-5"
                />
                <h1 className="text-5xl font-black uppercase italic tracking-widest leading-tight bg-gradient-to-r from-yellow-400 via-ow-orange to-red-500 bg-clip-text text-transparent drop-shadow-sm mt-1">
                    Top 500 Leaderboard
                </h1>
            </div>

            <div className="flex flex-col gap-4">
                {currentPlayers.map((player) => {
                    // handles top 3 styling
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
                        <div 
                            key={player.id} 
                            className={`relative z-0 hover:z-10 flex items-center gap-4 p-4 rounded-sm border-l-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${specialStyling}`}
                        >
                            <div className="w-16 flex justify-center items-center">
                                <span className={`font-black text-3xl italic ${rankTextStyling}`}>
                                    {player.rank}
                                </span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className={`font-black uppercase tracking-widest text-xl mb-0.5 ${player.rank <= 3 ? 'text-white' : 'text-gray-300'}`}>
                                    {player.name}
                                </h3>
                            </div>

                            <div className="shrink-0 font-black italic tracking-wider text-2xl pr-4">
                                <span className={player.rank <= 3 ? 'text-white' : 'text-gray-300'}>{player.score}</span> 
                                <span className="text-sm text-ow-orange ml-1 opacity-80">PTS</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-between items-center mt-6 p-4 bg-ow-blue/5 rounded-sm border border-gray-700/30">
                <button 
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-6 py-3 bg-ow-dark-blue text-white hover:bg-ow-orange disabled:opacity-20 disabled:hover:bg-ow-dark-blue rounded-sm uppercase italic font-bold tracking-wider transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" /> Prev
                </button>
                
                <span className="font-black text-xl italic tracking-widest text-gray-400">
                    {currentPage} <span className="text-ow-orange mx-2">/</span> {totalPages}
                </span>

                <button 
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-6 py-3 bg-ow-dark-blue text-white hover:bg-ow-orange disabled:opacity-20 disabled:hover:bg-ow-dark-blue rounded-sm uppercase italic font-bold tracking-wider transition-colors"
                >
                    Next <ChevronRight className="w-5 h-5" />
                </button>
            </div>
            
        </div>
    );
};

export default Leaderboard;