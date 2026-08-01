
import React from "react";
import { DeleteAlert } from "./MyIdeaEditDelete/DeleteAlert";
import EditAlert from "./MyIdeaEditDelete/EditAlert";

const MyIdeaEditDeleteBTN = ({idea}) => {
  const data = idea
  
  return (
    <>
     
      <EditAlert data={data}/>

      <DeleteAlert data={data} />

     
    </>
  );
};

export default MyIdeaEditDeleteBTN;
