import { signIn } from "next-auth/react";
import { useState } from "react";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { siteConfig } from "@/config/site";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { isPasswordStrong, getPasswordStrengthMessage } from "@/lib/passwordUtils";


function AuthModal({
  showAuthModal,
  setShowAuthModal,
}: {
  showAuthModal: boolean;
  setShowAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPasswordError("");
    
    if (authMode === "signup" && !isPasswordStrong(password)) {
      setPasswordError(getPasswordStrengthMessage(password));
      setIsLoading(false);
      return;
    }

    try {
      if (authMode === "signup") {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, username }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Registration failed");
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
  
      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        setShowAuthModal(false);
        toast.success(authMode === "signin" ? "Signed in successfully" : "Account created and signed in");
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    }
  
    setIsLoading(false);
  };

  return (
    <Modal showModal={showAuthModal} setShowModal={setShowAuthModal}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <a href={siteConfig.url}>
            <Icons.logo className="size-10" />
          </a>
          <h3 className="font-urban text-2xl font-bold">
            {authMode === "signin" ? "Sign In" : "Sign Up"}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {authMode === "signup" && (
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (authMode === "signup") {
                  setPasswordError(getPasswordStrengthMessage(e.target.value));
                }
              }}
              required
            />
            {authMode === "signup" && passwordError && (
              <p className="mt-1 text-sm text-red-500">{passwordError}</p>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            ) : null}
            {authMode === "signin" ? "Sign In" : "Sign Up"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("google")}
            disabled={isLoading}
            className="w-full"
          >
            <Icons.google className="mr-2 size-4" />
            Continue with Google
          </Button>
          {/* <Button
            type="button"
            variant="outline"
            onClick={() => signIn("resend", { email })}
            disabled={isLoading}
            className="w-full"
          >
            <Icons.logo className="mr-2 size-4" />
            Send Magic Link
          </Button> */}
          <p className="text-center text-sm">
            {authMode === "signin" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
              className="text-primary hover:underline"
            >
              {authMode === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </form>
      </div>
    </Modal>
  );
}


export function useAuthModal() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const AuthModalCallback = () => (
    <AuthModal
      showAuthModal={showAuthModal}
      setShowAuthModal={setShowAuthModal}
    />
  );

  return {
    setShowAuthModal,
    AuthModal: AuthModalCallback,
  };
}