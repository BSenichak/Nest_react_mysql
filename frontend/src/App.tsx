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
import Footer from "./components/Footer"
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(()=> import("./pages/RegisterPage"))
const TaskPage = lazy(()=> import("./pages/TaskPage"))


function App() {
  let dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    if(!!localStorage.getItem("token")) dispatch(getUserInfo())
  },[])
  return (
    <Wrapper>
      <Header />
      <Container sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route element={<MainPage/>} path="/" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegisterPage />} path="/register" />
            <Route element={<TaskPage />} path="/task/*" />
            <Route element={<NotFoundPage />} path="/*" />
          </Routes>
        </Suspense>
      </Container>
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled("div")(({ theme }) => ({
  background: theme.palette.background.default,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column"
}))

export default App
