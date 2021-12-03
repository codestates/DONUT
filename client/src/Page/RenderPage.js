import React from "react";

function RenderPage({ isLogin, setIsLogin }) {
  // console.log("렌더페이지", isLogin);
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  return <section></section>;
}

export default RenderPage;
