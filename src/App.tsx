import { BrowserRouter } from "react-router";
import Routes from "./Routes";
import { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import toastConfig from "./config/toaster";
import queryClient from "./config/query";
import { Provider as StoreProvider } from "react-redux";
import storeConfig from "./store";

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider store={storeConfig}>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={<span className="loading loading-dots loading-xl"></span>}
          >
            <Routes />
          </Suspense>
        </QueryClientProvider>
      </StoreProvider>
      <Toaster {...toastConfig} />
    </BrowserRouter>
  );
}
