'use client';

import axios from 'axios';
import { Zap } from 'lucide-react';
import { Button } from './ui/button';
import React from 'react';

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
      console.error(error, 'BILLING_ERROR');
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
