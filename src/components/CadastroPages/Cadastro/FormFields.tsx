import { Controller } from "react-hook-form";
import { View } from "react-native";
import { FormInput, FormPassInput, FormHelperText } from "@/components/Form";
import { style } from "./style";

export function FormFields({ control, errors }: any) {
  return (
    <View>
      <Controller
        name="nome"
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <>
            <FormInput
              outlineStyle={{ borderRadius: 8 }}
              style={style.input}
              label="Nome"
              placeholder="Digite seu nome"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              inputMode="text"
              icon="account-outline"
              error={!!errors.nome}
            />
            <FormHelperText visible={!!errors.nome}>
              {errors.nome?.message}
            </FormHelperText>
          </>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <FormInput
              outlineStyle={{ borderRadius: 8 }}
              style={style.input}
              label="Email"
              placeholder="Digite seu e-mail"
              icon="email-outline"
              inputMode="email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={!!errors.email}
            />
            <FormHelperText visible={!!errors.email}>
              {errors.email?.message}
            </FormHelperText>
          </>
        )}
      />
      <Controller
        name="senha"
        control={control}
        render={({ field: { value, onBlur, onChange } }) => (
          <>
            <FormPassInput
              outlineStyle={{ borderRadius: 8 }}
              style={style.input}
              label="Senha"
              placeholder="Digite sua senha"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={!!errors.senha}
            />
            <FormHelperText visible={!!errors.senha}>
              {errors.senha?.message}
            </FormHelperText>
          </>
        )}
      />
      <Controller
        name="senhaConfirm"
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <>
            <FormPassInput
              outlineStyle={{ borderRadius: 8 }}
              style={style.input}
              label="Confirmar senha"
              placeholder="Confirmar sua senha"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.senhaConfirm}
            />
            <FormHelperText visible={!!errors.senhaConfirm}>
              {errors.senhaConfirm?.message}
            </FormHelperText>
          </>
        )}
      />
    </View>
  );
}