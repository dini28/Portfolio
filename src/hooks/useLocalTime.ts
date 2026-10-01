import { useCallback, useSyncExternalStore } from 'react';

const subscribeToMinuteTicks = (callback: () => void) => {
    const id = window.setInterval(callback, 15_000);
    return () => window.clearInterval(id);
};

const getServerSnapshot = () => '';

export const useLocalTime = (timeZone: string) => {
    const getSnapshot = useCallback(
        () =>
            new Intl.DateTimeFormat('en-IN', {
                timeZone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }).format(new Date()),
        [timeZone]
    );
    return useSyncExternalStore(subscribeToMinuteTicks, getSnapshot, getServerSnapshot);
};
