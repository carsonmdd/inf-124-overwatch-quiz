'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

type SearchUser = {
  id: string;
  username: string;
};

const SearchPage = () => {
  const { userId } = useAuth();
  const [results, setResults] = useState<SearchUser[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!userId) { return <p className = "px-auto py-auto text-white text-lg">Sign in to search for users.</p>;}

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search query.');
      setResults([]);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`/api/users?query=${encodeURIComponent(query)}`);
      if (!response.ok) { throw new Error('Failed to load users'); }

      const data = (await response.json()) as { users: SearchUser[] };
      setResults(data.users);

    } catch (err) {
      setError('Unable to search users. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

    return (
        <div className = "search-container flex flex-col items-center justify-start h-full gap-8 py-8">
            {/* Search bar */}
            <div className = "flex flex-col items-center justify-center pb-5 gap-4">
                <input type = "text" value = {query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users..." className="w-full max-w-md px-4 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-ow-orange" />
                <button onClick = {handleSearch} className="px-6 py-2 bg-ow-orange text-white rounded font-bold uppercase text-sm transition-colors hover:bg-ow-orange/90">Search</button>
            </div>

            {/* Search results */}
            <div className="results flex flex-col items-center justify-start h-full gap-4 mt-3">
              {error ? <p className="text-red-400">{error}</p> : null}

              {/* if there are results, map each user to a list item */}
              {results.length > 0 ? (
                <ul className="w-full max-w-md mx-auto mt-4 bg-ow-dark-blue rounded p-4">
                  <h1 className="text-xl font-bold text-white mb-4">Results</h1>
                  {results.map((user) => (
                    <li key={user.id} className="py-2 border-b border-white">
                      <Link href={`/profile/${user.id}`} className="text-ow-orange font-semibold hover:underline">
                        {user.username}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white">{isLoading ? 'Searching...' : 'No users found.'}</p>
              )}
            </div>

        </div>    
            
         
    )

}

export default SearchPage;