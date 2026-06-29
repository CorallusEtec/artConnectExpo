import { FormInput } from "@/components/Form";
import { style } from "./style";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { Text } from "react-native-paper";

export function EnderecoForm({ control, errors }: any) {
  return (
    <View style={style.enderencoContainer}>
      <Text variant="bodyLarge" style={{ fontWeight: 500 }}>Endereço</Text>

      <Controller
        name="logradouro"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Logradouro *"
            placeholder="Digite seu logradouro"
            outlineStyle={{ borderRadius: 8 }}
            style={style.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            inputMode="text"
            icon="home"
            error={!!errors.logradouro}
          />
        )}
      />

      <View style={style.cepRow}>
        <Controller
          name="cep"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              label="CEP *"
              placeholder="Digite seu CEP"
              value={value}
              outlineStyle={{ borderRadius: 8 }}
              style={[style.input, { width: "65%" }]}
              onBlur={onBlur}
              onChangeText={onChange}
              inputMode="numeric"
              icon="map-marker-radius-outline"
              error={!!errors.cep}
            />
          )}
        />
        <Controller
          name="numLog"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              label="N° *"
              value={value ? String(value) : ""}
              outlineStyle={{ borderRadius: 8 }}
              style={[style.input, { width: "30%" }]}
              onBlur={onBlur}
              onChangeText={(text) => onChange(Number(text))}
              inputMode="numeric"
              icon="numeric"
              error={!!errors.numLog}
            />
          )}
        />
      </View>

      <Controller
        name="complemento"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Complemento"
            placeholder="Apartamento, casa, etc"
            outlineStyle={{ borderRadius: 8 }}
            style={style.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            icon="office-building-outline"
            inputMode="text"
          />
        )}
      />

      <Controller
        name="bairro"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Bairro *"
            placeholder="Digite seu bairro"
            outlineStyle={{ borderRadius: 8 }}
            style={style.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            inputMode="text"
            icon="home-group"
            error={!!errors.bairro}
          />
        )}
      />

      <Controller
        name="cidade"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Cidade *"
            placeholder="Digite sua cidade"
            outlineStyle={{ borderRadius: 8 }}
            style={style.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            inputMode="text"
            icon="city-variant-outline"
            error={!!errors.cidade}
          />
        )}
      />

      <Controller
        name="uf"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="UF *"
            placeholder="Digite sua UF"
            outlineStyle={{ borderRadius: 8 }}
            style={style.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            inputMode="text"
            icon="map-outline"
            error={!!errors.uf}
          />
        )}
      />
    </View>
  );
}