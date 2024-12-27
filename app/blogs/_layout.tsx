import { Slot, Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

// export default function BlogLayout() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Blog</Text>
//       <Slot />
//     </View>
//   );
// }

export default function BlogsLayout() {
    return (
      <Stack>
        {/* Define options for the blogs layout */}
        <Stack.Screen
          name="index"
          options={{
            title: 'Blog List',
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            title: 'Blog Details',
          }}
        />
      </Stack>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
