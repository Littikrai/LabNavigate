import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/action/mealsAction";

const MealDetailScreen = (props) => {
  // เขียนโค้ดเพิ่ม เพื่อดึงอ็อบเจ๊คเมนูอาหารที่ผู้ใช้เลือกเอาไว้
  const MEALS = useSelector((state) => state.meals.meals);

  const mealId = props.navigation.getParam("id");
  const meal = MEALS.find((mea) => mea.id === mealId);

  const currentMealIsFav = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({
      toggleFav: toggleFavoriteHandler,
    });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFav });
  }, [currentMealIsFav]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={{ uri: meal.imageUrl }}
          style={styles.bgImage}
        ></ImageBackground>
        <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
          <Text>{meal.duration}m</Text>
          <Text>{meal.complexity.toUpperCase()}</Text>
          <Text>{meal.affordability.toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>Ingredients</Text>
        {meal.ingredients.map((ingre, index) => (
          <Text style={styles.subtext}>{ingre}</Text>
        ))}
        <Text style={styles.title}>Steps</Text>
        {meal.steps.map((ingre, index) => (
          <Text style={styles.subtext}>
            {index + 1} {ingre}
          </Text>
        ))}
        <Button
          title="Go Back to Categories"
          onPress={() => {
            // เขียนโค้ดเพิ่ม
            props.navigation.navigate("S1");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  // เขียนโค้ดเพิ่มเพื่อแสดงชื่อเมนูอาหารที่เลือกให้เป็นเฮดเดอร์
  const selectedMeal = navigationData.navigation.getParam("mealTitle");
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  const isFavorite = navigationData.navigation.getParam("isFav");
  return {
    headerTitle: selectedMeal,
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={isFavorite ? "ios-star" : "ios-star-outline"}
            onPress={toggleFavorite}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  mealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: 25,
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: 35,
  },
  bgImage: {
    width: "100%",
    height: 300,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
  },
  subtext: {
    margin: 5,
  },
});

export default MealDetailScreen;
