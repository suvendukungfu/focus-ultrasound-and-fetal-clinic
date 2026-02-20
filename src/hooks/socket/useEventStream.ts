import { useEffect } from 'react';
import { useAdminStore } from '../../store/useAdminStore';

export const useEventStream = () => {
  const addEvent = useAdminStore((state) => state.addEvent);

  useEffect(() => {
    // Connect to the backend EventBus stream via Server-Sent Events (SSE)
    const eventSource = new EventSource(`${import.meta.env?.VITE_API_URL || 'http://localhost:4000'}/api/v1/events/stream`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        addEvent(data);
      } catch (err) {
        console.error('Failed to parse SSE streaming data', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE Connection Error', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [addEvent]);
};
