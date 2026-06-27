import { SafeAreaView } from "react-native-safe-area-context";
import { EditPerfilForm } from "./editPerfil/editPerfilForm";
import { style } from "./edit";

export default function EditPerfil() {
  return (
    <SafeAreaView style={style.container}>
      <EditPerfilForm />
    </SafeAreaView>
  );
}