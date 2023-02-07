import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { EntitiesList, entitiesListLoader } from "./EntitiesList";
import { EntityDetail, entityDetailLoader } from "./EntityDetail";

const router = createBrowserRouter([
  {
    path: "/",
    loader: entitiesListLoader,
    element: <EntitiesList />,
  },
  {
    path: "/entities/:entityId",
    loader: entityDetailLoader,
    element: <EntityDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
