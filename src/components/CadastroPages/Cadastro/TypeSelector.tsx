import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { style } from "./style";

export function TypeSelector({ control, dynamicStyles, primaryColor }: any) {
  return (
    <View style={style.tipoContaContainer}>
      <Text variant="bodyMedium" style={style.tipoContaLabel}>
        Como deseja usar o app?
      </Text>
      <Controller
        name="isArtista"
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={style.tipoContaOptions}>
            <TouchableOpacity
              style={[style.tipoContaOption, !value && dynamicStyles.tipoContaOptionSelected]}
              onPress={() => onChange(false)}
            >
              <View style={style.tipoContaContent}>
                <MaterialCommunityIcons
                  name={!value ? "radiobox-marked" : "radiobox-blank"}
                  size={20}
                  color={!value ? primaryColor : "#9B9B9B"}
                />
                <Text style={!value ? dynamicStyles.optionTextSelected : style.optionText}>
                  Contratante
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[style.tipoContaOption, value && dynamicStyles.tipoContaOptionSelected]}
              onPress={() => onChange(true)}
            >
              <View style={style.tipoContaContent}>
                <MaterialCommunityIcons
                  name={value ? "radiobox-marked" : "radiobox-blank"}
                  size={20}
                  color={value ? primaryColor : "#9B9B9B"}
                />
                <Text style={value ? dynamicStyles.optionTextSelected : style.optionText}>
                  Artista
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}