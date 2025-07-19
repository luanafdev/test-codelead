import SignupScreen from './pages/signup';
import  MainScreen from './pages/home';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

function LogOut(){
  localStorage.clear();
  return <Navigate to="/"  />;

}

function NotFound() {
  return <div>404 - Page Not Found</div>;
}

function App() {

  const handleLogin = (username: string) => {
      localStorage.setItem('username', username);
  };

  return(
    <>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"/>
      </head>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupScreen onSubmit={handleLogin} />} />
          <Route path="/home" element={<MainScreen></MainScreen>} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App;
