import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { readPads } from "./api";

/**
 * Show the 2 first lines'40 first characters of a pad's content.
 */
const makeExcerpt = ({ content }) =>
  content
    .split("\n")
    .slice(0, 2)
    .map((l) => l.slice(0, 40))
    .join("\n");

export default function PadList({ jwt, setError }) {
  const [pads, setPads] = useState(null);

  useEffect(() => {
    readPads({ jwt }).then(setPads).catch(setError);
  }, [jwt]);

  return (
    <View>
      {pads ? (
        <FlatList
          data={pads}
          renderItem={({ item }) => (
            <View key={item.id}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemExcerpt}>{makeExcerpt(item)}</Text>
            </View>
          )}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemTitle: {
    fontWeight: "bold",
  },
  itemExcerpt: {
    color: "gray",
  },
});
