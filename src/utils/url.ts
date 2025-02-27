export const getBaseUrl = () => {
  const enviornment = process.env.NODE_ENV;

  const baseUrl =
    enviornment === "development"
      ? "http://localhost:3000"
      : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  return baseUrl;
};
