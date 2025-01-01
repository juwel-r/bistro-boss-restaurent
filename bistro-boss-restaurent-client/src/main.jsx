import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router.jsx";
import { HelmetProvider } from "react-helmet-async";
import { ParallaxProvider } from "react-scroll-parallax";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ParallaxProvider>
      <HelmetProvider>
        <div className="max-w-screen-xl mx-auto">
          <RouterProvider router={router}></RouterProvider>
        </div>
      </HelmetProvider>
    </ParallaxProvider>
  </StrictMode>
);
