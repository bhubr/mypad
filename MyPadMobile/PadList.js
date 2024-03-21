import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { readPads } from "./api";

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
          renderItem={({ item }) => <Text key={item.id}>{item.title}</Text>}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
