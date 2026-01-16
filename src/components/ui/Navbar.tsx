import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" className={styles.navbar}>
      <Container maxWidth="xl" className={styles.container}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            className={styles.logo}
          >
            CRUD
          </Typography>

          <Box className={styles.navLinksContainer}>
            <Button
              className={styles.navButton}
              href="/products"
            >
              Products
            </Button>
          </Box>
          <Box className={styles.authLinksContainer}>
            {!user && (
              <>
                <Button
                  className={styles.navButton}
                  href="/signup"
                >
                  Sign Up
                </Button>
                <Button
                  className={styles.navButton}
                  href="/login"
                >
                  Log In
                </Button>
              </>
            )}
          </Box>
          <Box className={styles.userActionsContainer}>
            {user && (
              <>
                <Button
                  className={styles.navButton}
                  href="/profile"
                >
                  Profile
                </Button>
                <Button
                  className={styles.navButton}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
