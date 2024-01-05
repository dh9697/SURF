import axios from "axios";
import { useState } from "react";

export function RestApi() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  async function onLogin() {
    try {
      const response = await apiLoginByAxiosPost(loginId, password);
      if (response.data.resultCode === "SUCCESS") {
        console.log(response.data.data);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  }

  function onLogout() {
    setLoginId("");
    setPassword("");
  }
  return <></>;
}

export function apiLoginByAxiosPost(loginId, password) {
  return axios.post(
    "http://localhost:8080/test/login",
    {
      loginId: loginId,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
