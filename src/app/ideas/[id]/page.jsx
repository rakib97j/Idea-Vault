import IdeaDetailPage from '@/components/IdeaDetailPage';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
export const metadata = {
  title: "Idea-Vault || Idea Details",
  description: "Share and explore innovative ideas",
};

const IdeaDEtailsPage = async ({params}) => {
    const {id} = await params;
    const {token} = await auth.api.getToken({
        headers: await headers()
    })
   
    const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/ideas/${id}` ,
        {
            headers:{
                authorization: `Bearer ${token}`
            }
        }
    );
    const IdeaDetailsData = await res.json();
   
    
    return (
        <div className="lg:max-w-7xl px-4 mx-auto">
            <IdeaDetailPage key={IdeaDetailsData._id || id} IdeaDetailsData={IdeaDetailsData}  />
        </div>
    );
};

export default IdeaDEtailsPage;