import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { BlogList } from "./pages/BlogList";
import { WriteBlog } from "./pages/WriteBlog";
import { ReadBlog } from "./pages/ReadBlog";
import { PrivateRoutes } from "./routes/PrivateRoutes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/:id" element={<ReadBlog />} />
          <Route path="/publish" element={<WriteBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
