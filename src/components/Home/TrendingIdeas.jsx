import Link from 'next/link';
import React from 'react';
import TrendingIdeaCard from './TrendingIdeaCard';
import { Button } from '@heroui/react';
import { MoveUpRight } from 'lucide-react';

const TrendingIdeas =async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trending`)
    const data = await res.json()
    
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16'>
            {/* header section */}
            <div className='text-center  md:flex  space-y-3 items-center  justify-between '> 
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-black '>Trending <span className='bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent'>Ideas</span></h1>
                <Link href="/ideas" className=''>
                <Button variant='outline'  className={'flex items-center justify-center hover:bg-cyan-500 rounded-lg'} >
                    <span className='underline underline-offset-2 cursor-pointer  font-medium'>Go to Idea Page</span> <MoveUpRight />
                </Button>
                </Link>
            </div>
            {/* main section */}
           <div className="p-7 bg-primary/5 rounded-xl my-5 ">
       
          <div className="grid gap-4 md:grid-cols-2   lg:grid-cols-3 ">
            {
                data.map((idea) => (<TrendingIdeaCard key={idea._id} idea={idea} />))
            }
          </div>
         
      </div>
        </div>
    );
};

export default TrendingIdeas;