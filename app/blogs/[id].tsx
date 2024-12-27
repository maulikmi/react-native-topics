import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, Button, StyleSheet } from "react-native";

export default function BlogDetail() {
  const router = useRouter();
  const { id, title, desciption } = useLocalSearchParams(); // Access the dynamic route and query params

  const blog = {
    id,
    title,
    content: desciption,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.content}>{blog.content}</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
});
