import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { signin } from "./api";

export default function Signin({ setUser, setError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async () => {
    try {
      const user = await signin(email, password);
      console.log(user);
      setUser(user);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };
  return (
    <View>
      <Text>Signin</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Signin" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 200
  },
});
