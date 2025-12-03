import axios from "axios";

const API_BASE_URL = "https://api.yourcrm.com";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Fetches the main pipeline data from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of pipeline columns.
 */
export const getPipelineData = async () => {
  console.warn(
    "Using mock data for getPipelineData. Replace with a real API call."
  );

  return [
    {
      stage: "New",
      leads: [
        {
          id: 1,
          name: "Ananya Sharma",
          loan: "Home Loan",
          amount: "₹75,00,000",
          timeAgo: "2 hours ago",
        },
        {
          id: 2,
          name: "Rohit Verma",
          loan: "Personal Loan",
          amount: "₹10,00,000",
          timeAgo: "5 hours ago",
        },
      ],
    },
    {
      stage: "Contacted",
      leads: [
        {
          id: 3,
          name: "Priya Singh",
          loan: "Business Loan",
          amount: "₹25,00,000",
          timeAgo: "1 day ago",
        },
      ],
    },
    {
      stage: "Application Submitted",
      leads: [
        {
          id: 4,
          name: "Vikram Joshi",
          loan: "Home Loan",
          amount: "₹50,00,000",
          timeAgo: "3 days ago",
        },
      ],
    },
    {
      stage: "Approved",
      leads: [],
    },
    {
      stage: "Disbursed",
      leads: [
        {
          id: 5,
          name: "Kavita Reddy",
          loan: "Personal Loan",
          amount: "₹5,00,000",
          timeAgo: "1 week ago",
        },
      ],
    },
  ];
};

/**
 * Updates the stage of a specific lead in the backend.
 * @param {string|number} leadId - The ID of the lead to update.
 * @param {string} newStage - The new stage for the lead.
 * @returns {Promise<Object>} A promise that resolves with the updated lead data.
 */
export const updateLeadStage = async (leadId, newStage) => {
  console.warn(
    `Mocking updateLeadStage for lead ${leadId} to ${newStage}. Replace with a real API call.`
  );

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (Math.random() > 0.9) {
    // 10% chance of error
    throw new Error("Failed to update lead stage on the server.");
  }

  return { success: true };
};

/**
 * Triggers a sync for a specific CRM integration.
 * @param {string} integrationName - The name of the CRM to sync.
 * @returns {Promise<Object>} A promise that resolves when the sync is complete.
 */
export const syncCrmIntegration = async (integrationName) => {
  console.warn(
    `Mocking sync for ${integrationName}. Replace with a real API call.`
  );

  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (Math.random() > 0.8) {
    throw new Error(`Failed to sync ${integrationName}.`);
  }

  return { success: true };
};
