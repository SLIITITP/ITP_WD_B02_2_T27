import React from 'react'
import './Bookings.css'

function Bookings() {
  return (
    <div className=''>
        <div className='row fbCard p-2 m-3'>
            <div className='col-xl-3'>
                <img className='imgF' src='/images/feedbackIMG.jpeg' alt=''/>
            </div>
            <div className='col-xl-7'>
                <h4>Hanthana Mountain Range</h4>
                <div className='row fontS'>
                    <div className='col-xl-4'>
                        <p className='fSize'>Date From</p>
                        <p className='fSize'>Date To</p>
                        <p className='fSize'>Price</p>
                    </div>
                    <div className='col-xl-8'>
                        <p className='fSize'>: 12/ 01/ 2023</p>
                        <p className='fSize'>: 14/ 01/ 2023 </p>
                        <p className='fSize'>: $53.06</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='row fbCard p-2 m-3'>
            <div className='col-xl-3'>
                <img className='imgF' src='/images/feedbackIMG.jpeg' alt=''/>
            </div>
            <div className='col-xl-7'>
                <h4>Hanthana Mountain Range</h4>
                <div className='row fontS'>
                    <div className='col-xl-4'>
                        <p className='fSize'>Date From</p>
                        <p className='fSize'>Date To</p>
                        <p className='fSize'>Price</p>
                    </div>
                    <div className='col-xl-8'>
                        <p className='fSize'>: 12/ 01/ 2023</p>
                        <p className='fSize'>: 14/ 01/ 2023 </p>
                        <p className='fSize'>: $53.06</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Bookings