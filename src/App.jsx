import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Body from "./Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connection from "./components/Connection";
import Request from "./components/Request";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connection />} />
            <Route path="/request/receive" element={<Request />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
