import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StaticLayout from "./components/StaticLayout";
import { useSupabase } from "../utils/useSupabaseContext";
import { User } from "@supabase/supabase-js";

const SharedLayout = () => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const supabase = useSupabase()
  const navigate = useNavigate()

  const getCurrentUser = async () => {
    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setCurrentUser(user)
        return user;
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error getting current user:', err);
          if (err.message === 'Unauthorized') {
            navigate('/sign-in');
          }
        }
      }
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser()
        if (user === undefined || user === null || currentUser === null) {
          return navigate('/sign-in');
        }
      } catch (err) {
        console.error('Error getting current user:', err);
      }
    }

    fetchCurrentUser()
  }, []);

  if (currentUser !== null) {
    return (
      <StaticLayout currentUser={currentUser} />
    )
  }
};

export default SharedLayout;
