import { fetchBlogsStart } from "@/redux/blogSlice";
import { RootState } from "@/redux/store";
import { fetchBlogs } from "@/redux/thunk";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function BlogList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector(
    (state: RootState) => state.blogs
  );

  useEffect(() => {
    dispatch(fetchBlogsStart());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.blogItem}>
            <Text style={styles.blogTitle}>{item.title}</Text>
            <Button
              title="Read More"
              onPress={() =>
                router.push({
                  pathname: `/blogs/${item.id}`,
                  params: { title: item.title, desciption: item.content },
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blogItem: {
    marginBottom: 20,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
