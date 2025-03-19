
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Home, UserCog } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { userProfile, user, createUserProfileIfMissing } = useAuth();

  useEffect(() => {
    console.log("Unauthorized Page - User state:", {
      email: user?.email,
      profile: userProfile,
      role: userProfile?.role
    });
  }, [user, userProfile]);

  const handleCreateProfile = async () => {
    await createUserProfileIfMissing();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-red-100 mb-4">
            <Shield className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Accès non autorisé</h1>
          <p className="mt-2 text-gray-600">
            Votre compte ({user?.email || 'non connecté'}) avec le rôle ({userProfile?.role || 'sans rôle'}) n'a pas les permissions nécessaires pour accéder à cette page.
          </p>
        </div>
        
        <div className="flex flex-col space-y-3">
          {!userProfile && (
            <Button
              onClick={handleCreateProfile}
              className="w-full"
              variant="default"
            >
              <UserCog className="mr-2 h-4 w-4" />
              Créer mon profil utilisateur
            </Button>
          )}
          <Button
            onClick={() => navigate('/')}
            className="w-full"
            variant={userProfile ? "default" : "outline"}
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
