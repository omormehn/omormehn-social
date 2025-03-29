import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from 'expo-linear-gradient';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get("window");

interface CustomTabBarProps extends BottomTabBarProps {
  iconPaths: {
    [key: string]: { active: any; inactive: any };
  };
}

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
  iconPaths,
}: CustomTabBarProps) => {
  return (
    <View style={styles.container}>

      <Svg width={width} height={70} viewBox={`0 0 ${width} 70`}>
        <Path fill="white" d={`M0,0 H${width} V50 Q${width / 2},90 0,50 Z`} />
      </Svg>

      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => navigation.navigate(route.name);

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
            >
              <View className="bg- size-10">
                <Image
                  source={isFocused ? iconPaths[route.name]?.active : iconPaths[route.name]?.inactive}
                  style={{ width: 24, height: 24, tintColor: isFocused ? "#6C63FF" : "#BDBDBD" }}
                />
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Floating Button */}
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => console.log("Add Pressed")}
        >
          <LinearGradient
            colors={['#5151C6', '#888BF4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 14, 
              width: 60, 
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
            }}
          >
            <View style={styles.plusButton}>
              <Icon name="plus" size={20} color={'#5151C6'} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  tabContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabButton: {
    padding: 10,
  },
  floatingButton: {
    position: "absolute",
    top: -40,
    left: 162,
  },
  plusButton: {
    width: 25,
    height: 25,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default CustomTabBar;
