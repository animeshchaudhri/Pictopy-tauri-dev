import { useState, useCallback, useEffect } from "react";

type Image = {
  id: string;
  url: string;
  // Add other image properties as needed
};

export const useCreateAlbum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createAlbum = useCallback(
    async (newAlbum: { name: string; description?: string }) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiCall(
          "http://127.0.0.1:8000/albums/create-album",
          "POST",
          newAlbum
        );
        setIsLoading(false);
        return result;
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
        setIsLoading(false);
      }
    },
    []
  );

  return { createAlbum, isLoading, error };
};

export const useDeleteAlbum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteAlbum = useCallback(async (albumId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiCall(
        "http://127.0.0.1:8000/albums/delete-album",
        "DELETE",
        { album_id: albumId }
      );
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
      setIsLoading(false);
    }
  }, []);

  return { deleteAlbum, isLoading, error };
};

const apiCall = async (url: string, method: string, body?: any) => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};

type Album = {
    album_name: string;
    image_paths: string[];
    // Add other album properties as needed
  };
  
  // 8. Get All Albums
  export const useAllAlbums = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
  
    const fetchAlbums = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiCall("http://127.0.0.1:8000/albums/view-all", "GET");
        setAlbums(result.albums); // Adjusted to extract albums from the response
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"));
        setIsLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchAlbums();
    }, [fetchAlbums]);
  
    return { albums, isLoading, error, refetch: fetchAlbums };
  };