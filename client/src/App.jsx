import LoginPage from "./Pages/LoginPage/index.jsx";
import HomePage from "./Pages/HomePage/index.jsx";
import ProfilePage from "./Pages/ProfilePage/index.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
            </Routes>
          </>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
