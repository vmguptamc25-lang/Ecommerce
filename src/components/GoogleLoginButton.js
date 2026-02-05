"use client";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import {useContext} from "react";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context/GlobalContext";

export default function GoogleLoginButton() {
  const router = useRouter();

  const {
    globalValue,
    setGlobalValue,
    gname,
    setNameg,
    gemail,
    setEmailg,
    gprofilepicture,
    setProfilepicture
  } = useContext(GlobalContext);

  const handleSuccess = async (response) => {
    try {
      const token = response.credential;

      const res = await axios.post("/api/googleauth/google", { token });

      localStorage.setItem("token", res.data.jwt);
      localStorage.setItem("weaver_email", res.data.user.email);
      localStorage.setItem("weaver_name", res.data.user.name);
      localStorage.setItem("weaver_profile",res.data.user.picture);
      console.log(localStorage.getItem("weaver_profile"));
      // localStorage.setItem("user", JSON.stringify(res.data.user));

      router.push("/");
      toast.success("Welcome " + res.data.user.name);

    } catch (err) {
      console.error(err);
      alert("Login Failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => alert("Google Login Failed")}
    />
  );
}
