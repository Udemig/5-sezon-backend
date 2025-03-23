import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/header";
import Footer from "./components/footer";
import Create from "./pages/create";
import Detail from "./pages/detail";
import Edit from "./pages/edit";
import Protected from "./components/protected";

function App() {
  return (
    <div className="bg-dark-08 text-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/:id" element={<Detail />} />

          <Route element={<Protected />}>
            <Route path="/blog/create" element={<Create />} />
            <Route path="/blog/:id/edit" element={<Edit />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
