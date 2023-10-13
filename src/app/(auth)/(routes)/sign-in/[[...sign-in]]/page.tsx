import { Button } from '@/components/ui/button';
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <SignIn />
      <Link
        href="/"
        className="pl-10 font-semibold bg-transparent border-none hover:bg-transparent"
      >
        Go back
      </Link>
    </div>
  );
}
