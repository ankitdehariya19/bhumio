import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="flex flex-col h-full min-h-screen w-full">
      <header className="flex items-center justify-start p-4 border-b border-gray-200 sm:justify-between sm:p-6 lg:p-8 dark:border-gray-800">
      <Link to="/" className="flex items-center gap-2 text-xl font-semibold dark:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Home
        </Link>
      </header>
      <main className="flex-1 grid w-full min-h-0 overflow-hidden">
        <div className="flex w-full max-w-4xl min-h-0 py-12 mx-auto items-center justify-center px-4 text-center sm:py-24 md:px-6 md:justify-start md:text-left lg:px-8 lg:py-32">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Welcome to the Admin Dashboard</h1>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Manage your app with ease. The admin dashboard provides you with the tools to configure your settings,
              manage users, and view analytics.
            </p>
            <Link to="/login" className="inline-flex h-10 items-center justify-center rounded-md text-white border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300">
              Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomePage;
