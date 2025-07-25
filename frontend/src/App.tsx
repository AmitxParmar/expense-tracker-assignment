import { ExpenseTracker } from "./components/ExpenseTracker"
import {
  Route,
  Routes,
} from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./pages/LoginPage";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import NotFound from "./components/NotFound";


function App() {
  const { isAuthenticated } = useAuth()
  return (
    <Routes>
      <Route element={<AuthLayout />}>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <ExpenseTracker />
        </ProtectedRoute>} />
    </Routes>
  )
}

export default App;
