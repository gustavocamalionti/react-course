import type React from 'react';
import PageLayoutStyles from './PageLayout.module.css';

interface IPageLayoutProps {
  children: React.ReactNode;
  title: string;
}
export const PageLayout = ({ children, title }: IPageLayoutProps) => {
  return (
    <div className={PageLayoutStyles.PageLayoutContainer}>
      <div className={PageLayoutStyles.PageContent}>
        <div>
          <h1 className={PageLayoutStyles.PageTitle}>{title}</h1>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
