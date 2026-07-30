import IdeaDetailPage from '@/components/IdeaDetailPage';
import React from 'react';
export const metadata = {
  title: "Idea-Vault || Idea Details",
  description: "Share and explore innovative ideas",
};

const IdeaDEtailsPage = async ({params}) => {
    const {id} = await params;
    const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/ideas/${id}`);
    const IdeaDetailsData = await res.json();
    
    return (
        <div className="lg:max-w-7xl px-4 mx-auto">
            <IdeaDetailPage key={IdeaDetailsData._id || id} IdeaDetailsData={IdeaDetailsData} />
        </div>
    );
};

export default IdeaDEtailsPage;