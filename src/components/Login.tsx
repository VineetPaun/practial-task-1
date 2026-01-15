import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "./ui/Navbar";
import { loginSchema, type LoginInput } from "../utils/schema";
import bcrypt from "bcryptjs";
import { getUsers } from "./Signup";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useUserStore } from "../store/userStore";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100dvh",
  padding: theme.spacing(2),
  justifyContent: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: -1,
    backgroundImage:
      "radial-gradient(ellipse at center, hsl(210, 100%, 97%), white)",
  },
}));

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    const { password, email } = data;
    setErrorMessage(null);
    setSuccessMessage(null);

    const users = getUsers();

    const user = users.find(
      (u: any) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      setErrorMessage("The email does not exist!!");
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      setErrorMessage("Incorrect Password!!");
      return;
    }

    setUser(user);
    setSuccessMessage("Logged in successfully!!");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <>
      <Navbar />
      <CssBaseline />

      <SignUpContainer>
        <Card variant="outlined">
          <Typography component="h1" variant="h4">
            Log in
          </Typography>

          {errorMessage && (
            <Alert variant="filled" severity="error">
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert variant="filled" severity="success">
              {successMessage}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Email */}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </FormControl>

            {/* Password */}
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </FormControl>

            <Button type="submit" variant="contained" fullWidth>
              Log in
            </Button>
          </Box>

          <Divider />

          <Typography textAlign="center">
            Don't have an account? <Link href="/signup">Sign up</Link>
          </Typography>
        </Card>
      </SignUpContainer>
    </>
  );
}
