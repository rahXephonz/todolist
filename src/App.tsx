import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
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
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
