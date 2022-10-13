import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import Navigation from "routes/Navigation";
import store from "state/store";

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
      <ReduxProvider store={store}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <Navigation />
          </QueryClientProvider>
        </HelmetProvider>
      </ReduxProvider>
    </BrowserRouter>
  );
};

export default App;
