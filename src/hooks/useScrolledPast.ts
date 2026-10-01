import { useCallback, useSyncExternalStore } from 'react';

const subscribeToScroll = (callback: () => void) => {
    window.addEventListener('scroll', callback, { passive: true });
    return () => window.removeEventListener('scroll', callback);
};

const getServerSnapshot = () => false;

export const useScrolledPast = (offset: number) => {
    const getSnapshot = useCallback(() => window.scrollY > offset, [offset]);
    return useSyncExternalStore(subscribeToScroll, getSnapshot, getServerSnapshot);
};
