import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Addpost from './pages/Addpost';
import Profile from './pages/Profile';
import { useAppSelector } from './hooks/redux/hooks';
import ProtectedRoutes from './wrapper/ProtectedRoutes';
import Sidebar from './components/Sidebar/Sidebar';
import AllUsers from './pages/AllUsers';
import Following from './pages/Following';
import Follower from './pages/Follower';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import MyPost from './pages/MyPost';

function App() {
  const { loading } = useAppSelector((state) => state.alertReducer);

  return (
    <div className="App">
      {loading && <LoadingSpinner />}
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
                  <AllUsers />
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
              path="/profile"
              element={
                <>
                  <AppShell />
                  <Profile />
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
            <Route
              path="/mypage"
              element={
                <>
                  <AppShell />
                  <MyPost />
                </>
              }
            />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/guest"
            element={
              <>
                <AppShell />
                <Home />
              </>
            }
          />
          <Route
            path="guest/alluser"
            element={
              <>
                <AppShell />
                <AllUsers />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function AppShell() {
  return <Sidebar />;
}

export default App;
