import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Signin from "./Signin";
import PadList from "./PadList";

function DismissibleError({ error, onDismiss }) {
  return (
    <View style={styles.error}>
      <Text>{error.message}</Text>
      <Button title="Dismiss" onPress={onDismiss} />
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  return (
    <View style={styles.container}>
      {error && (
        <DismissibleError error={error} onDismiss={() => setError(null)} />
      )}
      {!user ? (
        <Signin setUser={setUser} setError={setError} />
      ) : (
        <>
          <Text>User: {user.email}</Text>
          <PadList jwt={user.jwt} setError={setError} />
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
