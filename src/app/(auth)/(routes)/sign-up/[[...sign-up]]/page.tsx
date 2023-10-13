import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <SignUp />
      <Link
        href="/"
        className="pl-10 font-semibold bg-transparent border-none hover:bg-transparent"
      >
        Go back
      </Link>
    </div>
  );
}
