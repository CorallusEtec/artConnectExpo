import { useTheme } from "react-native-paper";

/**
 * Hook central para cores que precisam reagir ao tema (Artista/azul ou
 * Contratante/vermelho), mas que vivem em arquivos `style.ts` puros
 * (StyleSheet.create fora de componente, sem acesso a useTheme()).
 *
 * Uso: dentro do componente (não no arquivo style.ts), chame este hook e
 * espalhe o resultado por cima do estilo estático correspondente:
 *
 *   const dynamic = useDynamicThemeStyles();
 *   <View style={[style.botaoSalvar, dynamic.bgPrimary]} />
 *
 * Adicione uma nova chave aqui sempre que precisar de mais uma combinação
 * de propriedade + cor do tema (ex: borderColor, textColor).
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