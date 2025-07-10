import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { styles } from "../../assets/styles/home.styles.js";
import { useTransactions } from "../../hooks/useTransactions.js";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { BarChart, PieChart } from "react-native-chart-kit";
import PageLoader from "../../components/PageLoader.jsx";
import * as Animatable from "react-native-animatable";
import { useThemeStore } from "../../store/themeStore"; // ✅ dynamique

export default function AnalyticsPage() {
  const { user } = useUser();
  const router = useRouter();
  const COLORS = useThemeStore().getCurrentTheme(); // ✅ couleurs dynamiques

  const { transactions, summary, isLoading, loadData } = useTransactions(user?.id);
  const [activeTab, setActiveTab] = useState("expenses");
  const [chartData, setChartData] = useState({ expenses: [], income: [] });
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadData().then(() => setDataLoaded(true));
    }
  }, [user?.id]);

  useEffect(() => {
    if (transactions.length > 0 && dataLoaded) {
      processChartData();
    }
  }, [transactions, dataLoaded]);

  const processChartData = () => {
    const expensesByCategory = {};
    const incomeByCategory = {};

    transactions.forEach((transaction) => {
      const amount = parseFloat(transaction.amount);
      const category = transaction.category || "Other";

      if (amount < 0) {
        expensesByCategory[category] =
          (expensesByCategory[category] || 0) + Math.abs(amount);
      } else {
        incomeByCategory[category] =
          (incomeByCategory[category] || 0) + amount;
      }
    });

    const format = (obj) =>
      Object.keys(obj).map((cat) => ({
        name: cat,
        amount: obj[cat],
        color: getRandomColor(),
        legendFontColor: COLORS.textLight,
        legendFontSize: 12,
      }));

    setChartData({
      expenses: format(expensesByCategory),
      income: format(incomeByCategory),
    });
  };

  const getRandomColor = () => {
    const colors = [
      "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
      "#FF9F40", "#8AC24A", "#F06292", "#7986CB", "#E57373",
      "#BA68C8", "#4DD0E1", "#FFD54F", "#81C784", "#FF8A65",
      "#90CAF9", "#A1887F", "#CE93D8", "#FF7043", "#AED581",
      "#D32F2F", "#1976D2", "#388E3C", "#FBC02D", "#7B1FA2", "#0097A7",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: COLORS.card,
    backgroundGradientFrom: COLORS.card,
    backgroundGradientTo: COLORS.card,
    decimalPlaces: 2,
    color: (opacity = 1) => COLORS.text.replace(")", `, ${opacity})`).replace("rgb", "rgba"),
    labelColor: (opacity = 1) => COLORS.textLight.replace(")", `, ${opacity})`).replace("rgb", "rgba"),
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
    },
  };

  if (isLoading && !dataLoaded) return <PageLoader />;

  return (
    <ScrollView style={[styles.container, { backgroundColor: COLORS.background }]} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.content}>
        <View style={styles.headero}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerAction}>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: COLORS.text }]}>Analytics</Text>
        </View>

        <Animatable.View animation="fadeIn" delay={300} duration={600} style={[styles.totalBox, { backgroundColor: COLORS.card }]}>
          <View style={styles.totalStats}>
            <View style={styles.totalStatItem}>
              <Text style={[styles.totalStatLabel, { color: COLORS.textLight }]}>Total Expenses</Text>
              <Text style={[styles.totalStatAmount, { color: COLORS.expense }]}>
                ${chartData.expenses.reduce((acc, item) => acc + item.amount, 0).toFixed(2)}
              </Text>
            </View>
            <View style={styles.totalstatDivider} />
            <View style={styles.totalStatItem}>
              <Text style={[styles.totalStatLabel, { color: COLORS.textLight }]}>Total Income</Text>
              <Text style={[styles.totalStatAmount, { color: COLORS.income }]}>
                ${chartData.income.reduce((acc, item) => acc + item.amount, 0).toFixed(2)}
              </Text>
            </View>
          </View>
        </Animatable.View>

        <Animatable.View animation="fadeInDown" duration={600} style={[styles.tabContainero]}>
          {["expenses", "income"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && { backgroundColor: COLORS.primary },
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === tab ? "#fff" : COLORS.text },
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={500} key={activeTab} style={{ flex: 1 }}>
          <Text style={[styles.chartTitle, { color: COLORS.text }]}>
            {activeTab === "expenses" ? "Expenses by Category" : "Income by Category"}
          </Text>

          {chartData[activeTab].length > 0 ? (
            <>
              <PieChart
                data={chartData[activeTab]}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                style={styles.chart}
              />

              <BarChart
                data={{
                  labels: chartData[activeTab].map((item) => item.name),
                  datasets: [{ data: chartData[activeTab].map((item) => item.amount) }],
                }}
                width={screenWidth - 40}
                height={250}
                yAxisLabel="$"
                yAxisInterval={1}
                chartConfig={{
                  ...chartConfig,
                  barPercentage: 0.6,
                  fillShadowGradient: activeTab === "expenses" ? COLORS.expense : COLORS.income,
                  fillShadowGradientOpacity: 1,
                  propsForBackgroundLines: {
                    stroke: COLORS.border,
                  },
                }}
                showValuesOnTopOfBars={true}
                fromZero={true}
                verticalLabelRotation={10}
                style={styles.Bar}
              />
            </>
          ) : (
            !isLoading && (
              <Text style={[styles.noDataText, { color: COLORS.textLight }]}>
                No {activeTab} data available
              </Text>
            )
          )}
        </Animatable.View>
      </View>
    </ScrollView>
  );
}
