import { DispensaProvider } from '@/contextos/ContextoDispensa';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router, Tabs } from "expo-router";
import { Button, View } from 'react-native';

export default function RootLayout() {
 
  return (
    <DispensaProvider>

      <Tabs>
        <Tabs.Screen 
          name="index" 
          options={{ 
            title: "Compra",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome6 
                name="list-check" 
                size={24} 
                color="black" 
              />
            ),
          }} 
        />

        <Tabs.Screen 
          name="lista" 
          options={{ 
            title: "Lista",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome6 
                name="clipboard-list" 
                size={24} 
                color="black" />
            ),
          }} />

        <Tabs.Screen 
          name="dispensa"
          options={{ 
            title: "Dispensa",
            headerRight: () => (
              <View style={{ paddingRight: 12 }} >
                <Button 
                  title="+" 
                  onPress={() => router.push('/adicionaSecao')}
                />
              </View>),
            tabBarIcon: ({ color, focused }) => (
              <Feather 
                name="list" 
                size={24} 
                color="black" />
            ),
          }} 
        />

      </Tabs>
    </DispensaProvider>
  );
}
