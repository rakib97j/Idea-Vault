import React from "react";
import CommentDeleteAlert from "./CommentDeleteAlert";
import CommentEditAlert from "./CommentEditAlert";


const EditDeleteBTN = ({commentId}) => {

    const ID = commentId
  
    
  return (
    <div className="flex items-center gap-3">
      {/* <button className="text-[11px] font-semibold text-cyan-500 hover:text-cyan-400 hover:underline transition-all cursor-pointer">
        Edit
      </button> */}
      <CommentEditAlert cid={ID}/>
      
      <CommentDeleteAlert cid={ID}/>
      
    </div>
  );
};

export default EditDeleteBTN;
