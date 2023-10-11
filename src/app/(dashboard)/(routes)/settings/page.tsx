import { Heading } from '@/components/heading';
import SubscriptionButton from '@/components/subscription-buttton';
import { checkSubscription } from '@/lib/subscription';
import { Settings } from 'lucide-react';
import React from 'react';

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <Heading
        title={'Settings'}
        description={'Manage your account settings.'}
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="space-y-4 PX-4 lg:px-8">
        <div className="text-sm text-muted-foreground">
          {isPro ? 'You are currently on a pro plan.' : 'You are currently on a free plan.'}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
