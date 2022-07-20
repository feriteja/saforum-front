import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";

import { ThemeProvider } from "./context/ThemeContext";
import { SignIn, SignUp } from "./pages/auth";
import { HomePage } from "./pages/main";
import { UserProvider } from "./context/UserContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider initialTheme="light">
      <UserProvider>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
