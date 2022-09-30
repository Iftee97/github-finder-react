import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const [state, dispatch] = useReducer(githubReducer, {
    users: [],
    user: {},
    loading: false
  })

  // get users search results
  const searchUsers = async (text) => {
    dispatch({ type: "SET_LOADING" })

    const response = await fetch(`${GITHUB_URL}/search/users?q=${text}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })
    const data = await response.json()
    // console.log(data)

    dispatch({
      type: "GET_USERS",
      payload: data.items
    })
  }

  // clear users search results
  const clearUsers = () => {
    dispatch({ type: "CLEAR_USERS" })
  }

  // get single user 
  const getUser = async (login) => {
    dispatch({ type: "SET_LOADING" })

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    if (response.status === 404) {
      window.location = "/notfound"
    } else {
      const data = await response.json()
      // console.log(data)

      dispatch({
        type: "GET_USER",
        payload: data
      })
    }
  }

  return (
    <GithubContext.Provider value={{
      ...state,
      searchUsers,
      clearUsers,
      getUser
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext