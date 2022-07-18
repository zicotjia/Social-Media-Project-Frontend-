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
import People from './pages/AllUsers';
import AllUsers from './pages/AllUsers';
import { ProfilePage } from './components/ProfilePage';
import Following from './pages/Following';
import Follower from './pages/Follower';

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
            <Route
              path="/people"
              element={
                <>
                  <AppShell />
                  <People />
                </>
              }
            />
            <Route
              path="/addpost"
              element={
                <>
                  <AppShell />
                  <Addpost />
                </>
              }
            />
            <Route
              path="/addpost"
              element={
                <>
                  <AppShell />
                  <AllUsers />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <AppShell />
                  <ProfilePage />
                </>
              }
            />
            <Route
              path="/following"
              element={
                <>
                  <AppShell />
                  <Following />
                </>
              }
            />
            <Route
              path="/follower"
              element={
                <>
                  <AppShell />
                  <Follower />
                </>
              }
            />
          </Route>
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
