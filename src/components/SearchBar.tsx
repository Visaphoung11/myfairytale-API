// import React, { useState, useEffect } from "react";

// interface Option {
//   id: number;
//   name: string;
// }

// interface SearchBarProps {
//   onSearch: (
//     query: string,
//     typeId: number | null,
//     ageRangeId: number | null
//   ) => void;
// }

// export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
//   const [query, setQuery] = useState("");
//   const [storyTypes, setStoryTypes] = useState<Option[]>([]);
//   const [ageRanges, setAgeRanges] = useState<Option[]>([]);
//   const [selectedType, setSelectedType] = useState<number | null>(null);
//   const [selectedAgeRange, setSelectedAgeRange] = useState<number | null>(null);

//   useEffect(() => {
//     // Fetch story types
//     fetch("http://62.72.46.248:1337/api/story-types")
//       .then((res) => res.json())
//       .then((data) => setStoryTypes(data.data || []));

//     // Fetch age ranges
//     fetch("http://62.72.46.248:1337/api/age-ranges")
//       .then((res) => res.json())
//       .then((data) => setAgeRanges(data.data || []));
//   }, []);

//   useEffect(() => {
//     onSearch(query, selectedType, selectedAgeRange);
//   }, [query, selectedType, selectedAgeRange, onSearch]);

//   return (
//     <div className="w-full flex flex-col sm:flex-row items-center gap-4 mb-6">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search stories..."
//         className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <select
//         value={selectedType || ""}
//         onChange={(e) =>
//           setSelectedType(e.target.value ? Number(e.target.value) : null)
//         }
//         className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="">All Types</option>
//         {storyTypes.map((type) => (
//           <option key={type.id} value={type.id}>
//             {type.name}
//           </option>
//         ))}
//       </select>
//       <select
//         value={selectedAgeRange || ""}
//         onChange={(e) =>
//           setSelectedAgeRange(e.target.value ? Number(e.target.value) : null)
//         }
//         className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="">All Age Ranges</option>
//         {ageRanges.map((range) => (
//           <option key={range.id} value={range.id}>
//             {range.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";

interface StoryTypeOption {
  id: number;
  name: string;
}

interface AgeRangeOption {
  id: number;
  label: string;
}

interface SearchBarProps {
  onSearch: (
    query: string,
    typeId: number | null,
    ageRangeId: number | null
  ) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [storyTypes, setStoryTypes] = useState<StoryTypeOption[]>([]);
  const [ageRanges, setAgeRanges] = useState<AgeRangeOption[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedAgeRange, setSelectedAgeRange] = useState<number | null>(null);

  useEffect(() => {
    // Fetch story types
    fetch("http://62.72.46.248:1337/api/story-types")
      .then((res) => res.json())
      .then((data) => {
        const types = (data.data || []).map((item: any) => ({
          id: item.id,
          name: item.name || item.label || "Unknown",
        }));
        setStoryTypes(types);
      });

    // Fetch age ranges
    fetch("http://62.72.46.248:1337/api/age-ranges")
      .then((res) => res.json())
      .then((data) => {
        const ranges = (data.data || []).map((item: any) => ({
          id: item.id,
          label: item.label,
        }));
        setAgeRanges(ranges);
      });
  }, []);

  useEffect(() => {
    onSearch(query, selectedType, selectedAgeRange);
  }, [query, selectedType, selectedAgeRange, onSearch]);

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-4 mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search stories..."
        className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={selectedType || ""}
        onChange={(e) =>
          setSelectedType(e.target.value ? Number(e.target.value) : null)
        }
        className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Types</option>
        {storyTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
      <select
        value={selectedAgeRange || ""}
        onChange={(e) =>
          setSelectedAgeRange(e.target.value ? Number(e.target.value) : null)
        }
        className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Age Ranges</option>
        {ageRanges.map((range) => (
          <option key={range.id} value={range.id}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
};
