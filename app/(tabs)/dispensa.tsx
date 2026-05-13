
import { IItemDispensa, ISecao, useDispensa } from "@/contextos/ContextoDispensa";
import { nextIdItem } from "@/util/geral";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { Button, Modal, Pressable, SectionList, StyleSheet, Text, TextInput, View } from "react-native";

export default () => {

  const { dispensa, dispatch } = useDispensa();

  const [modalSectionVisible, setModalSectionVisible] = useState<boolean>(false);
  const [modalItemVisible, setModalItemVisible] = useState<boolean>(false);
  const [sectionName, setSectionName] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [sectionId, setSectionId] = useState<number | undefined>(undefined);
  const [itemId, setItemId] = useState<number | undefined>(undefined);

  function addItem() {

    if (itemId != undefined) {
      finishUpdateItem();
      return;
    }

    let nome: string = itemName.trim();

    if (nome.length > 0) {
      
      const newItem: IItemDispensa = {
        id: nextIdItem(dispensa),
        nome: nome,
        qtdDispensa: 0,
        qtdLista: 0,
        comprado: false
      }

      dispatch({ type: 'ADICIONAR_ITEM', payload: { secaoId: sectionId, item: newItem } });

      setSectionId(undefined);
      setItemName("");
      setModalItemVisible(false);
    }
  }

  function updateItem(item: IItemDispensa) {
    setItemId(item.id);
    setItemName(item.nome);
    setModalItemVisible(true);
  }

  function finishUpdateItem() {
    let nome: string = itemName.trim();

    if (itemName.length > 0) {
      
      // setDisp( disp.map( (section) => {
      //   return {
      //     id: section.id,
      //     nome: section.nome,
      //     data: section.data.map( item => {
      //       if (item.id == itemId) {
      //         return {
      //           id: item.id,
      //           nome: itemName,
      //           qtdDispensa: item.qtdDispensa,
      //           qtdLista: item.qtdLista
      //         }
      //       } else {
      //         return item;
      //       }
      //     })
      //   }


      // }));

      setItemId(undefined);
      setItemName("");
      setModalItemVisible(false);
    }
  }

  function removeItem(id: number){

    dispatch({ type: 'REMOVER_ITEM', payload: { itemId: id } });
  }

  function incItem(id: number) {

    dispatch({ type: 'INCREMENTAR_QTD_DISPENSA', payload: { itemId: id } });
  }

  function decItem(id: number) {

    dispatch({ type: 'DECREMENTAR_QTD_DISPENSA', payload: { itemId: id } });    
  }

  function RenderItem({item}: {item: IItemDispensa}) {

    return (
      <View style={{ flexDirection: "row", backgroundColor: "#F0F0F0", padding: 10, alignItems: "center" }}>
        <Pressable
          onPress={ () => updateItem(item) }
        >
          <MaterialIcons name="edit" size={16} color="black"/>
        </Pressable>
        <Pressable
          onPress={ () => removeItem(item.id) }
        >
          <FontAwesome name="trash" size={16} color="black" style={{ marginHorizontal: 5 }}/>
        </Pressable>
        <Text style={{ flex: 1 }}>{item.nome}</Text>
        <Button 
          title="-"
          onPress={ () => decItem(item.id) }
        />
        <Text style={{ marginHorizontal: 5 }}>{item.qtdDispensa}</Text>
        <Button 
          title="+"
          onPress={ () => incItem(item.id) }
        />
      </View>
    );
  }

  function RenderSection({section}: {section: ISecao}) {
    return ( 
        <View style={{ flexDirection: "row", backgroundColor: "#81E9ED", padding: 10, alignItems: "center" }}>
          <Text style={{ flex: 1,fontWeight: "bold", textAlign: "center" }}>{section.nome}</Text>
          <Button 
            title="+"
            onPress={ () => {setModalItemVisible(true); setSectionId(section.id)} }
          />
        </View>
    );
  }

  return (
    <View
      style={{ flex: 1}}
    >
      <SectionList
        sections={dispensa}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RenderItem item={item}/> }
        renderSectionHeader={({ section }) => <RenderSection section={section}/>}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSectionVisible}
        onRequestClose={ () => {
          setModalSectionVisible(false);
        }}
      > 
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <TextInput
              placeholder="Digite o nome da Seção"
              value={sectionName}
              onChangeText={ (novoValor) => setSectionName(novoValor) }
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalItemVisible}
        onRequestClose={ () => {
          setModalItemVisible(false);
        }}
      > 
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <TextInput
              placeholder="Digite o nome do item"
              value={itemName}
              onChangeText={ (novoValor) => setItemName(novoValor) }
              style={styles.caixaTextoItem}
            />
            <View style={{flexDirection: "row"}}>
              <Button
                title="Cancelar"
                onPress={ () => setModalItemVisible(false) }
              />
              <View style={{width: 10}} />
              <Button
                title="Salvar"
                onPress={addItem}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
 
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '95%',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  caixaTextoItem: {
    marginBottom: 20,
    padding: 10,
    width: '100%'
  }

});