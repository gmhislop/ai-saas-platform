'use client';

import React from 'react';
import * as z from 'zod';
import axios from 'axios';
import { DownloadIcon, ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Empty } from '@/components/empty';
import { Heading } from '@/components/heading';
import { Loader } from '@/components/loader';
import { amountOptions, formSchema, resolutionOptions } from './constants';
import Image from 'next/image';
import { Card, CardFooter } from '@/components/ui/card';
import { useProModal } from '@/hooks/use-pro-modal';

const ImagePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [images, setImages] = React.useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);

      const response = await axios.post('/api/image', values);

      const url = response.data.map((images: { url: string }) => images.url);

      setImages(url);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <Heading
        title={'Image generation'}
        description={'Turn your text into an image.'}
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="text-pink-700/10"
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
                        placeholder="Descripive a image..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              <div className="p-20">
                <Loader />
              </div>
            )}
            {images.length === 0 && !isLoading && (
              <div>
                <Empty label={'No images generated.'} />
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {images.map((src) => (
                <Card key={src} className="overflow-hidden rounded-lg">
                  <div className="relative aspect-square">
                    <Image src={src} fill alt="image" />
                  </div>
                  <CardFooter className="p-2">
                    <Button variant="secondary" className="w-full" onClick={() => window.open(src)}>
                      <DownloadIcon className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePage;
