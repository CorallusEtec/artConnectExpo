import { DimensionValue, Image } from "react-native";
import { style } from "./style";

/**
 * BannerLogo
 *
 * @returns Componente com o logo responsivo do sistema.
 */

export type BannerLogoProps = {
  /**
   * Valor em porcentagem do tamanho
   */
  size?: DimensionValue;
};
export function BannerLogo({ size = "5%" }: BannerLogoProps) {
  return (
    <Image
      style={[style.banner, { width: size, maxHeight: size }]}
      source={require("@/assets/images/banner.png")}
    />
  );
}