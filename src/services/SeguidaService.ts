import { useAuth } from "@/contexts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import config from "./config";

export function useSeguidaMutation(seguidoId: number) {
  const queryClient = useQueryClient();
  const { getValidateToken } = useAuth();

  return useMutation({
    mutationFn: () =>
      config.axiosClient.post(
        `${config.apiUrl}/seguida/${seguidoId}`,
        null,
        { headers: { Authorization: `Bearer ${getValidateToken()}` } },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [seguidoId, "profileData"] });
      queryClient.invalidateQueries({ queryKey: [seguidoId, "isFollowing"] });
    },
  });
}

export function useIsFollowingQuery(seguidoId: number) {
  const { getValidateToken } = useAuth();

  return useQuery({
    queryKey: [seguidoId, "isFollowing"],
    queryFn: async () => {
      const response = await config.axiosClient.get<boolean>(
        `${config.apiUrl}/seguida/${seguidoId}`,
        { headers: { Authorization: `Bearer ${getValidateToken()}` } },
      );
      return response.data;
    },
  });
}