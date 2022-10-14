import React, { Suspense, lazy, LazyExoticComponent } from "react";
import { useRoutes } from "react-router-dom";

const Loadable = (Component: LazyExoticComponent<() => JSX.Element>) => () => {
  return (
    <Suspense fallback={"loading..."}>
      <Component />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
  ]);
}

const HomePage = Loadable(lazy(() => import("../pages/home")));
