import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, Container, Button, MenuItem, MenuMenu } from "semantic-ui-react";

const Navbar = () => {
  const { push } = useRouter();
  return (
    <Menu inverted borderless attached>
      <Container>
        <MenuItem>
          <Link href="/" legacyBehavior>
            <img src="/favicon.ico" alt="" />
          </Link>
        </MenuItem>
        <MenuMenu position="right">
          <MenuItem>
            <Button primary size="mini" onClick={() => push("/tasks/form")}>
              New Task
            </Button>
          </MenuItem>
        </MenuMenu>
      </Container>
    </Menu>
  );
};

export default Navbar;
