"use server";


export const getIdeaData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ideas`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return data;
};

// my idea 
export const getMyIdea = async (userId) =>{
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ideas?userId=${userId}`,
    { cache: "no-store" }
  )
  const data = await res.json()
  return data;
}


// comment 

export const getComment = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comment`,
    { cache: "no-store" }
  )
  const data = await res.json()

  return data
}

