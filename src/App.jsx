import Login from "./pages/Login.jsx";
import Cases from "./pages/Cases.jsx";
import Home from "./pages/Home.jsx";
import Form from "./pages/Form.jsx";
import Interviews from "./pages/Interviews.jsx";
import Interviews_done from "./pages/Interviews_done.jsx";
import Interviews_form from "./pages/Interviews_form.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// import "./App.css";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
             </ProtectedRoute>
            }
          />
          <Route
            path="cases"
            element={
              <ProtectedRoute>
                <Cases />
              </ProtectedRoute>
            }
          />
          <Route
            path="form/:streetName"
            element={
              <ProtectedRoute>
              <Form />
              </ProtectedRoute>
            }
          />

          <Route path="interviews" element= {<ProtectedRoute><Interviews /></ProtectedRoute>}/>
          
          
          <Route path="interviews_done" element={<ProtectedRoute><Interviews_done /></ProtectedRoute>} />
          <Route path="interviews_form" element={<Interviews_form />} />
          <Route path="*" element={<h1>page not found</h1>}/>

        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
