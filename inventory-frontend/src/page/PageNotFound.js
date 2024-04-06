import React from "react";

const PageNotFound = () => {
  return (
    <div className=" ">
      <div className="flex items-center justify-center w-full min-h-[50vh] px-4">
        <div className="grid max-w-md items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
            404 - Page Not Found
          </h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            You've hit a route that doesn't exist. The page you were looking for
            doesn't.
          </p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex h-10 text-white items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm gap-1 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
            Go back home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
