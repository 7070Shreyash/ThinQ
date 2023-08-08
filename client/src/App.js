import { BrowserRouter , Navigate , Routes , Route} from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import BlogsPage from "scenes/blogsPage";
import QuePage from "scenes/QuePage";
import QuesPage from "scenes/QuesPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import { ThemeProvider } from "@emotion/react";

function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)),[mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme = {theme}>
          <CssBaseline />
          <Routes>
            <Route path = "/" element = {<HomePage/>}/>
            <Route path = "/loginpage" element = {<LoginPage/>}/>
            <Route path = "/blogspage" element={isAuth ? <BlogsPage /> : <Navigate to="/"/>}/>
            <Route path = "/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/"/>}/>
            <Route path = "quespage" element={isAuth ? <QuesPage /> : <Navigate to="/"/>}/>
            <Route path = "quepage/:quesId" element={isAuth ? <QuePage /> : <Navigate to="/"/>}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
