'use client';

import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Zap } from 'lucide-react';

import { Button } from './ui/button';

type SubscriptionButtonProps = {
  isPro?: boolean;
};

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [loading, setLoading] = React.useState(false);
  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button disabled={loading} variant={isPro ? 'default' : 'premium'} onClick={onClick}>
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Zap className="w-4 ml-2 h4 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
