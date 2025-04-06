
import React from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface UserRoleFooterProps {
  userCount: number;
  onRefresh: () => void;
}

const UserRoleFooter: React.FC<UserRoleFooterProps> = ({ userCount, onRefresh }) => {
  return (
    <CardFooter className="flex justify-between">
      <div className="text-sm text-gray-500">
        Total: {userCount} utilisateurs
      </div>
      <Button onClick={onRefresh}>Rafraîchir</Button>
    </CardFooter>
  );
};

export default UserRoleFooter;
