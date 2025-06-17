import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api";

export const useSubscriptions = (userId) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionSummary, setSubscriptionSummary] = useState({
    total: 0,
    count: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // état d’erreur optionnel

  /** ────────────────────────────────
   * Récupère la liste des abonnements
   * ────────────────────────────────*/
  const fetchSubscriptions = useCallback(async () => {
    if (!userId) return; // sécurité
    try {
      const response = await fetch(`${API_URL}/subscriptions/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch subscriptions");
      const data = await response.json();
      setSubscriptions(data);
    } catch (err) {
      console.log("Error fetching subscriptions:", err);
      setError(err);
      Alert.alert("Error", err.message);
    }
  }, [userId]);

  /** ────────────────────────────────
   * Récupère le résumé (total / count)
   * ────────────────────────────────*/
  const fetchSubscriptionSummary = useCallback(async () => {
    if (!userId) return; // sécurité
    try {
      const response = await fetch(`${API_URL}/subscriptions/summary/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch subscription summary");
      const data = await response.json();
      setSubscriptionSummary(data);
    } catch (err) {
      console.log("Error fetching subscription summary:", err);
      setError(err);
    }
  }, [userId]);

  /** ────────────────────────────────
   * Charge simultanément les données
   * ────────────────────────────────*/
  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);
    try {
      await Promise.all([fetchSubscriptions(), fetchSubscriptionSummary()]);
    } catch (err) {
      console.log("Error loading subscription data:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchSubscriptions, fetchSubscriptionSummary, userId]);

  /** ────────────────────────────────
   * Crée un nouvel abonnement
   * ────────────────────────────────*/
  const createSubscription = async (subscriptionData) => {
    try {
      const response = await fetch(`${API_URL}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscriptionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create subscription");
      }

      await loadData();
      Alert.alert("Success", "Subscription created successfully");
      return true;
    } catch (err) {
      console.log("Error creating subscription:", err);
      setError(err);
      Alert.alert("Error", err.message);
      return false;
    }
  };

  /** ────────────────────────────────
   * Supprime un abonnement
   * ────────────────────────────────*/
  const deleteSubscription = async (id) => {
    try {
      const response = await fetch(`${API_URL}/subscriptions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete subscription");

      await loadData();
      Alert.alert("Success", "Subscription deleted successfully");
      return true;
    } catch (err) {
      console.log("Error deleting subscription:", err);
      setError(err);
      Alert.alert("Error", err.message);
      return false;
    }
  };

  /** ────────────────────────────────
   * Valeurs retournées par le hook
   * ────────────────────────────────*/
  return {
    subscriptions,
    subscriptionSummary,
    isLoading,
    error,
    loadData,
    createSubscription,
    deleteSubscription,
  };
};

