'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MAX_FREE_COUNTS } from '@/constants';
import { Progress } from '@/components/ui/progress';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import { useProModal } from '@/hooks/use-pro-modal';

type FreeCounterProps = {
  apiLimitCount: number;
};

export const FreeCounter = ({ apiLimitCount = 0 }: FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setmounted] = React.useState(false);

  React.useEffect(() => {
    setmounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="border-0 bg-white/10">
        <CardContent className="py-6">
          <div className="mb-4 space-y-2 text-sm text-center text-white">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
          </div>
          <Button onClick={proModal.onOpen} variant={'premium'} className="w-full">
            Upgrade
            <Zap fill="white" className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
