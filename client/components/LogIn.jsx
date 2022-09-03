// @ts-check
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

import { IfNotAuthenticated } from "./Authenticated";

export default function LogIn() {
  const { loginWithRedirect } = useAuth0();

  // wip
  // function handleRegister(event) {
  //   event.preventDefault()
  // }

  function handleLogIn(event) {
    event.preventDefault();
    loginWithRedirect();
  }

  return (
    <>
      <IfNotAuthenticated>
        {/* <Button colorScheme="whiteAlpha" mr="15px" onClick={handleRegister}>
          Register
        </Button> */}
        <Button colorScheme="whiteAlpha" onClick={handleLogIn}>
          Log In
        </Button>
      </IfNotAuthenticated>
    </>
  );
}
