import { useDispensa } from "@/contextos/ContextoDispensa";
import { Button, SectionList, Text, View } from "react-native";

export default () => {
  const { dispensa, dispatch } = useDispensa();

  function incItem(id: number) {

    dispatch({ type: 'INCREMENTAR_QTD_LISTA', payload: { itemId: id } });
  }

  function decItem(id: number) {

    dispatch({ type: 'DECREMENTAR_QTD_LISTA', payload: { itemId: id } });    
  }

  function RenderItem({ item }: { item: any }) {
    return (
      <View style={{ flexDirection: "row", backgroundColor: item.qtdLista > 0 ? '#8ff6f7' : '#F0F0F0', padding: 10, alignItems: "center" }}>
          <View style={{ backgroundColor: "#0000FF", padding: 5, borderRadius: 40, marginRight: 10 }}>
            <Text style={{color: 'white'}}>{item.qtdDispensa}</Text>
          </View>
          <Text style={{ flex: 1 }}>{item.nome}</Text>
          <Button 
            title="-" 
            onPress={() => decItem(item.id)}
          />
          <Text style={{ marginHorizontal: 5 }}>{item.qtdLista}</Text>
          <Button   
            title="+"
            onPress={() => incItem(item.id)}
          />
        </View>
    );
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
