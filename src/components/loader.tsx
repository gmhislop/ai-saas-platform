import Image from 'next/image';

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-y">
      <div className="relative w-10 h-10 animate-spin">
        <Image src="/loading-2.png" fill alt="Logo" />
      </div>
      <p className="text-sm text-muted-foreground">Guru is thinking...</p>
    </div>
  );
};
