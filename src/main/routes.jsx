import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingProgress from "../components/LoadingProgress.jsx";

// Lazy loaded components
const App = lazy(() => import("../main/App.jsx"));
const NotFound = lazy(() => import("../components/NotFound.jsx"));
const SignIn = lazy(() => import("../routes/Signin.jsx"));
const SignUp = lazy(() => import("../routes/Signup.jsx")); 

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingProgress loaderType="BarLoader" />}>
        <App />
      </Suspense>
    ),
  },
  {
    path: "*", // catch-all route
    element: (
      <Suspense fallback={<LoadingProgress loaderType="BarLoader" />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;
