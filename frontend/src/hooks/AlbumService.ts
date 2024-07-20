import { useState, useCallback, useEffect } from "react";

const API_BASE_URL = "http://127.0.0.1:8000/albums";

type Album = {
  album_name: string;
  image_paths: string[];
  description?: string;
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

export const useCreateAlbum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createAlbum = useCallback(
    async (newAlbum: { name: string; description?: string }) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiCall(
          `${API_BASE_URL}/create-album`,
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
      const result = await apiCall(`${API_BASE_URL}/delete-album`, "DELETE", {
        album_id: albumId,
      });
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

export const useAllAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAlbums = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiCall(`${API_BASE_URL}/view-all`, "GET");
      setAlbums(result.albums);
      setIsLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return { albums, isLoading, error, refetch: fetchAlbums };
};

export const useAddImageToAlbum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addImage = useCallback(async (albumName: string, imagePath: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiCall(`${API_BASE_URL}/add-to-album`, "POST", {
        album_name: albumName,
        image_path: imagePath,
      });
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
      setIsLoading(false);
    }
  }, []);

  return { addImage, isLoading, error };
};

export const useAddMultipleImagesToAlbum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addMultipleImages = useCallback(
    async (albumName: string, imagePaths: string[]) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiCall(
          `${API_BASE_URL}/add-multiple-to-album`,
          "POST",
          { album_name: albumName, image_paths: imagePaths }
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

  return { addMultipleImages, isLoading, error };
};

export const useRemoveImageFromAlbum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const removeImage = useCallback(
    async (albumName: string, imagePath: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiCall(
          `${API_BASE_URL}/remove-from-album`,
          "DELETE",
          { album_name: albumName, image_path: imagePath }
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

  return { removeImage, isLoading, error };
};

export const useViewAlbum = () => {
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const viewAlbum = useCallback(async (albumName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiCall(
        `${API_BASE_URL}/view-album?album_name=${encodeURIComponent(
          albumName
        )}`,
        "GET"
      );
      setAlbum(result);
      setIsLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
      setIsLoading(false);
    }
  }, []);

  return { album, viewAlbum, isLoading, error };
};

export const useEditAlbumDescription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const editDescription = useCallback(
    async (albumName: string, newDescription: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiCall(
          `${API_BASE_URL}/edit-album-description`,
          "PUT",
          { album_name: albumName, new_description: newDescription }
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

  return { editDescription, isLoading, error };
};
