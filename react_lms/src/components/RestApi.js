import axios from "axios";

export function RestApi() {
  return <></>;
}

// signup
export function apiSignupByAxiosPost(
  loginId,
  password,
  name,
  birthDate,
  gender,
  nationality,
  email,
  phoneNum
) {
  return axios.post(
    "http://localhost:8080/api/signup",
    {
      loginId: loginId,
      password: password,
      name: name,
      birthDate: birthDate,
      gender: gender,
      nationality: nationality,
      email: email,
      phoneNum: phoneNum,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

// login
export function apiLoginByAxiosPost(loginId, password) {
  return axios.post(
    "http://localhost:8080/api/login",
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

export function apiGetCurrentUserInfo() {
  const token = localStorage.getItem("Token");
  if (!token) {
    return Promise.reject("No Token available");
  }
  return axios.get("http://localhost:8080/api/dashboard/{loginId}", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
