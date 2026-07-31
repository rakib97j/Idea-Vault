import MyInteractionsData from '@/components/MyInteractionsData';
import React from 'react';
export const metadata = {
  title: "Idea-Vault || My Inetractions",
  description: "Share and explore innovative ideas",
};

const MyInteractionPage = () => {
  

    return (
      <div className="lg:max-w-7xl py-4  mx-auto">
        <h1 className="text-5xl flex justify-center font-black">
          <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
             My Interactions
          </span> 
        </h1>
        <div className='mt-3.5'>
          <MyInteractionsData/>
        </div>
      </div>
    );
};

export default MyInteractionPage;