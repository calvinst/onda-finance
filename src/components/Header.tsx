import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header style={{ backgroundColor: "#0A0A0A", borderBottom: "1px solid #1F1F1F" }} className="px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight" style={{ color: "#FFFFFF" }}>
          OndaFinance
        </h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm" style={{ color: "#6B7280" }}>
            <User size={15} />
            <span className="hidden sm:block">{user?.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="h-8 px-2 transition-colors"
            style={{ color: "#6B7280" }}
          >
            <LogOut size={15} />
          </Button>
        </div>
      </div>
    </header>
  );
}
