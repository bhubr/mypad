import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Pressable, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";

import Signin from "./Signin";
import PadList from "./PadList";

async function save(key, value) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

async function saveUser(user) {
  const { id, jwt, jwtExpiresAt, ...rest } = user;
  await save("user", { id, jwt, jwtExpiresAt });
}

async function load(key) {
  const stored = await SecureStore.getItemAsync(key);
  // console.log(">> stored at key", key, ">>", stored);
  return stored ? JSON.parse(stored) : null;
}

async function loadUser() {
  const user = await load("user");
  // console.log(">> user", user);
  if (!user) return null;
  if (Date.now() > user.jwtExpiresAt) return null;
  return user;
}

function CustomButton({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
        },
        styles.button,
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

function DismissibleError({ error, onDismiss }) {
  return (
    <View style={styles.error}>
      <Text>{error.message}</Text>
      <CustomButton onPress={onDismiss}>
        <Text>X</Text>
      </CustomButton>
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser().then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const setAndStoreUser = async (user) => {
    await saveUser(user);
    setUser(user);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("user");
    setUser(null);
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && (
        <DismissibleError error={error} onDismiss={() => setError(null)} />
        )}
      {!user ? (
        <Signin setUser={setAndStoreUser} setError={setError} />
        ) : (
          <>
          <Button title="Logout" onPress={logout} />
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
  error: {
    borderColor: "red",
    backgroundColor: '#fdd',
    padding: 10,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "transparent",
    marginLeft: 10,
  }
});
