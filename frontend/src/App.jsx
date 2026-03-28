import { Route, Router, Routes } from "react-router-dom";
import Default from "./Pages/Homepage/Defaultpage.jsx";
import Layout from "./Components/Layout.jsx";
import SignIn from "./OpeningPages/SignInPage.jsx";
import SignUp from "./OpeningPages/RegisterPage.jsx";
import Main from "./Pages/Home/main.jsx";
import Profile from "./Pages/Profile/ProfilePage.jsx";
import { UserContextProvider } from "./Components/userContext.jsx";



function App() {

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/default" element={<Default />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/main" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
