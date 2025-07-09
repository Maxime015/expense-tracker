import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api";

export const useGroceries = (userId) => {
  const [groceries, setGroceries] = useState([]);
  const [groceriesSummary, setGroceriesSummary] = useState({
    total: 0,
    completed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupère la liste des groceries
  const fetchGroceries = useCallback(async () => {
    if (!userId) {
      console.log("No user ID, skipping groceries fetch");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/groceries/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch groceries");
      const data = await response.json();
      setGroceries(data);
    } catch (err) {
      console.error("Error fetching groceries:", err);
      setError(err);
      Alert.alert("Error", err.message);
    }
  }, [userId]);

  // Récupère le résumé (total et complétés)
  const fetchGroceriesSummary = useCallback(async () => {
  if (!userId) {
    console.log("Pas d'ID utilisateur, annulation");
    return;
  }
  try {
    const response = await fetch(`${API_URL}/groceries/summary/${userId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Échec de récupération du résumé");
    }
    const data = await response.json();
    setGroceriesSummary(data);
  } catch (err) {
    console.error("Erreur récupération résumé:", err);
    setError(err);
    // Ne pas afficher d'alerte ici pour ne pas gêner l'utilisateur
  }
}, [userId]);

  // Charge toutes les données
  const loadData = useCallback(async () => {
    if (!userId) {
      console.log("No user ID, skipping data load");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await Promise.all([fetchGroceries(), fetchGroceriesSummary()]);
    } catch (err) {
      console.error("Error loading groceries data:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchGroceries, fetchGroceriesSummary, userId]);

  // Ajoute un nouveau grocery
  const addGrocerie = async (text) => {
    if (!userId) {
      Alert.alert("Error", "User not authenticated");
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/groceries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add grocery");
      }

      await loadData();
      Alert.alert("Success", "Grocery added successfully");
      return true;
    } catch (err) {
      console.error("Error adding grocery:", err);
      setError(err);
      Alert.alert("Error", err.message);
      return false;
    }
  };

  // Met à jour un grocery
  const updateGrocerie = async (id, text) => {
  if (!id || !text) {
    Alert.alert("Erreur", "ID et texte requis");
    return false;
  }

  try {
    console.log("Updating grocery with ID:", id, "Text:", text); // Debug log
    const response = await fetch(`${API_URL}/groceries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Échec de la mise à jour");
    }

    await loadData();
    return true;
  } catch (err) {
    console.error("Update error:", err);
    throw err;
  }
};


  // Alterne l'état is_completed
  const toggleGrocerie = async (id) => {
    try {
      const response = await fetch(`${API_URL}/groceries/${id}/toggle`, {
        method: "PATCH",
      });

      if (!response.ok) throw new Error("Failed to toggle grocery");

      await loadData();
      return true;
    } catch (err) {
      console.error("Error toggling grocery:", err);
      setError(err);
      return false;
    }
  };

  // Supprime un grocery
const deleteGrocerie = async (id) => {
  console.log("Deleting grocery with ID:", id); // Ajoutez ce log
  try {
    const response = await fetch(`${API_URL}/groceries/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Échec de la suppression");
    }

    const result = await response.json();
    await loadData();
    return result;
  } catch (err) {
    console.error("Delete error:", err);
    throw err;
  }
};



  // Supprime tous les groceries
  const clearAllGroceries = async () => {
    if (!userId) {
      Alert.alert("Error", "User not authenticated");
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/groceries`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error("Failed to clear groceries");

      await loadData();
      Alert.alert("Success", "All groceries cleared");
      return true;
    } catch (err) {
      console.error("Error clearing groceries:", err);
      setError(err);
      Alert.alert("Error", err.message);
      return false;
    }
  };

  return {
    groceries,
    groceriesSummary,
    isLoading,
    error,
    loadData,
    addGrocerie,
    updateGrocerie,
    toggleGrocerie,
    deleteGrocerie,
    clearAllGroceries,
  };
};