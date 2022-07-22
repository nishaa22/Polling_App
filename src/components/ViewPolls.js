import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import { viewPollRequest } from '../actions';
const ViewPolls = () => {
    const dispatch = useDispatch()
    const view_polls = useSelector((state) => state.view_poll_state.data)
    console.log(view_polls.data, "viewPoll data")
    const handleViewPoll = () => {
        dispatch(viewPollRequest())
    }
    return (
        <>
            <Button onClick={handleViewPoll}>View Poll</Button>
            {
                view_polls.data.map((val) => {
                    return (
                        <>{val}</>
                    )
                })
            }
        </>
    )
}

export default ViewPolls
