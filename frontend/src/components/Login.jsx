import { Cancel, Room } from "@material-ui/icons"
import axios from "axios";
import { useRef, useState } from "react"
import "./login.css"

function Login({setShowLogin,myStorage,setCurrentUsername}) {
    const [failure, setFailure] = useState(false);
    const nameRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        }

        try {
            const res = await axios.post("/users/login", user)
            console.log(res)
            myStorage.setItem("user",res.data.username)
            setCurrentUsername(res.data.username)
            setShowLogin(false)
            setFailure(false)
        } catch (err) {
            setFailure(true);
        }
    }
    
  return (
    <div className="loginContainer">
        <div className="logo">
            <Room /> Map Pins
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" ref={nameRef} />
            <input type="password" placeholder="password" ref={passwordRef}/>
            <button className="loginBtn">Log In</button>
            {failure && (
            <span className="failure">Something went wrong! Retry</span>
            )}
            </form>
            <Cancel className="loginCancel" onClick={()=>setShowLogin(false)} />
    </div>
  )
}

export default Login