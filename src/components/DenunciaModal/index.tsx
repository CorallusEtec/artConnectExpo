import { TipoDenuncia } from "@/models/enumeration/enumeration";
import { DenunciaSaveRequest } from "@/models/request/DenunciaSaveRequest";
import { useMutateDenuncia } from "@/services/DenunciaService";
import { AppUtils } from "@/utils/AppUtils";
import { denunciaData } from "@/utils/DenunciaUtils";
import { Modal, View } from "react-native";
import {
  Appbar,
  Divider,
  Icon,
  List,
  Text,
  useTheme,
} from "react-native-paper";
import { style } from "./style";

type DenunciaModalProps = {
  tipoDenuncia: TipoDenuncia;
  idRecurso: number;
  visible: boolean;
  toggleVIsible: () => void;
};

export function DenunciaModal({
  visible,
  toggleVIsible,
  idRecurso,
  tipoDenuncia,
}: DenunciaModalProps) {
  const theme = useTheme();
  const getStyle = style(theme);
  const { mutate, isPending } = useMutateDenuncia();
  function sendDenuncia(titulo: string) {
    const denuncia: DenunciaSaveRequest = {
      titulo: titulo,
      idRecurso: idRecurso,
      tipoDenuncia: tipoDenuncia,
    };

    mutate(denuncia);
    toggleVIsible();
  }

  return (
    <>
      <Modal visible={visible} transparent animationType="fade">
        <View style={getStyle.frame}>
          <View style={getStyle.container}>
            <Appbar.Header>
              <Appbar.Action icon="close" onPress={toggleVIsible} />

              <Appbar.Content
                title={
                  <Text variant="bodyMedium" style={getStyle.title}>
                    Denunciar {AppUtils.capitalize(tipoDenuncia)}
                  </Text>
                }
              />
            </Appbar.Header>
            <Text style={getStyle.subtitle} variant="labelMedium">
              Qual o motivo da denuncia?
            </Text>
            <List.Section>
              {denunciaData.motivosDenuncia.map((d) => (
                <View key={d.id}>
                  <List.Item
                    onPress={() => sendDenuncia(d.titulo)}
                    title={<Text variant="labelLarge">{d.titulo}</Text>}
                    right={(props) => (
                      <Icon source="chevron-down" size={22} {...props} />
                    )}
                  />
                  <Divider horizontalInset />
                </View>
              ))}
            </List.Section>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: theme.colors.scrim }} variant="bodySmall">
                Sua denúncia é anônima e será analisada
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
