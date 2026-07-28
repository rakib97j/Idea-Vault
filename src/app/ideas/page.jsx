import IdeaCard from "@/components/IdeaCard";
import { getIdeaData } from "@/DataActions/idea";
import React from "react";

export const metadata = {
  title: "Idea-Vault || Ideas",
  description: "Share and explore innovative ideas",
};


const IdeasPage = async () => {
  const ideaData = await getIdeaData();
//   console.log("ideaData", ideaData);
  return (
    <div className="lg:max-w-7xl px-4  mx-auto">
        <div className="md:flex  justify-between items-center ">
        <h1 className="text-4xl flex justify-center font-black underline underline-offset-8 decoration-2">
          <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">Explore Ideas</span> 
        </h1>
        <div className="mt-6">
          <React.Suspense
            fallback={
              <div className="w-52 h-10 bg-gray-200 animate-pulse rounded-md" />
            }
          >
          </React.Suspense>
        </div>
      </div>

      {/* card section */}
        <div className="p-7 bg-primary/5 rounded-xl my-5 ">
       
          <div className="grid gap-4 md:grid-cols-2   lg:grid-cols-3 ">
            {ideaData.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
         
      </div>
        
    </div>
  )
};

export default IdeasPage;
