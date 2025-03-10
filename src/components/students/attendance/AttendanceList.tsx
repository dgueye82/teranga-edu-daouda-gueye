
import { Calendar, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StudentAttendance } from "@/types/student";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface AttendanceListProps {
  attendance: StudentAttendance[];
  onEdit: (attendance: StudentAttendance) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

const AttendanceList = ({ attendance, onEdit, onDelete, onAddNew }: AttendanceListProps) => {
  function getAttendanceStatusColor(status: string) {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "excused":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  function getStatusLabel(status: string) {
    switch (status) {
      case "present":
        return "Présent";
      case "absent":
        return "Absent";
      case "late":
        return "En retard";
      case "excused":
        return "Excusé";
      default:
        return status;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des présences</CardTitle>
      </CardHeader>
      <CardContent>
        {attendance.length === 0 ? (
          <div className="text-center py-10">
            <Calendar className="h-10 w-10 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">Aucune donnée de présence disponible</p>
            <Button onClick={onAddNew}>
              Ajouter une présence
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Statut</th>
                  <th className="text-left py-3 px-4">Notes</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getAttendanceStatusColor(record.status)}>
                        {getStatusLabel(record.status)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">{record.notes || "-"}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => onEdit(record)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action ne peut pas être annulée. Cela supprimera définitivement cette entrée de présence.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDelete(record.id)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceList;
