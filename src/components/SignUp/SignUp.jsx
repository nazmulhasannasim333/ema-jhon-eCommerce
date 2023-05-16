import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import './SignUp.css';

const SignUp = () => {
    const [error, setError] = useState('')
    const {createUser} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);

        if(password !== confirm){
            setError('Password are Not same')
        } else if (password.length < 6){
            setError("Password must at least 6 character")
        }

        createUser(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();
            navigate('/login')
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <div>
             <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"  required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input  type={showPassword ? "text" : "password"} name="password"  required />

                    {!showPassword ? (
                <FontAwesomeIcon
                  onClick={() => setShowPassword(true)}
                  
                  style={{ position: 'absolute', top: "53px", right: "80px", height: '18px' }}
                  icon={faEyeSlash}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => setShowPassword(false)}
                  style={{ position: 'absolute', top: "53px", right: "80px", height: '18px' }}
                  icon={faEye}
                />
              )}
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type={showConfirmPassword ? "text" : "password"} name="confirm"  required />

                    {!showConfirmPassword ? (
                <FontAwesomeIcon
                  onClick={() => setShowConfirmPassword(true)}
                  
                  style={{ position: 'absolute', top: "53px", right: "80px", height: '18px' }}
                  icon={faEyeSlash}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => setShowConfirmPassword(false)}
                  style={{ position: 'absolute', top: "53px", right: "80px", height: '18px' }}
                  icon={faEye}
                />
              )}
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p><small>Already have an account? <Link to="/login">Login</Link></small></p>
            <p className='text-error'>{error}</p>
        </div>
        </div>
    );
};

export default SignUp;