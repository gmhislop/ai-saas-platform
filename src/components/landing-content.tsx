'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar } from './ui/avatar';

const testimonials = [
  {
    name: 'Kevin Heart',
    avatar: 'KH',
    title: 'CEO',
    description: 'This is the best thing since sliced bread!',
    stars: 4.5,
  },
  {
    name: 'Dwayne Johnson',
    avatar: 'DJ',
    title: 'Marketing Manager',
    description: 'I love this product!',
    stars: 5,
  },
  {
    name: 'Karen Smith',
    avatar: 'KS',
    title: 'Software Engineer',
    description: 'I Really like how this accelerates my workflow!',
    stars: 4,
  },
  {
    name: 'Joshua Cole',
    avatar: 'JC',
    title: 'Researcher',
    description: 'I love this product!',
    stars: 5,
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="mb-10 text-4xl font-extrabold text-center text-white">Testimonials</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-4">
                <Avatar className="flex items-center justify-center p-8 text-sm border border-white">
                  {testimonial.avatar}
                </Avatar>
                <div>
                  <p className="text-lg">{testimonial.name}</p>
                  <p className="text-sm text-zinc-400">{testimonial.title}</p>
                </div>
              </CardTitle>
              <CardContent className="px-0 pt-4">{testimonial.description}</CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
