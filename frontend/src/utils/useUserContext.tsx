import React, { createContext, useContext, useState } from 'react';

// Define types for user data
interface UserData {
  user: string;
  email: string;
}

// Create a context
const UserContext = createContext<{ user: string | null; updateUser: (newUserData: string | null) => void }>({
  user: null,
  updateUser: () => {},
});

// Create a provider component
export const UserProvider = ({ children }: {children: React.ReactNode}) => {
  const [user, setUser] = useState<string | null>(null);

  const updateUser = (newUserData: string | null) => {
    setUser(newUserData);
  };

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUserContext = () => useContext(UserContext);
