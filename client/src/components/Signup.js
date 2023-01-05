import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {

    const host = "http://localhost:5000"
    const [credentials, setCredentials] = useState({name:" ", email: "", password: " ",cpassword:" " })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {name,email,password,cpassword} = credentials;
        if(password===cpassword){
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name,email,password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Account Created Successfully", "success")
            console.log(localStorage.getItem('token'))
            navigate("/");

        }
        else {
            props.showAlert("Email Already Exists", "danger")
        }}
        else{
            props.showAlert("Password Must be Same", "danger")
        }
    }

    const onChange = async (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container mt-2">
                <h2>Create a Account to continue.... </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" name="sendNewSms">Submit</button>
                </form>
                <div className="text-center">Already have an account? <a href="/login">Login in</a></div>
            </div>
        </>
    )
}

export default Signup