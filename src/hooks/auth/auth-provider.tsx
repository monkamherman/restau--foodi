
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';
import { useToast } from "@/hooks/use-toast";
import { AuthContext } from "./auth-context";
import { Role } from "./types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRoles, setUserRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if the user has admin or super-admin roles
  const isAdmin = userRoles.includes('admin') || userRoles.includes('super-admin');
  const isSuperAdmin = userRoles.includes('super-admin');

  // Fetch user roles from the database
  const fetchUserRoles = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) throw error;
      
      if (data) {
        setUserRoles(data.map(item => item.role as Role));
      }
    } catch (error) {
      console.error('Error fetching user roles:', error);
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state change event:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Fetch roles if user is authenticated
        if (currentSession?.user) {
          setTimeout(() => {
            fetchUserRoles(currentSession.user.id);
          }, 0);
        } else {
          setUserRoles([]);
        }
        
        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession ? "Session found" : "No session");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchUserRoles(currentSession.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUserRoles]);

  // Sign in with email and password
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Auth error:", error);
        throw error;
      }
      
      if (data.user) {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté",
        });
        navigate('/');
      }
      
      return data;
    } catch (error: any) {
      console.error("Auth error:", error);
      throw error;
    }
  }, [navigate, toast]);

  // Sign up with email and password
  const signUp = useCallback(async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      // Option pour les tests: utiliser la connexion automatique
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: firstName || '',
            last_name: lastName || ''
          },
          emailRedirectTo: `${window.location.origin}/login`
        }
      });
      
      if (error) throw error;

      // Si l'inscription est réussie et que l'utilisateur est créé
      if (data.user) {
        // Mettre à jour les informations du profil
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            first_name: firstName || null,
            last_name: lastName || null
          })
          .eq('id', data.user.id);
        
        if (profileError) {
          console.error("Error updating profile:", profileError);
        }
      }

      // Automatiquement connecter l'utilisateur pour les tests
      // (uniquement si autoSignIn est vrai et que la session est définie)
      if (data.session) {
        setUser(data.user);
        setSession(data.session);
        
        if (data.user) {
          fetchUserRoles(data.user.id);
        }
      }
      
      return data;
    } catch (error: any) {
      console.error("Registration error:", error);
      throw error;
    }
  }, [fetchUserRoles]);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setUserRoles([]);
      navigate('/login');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: error.message || "Échec de la déconnexion",
      });
    }
  }, [navigate, toast]);

  // Request password reset
  const forgotPassword = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/change-password`,
      });
      if (error) throw error;
      toast({
        title: "Lien de réinitialisation envoyé",
        description: "Vérifiez votre email pour les instructions de réinitialisation du mot de passe",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Échec de l'envoi du lien de réinitialisation",
      });
    }
  }, [toast]);

  // Set new password after reset
  const resetPassword = useCallback(async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été réinitialisé avec succès",
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Échec de la réinitialisation du mot de passe",
      });
    }
  }, [navigate, toast]);

  const value = {
    user,
    session,
    userRoles,
    isLoading,
    isAdmin,
    isSuperAdmin,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
