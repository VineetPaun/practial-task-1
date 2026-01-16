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
            sx={{ mr: 6 }}
          >
            CRUD
          </Typography>

          <Box className={styles.navLinksContainer}>
            <Button
              className={styles.navButton}
              href="/products"
              sx={{ color: "white" }}
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
                  sx={{ color: "white" }}
                >
                  Sign Up
                </Button>
                <Button
                  className={styles.navButton}
                  href="/login"
                  sx={{ color: "white" }}
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
                  sx={{ color: "white" }}
                >
                  Profile
                </Button>
                <Button
                  className={styles.navButton}
                  onClick={handleLogout}
                  sx={{ color: "white" }}
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
