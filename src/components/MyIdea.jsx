'use client'

import { authClient } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';
import { getMyIdea } from '@/DataActions/idea';
import MyIdeaCard from './MyIdeaCard';
import Link from 'next/link';
import { Lightbulb, Plus } from 'lucide-react';


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
           
            {myIdeas.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-10 rounded-2xl border border-border/50 bg-gradient-to-b from-card to-card/50 backdrop-blur-md max-w-lg mx-auto mt-10 shadow-lg space-y-5">
                    <div className="p-4 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 animate-pulse">
                        <Lightbulb className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            Your Idea Vault is Empty
                        </h2>
                        <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
                            Great minds build vaulting concepts. Start brainstorming and share your brilliant ideas with the community.
                        </p>
                    </div>
                    <Link
                        href="/add-idea"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Your First Idea</span>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2   lg:grid-cols-3">
                    {myIdeas.map((idea) => (
                        <MyIdeaCard key={idea._id} idea={idea}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyIdea;