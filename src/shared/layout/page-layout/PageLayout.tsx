import type React from 'react';

interface IPageLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const PageLayout = ({ children, title }: IPageLayoutProps) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="card w-full max-w-2xl">
        <h1 className="text-lg font-semibold text-black/70 mb-4">{title}</h1>

        {children}
      </div>
    </div>
  );
};
