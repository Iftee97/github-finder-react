import React, { useEffect, useContext } from "react"
import Spinner from "../layout/Spinner"
import UserItem from "./UserItem"
import GithubContext from "../../context/github/GithubContext"

const UserResults = () => {
  const {
    users,
    loading,
    fetchUsers
  } = useContext(GithubContext)

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      {users && users.map((user) => (
        <UserItem user={user} key={user.id} />
      ))}
    </div>
  )
}

export default UserResults