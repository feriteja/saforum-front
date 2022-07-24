import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loading, Navbar, SnackBar } from "./components";

import { ThemeProvider } from "./context/ThemeContext";
import { SignIn, SignUp } from "./pages/auth";
import {
  ForumPage,
  ForumSubPage,
  HomePage,
  PostingPage,
  ProfilePage,
  ProfilePageEdit,
} from "./pages/main";
import { UserProvider } from "./context/UserContext";
import { NotFound } from "./pages/warn";
import { SystemProvider } from "./context/SystemContext";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RequireAuth } from "./function/handler/route/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider initialTheme="light">
        <CookiesProvider>
          <UserProvider>
            <SystemProvider>
              <Navbar />
              <div className=" min-h-screen  bg-secondary">
                <div className="mx-auto max-w-5xl  ">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/forum">
                      <Route path=":category" element={<ForumPage />} />
                    </Route>
                    <Route path="forum/s/:forumID" element={<ForumSubPage />} />

                    <Route path="/user/">
                      <Route path=":username" element={<ProfilePage />} />
                      <Route
                        path="edit"
                        element={<RequireAuth children={<ProfilePageEdit />} />}
                      />
                    </Route>
                    <Route path="/posting" element={<PostingPage />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="notFound" element={<NotFound />} />
                    <Route
                      path="/*"
                      element={<Navigate to="/notFound" replace />}
                    />
                  </Routes>
                  <Loading />
                  <SnackBar />
                </div>
              </div>
            </SystemProvider>
          </UserProvider>
        </CookiesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
