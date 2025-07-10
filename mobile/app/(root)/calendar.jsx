import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSubscriptions } from "../../hooks/useSubscriptions";
import { useUser } from "@clerk/clerk-expo";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useThemeStore } from "../../store/themeStore"; // ✅ thème dynamique

const recurrenceLabels = {
  monthly: "Monthly",
  weekly: "Weekly",
  yearly: "Yearly",
  none: "One-time",
};

const CalendarScreen = () => {
  const router = useRouter();
  const { user } = useUser();
  const COLORS = useThemeStore().getCurrentTheme(); // ✅ appel dynamique
  const styles = getStyles(COLORS); // ✅ styles dynamiques
  const { subscriptions, loadData } = useSubscriptions(user?.id);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [user?.id]);

  const generateDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push(date);
    }

    return days;
  };

  const getSubscriptionsForDate = (date) => {
    if (!date) return [];

    return subscriptions.filter((sub) => {
      const subDate = new Date(sub.date);

      const isSameDate =
        subDate.getDate() === date.getDate() &&
        subDate.getMonth() === date.getMonth() &&
        subDate.getFullYear() === date.getFullYear();

      if (isSameDate) return true;

      if (sub.recurrence === "monthly") {
        return subDate.getDate() === date.getDate();
      }

      if (sub.recurrence === "weekly") {
        return subDate.getDay() === date.getDay();
      }

      if (sub.recurrence === "yearly") {
        return (
          subDate.getDate() === date.getDate() &&
          subDate.getMonth() === date.getMonth()
        );
      }

      return false;
    });
  };

  const changeMonth = (increment) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1)
    );
  };

  const days = generateDays();
  const selectedSubscriptions = getSubscriptionsForDate(selectedDate);
  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.appHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerAction}>
            <FeatherIcon color={COLORS.expense} name="arrow-left" size={24} />
          </TouchableOpacity>

          <Text style={styles.appTitle}>Calendar</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.monthNavButton}>
            <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <Text style={styles.monthTitle}>{monthName}</Text>

          <TouchableOpacity onPress={() => changeMonth(1)} style={styles.monthNavButton}>
            <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.weekDaysContainer}>
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <Text key={index} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {days.map((day, index) => {
            const isSelected =
              day &&
              day.getDate() === selectedDate.getDate() &&
              day.getMonth() === selectedDate.getMonth() &&
              day.getFullYear() === selectedDate.getFullYear();

            const hasSubscriptions = day && getSubscriptionsForDate(day).length > 0;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCell,
                  isSelected && styles.selectedDay,
                  !day && styles.emptyDay,
                ]}
                onPress={() => day && setSelectedDate(day)}
                disabled={!day}
              >
                {day && (
                  <>
                    <Text
                      style={[
                        styles.dayText,
                        isSelected && styles.selectedDayText,
                        hasSubscriptions && styles.hasSubscriptionsText,
                      ]}
                    >
                      {day.getDate()}
                    </Text>
                    {hasSubscriptions && <View style={styles.subscriptionDot} />}
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.subscriptionsContainer}>
          <Text style={styles.sectionTitle}>
            Subscriptions for {selectedDate.toLocaleDateString()}
          </Text>

          {selectedSubscriptions.length > 0 ? (
            <FlatList
              data={selectedSubscriptions}
              renderItem={({ item }) => (
                <View style={styles.subscriptionItem}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {item.image_url ? (
                      <Image
                        source={{ uri: item.image_url }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          marginRight: 12,
                        }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.subIconContainer}>
                        <Ionicons name="pricetag-outline" size={20} color={COLORS.primary} />
                      </View>
                    )}
                    <View>
                      <Text style={styles.subscriptionLabel}>{item.label}</Text>
                      <Text style={styles.subscriptionRecurrence}>
                        {recurrenceLabels[item.recurrence] || "One-time"}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.subscriptionAmount}>
                    -${parseFloat(item.amount).toFixed(2)}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              refreshing={refreshing}
              onRefresh={onRefresh}
              contentContainerStyle={{ paddingBottom: 80 }}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color={COLORS.textLight} />
              <Text style={styles.noSubscriptionsText}>
                No subscriptions for this day
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => router.push("/insert")}>
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ✅ Styles dynamiques avec COLORS
const getStyles = (COLORS) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingHorizontal: 16,
    },
    headerAction: {
      width: 40,
      height: 40,
      borderRadius: 9999,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.border,
      marginBottom: 4,
    },
    appHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      marginBottom: -15,
      position: "relative",
      bottom: 10,
    },
    appTitle: {
      fontSize: 22,
      fontWeight: "600",
      color: COLORS.text,
    },
    calendarHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      backgroundColor: COLORS.card,
      padding: 12,
      borderRadius: 12,
      position: "relative",
      bottom: 10,
    },
    monthNavButton: {
      padding: 8,
    },
    monthTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: COLORS.text,
    },
    weekDaysContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
      paddingHorizontal: 4,
      position: "relative",
      bottom: 10,
    },
    weekDayText: {
      width: "14%",
      textAlign: "center",
      fontWeight: "500",
      color: COLORS.textLight,
      fontSize: 14,
    },
    calendarGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: -80,
      position: "relative",
      bottom: 10,
    },
    dayCell: {
      width: "14%",
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      marginVertical: 2,
    },
    emptyDay: {
      backgroundColor: "transparent",
    },
    selectedDay: {
      backgroundColor: COLORS.primary,
    },
    dayText: {
      color: COLORS.text,
      fontSize: 16,
      fontWeight: "400",
    },
    selectedDayText: {
      color: "white",
      fontWeight: "600",
    },
    hasSubscriptionsText: {
      fontWeight: "600",
    },
    subscriptionDot: {
      position: "absolute",
      bottom: 6,
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: COLORS.primary,
    },
    subscriptionsContainer: {
      flex: 1,
      marginTop: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: COLORS.text,
      marginBottom: 16,
      paddingHorizontal: 4,
    },
    subscriptionItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor: COLORS.card,
      borderRadius: 12,
      marginBottom: 12,
    },
    subIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: COLORS.border,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    subscriptionLabel: {
      color: COLORS.text,
      fontSize: 16,
      fontWeight: "500",
    },
    subscriptionRecurrence: {
      color: COLORS.textLight,
      fontSize: 12,
      marginTop: 2,
    },
    subscriptionAmount: {
      color: COLORS.expense,
      fontWeight: "600",
      fontSize: 16,
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 100,
    },
    noSubscriptionsText: {
      color: COLORS.textLight,
      textAlign: "center",
      marginTop: 16,
      fontSize: 16,
    },
    addButton: {
      position: "absolute",
      right: 20,
      bottom: 20,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: COLORS.primary,
      justifyContent: "center",
      alignItems: "center",
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  });

export default CalendarScreen;
