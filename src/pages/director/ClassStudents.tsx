
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import DirectorSidebar from "@/components/director/DirectorSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, Plus, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getSchools } from "@/services/schoolService";
import { getStudentsBySchool } from "@/services/student";

const ClassStudents = () => {
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  
  // Définir les niveaux de classe
  const grades = [
    "CP1", "CP2", "CE1", "CE2", "CM1", "CM2", 
    "6ème", "5ème", "4ème", "3ème", 
    "2nde", "1ère", "Terminale"
  ];

  // Récupérer la liste des écoles
  const { data: schools = [] } = useQuery({
    queryKey: ["schools"],
    queryFn: getSchools,
  });

  // Récupérer les élèves par école
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["students", selectedSchool],
    queryFn: () => selectedSchool ? getStudentsBySchool(selectedSchool) : [],
    enabled: !!selectedSchool,
  });

  // Filtrer les élèves par classe et par recherche
  const filteredStudents = students.filter(student => {
    const matchesSearch = searchTerm === "" || 
      student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = selectedGrade === "all" || 
      (student.notes && student.notes.includes(selectedGrade));
    
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DirectorSidebar />
      <div className="flex-1">
        <Navbar />
        <main className="container mx-auto px-4 py-8 mt-16">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/director-dashboard")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Élèves par Classe</h1>
              <p className="text-gray-600 mt-1">
                Consultez et gérez les élèves regroupés par classe
              </p>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Filtres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    École
                  </label>
                  <Select 
                    value={selectedSchool} 
                    onValueChange={setSelectedSchool}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une école" />
                    </SelectTrigger>
                    <SelectContent>
                      {schools.map((school) => (
                        <SelectItem key={school.id} value={school.id}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Classe
                  </label>
                  <Select 
                    value={selectedGrade} 
                    onValueChange={setSelectedGrade}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les classes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les classes</SelectItem>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Recherche
                  </label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Rechercher un élève..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">
              {selectedGrade === "all" 
                ? "Tous les élèves" 
                : `Classe de ${selectedGrade}`}
              {filteredStudents.length > 0 && ` (${filteredStudents.length} élèves)`}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un élève
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
            </div>
          ) : selectedSchool === "" ? (
            <Card className="py-12">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez une école</h3>
                <p className="text-gray-600">Veuillez sélectionner une école pour voir la liste des élèves</p>
              </div>
            </Card>
          ) : filteredStudents.length === 0 ? (
            <Card className="py-12">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun élève trouvé</h3>
                <p className="text-gray-600">Aucun élève ne correspond aux critères de recherche</p>
              </div>
            </Card>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Prénom</TableHead>
                    <TableHead className="hidden md:table-cell">Classe</TableHead>
                    <TableHead className="hidden md:table-cell">Date d'inscription</TableHead>
                    <TableHead className="hidden md:table-cell">Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => {
                    // Extraire la classe à partir des notes (champ temporaire pour la classe)
                    const studentClass = student.notes || "Non spécifiée";
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.last_name}</TableCell>
                        <TableCell>{student.first_name}</TableCell>
                        <TableCell className="hidden md:table-cell">{studentClass}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {student.enrollment_date ? new Date(student.enrollment_date).toLocaleDateString() : "N/A"}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            student.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}>
                            {student.status === "active" ? "Actif" : student.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/student/${student.id}`)}
                          >
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default ClassStudents;
