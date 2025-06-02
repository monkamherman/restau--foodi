
import { supabase } from "./client";

/**
 * Vérifie si l'utilisateur courant a un rôle spécifique
 * @param role Le rôle à vérifier ('admin', 'user', etc.)
 * @returns Promise<boolean> Vrai si l'utilisateur a le rôle, faux sinon
 */
export async function checkUserRole(role: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('role', role)
      .single();
    
    if (error) {
      console.error('Erreur lors de la vérification du rôle:', error);
      return false;
    }
    
    return !!data;
  } catch (err) {
    console.error('Exception lors de la vérification du rôle:', err);
    return false;
  }
}

/**
 * Vérifie si l'utilisateur actuel est un administrateur
 * @returns Promise<boolean> Vrai si l'utilisateur est admin, faux sinon
 */
export async function isAdmin(): Promise<boolean> {
  return await checkUserRole('admin');
}
