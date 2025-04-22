import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from "./userContext";
import Header from "./components/Header";
import Photos from "./components/Photos";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import AddPhoto from "./components/AddPhoto";
import PhotoLikeHandler from './components/PhotoLikeHandler'; 
import CommentLikeHandler from './components/CommentLikeHandler'; 
import PhotoComments from './components/PhotoComments';
import PhotoEdit from './components/PhotoEdit';
import PhotoDelete from './components/PhotoDelete';
import CommentEdit from './components/CommentEdit';
import CommentDelete from './components/CommentDelete';

function App() {
  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }

  useEffect(() => {
    document.title = 'Share.com'; 
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        user: user,
        setUserContext: updateUserData
      }}>
        <div className="App">
          <Header title="Share.com"></Header>
          <Routes>
            <Route path="/" exact element={<Photos />}></Route>
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/publish" element={<AddPhoto />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/photo/like/:photoId" element={<PhotoLikeHandler />}></Route>
            <Route path="/comment/like/:commentId" element={<CommentLikeHandler />}></Route>
            <Route path="/photo/:photoId" element={<PhotoComments />}></Route>
            <Route path="/photo/edit/:photoId" element={<PhotoEdit />}></Route>
            <Route path="/photo/delete/:photoId" element={<PhotoDelete />}></Route>
            <Route path="/comment/edit/:commentId" element={<CommentEdit />}></Route>
            <Route path="/comment/delete/:commentId" element={<CommentDelete />}></Route>
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
