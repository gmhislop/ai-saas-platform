import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs';

import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const instructionMesage: ChatCompletionMessageParam = {
    role: "system",
    content: "You are a code generator. you answer in first person, and your responses that include code should consist of markdown code snippets, use code comments for explanations."
};


export async function POST(
    req: Request
) {
    try {
        const { userId } = auth()
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse('OpenAI API key not found', { status: 500 });
        }

        if (!messages) {
            return new NextResponse('Message is required', { status: 400 });
        }

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse('Free trial has expired', { status: 403 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMesage, ...messages],
        });

        await increaseApiLimit();

        return NextResponse.json(response.choices[0].message);


    } catch (error) {
        console.error('[CODE_ERROR]', error);
        return new NextResponse('internal error', { status: 500 });
    }
}