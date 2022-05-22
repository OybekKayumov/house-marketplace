import React, { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate, Link } from 'react-router-dom'


function Profile() {
  const auth = getAuth()

  const [changeDetails, setChangeDetails] = useState(false)

  // const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  // useEffect(() => {
  //   console.log(auth.currentUser);

  //   setUser(auth.currentUser);
  // }, [])
  
  // destructuring and take the name and the email out from formData
  const { name, email } = formData

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  }
 
  const onSubmit = () => {
    console.log(123);
  }

  return (
    // user ? <h1>{user.displayName}</h1> : 'Not Logged In'
    <div className='profile'>
      <header className='profileHeader'>

        <p className='pageHeader'>My Profile</p>
        <button className='logOut' type='button' onClick={onLogout}>
          Logout
        </button>

      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p  className='profileDetailsText'>
            Personal Details
          </p>

          <p 
            className='changePersonalDetails'
            onClick={() => { changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>

        </div>
      </main>
    </div>
  )
}

export default Profile