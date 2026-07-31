"use client";

import { Button } from "@heroui/react";
import { FileQuestion, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <FileQuestion className="w-32 h-32 text-primary drop-shadow-lg relative z-10" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          404 - Page Not Found
        </h1>
        
        <p className="text-default-500 max-w-md mb-8 text-lg">
          Oops! It seems like the idea you are looking for has been locked away in the vault or doesn't exist.
        </p>
        
       <Link href={'/'}> <Button 
         
          color="primary" 
          variant="shadow"
          size="lg"
          startContent={<Home className="w-5 h-5" />}
          className="font-medium"
        >
          Return to Vault
        </Button></Link>
      </motion.div>
    </div>
  );
}
