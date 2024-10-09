import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useUserProfile = () => {
  const queryClient = useQueryClient();

  // Fetch user profile
  const fetchUserProfile = async () => {
    const response = await fetch("/api/user/profile", {
      method: "GET",
      credentials: "include", // Include credentials for authentication
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return response.json();
  };

  // Update user profile
  const updateUserProfile = async (data: {
    username: string;
    password: string;
  }) => {
    const response = await fetch("/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials for authentication
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update user profile");
    }

    return response.json();
  };

  // Delete user profile
  const deleteUserProfile = async () => {
    const response = await fetch("/api/user/profile", {
      method: "DELETE",
      credentials: "include", // Include credentials for authentication
    });

    if (!response.ok) {
      throw new Error("Failed to delete user profile");
    }
  };

  // Query for user profile
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  // Mutation for updating user profile
  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      }); // Refetch user profile on success
    },
  });

  // Mutation for updating user profile
  const deleteMutation = useMutation({
    mutationFn: deleteUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      }); // Refetch user profile on success
    },
  });

  return {
    data,
    isLoading,
    isError,
    updateMutation,
    deleteMutation,
  };
};

export default useUserProfile;
