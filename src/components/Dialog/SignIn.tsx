import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SignInModel = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const response = axios.post("/api/signIn", { formData });
    toast.promise(response, {
      loading: "Signing In...",
      success: () => {
        router.push("/dashboard");
        return "Signed In Successfully";
      },
      error: "Failed to Sign In",
    });
  };
  return (
    <dialog id="signin" className="modal">
      <div className="modal-box">
        <form method="dialog text-center p-10">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h1 className="text-2xl font-bold text-base-content">Sign In</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-primary bg-transparent text-base-content"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-primary bg-transparent text-base-content"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={onSubmit}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SignInModel;
