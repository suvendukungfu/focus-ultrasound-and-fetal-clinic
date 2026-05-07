/**
 * API Client for interacting with the Node.js FAANG Backend
 */

export const getAnalytics = async () => {
  // In a real app, this would use axios or fetch with stored JWTs
  return {
    conversionIncrease: 14,
    topServices: ['4D Ultrasound', 'NIPT Test'],
    sentiment: 'Positive',
    anomalies: []
  };
};

export const fetchQueueStatus = async () => {
  // Mock data representing BullMQ active states
  return [
    { name: 'LeadProcessing', active: 3, completed: 140, failed: 1 },
    { name: 'EmailDelivery', active: 0, completed: 512, failed: 0 },
    { name: 'SEOIndexing', active: 1, completed: 42, failed: 2 },
  ];
};
