import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config.js'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg' 
import { async } from '@firebase/util'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  // email and password are destructuring from formData
  const { name, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      // to get this two values we cab write(email: e.target.value, password: e.target.value,)
      [e.target.id]: e.target.value
    }))
  }
  
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = {...formData}
      // remove pwd from object, save only name and email
      delete formDataCopy.password

      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      // console.log(error);
      toast.error('Something wrong with registration')
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>
            Welcome Back!
          </p>
        </header>

        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            className='nameInput'
            placeholder='Name'
            value={name}
            id='name'
            onChange={onChange}
          />

          <input 
            type="email" 
            className='emailInput'
            placeholder='Email'
            value={email}
            id='email'
            onChange={onChange}
          />

          <div className='passwordInputDiv'>
            <input 
              type={showPassword ? 'text' : 'password'} 
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />

            <img 
              src={visibilityIcon} alt="show password" 
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />

          </div>

          <Link 
            to='/forgot=password'
            className='forgotPasswordLink'
          >
            Forgot Password
          </Link>

          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>

        </form>

        {/* Google OAuth */}
        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>

      </div>
    </>
  )
}

export default SignUp