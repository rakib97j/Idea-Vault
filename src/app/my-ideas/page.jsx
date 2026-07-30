import MyIdea from '@/components/MyIdea';
import React from 'react';

export const metadata = {
  title: "Idea-Vault || My Ideas",
  description: "Share and explore innovative ideas",
};

const MyIdeasPage = () => {

    
  
    return (
      <div className="lg:max-w-7xl px-4  mx-auto">
        <MyIdea />
      </div>
    );
};

export default MyIdeasPage;