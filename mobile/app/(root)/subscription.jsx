import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { styles } from "../../assets/styles/home.styles.js";
import { useSubscriptions } from "../../hooks/useSubscriptions.js";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import PageLoader from "../../components/PageLoader.jsx";
import TotalCard from "../../components/TotalCard.jsx";
import SubscriptionItem from "../../components/SubscriptionItem.jsx";
import NoSubscriptionsFound from "../../components/NoSubscriptionsFound.jsx";
import { COLORS } from "../../constants/colors";

export default function Sub() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  // Génère un avatar aléatoire basé sur l'email
  const emailPrefix = user?.emailAddresses[0]?.emailAddress.split("@")[0] || "user";
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/png?seed=${emailPrefix}&radius=50&backgroundColor=b6e3f4,c0aede,d1d4f9`;

  const { subscriptions, subscriptionSummary, isLoading, loadData, deleteSubscription } =
    useSubscriptions(user.id);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Subscription",
      "Are you sure you want to delete this subscription?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteSubscription(id);
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete subscription. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  if (isLoading && !refreshing) return <PageLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
             <Image
              source={{ uri: avatarUrl }}
              style={styles.headerLogo}
              contentFit="cover"
              transition={1000}
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
               <Text style={styles.usernameText}>
                {emailPrefix}
              </Text>
            </View>

            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/")}
              >
                <Ionicons name="swap-horizontal" size={20} color="#FFF" />
                <Text style={styles.addButtonText}>Transactions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.TotalCard}>
          <TotalCard subscriptionSummary={subscriptionSummary} />
        </View>

        {/* Actions Row */}
        <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.insertButton}
                onPress={() => router.push("/insert")}
              >
                <Ionicons name="add-circle" size={20} color="#FFF" />
                <Text style={styles.addButtonText}>Subscription</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.insertButton}
                onPress={() => router.push("/calendar")}
              >
                <Ionicons name="calendar-outline" size={20} color="#FFF" />
                <Text style={styles.addButtonText}>Calendar</Text>
              </TouchableOpacity>
        </View>

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Subscriptions</Text>
        </View>
      </View>

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={subscriptions}
        renderItem={({ item }) => (
          <SubscriptionItem item={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<NoSubscriptionsFound />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]} // Correction ici
            tintColor={COLORS.primary} // Correction ici
          />
        }
      />
    </View>
  );
} 