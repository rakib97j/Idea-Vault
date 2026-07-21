
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Create Account | Idea Vault",
  description: "Join Idea Vault to share, store, and discover innovative ideas.",
};

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <RegisterForm />
    </div>
  );
}