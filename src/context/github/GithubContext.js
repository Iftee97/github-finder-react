import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const [state, dispatch] = useReducer(githubReducer, {
    users: [],
    loading: false
  })

  // get search results
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

  return (
    <GithubContext.Provider value={{
      ...state,
      dispatch,
      searchUsers
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext