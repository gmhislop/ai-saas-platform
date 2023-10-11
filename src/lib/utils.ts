import { type ClassValue, clsx } from "clsx"
import { MessageSquare, Music, Video, Code, Settings, Image } from "lucide-react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    href: '/conversation',
  },
  {
    label: 'Music generation',
    icon: Music,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    href: '/music',
  },
  {
    label: 'Image generation',
    icon: Image,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: '/image',
  },
  {
    label: 'Video generation',
    icon: Video,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    href: '/video',
  },
  {
    label: 'Code generation',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: '/code',
  },
  {
    label: 'Settings',
    icon: Settings,
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
    href: '/settings',
  },
] as const
