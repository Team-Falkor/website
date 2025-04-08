import SvgBG from "@/components/svgBG";
import { SignUpForm } from "@/features/auth/components/SignUpForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up/")({
  component: SignUp,
});

function SignUp() {
  return (
    <div className="w-full min-h-[600px] h-screen relative overflow-hidden">
      <SvgBG />
      <div className="flex items-center justify-center py-12 h-full">
        <SignUpForm />
      </div>
    </div>
  );
}
