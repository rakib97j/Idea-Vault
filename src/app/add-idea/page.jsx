import AddIdeasForm from '@/components/AddIdeasForm';
import React from 'react';
export const metadata = {
  title: "Idea-Vault || Add Idea",
  description: "Share and explore innovative ideas",
};

const AddIdeaPage = () => {
    return (
      <div className="w-full">
        <AddIdeasForm/>
      </div>
    );
};

export default AddIdeaPage;