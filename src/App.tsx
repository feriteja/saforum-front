import { Navigate, Route, Routes } from "react-router-dom";
import { Loading, Navbar, SnackBar } from "./components";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { SystemProvider } from "./context/SystemContext";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { RequireAuth } from "./function/handler/route/ProtectedRoute";
import { AdminDashboard, AppLogPage } from "./pages/admin";
import { ForgotPassword, SignIn, SignUp } from "./pages/auth";
import {
  EditForumSub,
  ForumPage,
  ForumSubPage,
  HomePage,
  PostingPage,
  ProfilePage,
  ProfilePageEdit,
} from "./pages/main";
import { NotFound } from "./pages/warn";
import About from "./pages/warn/About";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL + "/api";

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

                    <Route path="/forum" element={<ForumPage />}>
                      <Route path="s/:category" element={<ForumPage />} />
                    </Route>

                    <Route path="/forum/edit" element={<EditForumSub />} />

                    <Route path="forum/f/:forumID" element={<ForumSubPage />} />

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
                    <Route path="/forgot" element={<ForgotPassword />} />
                    <Route path="admin">
                      <Route path="" element={<AdminDashboard />} />
                      <Route path="app-log" element={<AppLogPage />} />
                    </Route>
                    <Route path="/about" element={<About />} />
                    <Route path="/notFound" element={<NotFound />} />
                    <Route
                      path="/*"
                      element={<Navigate to="/notFound" replace />}
                    />
                  </Routes>
                  <Loading />
                  <SnackBar />
                </div>
                <div className="fixed -bottom-14 -right-14 h-28 w-28 -rotate-45  rounded-full hover:-bottom-5 hover:-right-5 duration-300">
                  <div className="w-full h-full rounded-full  bg-accent border-primary    border-4 ">
                    <div className="w-full h-full flex items-center justify-center rounded-full bg-accent ">
                      <h1 className="font-semibold text-black">About</h1>
                    </div>
                  </div>
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
