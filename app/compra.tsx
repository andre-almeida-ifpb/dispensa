import { useDispensa } from '@/contextos/ContextoDispensa';
import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';
import { SectionList, Text, View } from "react-native";

export default () => {

  const { dispensa, dispatch } = useDispensa();
  const [isChecked, setChecked] = useState(false);

  function RenderItem({ item }: { item: any }) {
    if (item.qtdLista > 0) {
      return (
        <View style={{ flexDirection: "row", backgroundColor: "#F0F0F0", padding: 10, alignItems: "center" }}>
          <Checkbox value={isChecked} onValueChange={setChecked} style={{marginRight: 10}} />
          <Text style={{ flex: 1 }}>{item.nome}</Text>
        </View>
      );
    } else {
      return false;
    }
  }

  function RenderSection({ section }: { section: any }) {
    return (
      <View style={{ flexDirection: "row", backgroundColor: "#81E9ED", padding: 10, alignItems: "center" }}>
        <Text style={{ flex: 1,fontWeight: "bold", textAlign: "center" }}>{section.nome}</Text>
      </View>
    );
  }

  return (
    <SectionList
      sections={dispensa}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <RenderItem item={item} />}
      renderSectionHeader={({ section }) => <RenderSection section={section} />}
    />
  );
}
