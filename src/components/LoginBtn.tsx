import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "react-bootstrap";
export default function Component() {
  const { data } = useSession();
  if (data) {
    return (
      <>
        <div style={{ float: "right", marginRight: "15px" }}>
          Signed in as {data?.user?.name} <br />
        </div>
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      <Button
        onClick={() => signIn()}
        style={{ float: "right", marginRight: "15px" }}
      >
        Sign in
      </Button>
    </>
  );
}
