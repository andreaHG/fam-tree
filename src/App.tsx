import "./App.css";
import FamilyTreePage from "./pages/FamilyTreePage";
import { LoginForm } from "./components/LoginForm";
import AnimatedGridPattern from "./components/ui/animated-grid-pattern";
import { cn } from "./lib/utils";
import HyperText from "./components/ui/hyper-text";
import useAuth from "./hooks/useAuth";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        <HyperText>Family Tree V1</HyperText>
      </h1>
      {!isAuthenticated ? (
        <div className="max-w-sm">
          <LoginForm />
        </div>
      ) : (
        <FamilyTreePage />
      )}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </div>
  );
}

export default App;
