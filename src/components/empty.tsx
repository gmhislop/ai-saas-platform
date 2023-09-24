import React from 'react';
import Image from 'next/image';

type EmptyProps = {
  label: string;
};

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image src={'/empty.png'} fill alt="Empty" />
      </div>
    </div>
  );
};
