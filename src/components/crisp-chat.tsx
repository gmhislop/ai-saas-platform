'use client';

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('b54c57d2-6c4a-4a5f-9c2e-afd56d668a65');
  }, []);

  return null;
};
