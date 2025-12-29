import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

export default function TrainerCalendarScreen() {
  const [selectedDate, setSelectedDate] = useState("2025-01-10");

  const sessions = {
    "2025-01-10": [
      { id: "1", time: "06:00 AM", client: "Amit", type: "Weight Training" },
      { id: "2", time: "07:30 AM", client: "Ravi", type: "Cardio" },
    ],
    "2025-01-12": [{ id: "3", time: "06:30 PM", client: "Sneha", type: "HIIT" }],
  };

  const markedDates = useMemo(() => {
    const dots = Object.keys(sessions).reduce((acc, date) => {
      acc[date] = { marked: true, dotColor: "#22c55e" };
      return acc;
    }, {});

    return {
      ...dots,
      [selectedDate]: {
        selected: true,
        selectedColor: "#1d4ed8",
        selectedTextColor: "#ffffff",
        marked: !!sessions[selectedDate]?.length,
        dotColor: "#22c55e",
      },
    };
  }, [selectedDate]);

  const daySessions = sessions[selectedDate] || [];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Ionicons name="calendar-outline" size={18} color="#93c5fd" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Training Schedule</Text>
              <Text style={styles.headerSub}>
                Selected: {selectedDate} • {daySessions.length} sessions
              </Text>
            </View>
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.calendarWrap}>
          <Calendar
            current={selectedDate}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            enableSwipeMonths
            theme={{
              backgroundColor: "#0f172a",
              calendarBackground: "#0f172a",

              monthTextColor: "#e5e7eb",
              textMonthFontWeight: "900",
              textMonthFontSize: 16,

              dayTextColor: "#cbd5e1",
              textDayFontWeight: "700",
              textDayFontSize: 13,

              todayTextColor: "#f87171",
              selectedDayTextColor: "#ffffff",

              arrowColor: "#93c5fd",
              textDisabledColor: "#334155",

              // OPTIONAL: header styling on some platforms
              // stylesheet is internal, so keep theme minimal for web compatibility
            }}
            style={styles.calendar}
          />
        </View>

        {/* Sessions */}
        <View style={styles.sessionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sessions</Text>
            <Text style={styles.sectionMeta}>{selectedDate}</Text>
          </View>

          {daySessions.length ? (
            <FlatList
              data={daySessions}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 16 }}
              renderItem={({ item }) => (
                <View style={styles.sessionCard}>
                  <View style={styles.accentBar} />

                  <View style={styles.timeChip}>
                    <Ionicons name="time-outline" size={14} color="#93c5fd" />
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>

                  <View style={styles.sessionInfo}>
                    <Text style={styles.client} numberOfLines={1}>
                      {item.client}
                    </Text>
                    <Text style={styles.type} numberOfLines={1}>
                      {item.type}
                    </Text>
                  </View>

                  <Ionicons name="chevron-forward" size={18} color="#475569" />
                </View>
              )}
            />
          ) : (
            <View style={styles.emptyWrap}>
              <View style={styles.emptyIcon}>
                <Ionicons name="calendar-clear-outline" size={22} color="#94a3b8" />
              </View>
              <Text style={styles.noSession}>No sessions scheduled</Text>
              <Text style={styles.noSessionSub}>Pick another date to view sessions.</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },
  container: { flex: 1, backgroundColor: "#020617" },

  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    backgroundColor: "#020617",
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "900" },
  headerSub: { color: "#94a3b8", fontSize: 12, fontWeight: "700", marginTop: 4 },

  calendarWrap: { padding: 12 },
  calendar: {
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1e293b",

    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },

  sessionContainer: { flex: 1, paddingHorizontal: 16, paddingTop: 6 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
  },
  sectionTitle: { color: "#e5e7eb", fontSize: 15, fontWeight: "900" },
  sectionMeta: { color: "#64748b", fontSize: 12, fontWeight: "800" },

  sessionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1e293b",

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  accentBar: { width: 4, height: 44, borderRadius: 999, backgroundColor: "#22c55e" },

  timeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  timeText: { color: "#e5e7eb", fontSize: 12, fontWeight: "900" },

  sessionInfo: { flex: 1 },
  client: { color: "#fff", fontSize: 14, fontWeight: "900" },
  type: { color: "#94a3b8", fontSize: 12, fontWeight: "700", marginTop: 4 },

  emptyWrap: { marginTop: 18, alignItems: "center", padding: 16 },
  emptyIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    marginBottom: 12,
  },
  noSession: { color: "#e5e7eb", fontWeight: "900", fontSize: 14 },
  noSessionSub: { color: "#64748b", fontWeight: "800", fontSize: 12, marginTop: 6 },
});
