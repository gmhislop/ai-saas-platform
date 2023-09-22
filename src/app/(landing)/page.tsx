import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const LandingPage = () => {
  return (
    <>
      Landing Page (Unprotected)
      <div>
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
      </div>
      <div>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>
    </>
  );
};

export default LandingPage;
