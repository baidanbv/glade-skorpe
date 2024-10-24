'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { usePathStore } from '@/store';

const useGetCurrentUrl = () => {
  const setPathname = usePathStore((state) => state.setPathname);
  const currentPathname = usePathname();

  useEffect(() => {
    setPathname(currentPathname);
  }, [currentPathname, setPathname]);

  return null;
};

export default useGetCurrentUrl;
