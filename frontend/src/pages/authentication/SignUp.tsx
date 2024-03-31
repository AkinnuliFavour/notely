import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react';
import { useSupabase } from '../../utils/useSupabaseContext';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {

  const [formState, setFormState] = useState({ email: '', password: '' })

  const supabase = useSupabase()

  async function signUpNewUser() {
    if (!supabase) return
    const { data, error } = await supabase.auth.signUp({
      email: formState.email,
      password: formState.password,
    })

    return { data, error }
  }

  const handleSignUp = async (e: any) => {
    e.preventDefault()
    const response = await signUpNewUser();
    const { data, error } = response ?? {};
    if (data?.user?.identities && data.user.identities.length > 0) {
      console.log('User data:', data.user)
      successNotify()
    }else {
      errorNotify()
    }
    if (error) {
      console.error('Error signing up:', error)
      console.log('Error message:', error.message)
    }
  }

  const successNotify = () => toast.info('A confirmation link has been sent to your email!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  const errorNotify = () => toast.error('Error signing up: Email already exists', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  return (
    <section className='w-screen h-screen px-4 lg:px-0 bg-blue-500 flex flex-col justify-center items-center text-white'>
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form className="flex max-w-md flex-col gap-4 w-full" onSubmit={handleSignUp}>
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
            required />
        </div>
        <Button type="submit" className='bg-blue-400 hover:bg-blue-600'>Sign Up</Button>

        <Link to='/sign-in' className='text-center text-white text-base font-semibold hover:underline'>Already have an account? Sign in to Notely</Link>
      </form>

      <ToastContainer />
    </section>
  );
}

export default SignUp;