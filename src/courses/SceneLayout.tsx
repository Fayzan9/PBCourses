import React from 'react';

interface SceneLayoutProps {
  children: React.ReactNode;
  className?: string;
  gap?: 'gap-4' | 'gap-5' | 'gap-6';
}

export const SceneLayout: React.FC<SceneLayoutProps> = ({
  children,
  className = '',
  gap = 'gap-5'
}) => {
  return (
    <div className={`min-h-full w-full flex flex-col px-8 py-6 ${gap} ${className}`}>
      {children}
    </div>
  );
};

export default SceneLayout;
