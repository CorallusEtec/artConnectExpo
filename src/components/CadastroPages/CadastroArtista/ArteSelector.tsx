import { ArteResponse } from "@/models/response/ArteResponse";
import { style } from "./style";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Chip, Divider, IconButton, List, Text } from "react-native-paper";

export function ArteSelector({ data, arte, expanded, setExpanded, selectArte }: any) {
  return (
    <>
      <View style={style.section}>
        <View style={style.sectionHeader}>
          <Text variant="titleMedium">
            {arte ? "Arte selecionada" : "Selecione uma arte"}
          </Text>
          <IconButton
            icon={expanded ? "chevron-up" : "chevron-down"}
            onPress={() => setExpanded((p: any) => !p)}
          />
        </View>

        {expanded && (
          <View style={style.card}>
            <FlatList
              data={data?.data.content || []}
              keyExtractor={(item: ArteResponse) => String(item.id)}
              ItemSeparatorComponent={() => <Divider />}
              renderItem={({ item }: { item: ArteResponse }) => {
                const selected = arte?.id === item.id;
                return (
                  <TouchableOpacity onPress={() => selectArte(selected ? undefined : item)}>
                    <List.Item
                      title={item.nomeArte}
                      right={selected ? (props) => <List.Icon {...props} icon="check" /> : undefined}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </View>

      {arte && (
        <View style={style.chipSection}>
          <Chip icon="palette" onClose={() => selectArte(undefined)}>
            {arte.nomeArte}
          </Chip>
        </View>
      )}
    </>
  );
}