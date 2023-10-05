'use client';

import React from 'react';
import * as z from 'zod';
import axios from 'axios';
import { Music } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/empty';
import { Heading } from '@/components/heading';
import { Loader } from '@/components/loader';
import { useProModal } from '@/hooks/use-pro-modal';

const MusicPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [music, setMusic] = React.useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post('/api/music', values);

      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <Heading
        title={'Music generation'}
        description={'Our most advanced music model.'}
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="text-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparant"
                        disabled={isLoading}
                        placeholder="Start typing..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-full col-span-12 lg:col-span-2" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
          <div className="mt-4 space-y-4">
            {isLoading && (
              <div className="items-center justify-center w-full p-8 rounded-lg bg-muted">
                <Loader />
              </div>
            )}
            {!music && !isLoading && (
              <div>
                <Empty label={'No music generated.'} />
              </div>
            )}
            {music && (
              <audio controls className="w-full mt-8">
                <source src={music} />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPage;
