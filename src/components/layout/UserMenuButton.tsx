
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserMenuButton = () => {
  return (
    <Button
      variant="ghost"
      className="h-10 w-10 rounded-full"
      aria-label="User menu"
    >
      <User className="h-5 w-5" />
    </Button>
  );
};

export default UserMenuButton;
