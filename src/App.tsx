import "./App.css";
import Navbar from "./components/ui/Navbar";
import { Typography, Container, Box } from "@mui/material";
import { useUserStore } from "./store/userStore";

function App() {
  const user = useUserStore((state) => state.user);

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ mt: 4, textAlign: "center" }}>
          {user ? (
            <Typography variant="h3">
              Hello, {user.firstName + " " + user.lastName}
            </Typography>
          ) : (
            <Typography variant="h4">Please log in to see your name</Typography>
          )}
        </Box>
      </Container>
    </>
  );
}

export default App;