import React, { createContext, useCallback, useEffect, useState } from "react";
import { post } from "../../helpers/api.helpers";
import { getSessionUser, removeSession, setSessionToken, setSessionUser } from "../../helpers/cookies.helpers";
import { User } from '../../models/user.model'

export const UseLogin = () => {
  const [user, setUser] = useState<User>()
  const login = async (body: { email: string, password: string }) => {
    try {
      const { user, accessToken } = await post('/user/login', body)
      console.log()
      setUser(user)
      setSessionUser(user)
      setSessionToken(accessToken)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    user,
    login: useCallback(login, []),
  }
}

type UserContextType = {
  sessionUser: User | any;
  initSession: () => void;
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
};

export const UserContext = createContext<UserContextType>({
  sessionUser: null,
  initSession: () => {},
  loginUser: (email: string, password: string) => {},
  logoutUser: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [sessionUser, setSessionUser] = useState<User>();
  const { user, login } = UseLogin()

  useEffect(() => {
    if (user) {
      setSessionUser(user)
    }
  }, [user])

  const initSession = async () => {
    const user = await getSessionUser();
    if (user) {
      setSessionUser(user);
    }
  }

  const loginUser = async (email: string, password: string) => {
    login(({ email, password }))
  }

  const logoutUser = async () => {
    setSessionUser(undefined)
    removeSession()
  }

  return (
    <UserContext.Provider value={{sessionUser, initSession, loginUser, logoutUser}}>
      {children}
    </UserContext.Provider>
  )
}
