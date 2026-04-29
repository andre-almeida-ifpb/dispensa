import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';
import { SectionList, Text, View } from "react-native";

const dispensa = [
  {
    id: 1,
    name: "Frios e Laticínios",
    data: [
      {
        id: 1,
        name: "Iogurte",
        quantity: 0
      },
      {
        id: 2,
        name: "Leite",
        quantity: 0
      },
      {
        id: 3,
        name: "Queijo",
        quantity: 0
      },
    ]
  },
  {
    id: 2,
    name: "Limpeza",
    data: [
      {
        id: 4,
        name: "Desinfetante",
        quantity: 0
      },
      {
        id: 5,
        name: "Detergente",
        quantity: 0
      },
      {
        id: 6,
        name: "Sabão em pó",
        quantity: 0
      },
    ]
  }
];

export default () => {

  const [isChecked, setChecked] = useState(false);

  return (
    <SectionList
      sections={dispensa}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ flexDirection: "row", backgroundColor: "#F0F0F0", padding: 10, alignItems: "center" }}>
          <Checkbox value={isChecked} onValueChange={setChecked} style={{marginRight: 10}} />
          <Text style={{ flex: 1 }}>{item.name}</Text>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View style={{ flexDirection: "row", backgroundColor: "#81E9ED", padding: 10, alignItems: "center" }}>
          <Text style={{ flex: 1,fontWeight: "bold", textAlign: "center" }}>{section.name}</Text>
        </View>
      )}
    />
  );
}
