// 1. Read the environment variables from import.meta.env
const config = {
  authServiceBaseUrl: import.meta.env.VITE_AUTH_SERVICE_BASE_URL,
};

// 2. You can add validation to ensure they are defined
Object.entries(config).forEach(([key, value]) => {
  if (value === undefined) {
    throw new Error(`Missing environment variable for: ${key}`);
  }
});

// 3. Export the config object as the default export
export default config;
