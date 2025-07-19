import SignupScreen from './pages/signup';

function App() {
  const handleLogin = (username: string) => {
      localStorage.setItem('username', username);
  };

  return(
    <>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"/>
      </head>
      <SignupScreen onSubmit={handleLogin} />
    </>
  )

}

export default App;
