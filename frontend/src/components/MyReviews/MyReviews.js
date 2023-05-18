import React from 'react'

import './MyReviews.css'

function MyReviews(props) {
  return (
    <div className='MyReviewsCard m-3'>
        <h3 className='pb-2 pt-3 px-3'>
          {props.feedback.location}   
        </h3>
        <p className='px-3 pb-3'>
          {props.feedback.feedback}
        </p>
    </div>
  )
}

export default MyReviews