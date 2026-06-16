import { style } from "@/style/pages/(home)/(private)/edit";
import { View } from "react-native";
import { FormField } from "./FormField";
import { FormPerfil } from "./useEditPerfil";

type Props = {
  form: FormPerfil;
  onChange: (campo: keyof FormPerfil, valor: string) => void;
};

export function EnderecoFields({ form, onChange }: Props) {
  return (
    <>
      <FormField
        label="Logradouro"
        placeholder="Nome do logradouro"
        value={form.nomeLog}
        onChangeText={(text) => onChange("nomeLog", text)}
      />

      <View style={style.linha}>
        <View style={{ flex: 2 }}>
          <FormField
            label="Número"
            placeholder="Número"
            keyboardType="numeric"
            value={form.numLog}
            onChangeText={(text) => onChange("numLog", text)}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <FormField
            label="CEP"
            placeholder="CEP"
            keyboardType="numeric"
            value={form.cep}
            onChangeText={(text) => onChange("cep", text)}
          />
        </View>
      </View>

      <FormField
        label="Bairro"
        placeholder="Bairro"
        value={form.bairro}
        onChangeText={(text) => onChange("bairro", text)}
      />

      <FormField
        label="Complemento"
        placeholder="Complemento"
        value={form.complemento}
        onChangeText={(text) => onChange("complemento", text)}
      />

      <View style={style.linha}>
        <View style={{ flex: 2 }}>
          <FormField
            label="Cidade"
            placeholder="Cidade"
            value={form.cidade}
            onChangeText={(text) => onChange("cidade", text)}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <FormField
            label="UF"
            placeholder="UF"
            value={form.uf}
            onChangeText={(text) => onChange("uf", text)}
          />
        </View>
      </View>
    </>
  );
}