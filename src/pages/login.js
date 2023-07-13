import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Alert } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ mode: "onChange" });

  const submit = async (values) => {
    try {
      const { data } = await axios.post("/api/login", values);
      setError(null);
      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (error) {
      setError(error?.response?.data?.error || "Ocurrio un error inesperado");
    }
  };

  return (
    <main className={`bg-neutral-900 w-full h-screen gap-3 flex justify-center items-center p-4 font-poppins`}>
      <div className="w-full h-screen absolute z-0">
        <Image alt="background" src={"/bg.svg"} objectFit="cover" fill />
      </div>
      <div className="bg-neutral-800 rounded p-5 z-10 shadow-lg">
        <div className="mb-3 text-2xl text-white text-center bg-neutral-900/30 rounded py-1">Log In</div>
        <form onSubmit={handleSubmit(submit)}>
          <div className="mb-3">
            <Controller
              id="user"
              name="user"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  size="small"
                  fullWidth
                  onChange={onChange}
                  value={value || ""}
                  label="User"
                  placeholder="Clark Kent"
                  error={Boolean(errors?.user)}
                />
              )}
            />
          </div>
          <div className="mb-3">
            <Controller
              id="password"
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  size="small"
                  fullWidth
                  onChange={onChange}
                  value={value || ""}
                  label="Password"
                  type="password"
                  placeholder="*******"
                  error={Boolean(errors?.password)}
                />
              )}
            />
          </div>
          <Button type="submit" fullWidth variant="outlined">
            LogIn
          </Button>
          {error && (
            <Alert
              sx={{ mt: 1, padding: 0.01, paddingLeft: "10px", paddingRight: "10px" }}
              variant="standard"
              severity="error"
            >
              {error}
            </Alert>
          )}
        </form>
      </div>
    </main>
  );
};

export default Login;
