import { getIdeaData } from "@/DataActions/idea";
import React from "react";
import IdeaSearchShort from "@/components/IdeaSearchShort";

export const metadata = {
  title: "Idea-Vault || Ideas",
  description: "Share and explore innovative ideas",
};

const IdeasPage = async () => {
  const ideaData = await getIdeaData();

  return (
    <div className="lg:max-w-7xl px-4 mx-auto">
      <div className="md:flex justify-between items-center mb-6">
        <h1 className="text-5xl flex justify-center font-black underline underline-offset-8 decoration-2">
          <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
            Explore Ideas
          </span> 
        </h1>
        <div className="mt-6 md:mt-0">
          <React.Suspense
            fallback={
              <div className="w-52 h-10 bg-gray-200 animate-pulse rounded-md" />
            }
          >
            {/* Suspense placeholder if needed */}
          </React.Suspense>
        </div>
      </div>

      {/* Main container with search, sort, and cards */}
      <IdeaSearchShort initialIdeas={ideaData} />
    </div>
  );
};

export default IdeasPage;
