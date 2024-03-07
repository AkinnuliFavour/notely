import { Link } from "react-router-dom"

const EmailVerification = () => {
    return (
        <main className="bg-blue-500 h-screen flex flex-col justify-center items-center text-white">
            <h1 className="text-3xl font-bold">Congratulations! Your Email has been successfully verified</h1>
            <Link to='/sign-in'><button className="mt-3 bg-blue-400 px-8 py-3 rounded-lg">Sign In</button></Link>
        </main>
    )
}

export default EmailVerification