import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import { DeleteAlert } from "./MyIdeaEditDelete/DeleteAlert";

const MyIdeaEditDeleteBTN = ({idea}) => {
  const data = idea
  
  return (
    <>
      <button
        className="p-2 rounded-full bg-black/60 hover:bg-cyan-500 backdrop-blur-md border border-white/20 text-cyan-400 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-md"
        title="Edit Idea"
      >
        <Pencil className="w-4 h-4" />
      </button>

      <DeleteAlert data={data} />

     
    </>
  );
};

export default MyIdeaEditDeleteBTN;
