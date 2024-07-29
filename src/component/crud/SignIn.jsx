import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch({ type: "LOGIN", payload: true });
      navigate('/dashboard');
      console.log(user);
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage); 
      console.log(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-14">
      <form
        onSubmit={onSubmit}
        className="text-center font-bold border-black border-2 w-80 h-72 p-4 max-w-lg m-auto mt-10"
      >
        <p className="text-red-500">{error}</p> {/* Display error message */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm">Email</label>
          <input
            id="email"
            className="border-black border-2 w-full p-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm">Password</label>
          <input
            id="password"
            className="border-black border-2 w-full p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <hr />
        <button
          className="bg-slate-700 text-white text-sm w-full p-2 mt-5"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignIn;
