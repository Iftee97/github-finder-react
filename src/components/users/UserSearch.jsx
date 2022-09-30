import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'
import { searchUsers } from '../../context/github/GithubActions'

const UserSearch = () => {
  const [text, setText] = useState('')
  const { users, dispatch } = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (text === '') {
      setAlert('Please enter something', 'error')
    } else {
      dispatch({ type: "SET_LOADING" })
      const users = await searchUsers(text)
      dispatch({
        type: "GET_USERS",
        payload: users.items
      })
    }
  }

  const handleClick = () => {
    dispatch({ type: "CLEAR_USERS" })
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <h1 className='font-5xl mb-4'>Search GitHub Users</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                placeholder='search'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              <button
                type='submit'
                className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
              >
                go
              </button>
            </div>
          </div>
        </form>
      </div>
      {(users && users.length > 0) && (
        <div>
          <button
            onClick={handleClick}
            className="btn btn-ghost btn-lg"
          >
            clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch