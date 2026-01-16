import Navbar from "./components/ui/Navbar";
import { Typography, Container, Box } from "@mui/material";
import { useUserStore } from "./store/userStore";
import styles from "./App.module.css";

function App() {
  const user = useUserStore((state) => state.user);

  return (
    <div className={styles.appContainer}>
      <Navbar />
      <Container>
        <Box className={styles.contentWrapper}>
          {user ? (
            <Typography variant="h3" className={styles.welcomeTitle}>
              Hello, {user.firstName + " " + user.lastName}
            </Typography>
          ) : (
            <Typography variant="h4" className={styles.loginPrompt}>
              Please log in to see your name
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default App;
