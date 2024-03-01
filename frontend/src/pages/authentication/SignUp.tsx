import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react';
import { createClient } from '@supabase/supabase-js'

function SignUp() {

  const [formState, setFormState] = useState({email: '', password: ''})

  const navigate = useNavigate()

  const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY)

  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: formState.email,
      password: formState.password,
    })

    return { data, error }
  }

  const handleSignUp = async (e: any) => {
      e.preventDefault()
      const { data, error } = await signUpNewUser()
      if (error) {
        console.error('Error signing up:', error)
      } else {
        console.log('Sign up successful:', data)
        navigate('/')
      }
  }
  
  return (
    <section className='w-screen h-screen px-4 lg:px-0 bg-gray-300 flex flex-col justify-center items-center'>
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form className="flex max-w-md flex-col gap-4 w-full" onSubmit={handleSignUp}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1" 
            type="email" 
            placeholder="name@flowbite.com" 
            value={formState.email} 
            onChange={(e) => setFormState({...formState, email: e.target.value})}
            required 
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
           id="password1" 
           type="password" 
           value={formState.password}
           onChange={(e) => setFormState({...formState, password: e.target.value})}
           required />
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
    </section>
  );
}

export default SignUp;