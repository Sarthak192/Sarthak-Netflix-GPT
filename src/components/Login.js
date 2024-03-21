import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useRef } from "react";
import { auth } from "../utils/firebase";
import { checkValidDataSignin, checkValidDataSignup } from "../utils/validate";
import Header from "./Header";

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null)
  }

  const handleButtonClick = (e) => {
    e.preventDefault();
    const message = isSignInForm ? checkValidDataSignin(email.current.value, password.current.value) : checkValidDataSignup(email.current.value, password.current.value, name.current.value)
    setErrorMessage(message)
    if (!message) {
      if (!isSignInForm) {
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(`${errorCode}-${errorMessage}`)
          });
      }
      else {
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(`${errorCode}-${errorMessage}`)
          });
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img alt="Background Logo" src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" />
      </div>
      <form className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (
          <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700" />
        )}
        <input ref={email} className="p-4 my-4 w-full bg-gray-700" type='text' placeholder="Email Address" />
        <input ref={password} className="p-4 my-4 w-full bg-gray-700" type='password' placeholder="Password" />
        {errorMessage && <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>}
        <button onClick={handleButtonClick} className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}</p>
      </form>
    </div>
  )

};

export default Login;