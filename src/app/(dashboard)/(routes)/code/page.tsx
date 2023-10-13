'use client';

import React from 'react';
import * as z from 'zod';
import axios from 'axios';
import ReactMarkDown from 'react-markdown';
import { Code } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ChatCompletionMessageParam } from 'openai/resources/chat/index.mjs';

import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/empty';
import { Heading } from '@/components/heading';
import { Loader } from '@/components/loader';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import { cn } from '@/lib/utils';
import { useProModal } from '@/hooks/use-pro-modal';

const CodePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = React.useState<ChatCompletionMessageParam[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: 'user',
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/code', {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

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
        title={'Code generation'}
        description={'Generate code using descriptive text'}
        icon={Code}
        iconColor="text-green-500"
        bgColor="text-green-500/10"
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
            {messages.length === 0 && !isLoading && (
              <div>
                <Empty label={'No conversation has started'} />
              </div>
            )}
            <div className="flex flex-col-reverse gap-y-4">
              {messages.map((message) => (
                <div
                  key={message.content}
                  className={cn(
                    'items-start flex w-full gap-x-8 rounded-lg p-8',
                    message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted',
                  )}
                >
                  {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                  <ReactMarkDown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="w-full p-2 my-2 overflow-auto rounded-lg bg-black/10">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code className="p-1 rounded-lg bg-black/10" {...props} />
                      ),
                    }}
                    className="overflow-hidden text-sm leading-7"
                  >
                    {message.content || ''}
                  </ReactMarkDown>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodePage;
