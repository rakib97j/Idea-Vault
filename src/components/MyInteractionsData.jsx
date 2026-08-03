"use client";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";


const MyInteractionsData = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const UserId = user?.id;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!UserId) return; 

    const fetchData = async () => {
      try {
         const {data:tokenData} =  await authClient.token()
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-comment/${UserId}`,{
            headers:{
               authorization : `Bearer ${tokenData?.token}`
            }
          }

          
        );
        const data = await res.json();
        setComments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [UserId]); 
  
  

  return (
    <div className="space-y-4 pt-4">
      {comments.length === 0 ? (
        <p className="text-sm text-[var(--secondary)] text-center py-6">No interactions found.</p>
      ) : (
        comments.map((c, index) => (
          <Link
            href={`/ideas/${c.detailsDataId}`}
            key={c._id || index} 
            className="block p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-3 hover:border-cyan-500/50 hover:bg-[var(--card)]/80 transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <h4 className="text-base font-bold text-[var(--foreground)] tracking-wide group-hover:text-cyan-500 transition-colors">
                  {c.detailedDataTitle || "Unknown Idea"}
                </h4>
                <p className="text-sm text-[var(--foreground)] opacity-90 leading-relaxed">
                  {c.comment}
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-[var(--secondary)] uppercase tracking-wider">
                  {c.date ? new Date(c.date).toLocaleDateString() : "Just now"}
                </div>
              </div>
              
              {c.userImage && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--border)] bg-slate-800 flex-shrink-0 shadow-sm">
                  <Image
                    src={c.userImage}
                    alt={c.userName || "User"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default MyInteractionsData;
