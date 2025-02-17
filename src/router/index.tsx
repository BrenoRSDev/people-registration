import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, User } from "../pages";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/create" element={<User />} />
        <Route path="/user/edit/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
