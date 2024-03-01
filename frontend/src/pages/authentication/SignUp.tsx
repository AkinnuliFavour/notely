import { Button, Label, TextInput } from 'flowbite-react';

function SignUp() {
  return (
    <section className='w-screen h-screen bg-gray-300 flex flex-col justify-center items-center'>
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form className="flex max-w-md flex-col gap-4 w-full">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1" type="password" required />
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
    </section>
  );
}

export default SignUp;