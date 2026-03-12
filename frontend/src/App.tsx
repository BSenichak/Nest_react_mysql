import { lazy, Suspense, useEffect } from "react"
import { Container, styled } from "@mui/material"
import Header from "./components/Header"
import { Route, Routes } from "react-router-dom"
import Loading from "./components/Loading"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "./Store/store"
import getUserInfo from "./Store/auth/getUserInfo"
const LoginPage = lazy(() => import("./pages/LoginPage"))


function App() {
  let dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(getUserInfo())
  },[])
  return (
    <Wrapper>
      <Header />
      <Container>
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route element={<h1>Hello</h1>} path="/" />
            <Route element={<LoginPage />} path="/login" />
          </Routes>
        </Suspense>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled("div")(({ theme }) => ({
  background: theme.palette.background.default
}))

export default App
