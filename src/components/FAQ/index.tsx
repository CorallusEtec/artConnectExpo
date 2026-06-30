import { View } from "react-native";
import { Icon, List, Text, useTheme } from "react-native-paper";
import { getFaqCategorias, getFaqPorCategoria } from "./data";
import { style } from "./style";

export function FaqAccordion() {
  const theme = useTheme();
  const categorias = getFaqCategorias();

  return (
    <View style={style.container}>
      {categorias.map((categoria) => (
        <View key={categoria} style={style.categoriaSection}>
          <Text
            variant="labelLarge"
            style={[style.categoriaLabel, { color: theme.colors.primary }]}
          >
            {categoria}
          </Text>

          <List.Section style={style.listSection}>
            {getFaqPorCategoria(categoria).map((item, index) => (
              <List.Accordion
                key={index}
                title={item.pergunta}
                titleNumberOfLines={3}
                titleStyle={[style.pergunta, { color: theme.colors.onSurface }]}
                style={[
                  style.accordion,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.outlineVariant,
                  },
                ]}
                right={({ isExpanded }) => (
                  <Icon
                    source={isExpanded ? "chevron-up" : "chevron-down"}
                    size={22}
                    color={theme.colors.primary}
                  />
                )}
              >
                <List.Item
                  title={item.resposta}
                  titleNumberOfLines={10}
                  titleStyle={[
                    style.resposta,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                  style={{ backgroundColor: theme.colors.inverseOnSurface }}
                />
              </List.Accordion>
            ))}
          </List.Section>
        </View>
      ))}
    </View>
  );
}
