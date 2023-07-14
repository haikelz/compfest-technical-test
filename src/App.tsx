import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/ui/Layout";
import Loading from "./components/ui/Loading";
import { env } from "./env";

const Home = lazy(() => import("./pages/Home"));
const SavedMovies = lazy(() => import("./pages/SavedMovies"));
const DetailMovie = lazy(() => import("./pages/DetailMovie"));
const NotFoundPage = lazy(() => import("./pages/404"));

const { VITE_CLERK_PUBLISHABLE_KEY } = env;

if (!VITE_CLERK_PUBLISHABLE_KEY) throw new Error("Missing Publishable Key!");

export default function App() {
  return (
    <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <Suspense fallback={<Loading />}>
                      <Home />
                    </Suspense>
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/detail-movie/:imdbID"
              element={
                <>
                  <SignedIn>
                    <Suspense fallback={<Loading />}>
                      <DetailMovie />
                    </Suspense>
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <>
                  <SignedIn>
                    <Suspense fallback={<Loading />}>
                      <SavedMovies />
                    </Suspense>
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <SignedIn>
                    <Suspense fallback={<Loading />}>
                      <NotFoundPage />
                    </Suspense>
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ClerkProvider>
  );
}
