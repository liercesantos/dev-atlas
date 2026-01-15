import { AuthForm } from "@/features/auth/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <AuthForm type="register" />
    </div>
  );
}
