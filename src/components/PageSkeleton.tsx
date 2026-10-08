import React from 'react';

// Dinamik səhifə yüklənərkən göstərilən yüngül boşluq (Suspense fallback)
export default function PageSkeleton() {
  return (
    <div className="bg-paper min-h-[70vh] pt-36 md:pt-44 px-4 md:px-8" aria-busy="true">
      <div className="max-w-6xl mx-auto animate-pulse">
        <div className="h-4 w-40 rounded bg-black/10 mb-6" />
        <div className="h-14 w-2/3 rounded bg-black/10 mb-4" />
        <div className="h-5 w-1/2 rounded bg-black/10" />
      </div>
    </div>
  );
}
