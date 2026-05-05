import dispensa from "@/dados/dispensa";
import { Button, SectionList, Text, View } from "react-native";

export default () => {
  return (
    <SectionList
      sections={dispensa}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ flexDirection: "row", backgroundColor: "#F0F0F0", padding: 10, alignItems: "center" }}>
          <View style={{ backgroundColor: "#0000FF", padding: 5, borderRadius: 40, marginRight: 10 }}>
            <Text style={{color: 'white'}}>{item.qtdDispensa}</Text>
          </View>
          <Text style={{ flex: 1 }}>{item.nome}</Text>
          <Button title="-"/>
          <Text style={{ marginHorizontal: 5 }}>{item.qtdLista}</Text>
          <Button title="+"/>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View style={{ flexDirection: "row", backgroundColor: "#81E9ED", padding: 10, alignItems: "center" }}>
          <Text style={{ flex: 1,fontWeight: "bold", textAlign: "center" }}>{section.nome}</Text>
        </View>
      )}
    />
  );
}
