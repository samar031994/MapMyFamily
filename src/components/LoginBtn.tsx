import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@mantine/core";
import { Avatar } from "@mantine/core";
import LoginIconSVG from "./LoginIconSVG";
import { Menu } from "@mantine/core";
import { useRouter } from "next/router";

const LoginBtn = () => {
  const { data } = useSession();
  const router = useRouter();
  if (data) {
    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          {data.user?.name && (
            <Avatar
              radius={"xl"}
              name={data.user.name}
              color="initials"
              allowedInitialsColors={["dark"]}
              style={{ cursor: "pointer" }}
            />
          )}
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>{data.user?.name}</Menu.Label>
          <Menu.Item onClick={() => signOut()}>Sign Out</Menu.Item>
          <Menu.Item
            onClick={() => {
              router.replace("/");
            }}
          >
            Home
          </Menu.Item>
          <Menu.Item onClick={() => {
            router.replace("/dashboard");
          }}>Dashboard</Menu.Item>
        </Menu.Dropdown>
      </Menu>
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
