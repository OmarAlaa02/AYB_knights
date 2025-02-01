import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

//TODO : FIX STATE ERROR

function useAuth() {
  const [user, setUser] = useState("");
  console.log(` %c useAuth user state ${user}`, "background:purple;");
  useEffect(
    function () {
      async function checkUser() {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("useAuth session user ", session.user);
        if (session) {
          console.log("session inside useAuth if ", session.user.email);
          setUser(session?.user?.email);
        }
      }

      checkUser();
    },
    [setUser]
  );

  useEffect(
    function () {
      console.log("updated user state", user);
    },
    [user]
  );

  return { user };
}

export default useAuth;
