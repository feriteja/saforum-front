import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loading, Navbar, SnackBar } from "./components";

import { ThemeProvider } from "./context/ThemeContext";
import { SignIn, SignUp } from "./pages/auth";
import { HomePage, ProfilePage } from "./pages/main";
import { UserProvider } from "./context/UserContext";
import { NotFound } from "./pages/warn";
import { SystemProvider } from "./context/SystemContext";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <ThemeProvider initialTheme="light">
      <CookiesProvider>
        <UserProvider>
          <SystemProvider>
            <div className="min-h-screen ">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
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
          </SystemProvider>
        </UserProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
