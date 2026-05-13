import { Stack } from "expo-router"

export default () => {

    return (
        <Stack
            initialRouteName="(tabs)"
        >
            
            <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="adicionaSecao"
                options={{ presentation: "modal" }}
            />
        </Stack>
    )

}