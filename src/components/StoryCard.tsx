// import React from "react";

// interface Story {
//   id: number;
//   title: string;
//   description?: string;
//   author?: string;
//   documentId: string;
//   createdAt: string;
//   content: string;
// }

// export const StoryCard = ({ story }: { story: Story }) => {
//   const { title, description, content } = story;

//   // Extract the first image URL from the content HTML string
//   const extractImageUrl = (html: string): string | null => {
//     const match = html.match(/<img[^>]+src="([^">]+)"/);
//     return match ? match[1] : null;
//   };

//   const imageUrl =
//     extractImageUrl(content) ||
//     "https://via.placeholder.com/300x200?text=No+Image";

//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden">
//       <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <h2 className="text-lg font-semibold mb-2">{title}</h2>
//         <p className="text-gray-600 text-sm">{description}</p>
//       </div>
//     </div>
//   );
// };

import React from "react";

interface Story {
  id: number;
  title: string;
  description?: string;
  author?: string;
  documentId: string;
  createdAt: string;
  content: string;
}

export const StoryCard = ({ story }: { story: Story }) => {
  const { title, description, content } = story;

  // Extract the first image URL from the content HTML string
  const extractImageUrl = (html: string): string | null => {
    const match = html.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
  };

  const imageUrl =
    extractImageUrl(content) ||
    "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden ring-4 transition-transform duration-300 hover:scale-105 cursor-pointer">
      {/* Image Section */}
      <div className="relative aspect-w-3 aspect-h-2">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </div>
    </div>
  );
};
