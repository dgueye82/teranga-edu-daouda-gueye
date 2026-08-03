import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Edit, Mail, Phone, MapPin, Briefcase, Calendar, User } from "lucide-react";
import { Staff } from "@/types/staff";

interface StaffDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  staffMember?: Staff;
  onEdit?: (staff: Staff) => void;
  canEdit?: boolean;
}

const Row: React.FC<{ icon: React.ReactNode; label: string; value?: string }> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-start gap-3 py-2">
    <span className="text-muted-foreground mt-0.5">{icon}</span>
    <div className="min-w-0">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-sm font-medium break-words">{value?.trim() ? value : "—"}</p>
    </div>
  </div>
);

const StaffDetailsDialog: React.FC<StaffDetailsDialogProps> = ({
  isOpen,
  onClose,
  staffMember,
  onEdit,
  canEdit = true,
}) => {
  if (!staffMember) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Fiche du personnel
            <Badge variant="outline">Lecture seule</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold">{staffMember.name}</p>
              <p className="text-sm text-muted-foreground">{staffMember.role}</p>
            </div>
          </div>

          <Separator className="my-3" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <Row icon={<Briefcase className="h-4 w-4" />} label="Département" value={staffMember.department} />
            <Row icon={<Calendar className="h-4 w-4" />} label="Date d'embauche" value={staffMember.joinDate} />
            <Row icon={<User className="h-4 w-4" />} label="Statut" value={staffMember.status} />
            <Row icon={<Mail className="h-4 w-4" />} label="Email" value={staffMember.email} />
            <Row icon={<Phone className="h-4 w-4" />} label="Téléphone" value={staffMember.phone} />
            <Row icon={<MapPin className="h-4 w-4" />} label="Adresse" value={staffMember.address} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          {canEdit && onEdit && (
            <Button onClick={() => onEdit(staffMember)}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StaffDetailsDialog;
