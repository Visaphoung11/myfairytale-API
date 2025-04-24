// import { useEffect, useState } from "react";
// import { Story } from "../types/story";
// import { StoryCard } from "../components/StoryCard";

// const StoryPage = () => {
//   const [stories, setStories] = useState<Story[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://62.72.46.248:1337/api/stories?populate=*")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched data:", data);
//         setStories(data.data); // Each item in this array is already flat
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("API fetch error:", err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Fairy Tale Stories</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {stories.map((story) => (
//             <StoryCard key={story.id} story={story} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StoryPage;

import React, { useEffect, useState, useCallback } from "react";
import { SearchBar } from "../components/SearchBar";
import { StoryCard } from "../components/StoryCard";

interface Story {
  id: number;
  title: string;
  description?: string;
  author?: string;
  documentId: string;
  createdAt: string;
  content: string;
}

export default function StoryPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStories = useCallback(
    async (query: string, typeId: number | null, ageRangeId: number | null) => {
      setLoading(true);
      try {
        let url = "http://62.72.46.248:1337/api/stories?populate=*";

        const filters: string[] = [];

        if (query) {
          filters.push(
            `filters[title][$containsi]=${encodeURIComponent(query)}`
          );
        }
        if (typeId) {
          filters.push(`filters[story_type][id][$eq]=${typeId}`);
        }
        if (ageRangeId) {
          filters.push(`filters[age_range][id][$eq]=${ageRangeId}`);
        }

        if (filters.length > 0) {
          url += "&" + filters.join("&");
        }

        const res = await fetch(url);
        const json = await res.json();
        setStories(json.data || []);
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchStories("", null, null);
  }, [fetchStories]);

  return (
    <div className="p-6">
      <SearchBar onSearch={fetchStories} />

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stories.map((story: any) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}
