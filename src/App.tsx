import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import { GlobalStateProvider } from "hooks/context/ActionContext";

import Navigation from "routes/Navigation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter basename="/">
      <GlobalStateProvider>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <Navigation />
          </QueryClientProvider>
        </HelmetProvider>
      </GlobalStateProvider>
    </BrowserRouter>
  );
};

export default App;
