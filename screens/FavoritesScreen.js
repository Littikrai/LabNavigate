import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import MealList from "../components/MealList";
import { MEALS } from "../data/dummy-data";

const FavMeals = MEALS.filter((meal) => meal.id === "m1" || meal.id === "m2");
const FavoritesScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.screen}>
        <MealList listData={FavMeals} navigation={props.navigation} />
      </View>
    </View>
  );
};

FavoritesScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Your Favorites",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
