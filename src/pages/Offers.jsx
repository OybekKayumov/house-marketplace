import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter 
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'
import { async } from '@firebase/util'

function Offers() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const params = useParams()
  
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get reference
        const listingsRef = collection(db, 'listings')

        // create a query; :categoryName from App.js
        const q = query(
          listingsRef, 
          where('offer', '==', true), 
          orderBy('timestamp', 'desc'), 
          limit(10)
        )

        // execute query - get docs for that specific query
        const querySnap = await getDocs(q)

        const listings = []
        
        querySnap.forEach((doc) => {
          // see data from firebase db, which we entered early, in console
          console.log(doc.data());

          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setListings(listings)
        setLoading(false)

      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListings()
  }, [])
  // if not put dependency array [], browser will fetch data without stopping

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
          Offers
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem 
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}

            </ul>
          </main>
        </>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  )
}

export default Offers
