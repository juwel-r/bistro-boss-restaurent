import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router.jsx";
import { HelmetProvider } from "react-helmet-async";
import { ParallaxProvider } from "react-scroll-parallax";
import AuthProvider from "./Provider/AuthProvider.jsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ParallaxProvider>
        <HelmetProvider>
          <AuthProvider>
            <div className="max-w-screen-xl mx-auto">
              <RouterProvider router={router}></RouterProvider>
            </div>
          </AuthProvider>
        </HelmetProvider>
      </ParallaxProvider>
    </QueryClientProvider>
  </StrictMode>
);
