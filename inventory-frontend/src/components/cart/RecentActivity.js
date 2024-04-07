import React from 'react';

const RecentActivity = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Latest notifications and updates</p>
      </div>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">Your order has been confirmed.</p>
          <time className="ml-auto text-sm font-medium text-gray-500 dark:text-gray-400">2m</time>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">Payment received for order #1234.</p>
          <time className="ml-auto text-sm font-medium text-gray-500 dark:text-gray-400">5m</time>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">Your subscription has been renewed.</p>
          <time className="ml-auto text-sm font-medium text-gray-500 dark:text-gray-400">10m</time>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">Your payment is due on 25th March.</p>
          <time className="ml-auto text-sm font-medium text-gray-500 dark:text-gray-400">15m</time>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
