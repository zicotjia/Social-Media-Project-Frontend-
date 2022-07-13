import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Addpost from './pages/Addpost';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { Spinner } from '@chakra-ui/react';
import { useAppSelector } from './hooks/redux/hooks';
import ProtectedRoutes from './wrapper/ProtectedRoutes';
import Sidebar from './components/Sidebar';
import ImagePost from './components/ImagePost';

function App() {
  const { loading } = useAppSelector((state) => state.alertReducer);

  return (
    <div className="App">
      {loading && <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/"
              element={
                <>
                  <AppShell />
                  <Home />
                </>
              }
            />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/addpost" element={<Addpost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addpost" element={<Addpost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function AppShell() {
  return <Sidebar />;
}

export default App;