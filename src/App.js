import './App.css';
import AuthPages from './pages/auth/Auth';
import Nav from './component/nav';
import Dashboard from './pages/dashboard/Dashboard';
import Catalog from './pages/catalog/catalog';
import Errorpage from './pages/Error';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet
} from "react-router-dom";

function RequireAuth() {
  let auth = sessionStorage.getItem('logged');
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
        <Nav />
        <Routes>
          <Route path="/" element={<AuthPages />} />
          {/* PUBLIC ROUTES */}
          <Route>
            <Route path="/" element={<AuthPages />} />
            <Route path="/catalog" >
              <Route index element={<Catalog />} />
            </Route>
            {/* PRIVATE ROUTES */}
            <Route element={<RequireAuth />}>
              <Route index path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
