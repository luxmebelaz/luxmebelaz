import React from 'react';

// Daxili səhifələrin əsas məzmun konteyneri
export default function PageSection({
  children,
  className = '',
  narrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <section className={`bg-paper text-black px-4 md:px-8 pb-16 md:pb-24 ${className}`}>
      <div className={`${narrow ? 'max-w-3xl' : 'max-w-6xl'} mx-auto`}>{children}</div>
    </section>
  );
}
