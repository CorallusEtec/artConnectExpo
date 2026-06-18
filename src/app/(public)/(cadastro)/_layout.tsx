import { CadastroProvider } from "@/contexts/CadastroContext";
import { Slot } from "expo-router";

/**
 * Layout para passar o provider de cadastro
 */
export default function CadastroLayout() {
  return (
    <CadastroProvider>
      <Slot />
    </CadastroProvider>
  );
}
