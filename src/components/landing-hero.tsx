'use client';

import { useAuth } from '@clerk/nextjs';
import TypewriterComponenent from 'typewriter-effect';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="space-y-5 font-bold text-center text-white py-36">
      <div className="space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
        <h1>The Ultimate AI tool for</h1>
        <h2 className="text-sm">By Giovanni Hislop</h2>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          <TypewriterComponenent
            options={{
              strings: [
                'Chatbot.',
                'Photo Generation.',
                'Music Generation.',
                'Code Generation.',
                'Video Generation.',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm font-light md:text-xl text-zinc-400">
        Create content with the help of AI and be 10x more productive.
      </div>
      <div>
        <Link href={isSignedIn ? '/dashboard' : 'sign-up'}>
          <Button variant="premium" className="p-4 font-semibold rounded-full md:text-lg md:p-6">
            Start Generation For Free
          </Button>
        </Link>
        <div className="py-4 text-xs font-normal text-zinc-400 md:text-sm">
          No credit card required
        </div>
      </div>
    </div>
  );
};
