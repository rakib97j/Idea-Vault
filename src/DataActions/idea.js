"use server";

export const getIdeaData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ideas`,
  );

  const data = await res.json();

  return data;
};


export const getMyIdea = async (userId) =>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas?userId=${userId}`)
  const data = await res.json()
  return data;
}

