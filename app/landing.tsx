import { useRouter } from "expo-router";
import { useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const LandingScreen = () => {
  const router = useRouter();

  const openTabs = useCallback(() => {
    router.navigate("/(tabs)");
  }, []);

  const openTabsExplore = useCallback(() => {
    router.navigate("/(tabs)/explore");
  }, []);

  const openBlogs = useCallback(() => {
    router.navigate("/blogs");
  }, []);

  const openARScreen = useCallback(() => {
    router.navigate("/ar-exploring");
  }, []);

  const openReactQuery = useCallback(() => {
    router.navigate("/react-query");
  }, []);

  const openBluetoothScreen = useCallback(() => {
    router.navigate("/blutooth");
  }, []);



  return (
    <View style={styles.container}>
      <ButtonComponent onPress={openTabs} title="Tabs" />
      <ButtonComponent onPress={openTabsExplore} title="Tabs/Explore" />
      <ButtonComponent onPress={openBlogs} title="Blogs" />
      <ButtonComponent onPress={openARScreen} title="ARExploring" />
      <ButtonComponent onPress={openReactQuery} title="React-query" />
      <ButtonComponent onPress={openBluetoothScreen} title="Blutooth" />
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    margin: 10,
  },
});

export const ButtonComponent = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <View style={styles.buttonStyle}>
      <Button onPress={onPress} title={title} />
    </View>
  );
};
