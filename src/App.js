import AuthPages from "./pages/auth/Auth";
import NavComp from "./component/nav";
import Dashboard from "./pages/dashboard/Dashboard";
import Catalog from "./pages/catalog/catalog";
import Errorpage from "./pages/Error";
import "./style/App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Footer from "./component/Footer";
import ProfilePage from "./pages/profile/ProfilePage";

function RequireAuth() {
  let auth = sessionStorage.getItem("logged");
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return <Outlet />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavComp />
        <Routes>
          <Route path="/" element={<AuthPages />} />
          {/* PUBLIC ROUTES */}
          <Route>
            <Route path="/" element={<AuthPages />} />
            <Route path="/catalog">
              <Route index element={<Catalog />} />
            </Route>
            {/* PRIVATE ROUTES */}
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route index path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
