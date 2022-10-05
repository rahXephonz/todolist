import React from "react";
import Layout from "./layout/Layout";
import { createRoot } from "react-dom/client";

// tailwind styles
import "styles/index.css";
import App from "./App";

type RootElement = Element | DocumentFragment;

const rootElement = document.getElementById("root");
const renderRoot = createRoot(rootElement as RootElement);

renderRoot.render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>,
);
