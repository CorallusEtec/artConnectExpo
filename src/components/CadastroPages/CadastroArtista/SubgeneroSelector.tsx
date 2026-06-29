import { GeneroArteResponse } from "@/models/response/GeneroArteResponse";
import { style } from "./style";
import { View } from "react-native";
import { Chip, Text } from "react-native-paper";

export function SubgeneroSelector({ arte, generoData, generosArte, toggleGenero }: any) {
  if (!arte) return null;

  return (
    <View style={style.section}>
      <Text variant="titleMedium" style={{ marginBottom: 10 }}>
        Subgêneros
      </Text>

      {generoData?.data?.length ? (
        <View style={style.chipWrap}>
          {generoData.data.map((item: GeneroArteResponse) => {
            const selected = generosArte.some((g: GeneroArteResponse) => g.id === item.id);
            return (
              <Chip
                key={item.id}
                selected={selected}
                onPress={() => toggleGenero(item)}
                mode="outlined"
                style={{ margin: 4 }}
              >
                {item.nomeGeneroArte}
              </Chip>
            );
          })}
        </View>
      ) : (
        <Text style={{ opacity: 0.6 }}>
          Nenhum subgênero disponível para essa arte
        </Text>
      )}
    </View>
  );
}