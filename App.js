import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers } from "redux";
import MealsNavigator from "./navigation/MealsNavigator";
import mealsReducer from "./store/reducers/mealsReducer";
import { Provider } from "react-redux";

export default function App() {
  const rootReducer = combineReducers({
    meals: mealsReducer,
  });
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
