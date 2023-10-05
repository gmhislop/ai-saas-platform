'use client';

import { Card } from '@/components/ui/card';
import { cn, tools } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();

  return (
    <section>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl font-bold text-center md:text-4xl">Countless possibilities</h2>
        <p className="font-light text-center text-muted-foreground text:sm md:text-lg">
          Chat with the smartest AI - Be part of the revolution
        </p>
        <div className="px-4 space-y-4 md:px-20 lg:px-32">
          {tools.map((tool) => (
            <Card
              onClick={() => router.push(tool.href)}
              key={tool.href}
              className="flex items-center justify-between p-4 transition cursor-pointer border-black/5 hover:shadow-md"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                  <tool.icon className={cn('w-8 h-8', tool.color)} />
                </div>
                <div className="font-semibold">{tool.label}</div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
