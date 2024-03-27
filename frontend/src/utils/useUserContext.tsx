import React, { createContext, useContext, useState } from 'react';

// Define types for user data
interface UserData {
  user: string;
  email: string;
}

const currentUser = localStorage.getItem('currentUser');

// Create a context
const UserContext = createContext<{ user: string | null; updateUser: (newUserData: string | null) => void }>({
  user: currentUser,
  updateUser: () => {},
});

// Create a provider component
export const UserProvider = ({ children }: {children: React.ReactNode}) => {
  const [user, setUser] = useState<string | null>(currentUser);

  const updateUser = (newUserData: string | null) => {
    setUser(newUserData);
  };

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUserContext = () => useContext(UserContext);
