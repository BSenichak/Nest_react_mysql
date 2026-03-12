import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState, } from "./Store/store"
import type { InitialState } from "./Store/auth/authReducer"
import { useEffect } from "react"
import getAllUsers from "./Store/auth/getAllUsers"
import { Container, styled } from "@mui/material"
import Header from "./components/Header"

type Users = Pick<InitialState, "loading" | "error" | "users">

function App() {
  let dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])
  let { loading, users, error }: Users = useSelector<RootState, RootState["auth"]>((state: RootState) => state.auth)
  return (
    <Wrapper>
      <Header />
      <Container>
        <h1>hello world 12322</h1>
        <h2>{loading}</h2>
        <h2>{JSON.stringify(users)}</h2>
        <h2>{error}</h2>

      </Container>

    </Wrapper>
  )
}

const Wrapper = styled("div")(({theme}) => ({
  background: theme.palette.background.default
}))

export default App
