import { Cancel, Room } from "@material-ui/icons"
import axios from "axios";
import { useRef, useState } from "react"
import "./register.css"

function Register({setShowRegister}) {
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        try {
            await axios.post("/users/register",newUser)
            setFailure(false)
            setSuccess(true)
        } catch (err) {
            setFailure(true);
        }
    }
    
  return (
    <div className="registerContainer">
        <div className="logo">
            <Room /> Map Pins
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" ref={nameRef} />
            <input type="email" placeholder="email" ref={emailRef}/>
            <input type="password" placeholder="password" ref={passwordRef}/>
            <button className="registerBtn">Register</button>
            {success && (
            <span className="success">Registered Successfully!</span>
            )}
            {failure && (
            <span className="failure">Something went wrong! Retry</span>
            )}
            </form>
            <Cancel className="registerCancel" onClick={()=>setShowRegister(false)} />
    </div>
  )
}

export default Register