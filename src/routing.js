import { Routes, Route } from "react-router-dom";

import App from "./App";
import Favorite from "./component/Favorite";


export const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/favorite" element={<Favorite />} />
        {/* 指定URLが存在しない場合ここに飛ぶ */}
        <Route path="/*" element={<App />} />
    </Routes>
  )
}
