import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

export const GithubProvider = ({ children }) => {
  const [state, dispatch] = useReducer(githubReducer, {
    users: [],
    user: {},
    repos: [],
    loading: false
  })

  return (
    <GithubContext.Provider value={{
      ...state,
      dispatch,
      // clearUsers,
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext