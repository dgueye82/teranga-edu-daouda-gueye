
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Home } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-red-100 mb-4">
            <Shield className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Accès non autorisé</h1>
          <p className="mt-2 text-gray-600">
            Votre compte ({userProfile?.role || 'utilisateur'}) n'a pas les permissions nécessaires pour accéder à cette page.
          </p>
        </div>
        
        <div className="flex flex-col space-y-3">
          <Button
            onClick={() => navigate('/')}
            className="w-full"
          >
            <Home className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
