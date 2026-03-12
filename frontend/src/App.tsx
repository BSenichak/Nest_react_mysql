import { lazy, Suspense, useEffect } from "react"
import { Container, styled } from "@mui/material"
import Header from "./components/Header"
import { Route, Routes } from "react-router-dom"
import Loading from "./components/Loading"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "./Store/store"
import getUserInfo from "./Store/auth/getUserInfo"
import NotFoundPage from "./pages/NotFoundPage"
import MainPage from "./pages/MainPage"
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(()=> import("./pages/RegisterPage"))


function App() {
  let dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    if(!!localStorage.getItem("token")) dispatch(getUserInfo())
  },[])
  return (
    <Wrapper>
      <Header />
      <Container>
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route element={<MainPage/>} path="/" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegisterPage />} path="/register" />
            <Route element={<NotFoundPage />} path="/*" />
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
