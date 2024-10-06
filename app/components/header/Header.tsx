/* eslint-disable prettier/prettier */
import React from "react"
import { Dimensions, StyleSheet, Text, TextStyle, TouchableOpacity, View } from "react-native"
import { ramarajaReguler } from "../../assets/fonts/FontFamily";
const { width } = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;
const height = windowHeight > 728 ? 728 : windowHeight;

type Props = {
  ImgBack?: any
  ImgMiddle?: any
  TxtMiddle?: string
  customStyleTitle?: TextStyle
  ImgOptional?: any
  onBackPress?: any
  onMidlePress?: any
  onOptionPress?: any
  notch?: boolean
  preview?: boolean
}

export const Header = ({
  ImgBack,
  ImgMiddle,
  TxtMiddle,
  customStyleTitle,
  ImgOptional,
  onBackPress,
  onOptionPress,
  onMidlePress,
  notch,
  preview
}: Props) => {
  return (
    <View style={[styles.container1]}>
      <View style={{ width: "20%" }}>
        <TouchableOpacity
          onPress={onBackPress ?? null}
          style={{ width: 32, marginVertical: height*0.02 }}
        >
          {ImgBack && <ImgBack />}
        </TouchableOpacity>
      </View>
      <View style={{ width: "60%", alignItems: "center", marginBottom: notch ? "-25%" : "0%" }}>
        <TouchableOpacity
          onPress={onMidlePress ?? null}
          disabled={!onMidlePress}
        >
          {ImgMiddle && <ImgMiddle />}
          {TxtMiddle && <Text style={[styles.textTitle, customStyleTitle]}>{TxtMiddle}</Text>}
        </TouchableOpacity>
      </View>
      <View style={{ width: "20%" }}>
        <TouchableOpacity
          onPress={onOptionPress ?? null}
          style={{ width: 32, alignSelf: "flex-end", marginRight: "15%" }}
        >
          {ImgOptional && <ImgOptional />}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center",
    width: "100%",
    zIndex: 9999,
  },
  container1: {
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center",
    width: "100%",
    zIndex: 9999,
    paddingHorizontal: 16,
  },
  textTitle: {
    // fontFamily: nunito700,
    fontFamily:ramarajaReguler,
    fontSize: height*0.03,
    color: "#374151",
    textAlign: "center",
  },
})
