import type { ReactNode } from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
           <svg
              className="mx-auto h-12 w-auto text-primary"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.75 2.75a.75.75 0 00-1.5 0V5.5h- significativas9.19L2.75 4.75a.75.75 0 00-1 1.732l1.178.682A11.214 11.214 0 00.25 12c0 6.213 5.037 11.25 11.25 11.25S22.75 18.213 22.75 12c0-3.013-1.187-5.76-3.125-7.828V2.75zM11.25 7A4.25 4.25 0 1011.25 15.5 4.25 4.25 0 0011.25 7z"
                clipRule="evenodd"
              />
              <path d="M12 21.25a9.75 9.75 0 100-19.5 9.75 9.75 0 000 19.5zM21.25 12a9.25 9.25 0 11-18.5 0 9.25 9.25 0 0118.5 0z" />
              <path d="M11.25 9a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
            </svg>
          <h1 className="mt-6 text-3xl font-headline font-bold tracking-tight text-foreground sm:text-4xl">
            MortgageIntimator
          </h1>
          <h2 className="mt-2 text-xl font-headline text-muted-foreground">
            {title}
          </h2>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-lg sm:p-8">
         {children}
        </div>
      </div>
    </div>
  );
}
