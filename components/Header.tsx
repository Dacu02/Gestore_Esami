import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { primary_color, secondary_color, tertiary_color } from "../global";
import { rapportoOrizzontale, rapportoVerticale } from "../global";


interface HeaderProps{
    title?: string;
    leftIcon?: any;
    rightIcon?: any;
    onPressLeft?: () => void;
    onPressRight?: () => void;
    scuro?: boolean;
    icon?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title = '',
  leftIcon,
  rightIcon,
  onPressLeft = () => {},
  onPressRight = () => {},
  scuro = false,
  icon = false
}) => {
  const style = StyleSheet.create({
    header: {
      backgroundColor: primary_color(scuro),
      alignItems: 'center',
      paddingTop: rapportoVerticale(10),
      borderBottomWidth: 3,
      paddingBottom: rapportoVerticale(5),
      borderColor: secondary_color,
      display: "flex",
      flexDirection: "column",
    },
    testo: {
      fontSize: 22,
      marginTop: rapportoVerticale(5),
      color: tertiary_color(scuro),
      textAlign: "center",
    },
    headerInside: {
      backgroundColor: primary_color(scuro),
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: rapportoOrizzontale(20),
    }
  });

  return (
    <View style={style.header}>
      {icon && <FontAwesomeIcon size={60} icon={faGraduationCap} color={secondary_color} />}
      <View style={style.headerInside}>
        {leftIcon ? (
          <TouchableOpacity onPress={onPressLeft}>
            <FontAwesomeIcon size={30} icon={leftIcon} color={secondary_color} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 30 }} />
        )}
        {title && <Text style={style.testo}>{title}</Text>}
        {rightIcon ? (
          <TouchableOpacity onPress={onPressRight}>
            <FontAwesomeIcon size={30} icon={rightIcon} color={secondary_color} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 30 }} />
        )}
      </View>
    </View>
  );
};

export default Header;
