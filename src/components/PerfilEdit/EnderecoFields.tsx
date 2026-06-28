import { View } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormField } from "./FormField";
import { style } from "./edit";
import { PerfilFormData } from "./editPerfil/validation";

type EnderecoFieldsProps = {
  control: Control<PerfilFormData>;
};

export function EnderecoFields({ control }: EnderecoFieldsProps) {
  return (
    <>
      <Controller
        control={control}
        name="nomeLog"
        render={({ field: { onChange, value } }) => (
          <FormField
            label="Logradouro"
            placeholder="Nome do logradouro"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <View style={style.linha}>
        <View style={{ flex: 2 }}>
          <Controller
            control={control}
            name="numLog"
            render={({ field: { onChange, value } }) => (
              <FormField
                label="Número"
                placeholder="Número"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Controller
            control={control}
            name="cep"
            render={({ field: { onChange, value } }) => (
              <FormField
                label="CEP"
                placeholder="CEP"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
      </View>

      <Controller
        control={control}
        name="bairro"
        render={({ field: { onChange, value } }) => (
          <FormField
            label="Bairro"
            placeholder="Bairro"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="complemento"
        render={({ field: { onChange, value } }) => (
          <FormField
            label="Complemento"
            placeholder="Complemento"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <View style={style.linha}>
        <View style={{ flex: 2 }}>
          <Controller
            control={control}
            name="cidade"
            render={({ field: { onChange, value } }) => (
              <FormField
                label="Cidade"
                placeholder="Cidade"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Controller
            control={control}
            name="uf"
            render={({ field: { onChange, value } }) => (
              <FormField
                label="UF"
                placeholder="UF"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
      </View>
    </>
  );
}