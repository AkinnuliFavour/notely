import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react';
import { useSupabase } from '../../utils/useSupabaseContext';

function SignUp() {

  const [formState, setFormState] = useState({ email: '', password: '' })

  const navigate = useNavigate()

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
    if (error) {
      console.error('Error signing up:', error)
    } else {
      console.log('Sign up successful:', data)
      navigate('/all-tasks')
    }

    // Automatically sign in the user after signing up
    await supabase?.auth.signInWithPassword({
      email: formState.email,
      password: formState.password
    })
  }

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
    </section>
  );
}

export default SignUp;