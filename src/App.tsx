import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import { ActionStateProvider } from "hooks/context/ActionContext";
import { TodoStateProvider } from "hooks/context/TodosContext";

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
      <ActionStateProvider>
        <TodoStateProvider>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <Navigation />
            </QueryClientProvider>
          </HelmetProvider>
        </TodoStateProvider>
      </ActionStateProvider>
    </BrowserRouter>
  );
};

export default App;
