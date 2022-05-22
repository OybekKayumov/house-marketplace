import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'


function Profile() {
  const auth = getAuth()

  // const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  // useEffect(() => {
  //   console.log(auth.currentUser);

  //   setUser(auth.currentUser);
  // }, [])
  
  const naigate = useNavigate()

  const onLogout = () => {
    auth.signOut();
    naigate('/');
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
    </div>
  )
}

export default Profile