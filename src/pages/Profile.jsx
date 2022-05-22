import React, { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate, Link } from 'react-router-dom'
import { async } from '@firebase/util'
import { toast } from 'react-toastify'

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
 
  // update data on firebase when edited with Change Button
  const onSubmit = async () => {
    // console.log(123);
    try {
      if (auth.currentUser.displayName !== name) {
        // update display Name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        // update in fireStore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }
    } catch (error) {
      toast.error('Could not update Profile details')
    }
  }

  const onChange = (e) => {
    // update form data state and return object in ({})
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))

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

        <div className='profileCard'>
            <form>
              <input 
                type="text" 
                id='name' 
                // if not changeDetails(if it's false) , then we want the class to be 'profileName', else 'profileNameActive'
                // we set class depending on the state
                className={!changeDetails ? 'profileName' : 'profileNameActive'}
                
                // we want to be disabled if changeDetails false, so we can't do anything (vN90, 5min)
                disabled={!changeDetails}  
                
                value= {name}
                onChange={onChange}
              />

              <input 
                type="text" 
                id='email'               
                className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                disabled={!changeDetails}  
                value= {email}
                onChange={onChange}
              />

            </form>

        </div>
      </main>
    </div>
  )
}

export default Profile