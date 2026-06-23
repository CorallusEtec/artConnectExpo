import { useTheme } from "react-native-paper";

/**
 * Hook central para cores que precisam reagir ao tema (Artista/azul ou
 * Contratante/vermelho), mas que estão em arquivos style.ts puros
 * (StyleSheet.create fora de componente, sem acesso a useTheme).
 */
export function useDynamicThemeStyles() {
  const theme = useTheme();

  return {
    /** Fundo na cor primária do tema (botões, chips selecionados, badges) */
    bgPrimary: { backgroundColor: theme.colors.primary },
    /** Texto/ícone na cor primária do tema */
    textPrimary: { color: theme.colors.primary },
    /** Borda na cor primária do tema */
    borderPrimary: { borderColor: theme.colors.primary },
    /** Fundo + borda na cor primária (chips selecionados) */
    bgAndBorderPrimary: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
  };
}