import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const settings = ["Profile", "Logout"];

export default function Navbar() {
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
          </Box>
          <Box sx={{ flexGrow: 0, display: "flex", gap: 1 }}>
            {settings.map((setting) => (
              <Button
                key={setting}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {setting}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
