import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { styles } from "../../assets/styles/home.styles.js";
import { useTransactions } from "../../hooks/useTransactions.js";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { BarChart, PieChart } from "react-native-chart-kit";
import PageLoader from "../../components/PageLoader.jsx";
import { COLORS } from "../../constants/colors.js";
import * as Animatable from 'react-native-animatable';

export default function AnalyticsPage() {
  const { user } = useUser();
  const router = useRouter();
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
      if (amount < 0) {
        expensesByCategory[transaction.category] = 
          (expensesByCategory[transaction.category] || 0) + Math.abs(amount);
      } else {
        incomeByCategory[transaction.category] = 
          (incomeByCategory[transaction.category] || 0) + amount;
      }
    });

    const expenseData = Object.keys(expensesByCategory).map((category) => ({
      name: category,
      amount: expensesByCategory[category],
      color: getRandomColor(),
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    }));

    const incomeData = Object.keys(incomeByCategory).map((category) => ({
      name: category,
      amount: incomeByCategory[category],
      color: getRandomColor(),
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    }));

    setChartData({
      expenses: expenseData,
      income: incomeData
    });
  };

  const getRandomColor = () => {
            const colors = [
          // Teintes pastel/flat (douces mais distinctes)
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
          "#FF9F40", "#8AC24A", "#F06292", "#7986CB", "#E57373",

          // Nouvelles couleurs ajoutées (palette étendue)
          "#BA68C8", // violet doux
          "#4DD0E1", // cyan clair
          "#FFD54F", // jaune doux
          "#81C784", // vert moyen
          "#FF8A65", // orange clair
          "#90CAF9", // bleu pâle
          "#A1887F", // brun/gris
          "#CE93D8", // lavande
          "#FF7043", // orange rouge
          "#AED581", // vert citron

          // Couleurs plus contrastées
          "#D32F2F", // rouge vif
          "#1976D2", // bleu fort
          "#388E3C", // vert foncé
          "#FBC02D", // jaune fort
          "#7B1FA2", // violet foncé
          "#0097A7", // bleu sarcelle
        ];

    return colors[Math.floor(Math.random() * colors.length)];
  };

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  if (isLoading && !dataLoaded) return <PageLoader />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.content}>
        <View style={styles.headero}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerAction}>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Analytics</Text>
        </View>

        <Animatable.View animation="fadeIn" delay={300} duration={600} style={styles.totalBox}>
          <View style={styles.totalStats}>
            <View style={styles.totalStatItem}>
              <Text style={styles.totalStatLabel}>Total Expenses</Text>
              <Text style={styles.totalStatAmount}>
                ${chartData.expenses.reduce((acc, item) => acc + item.amount, 0).toFixed(2)}
              </Text>
            </View>
            <View style={styles.totalstatDivider} />
            <View style={styles.totalStatItem}>
              <Text style={styles.totalStatLabel}>Total Income</Text>
              <Text style={styles.totalStatAmount}>
                ${chartData.income.reduce((acc, item) => acc + item.amount, 0).toFixed(2)}
              </Text>
            </View>
          </View>
        </Animatable.View>

        <Animatable.View animation="fadeInDown" duration={600} style={styles.tabContainero}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "expenses" && styles.activeTab]}
            onPress={() => setActiveTab("expenses")}
          >
            <Text style={[styles.tabText, activeTab === "expenses" && styles.activeTabText]}>
              Expenses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "income" && styles.activeTab]}
            onPress={() => setActiveTab("income")}
          >
            <Text style={[styles.tabText, activeTab === "income" && styles.activeTabText]}>
              Income
            </Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          duration={500}
          key={activeTab}
          style={{ flex: 1 }}
        >
          <Text style={styles.chartTitle}>
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
                  labels: chartData[activeTab].map(item => item.name),
                  datasets: [{
                    data: chartData[activeTab].map(item => item.amount),
                  }],
                }}
                width={screenWidth - 40}
                height={250}
                yAxisLabel="$"
                yAxisInterval={1}
                chartConfig={{
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 2,
                  barPercentage: 0.6,
                  color: (opacity = 1) => activeTab === "expenses"
                    ? `rgba(255, 99, 132, ${opacity})`
                    : `rgba(75, 192, 192, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  fillShadowGradient: activeTab === "expenses" ? "#ff6384" : "#4bc0c0",
                  fillShadowGradientOpacity: 1,
                  propsForBackgroundLines: {
                    stroke: "#e3e3e3",
                  },
                  propsForLabels: {
                    fontSize: 12,
                  },
                }}
                showValuesOnTopOfBars={true}
                fromZero={true}
                verticalLabelRotation={10}
                style={styles.Bar}
              />
            </>
          ) : (
            !isLoading && <Text style={styles.noDataText}>No {activeTab} data available</Text>
          )}
        </Animatable.View>
      </View>
    </ScrollView>
  );
}
