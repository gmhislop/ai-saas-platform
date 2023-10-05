'use client';

import { tools } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProModal } from '@/hooks/use-pro-modal';
import { cn } from '@/lib/utils';
import { Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ProModal = () => {
  const proModal = useProModal();

  return (
    <div>
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center justify-center pb-2 gap-y-4">
              <div className="flex items-center py-1 font-bold gap-x-2">
                Upgrade to Guru
                <Badge variant={'premium'} className="py-1 text-sm uppercase">
                  Pro
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription className="pt-2 space-y-2 font-medium text-center text-zinc-900">
              {tools.map((tool) => (
                <Card
                  key={tool.label}
                  className="flex items-center justify-between p-3 border-black/5"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                      <tool.icon className={cn('w-6 h-6', tool.color)} />
                    </div>
                    <div className="text-sm font-semibold">{tool.label}</div>
                  </div>
                  <Check className="w-5 h-5 text-primary" />
                </Card>
              ))}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button size={'lg'} variant={'premium'} className="w-full">
              Upgrade <Zap className="w-4 h-4 ml-2" fill="white" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
