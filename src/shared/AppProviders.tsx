import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queyClient = new QueryClient();

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queyClient}>{children}</QueryClientProvider>
  );
};
