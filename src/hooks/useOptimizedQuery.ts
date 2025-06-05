
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface QueryConfig<T> {
  table: string;
  select?: string;
  filters?: Record<string, any>;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
}

export const useOptimizedQuery = <T>(
  queryKey: string[],
  config: QueryConfig<T>,
  options?: Omit<UseQueryOptions<T[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      let query = supabase
        .from(config.table)
        .select(config.select || '*');

      // Apply filters
      if (config.filters) {
        Object.entries(config.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value);
          }
        });
      }

      // Apply ordering
      if (config.orderBy) {
        query = query.order(config.orderBy.column, { 
          ascending: config.orderBy.ascending ?? false 
        });
      }

      // Apply limit
      if (config.limit) {
        query = query.limit(config.limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as T[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    ...options,
  });
};

// Hook spécialisé pour les plats avec cache optimisé
export const useDishes = (category?: string) => {
  return useOptimizedQuery(
    ['dishes', category].filter(Boolean),
    {
      table: 'dishes',
      select: '*',
      filters: category ? { category } : undefined,
      orderBy: { column: 'created_at', ascending: false },
    },
    {
      staleTime: 10 * 60 * 1000, // 10 minutes pour les plats
    }
  );
};

// Hook pour les statistiques du dashboard avec mise à jour automatique
export const useDashboardStats = () => {
  return useOptimizedQuery(
    ['dashboard-stats'],
    {
      table: 'dishes', // On va optimiser cela plus tard
      select: 'id',
    },
    {
      refetchInterval: 30 * 1000, // Mise à jour toutes les 30 secondes
      staleTime: 1 * 60 * 1000, // 1 minute
    }
  );
};
