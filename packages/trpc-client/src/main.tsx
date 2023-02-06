import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { EntitiesList, entitiesListLoader } from "./EntitiesList";

const router = createBrowserRouter([
  {
    path: "/",
    loader: entitiesListLoader,
    element: <EntitiesList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
