import { useContext, useEffect } from 'react'
import { LoginPage, RegisterPage, PollsPage, PollDetailPage } from '../pages'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { UserContext, UserProvider } from '../contexts';

const AppRoutes: React.FC = () => {
  const { sessionUser, initSession } = useContext(UserContext)

  useEffect(() => {
    initSession()
  }, [])

  return (
    <BrowserRouter>
      {!sessionUser && (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      )}
      {sessionUser && (
        <Routes>
          <Route path="/" element={<PollsPage />} />
          <Route path="/poll-detail/:id" element={<PollDetailPage />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

const App: React.FC = () => {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
