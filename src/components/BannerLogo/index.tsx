import { ContratanteColorTheme } from "@/style/appTheme";
import { DimensionValue, Image } from "react-native";
import { useTheme } from "react-native-paper";
import { style } from "./style";

/**
 * BannerLogo
 *
 * @returns Componente com o logo responsivo do sistema.
 * Troca automaticamente entre o banner azul (Artista) e vermelho (Contratante)
 * com base na cor primária do tema ativo no PaperProvider mais próximo.
 */

export type BannerLogoProps = {
  /**
   * Valor do tamanho do banner
   */
  size?: DimensionValue;
};

export function BannerLogo({ size = 70 }: BannerLogoProps) {
  const theme = useTheme();
  const isContratante = theme.colors.primary === ContratanteColorTheme.colors.primary;

  return (
    <Image
      style={[style.banner, { height: size }]}
      source={
        isContratante
          ? require("@/assets/img/banner-vermelho.png")
          : require("@/assets/images/banner.png")
      }
    />
  );
}