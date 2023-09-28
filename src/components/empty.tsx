import React from 'react';
import Image from 'next/image';

type EmptyProps = {
  label: string;
};

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-20">
      <div className="relative h-72 w-72">
        <Image src={'/empty.png'} fill alt="No conversation" />
      </div>
      <p>{label}</p>
    </div>
  );
};
