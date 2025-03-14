import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connection from "./components/Connection";
import Request from "./components/Request";
import NotFound from "./components/NotFound"; // 404 Page

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connection />} />
            <Route path="request/receive" element={<Request />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
