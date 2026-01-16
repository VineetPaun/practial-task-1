import Navbar from "./components/ui/Navbar";
import {
  Typography,
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  CardActionArea,
} from "@mui/material";
import { useUserStore } from "./store/userStore";
import { useNavigate } from "react-router";
import styles from "./App.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";

function App() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingCartIcon sx={{ fontSize: 48, color: "#1976d2" }} />,
      title: "Browse Products",
      description:
        "Explore our extensive catalog of products with detailed information and reviews.",
      link: "/products",
    },
    {
      icon: <PersonIcon sx={{ fontSize: 48, color: "#1976d2" }} />,
      title: "User Profiles",
      description:
        "Manage your account, update your details, and track your preferences.",
      link: user ? "/profile" : "/signup",
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 48, color: "#1976d2" }} />,
      title: "Fast & Responsive",
      description:
        "Enjoy a seamless experience with our optimized and responsive design.",
      link: "/products",
    },
  ];

  return (
    <div className={styles.appContainer}>
      <Navbar />

      {/* Hero Section */}
      <Box className={styles.heroSection}>
        <Container maxWidth="md">
          <Box className={styles.heroContent}>
            {user ? (
              <>
                <Typography variant="h2" className={styles.heroTitle}>
                  Welcome back, {user.firstName}!
                </Typography>
                <Typography variant="h6" className={styles.heroSubtitle}>
                  Ready to explore? Check out our latest products.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  href="/products"
                  className={styles.heroButton}
                >
                  Browse Products
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h2" className={styles.heroTitle}>
                  Welcome to CRUD App
                </Typography>
                <Typography variant="h6" className={styles.heroSubtitle}>
                  Your one-stop solution for managing products and user
                  profiles.
                </Typography>
                <Box className={styles.heroButtons}>
                  <Button
                    variant="contained"
                    size="large"
                    href="/signup"
                    className={styles.heroButton}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    href="/products"
                    className={styles.heroButtonOutlined}
                  >
                    View Products
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" className={styles.featuresSection}>
        <Typography variant="h4" className={styles.sectionTitle}>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card className={styles.featureCard}>
                <CardActionArea onClick={() => navigate(feature.link)}>
                  <CardContent className={styles.featureCardContent}>
                    <Box className={styles.featureIcon}>{feature.icon}</Box>
                    <Typography variant="h6" className={styles.featureTitle}>
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={styles.featureDescription}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box className={styles.footer}>
        <Typography variant="body2" className={styles.footerText}>
          © 2026 CRUD Application. Built with React, TypeScript & Material UI.
        </Typography>
      </Box>
    </div>
  );
}

export default App;
