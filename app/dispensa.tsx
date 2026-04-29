
import dispensa from "@/dados/dispensa";
import { nextIdData } from "@/util/geral";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { Button, Modal, Pressable, SectionList, StyleSheet, Text, TextInput, View } from "react-native";

export default () => {

  const [disp, setDisp] = useState(dispensa);
  const [modalSectionVisible, setModalSectionVisible] = useState(false);
  const [modalItemVisible, setModalItemVisible] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [itemName, setItemName] = useState("");
  const [sectionId, setSectionId] = useState(undefined);
  const [itemId, setItemId] = useState(undefined);

  function addItem() {

    if (itemId != undefined) {
      finishUpdateItem();
      return;
    }

    let nome = itemName.trim();

    if (nome.length > 0) {
      
      const newItem = {
        id: nextIdData(disp),
        name: nome,
        quantity: 0
      }

      setDisp( disp.map( (section) => {
        if (section.id != sectionId) {
          return section;
        } else {
          return (
            {
              id: section.id,
              name: section.name,
              data: [ ...section.data, newItem ]
            }
          );
        }
      }));

      setItemName("");
      setModalItemVisible(false);
    }
  }

  function updateItem(item) {
    setItemId(item.id);
    setItemName(item.name);
    setModalItemVisible(true);
  }

  function finishUpdateItem() {
    let nome = itemName.trim();

    if (itemName.length > 0) {
      
      setDisp( disp.map( (section) => {
        return {
          id: section.id,
          name: section.name,
          data: section.data.map( item => {
            if (item.id == itemId) {
              return {
                id: item.id,
                name: itemName,
                quantity: item.quantity
              }
            } else {
              return item;
            }
          })
        }


      }));

      setItemId(undefined);
      setItemName("");
      setModalItemVisible(false);
    }
  }

  function removeItem(id){
    setDisp( disp.map(section => {
      return {
        id: section.id,
        name: section.name,
        data: section.data.filter( item => item.id != id)
      }
    }));
  }

  function incItem(id) {

    setDisp(disp.map(section => { 
      return {
        id: section.id, 
        name: section.name,  
        data:  section.data.map(it => {
          return {
            id: it.id,
            name: it.name,
            quantity: it.id == id ? it.quantity + 1 : it.quantity
          };
        })
      };
    }));
  }

  function decItem(id) {

    setDisp(disp.map(section => { 
      return {
        id: section.id, 
        name: section.name,  
        data:  section.data.map(it => {
          return {
            id: it.id,
            name: it.name,
            quantity: it.id == id && it.quantity > 0 ? it.quantity - 1 : it.quantity
          };
        })
      };
    }));
  }

  function RenderItem({item}) {

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
        <Text style={{ flex: 1 }}>{item.name}</Text>
        <Button 
          title="-"
          onPress={ () => decItem(item.id) }
        />
        <Text style={{ marginHorizontal: 5 }}>{item.quantity}</Text>
        <Button 
          title="+"
          onPress={ () => incItem(item.id) }
        />
      </View>
    );
  }

  function RenderSection({section}) {
    return ( 
        <View style={{ flexDirection: "row", backgroundColor: "#81E9ED", padding: 10, alignItems: "center" }}>
          <Text style={{ flex: 1,fontWeight: "bold", textAlign: "center" }}>{section.name}</Text>
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
        sections={disp}
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