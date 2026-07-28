import React from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Log In || Idea Vault",
  description: "Log in to your Idea Vault account to access your saved ideas and interactions.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}