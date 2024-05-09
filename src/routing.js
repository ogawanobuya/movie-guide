import { Routes, Route } from "react-router-dom";

import App from "./App";
import Favorite from "./component/Favorite";
import SignUp from "./component/SignUp";
import SignIn from "./component/SignIn";


export const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* 指定URLが存在しない場合ここに飛ぶ */}
        <Route path="/*" element={<App />} />
    </Routes>
  )
}
