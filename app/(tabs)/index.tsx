import { useDispensa } from '@/contextos/ContextoDispensa';
import { Checkbox } from 'expo-checkbox';
import { SectionList, Text, View } from "react-native";

export default () => {

  const { dispensa, dispatch } = useDispensa();

  function inverteComprado(id: number) {

    dispatch({ type: 'INVERTER_COMPRADO', payload: { itemId: id } });
  }

  function RenderItem({ item }: { item: any }) {
    if (item.qtdLista > 0) {
      return (
        <View style={{ flexDirection: "row", backgroundColor: "#F0F0F0", padding: 10, alignItems: "center" }}>
          <Checkbox value={item.comprado} onValueChange={() => inverteComprado(item.id)} style={{marginRight: 10}} />
          <View style={{ backgroundColor: "#0000FF", padding: 5, borderRadius: 40, marginRight: 10 }}>
            <Text style={{color: 'white'}}>{item.qtdLista}</Text>
          </View>      
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
