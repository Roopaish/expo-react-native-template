import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      return response.json();
    },
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <SafeAreaView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <Text className="text-white text-3xl font-bold">Hey</Text>
          <HelloWave />
        </ThemedView>

        <View>
          {data?.map((product: any) => (
            <View>
              <Image
                source={{ uri: product.image }}
                className="w-full aspect-square"
              />
              <Text key={product.id} className="text-white">
                {product.title}
              </Text>
            </View>
          ))}
        </View>

        <Pressable className="p-4 rounded-md bg-white flex items-center justify-center active:bg-red-400 active:scale-105">
          <Text className="text-black text-2xl font-bold">Click me</Text>
        </Pressable>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>
            Edit{" "}
            <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
            to see changes. Press{" "}
            <ThemedText type="defaultSemiBold">
              {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
            </ThemedText>{" "}
            to open developer tools.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          <ThemedText>
            Tap the Explore tab to learn more about what's included in this
            starter app.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            When you're ready, run{" "}
            <ThemedText type="defaultSemiBold">
              npm run reset-project
            </ThemedText>{" "}
            to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
            directory. This will move the current{" "}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText>
        </ThemedView>
      </SafeAreaView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
