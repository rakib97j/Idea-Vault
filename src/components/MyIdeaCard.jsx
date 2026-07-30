import React from 'react';
import { Button, Card, CardContent, CardFooter } from "@heroui/react";

import Image from "next/image";
import Link from "next/link";

const MyIdeaCard = ({idea}) => {
    const{_id,tags, category, title, budget ,imageURL}= idea
    
    return (
        <Card className="group overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500">
      {/* IMAGE */}
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image
          src={imageURL || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800'}
          alt={title }
          width={400}
          height={400}
          priority
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-semibold">
          {category}
        </span>
      </div>

      <CardContent className="p-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs flex gap-2  tracking-wider text-muted-foreground">
            <p className="bg-cyan-500 p-1 opacity-80 rounded">{tags?.[0]}</p>
            <p className="bg-cyan-500 p-1 opacity-80 rounded">{tags?.[1]}</p>
            
          </span>

          <div className="flex items-center gap-1 text-yellow-500">
            
            <span className="text-sm font-medium text-foreground">
              {budget}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

       
      </CardContent>

      <CardFooter className="px-5 pb-5 flex flex-col items-start gap-3">
        

        <Button className="w-full rounded bg-primary font-bold bg-gradient-to-r from-cyan-400 via-teal-400  text-white px-5 py-2 ">
          <Link href={`/ideas/${_id}`} className="w-full">
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
    );
};

export default MyIdeaCard;