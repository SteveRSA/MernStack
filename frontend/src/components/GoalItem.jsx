import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal, updateGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {

    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        var id = goal._id;
        dispatch(updateGoal({ GoalEditID: id, text }));
        setText('')
    }

    return (
        <div className='goal'>
            <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
            <h2>{goal.text}</h2>
            <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
                X
            </button>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input
                        placeholder="Edit Goal"
                        type='text'
                        name='text'
                        id='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-block' type='submit'>
                        Edit Goal
                    </button>
                </div>
            </form>
        </div>
    )
}

export default GoalItem
