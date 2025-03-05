import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@mantine/core";
import { Avatar } from "@mantine/core";
import LoginIconSVG from "./LoginIconSVG";

const LoginBtn = () => {
  const { data } = useSession();
  if (data) {
    return (
      <>
        {data.user?.name && (
          <Avatar
            radius={"xl"}
            name={data.user.name}
            color="initials"
            allowedInitialsColors={["dark"]}
            onClick={() => signOut()}
            style={{ cursor: "pointer" }}
          />
        )}
      </>
    );
  }
  return (
    <>
      <Button
        variant="filled"
        onClick={() => signIn()}
        style={{ float: "right", marginRight: "15px" }}
        radius={"lg"}
      >
        Sign in
        <LoginIconSVG />
      </Button>
    </>
  );
};

export default LoginBtn;
