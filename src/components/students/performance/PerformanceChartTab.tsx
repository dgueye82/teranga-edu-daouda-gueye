
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartData {
  name: string;
  moyenne: number;
  percentage: number;
}

interface PerformanceChartTabProps {
  chartData: ChartData[];
  isLoadingPerformances: boolean;
}

const PerformanceChartTab: React.FC<PerformanceChartTabProps> = ({ chartData, isLoadingPerformances }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Graphiques de performances</CardTitle>
        <CardDescription>
          Visualisation des performances scolaires
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        {isLoadingPerformances ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucune donnée disponible pour afficher les graphiques</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="moyenne" name="Moyenne" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="percentage" name="Pourcentage (%)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceChartTab;
