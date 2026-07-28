"use server";

export const getIdeaData = async () => {
  const res = await fetch(
    `${process.env.API_URL}/ideas`,
  );

  const data = await res.json();

  return data;
};

