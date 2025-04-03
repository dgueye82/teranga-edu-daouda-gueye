
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const DashboardCard = ({ title, description, icon, link }: DashboardCardProps) => {
  return (
    <Link to={link} className="block">
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DashboardCard;
