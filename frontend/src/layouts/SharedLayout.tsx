import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StaticLayout from "./components/StaticLayout";
// import { useSupabase } from "../utils/useSupabaseContext";
import { useUserContext } from "../utils/useUserContext";

const SharedLayout = () => {

  // const supabase = useSupabase()
  const navigate = useNavigate()
  const { user } = useUserContext()

  // const getCurrentUser = async () => {
  //   if (supabase) {
  //     try { 
  //     const { data: { user } } = await supabase.auth.getUser()
  //       return user;
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         console.error('Error getting current user:', err);
  //         if (err.message === 'Unauthorized') {
  //           navigate('/sign-in');
  //         }
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (user === undefined || user === null) {
          return navigate('/sign-in');
        }
      } catch (err) {
        console.error('Error getting current user:', err);
      }
    }

    fetchCurrentUser()
  }, []);

  return <StaticLayout />
};

export default SharedLayout;
