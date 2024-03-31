import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { useSupabase } from '../../utils/useSupabaseContext';
import { useUserContext } from '../../utils/useUserContext';
import { toast, Bounce, ToastContainer } from 'react-toastify';


function SignIn() {

  const [formState, setFormState] = useState({ email: '', password: '' })

  const navigate = useNavigate()

  const supabase = useSupabase()

  const { updateUser } = useUserContext()

  async function signInWithEmail() {
    if (!supabase) return
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formState.email,
      password: formState.password,
    })

    if (typeof (data) !== null) {
      if(data?.user?.id){
        localStorage.setItem('currentUser', data.user.id)
        updateUser(data.user.id)
      }else{ localStorage.setItem('currentUser', '') }
    }

    return { data, error }
  }

  const handleSignIn = async (e: any) => {
    e.preventDefault()
    const response = await signInWithEmail();
    const { data, error } = response ?? {};
    if (error) {
      console.error('Error signing up:', error)
      console.log('Error message:', error.message)
      if(error.message === 'Invalid login credentials'){
        errorNotify()
      }
    } else {
      console.log('Sign up successful:', data)
      navigate('/all-tasks')
    }
  }

  const errorNotify = () => toast.error('Invalid login credentials. Please try again.', {
    position: "top-right",
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  return (
    <section className='w-screen h-screen bg-blue-500 flex flex-col justify-center items-center px-4 lg:px-0'>
      <h1 className="text-3xl font-bold mb-4 text-white">Sign In</h1>
      <form className="flex max-w-md flex-col gap-4 w-full" onSubmit={handleSignIn}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" className='text-white' />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" className='text-white' />
          </div>
          <TextInput
            id="password1"
            type="password"
            value={formState.password}
            onChange={(e) => setFormState({ ...formState, password: e.target.value })}
            required
          />
        </div>
        <Button type="submit" className='bg-blue-400 hover:bg-blue-600'>Sign In</Button>

        <Link to='/sign-up' className='text-center text-white text-base font-semibold hover:underline'>Don't have an account? Join Notely</Link>
      </form>

      <ToastContainer />
    </section>
  );
}

export default SignIn;