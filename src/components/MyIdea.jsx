'use client'

import { authClient } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';
import { getMyIdea } from '@/DataActions/idea';
import MyIdeaCard from './MyIdeaCard';


const MyIdea = () => {
    const { data: session } = authClient.useSession();
    const userId = session?.user?.id;

    const [myIdeas, setMyIdeas] = useState([]);
    

    useEffect(() => {
        if (userId) {
            getMyIdea(userId)
                .then((data) => {
                    setMyIdeas(data);
                    
                })
                .catch((err) => {
                    console.error("Error fetching my ideas:", err);
                    
                });
        }
    }, [userId]);

   

    return (
        <div className=" py-4">
            <h1 className="text-5xl flex  mb-5 font-black  decoration-2">
                      <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
                        My Ideas 
                      </span> ({myIdeas.length})
                    </h1>
           
            
            <div className="grid gap-4 md:grid-cols-2   lg:grid-cols-3">
                {myIdeas.map((idea) => (
                    <MyIdeaCard key={idea._id} idea={idea}/>
                ))}
            </div>
        </div>
    );
};

export default MyIdea;