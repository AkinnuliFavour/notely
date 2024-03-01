import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

function SignIn() {
  return (
    <section className='w-screen h-screen bg-gray-300 flex flex-col justify-center items-center'>
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
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
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Sign In</Button>
      </form>
    </section>
  );
}

export default SignIn;