import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProfilePage from "./pages/Profile";
import Signup from "./pages/Signup";
import { PostDataProvider } from "./store/PostData";
import UserData from "./store/UserData"; 
import Layout from "./Layout/Layout";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  const router = createBrowserRouter([
    {path:'/',
      element: <Layout/>,
      children:[
        {path: '/' , element: <Home/>},
        {path: '/create-post' , element: <CreatePost/>},
        {path: '/my-profile' , element: <ProfilePage/>},
        {path: '/update-profile' , element: <UpdateProfile/>}
      ]
    },
    {path:'/login',
      element: <Login/>,
    },
    {path:'/signup',
      element: <Signup/>,
    }
  ])
  return (
    <>
      <PostDataProvider>
        <UserData> 
          <RouterProvider router={router}>

          </RouterProvider>
        </UserData>
      </PostDataProvider>
    </>
  );
}

export default App;
//