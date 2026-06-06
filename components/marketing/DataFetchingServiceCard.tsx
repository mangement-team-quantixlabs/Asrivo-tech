import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

// --- State Machine Types ---
type FetchState = 'idle' | 'loading' | 'success' | 'error';

interface ServiceData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
}

// Simulated API Call
const fetchServiceData = async (shouldFail = false): Promise<ServiceData> => {
  // Simulate network latency (100ms to 1200ms)
  const latency = Math.random() * 1100 + 100;
  await new Promise((resolve) => setTimeout(resolve, latency));

  if (shouldFail || Math.random() < 0.15) {
    throw new Error('Failed to fetch service data.');
  }

  return {
    id: '1',
    title: 'Enterprise Cloud Migration',
    description:
      'Seamlessly transition your legacy systems to a highly scalable, secure, and performant cloud architecture.',
    imageUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    price: 'Starting at $5,000',
  };
};

export default function DataFetchingServiceCard() {
  const [state, setState] = useState<FetchState>('idle');
  const [data, setData] = useState<ServiceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Flash Prevention State
  const [showSkeleton, setShowSkeleton] = useState(false);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const loadData = useCallback(async () => {
    setState('loading');
    setError(null);
    setShowSkeleton(false);

    // Flash Prevention: Delay skeleton rendering by 250ms
    loadingTimerRef.current = setTimeout(() => {
      setShowSkeleton(true);
    }, 250);

    try {
      const result = await fetchServiceData();

      // Clear the timeout if fetch resolves faster than 250ms
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }

      setData(result);
      setState('success');
    } catch (err: any) {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
      setError(err.message || 'An unexpected error occurred.');
      setState('error');
    }
  }, []);

  useEffect(() => {
    loadData();
    return () => {
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    };
  }, [loadData]);

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* 
        Injecting custom styles for the high-performance shimmer.
        Using transform (translateX) and will-change to prevent repaints.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .shimmer-container {
          position: relative;
          overflow: hidden;
          background-color: #f3f4f6; /* gray-100 */
        }
        
        :is(.dark) .shimmer-container {
          background-color: #1f2937; /* gray-800 */
        }

        .shimmer-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translateX(-100%);
          animation: shimmer 1.5s infinite;
          will-change: transform;
        }

        :is(.dark) .shimmer-effect {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0) 100%
          );
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        /* High-Performance Animations Requirement: Disable for reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .shimmer-effect {
            animation: none;
            display: none;
          }
        }
      `,
        }}
      />

      {state === 'idle' && (
        <div className="flex justify-center items-center h-[420px] border border-gray-200 dark:border-gray-800 rounded-xl">
          <p className="text-gray-500">Initializing...</p>
        </div>
      )}

      {state === 'loading' && showSkeleton && <ServiceCardSkeleton />}

      {state === 'success' && data && <ServiceCardContent data={data} />}

      {state === 'error' && <ServiceCardError error={error} onRetry={loadData} />}
    </div>
  );
}

function ServiceCardSkeleton() {
  return (
    // Strict Accessibility: aria-busy="true" and aria-hidden="true"
    <div
      className="flex flex-col border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm w-full"
      aria-busy="true"
      aria-hidden="true"
    >
      {/* Visually hidden text for screen readers */}
      <span className="sr-only" aria-live="polite">
        Loading services...
      </span>

      {/* Image Placeholder (Fixed aspect ratio 16:9 to match exact box model) */}
      <div className="w-full aspect-video shimmer-container">
        <div className="shimmer-effect" />
      </div>

      {/* Content Placeholder (Matches padding and spacing of real content) */}
      <div className="p-5 flex flex-col gap-4">
        {/* Title Placeholder */}
        <div className="h-7 w-3/4 shimmer-container rounded-md">
          <div className="shimmer-effect" />
        </div>

        {/* Description Placeholder */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-full shimmer-container rounded-md">
            <div className="shimmer-effect" />
          </div>
          <div className="h-4 w-11/12 shimmer-container rounded-md">
            <div className="shimmer-effect" />
          </div>
          <div className="h-4 w-4/5 shimmer-container rounded-md">
            <div className="shimmer-effect" />
          </div>
        </div>

        {/* Price & Action Placeholder */}
        <div className="mt-4 flex items-center justify-between">
          <div className="h-5 w-1/3 shimmer-container rounded-md">
            <div className="shimmer-effect" />
          </div>
          <div className="h-9 w-24 shimmer-container rounded-md">
            <div className="shimmer-effect" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCardContent({ data }: { data: ServiceData }) {
  return (
    <div className="flex flex-col border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300 w-full group">
      {/* Image Container (Fixed aspect ratio 16:9 to guarantee Zero CLS) */}
      <div className="w-full aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col gap-4">
        {/* Fixed height for the title to prevent layout shifts (h-7 matching leading-tight text-lg/xl) */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 leading-7 line-clamp-1 h-7">
          {data.title}
        </h3>

        {/* Fixed minimum height for the description matching the 3 skeleton rows */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 min-h-[60px] leading-relaxed">
          {data.description}
        </p>

        {/* Price & Action */}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-medium text-blue-600 dark:text-blue-400 text-sm">
            {data.price}
          </span>
          <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-md font-medium text-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-offset-gray-900 h-9 flex items-center justify-center">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiceCardError({ error, onRetry }: { error: string | null; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 rounded-xl p-6 h-full min-h-[380px] text-center w-full">
      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
        <AlertCircle size={24} />
      </div>
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
        Data Fetch Failed
      </h3>
      <p className="text-sm text-red-600/80 dark:text-red-400/80 mb-6 max-w-[250px]">
        {error || 'Unable to load service information. Please try again.'}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md font-medium text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <RefreshCw size={16} className="text-red-600 dark:text-red-500" />
        Retry
      </button>
    </div>
  );
}
