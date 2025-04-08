import SvgBG from "@/components/svgBG";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  component: Login,
});

function Login() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
      <SvgBG />
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground w-full">
              Enter your email below to login to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/bg.png"
          alt="Image"
          width="1920"
          height="1080"
          draggable={false}
          className="h-full w-full object-cover dark:brightness-[0.5] dark:grayscale"
        />
      </div>
    </div>
  );
}
