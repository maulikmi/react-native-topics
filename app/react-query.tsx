import { useQuery } from "@tanstack/react-query";
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const fetchExampleData = async () => {
  const response = await fetch(
    "https://api.github.com/repos/maulik22995/Image-Video-Editor"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const ReactQueryExampleScreen = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["exampleData"],
    queryFn: fetchExampleData,
  });

  if (isLoading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.body}>{data.description}</Text>
      <Text style={styles.body}>👀 {data.subscribers_count}</Text>
      <Text style={styles.body}>✨ {data.stargazers_count}</Text>
      <Text style={styles.body}>🍴 {data.forks_count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
  },
});

export default ReactQueryExampleScreen;
