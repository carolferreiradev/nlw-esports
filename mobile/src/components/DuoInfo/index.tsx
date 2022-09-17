import React from "react";
import { View, Text, ColorValue } from "react-native";
import { THEME } from "../../theme";

import { styles } from "./styles";

interface Props {
  label: string;
  value: string;
  colorValue?: ColorValue;
}

export function DuoInfo(props: Props) {
  const { label, value, colorValue = THEME.COLORS.TEXT } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      <Text style={[styles.value, { color: colorValue }]}>{value}</Text>
    </View>
  );
}
