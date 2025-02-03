import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{animation: 'fade'}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movies/[id]" options={{headerShown: false}} />
      <Stack.Screen name="movies/popular" options={{title: "Popular Movies"}} />
      <Stack.Screen name="movies/upComing" options={{ title: "New Showing" }} />
      <Stack.Screen name="series/[id]" options={{ headerShown: false }} />
    </Stack>
  )
}
