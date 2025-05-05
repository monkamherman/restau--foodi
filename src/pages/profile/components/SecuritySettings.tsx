
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, AlertTriangle } from "lucide-react";
import { Role } from "@/hooks/auth/types";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const SecuritySettings = () => {
  const { user, userRoles, isSuperAdmin } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<Role[]>(['user', 'admin', 'super-admin']);
  
  const form = useForm({
    defaultValues: {
      role: userRoles[0] || 'user',
    }
  });

  useEffect(() => {
    if (user) {
      form.reset({
        role: userRoles[0] || 'user',
      });
      setIsLoading(false);
    }
  }, [user, userRoles, form]);

  const updateRole = async (values: { role: Role }) => {
    if (!user || !isSuperAdmin) return;

    try {
      setIsUpdating(true);
      
      // Only super-admin can change roles
      if (!isSuperAdmin) {
        toast({
          variant: "destructive",
          title: "Accès refusé",
          description: "Vous n'avez pas l'autorisation de changer les rôles.",
        });
        return;
      }

      // First delete any existing roles for this user
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', user.id);
      
      if (deleteError) throw deleteError;

      // Then insert the new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: values.role
        });
      
      if (insertError) throw insertError;
      
      toast({
        title: "Rôle mis à jour",
        description: `Votre rôle a été modifié en ${values.role}.`
      });
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors de la mise à jour du rôle",
        description: error.message
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Create function to change another user's role (admin only)
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState<Role>("user");
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    if (isSuperAdmin) {
      fetchUsers();
    }
  }, [isSuperAdmin]);

  const fetchUsers = async () => {
    if (!isSuperAdmin) return;
    
    try {
      setLoadingUsers(true);
      
      // Fetch user profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name');
      
      if (profilesError) throw profilesError;
      
      // Fetch roles for each user
      const userRolesPromises = profiles?.map(async (profile) => {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', profile.id)
          .order('role', { ascending: false }) // Get highest role first
          .limit(1);
        
        return {
          ...profile,
          role: roleData && roleData.length > 0 ? roleData[0].role : 'user',
        };
      }) || [];
      
      const usersWithRoles = await Promise.all(userRolesPromises);
      setUsers(usersWithRoles);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors du chargement des utilisateurs",
        description: error.message
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const changeUserRole = async () => {
    if (!isSuperAdmin || !userId) return;
    
    try {
      setIsUpdating(true);
      
      // Delete existing roles for this user
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);
      
      if (deleteError) throw deleteError;

      // Insert the new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: userRole
        });
      
      if (insertError) throw insertError;
      
      toast({
        title: "Rôle mis à jour",
        description: `Le rôle de l'utilisateur a été modifié en ${userRole}.`
      });
      
      // Refresh the user list
      fetchUsers();
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors de la mise à jour du rôle",
        description: error.message
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Sécurité et Paramètres</h1>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex-1">
                <CardTitle>Paramètres de sécurité</CardTitle>
                <CardDescription>Gérez vos paramètres de sécurité et votre rôle</CardDescription>
              </div>
              <Shield className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Votre rôle actuel</h3>
                <div className="bg-secondary p-4 rounded-md">
                  <div className="flex flex-wrap gap-2">
                    {userRoles.map((role) => (
                      <span 
                        key={role}
                        className={`px-3 py-1 rounded-full text-sm ${
                          role === 'admin' ? 'bg-blue-100 text-blue-700' : 
                          role === 'super-admin' ? 'bg-purple-100 text-purple-700' : 
                          'bg-green-100 text-green-700'
                        }`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {isSuperAdmin && (
                <div className="space-y-6">
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Changer votre rôle</h3>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(updateRole)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sélectionner un nouveau rôle</FormLabel>
                              <FormControl>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  disabled={isUpdating}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un rôle" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableRoles.map((role) => (
                                      <SelectItem key={role} value={role}>{role}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" disabled={isUpdating}>
                          {isUpdating ? "Mise à jour..." : "Mettre à jour mon rôle"}
                        </Button>
                      </form>
                    </Form>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Gérer les rôles des utilisateurs</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-4">
                        <div>
                          <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">
                            Sélectionner un utilisateur
                          </label>
                          <Select 
                            onValueChange={(value) => setUserId(value)}
                            disabled={loadingUsers || isUpdating}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un utilisateur" />
                            </SelectTrigger>
                            <SelectContent>
                              {users.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                  {user.first_name} {user.last_name} ({user.role})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                            Nouveau rôle
                          </label>
                          <Select 
                            onValueChange={(value) => setUserRole(value as Role)}
                            disabled={isUpdating}
                            defaultValue="user"
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un rôle" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableRoles.map((role) => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Button 
                          onClick={changeUserRole} 
                          disabled={!userId || isUpdating}
                          className="mt-2"
                        >
                          {isUpdating ? "Mise à jour..." : "Changer le rôle"}
                        </Button>
                      </div>
                      
                      <div className="flex items-start p-4 border border-yellow-200 bg-yellow-50 rounded-md">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-700">
                          Attention : La modification des rôles utilisateurs peut affecter leurs permissions dans l'application.
                          Assurez-vous de comprendre l'impact de ces changements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {!isSuperAdmin && (
                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-700">
                    Seuls les super-administrateurs peuvent modifier les rôles des utilisateurs.
                    Contactez un administrateur si vous avez besoin de modifier votre rôle.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
