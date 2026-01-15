import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router";

export default function Navbar() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CRUD
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              href="/products"
            >
              Products
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {!user && (
              <>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  href="/signup"
                >
                  Sign Up
                </Button>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  href="/login"
                >
                  Log In
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ flexGrow: 0, display: "flex", gap: 1 }}>
            {user && (
              <>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  href="/profile"
                >
                  Profile
                </Button>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
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
