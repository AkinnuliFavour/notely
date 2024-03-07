import React, { ReactNode, createContext, useContext } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Define the type for the Supabase context value
type SupabaseContextType = SupabaseClient | undefined;

// Create a context for the Supabase client
const SupabaseContext = createContext<SupabaseContextType>(undefined);

// Initialize the Supabase client
const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY);

// Create a provider component to wrap your app with the Supabase context
export const SupabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

// Custom hook to access the Supabase client in your components
export const useSupabase = (): SupabaseContextType => {
  return useContext(SupabaseContext);
};
