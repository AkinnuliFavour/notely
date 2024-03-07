import { useNavigate } from "react-router-dom"

const Onboarding = () => {

  const navigate = useNavigate()

  return (
    <main className="max-w-screen min-h-screen pb-8 bg-blue-500">
      <nav className="border-b border-blue-400 px-2 py-4 h-1/5">
        <ul>
          <li className="text-white font-bold text-2xl">Notely</li>
        </ul>
      </nav>
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-white text-4xl font-bold text-center mt-8">
          Welcome to Notely
        </h1>
        <p className="text-white text-center mt-4">
          The best task management app in the world
        </p>
        <div className="flex justify-center mt-8">
          <button
            className="bg-white text-blue-500 px-4 py-2 rounded-lg"
            onClick={() => navigate("/sign-in")}
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="mt-12 flex justify-center items-center">
        <img src="/Screenshot.png" alt="website screenshot" className="px-4 lg:px-0 lg:w-3/4 rounded-xl" />
      </div>
    </main>
  )
}

export default Onboarding