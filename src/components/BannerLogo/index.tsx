import { DimensionValue, Image } from "react-native";
import { style } from "./style";

/**
 * BannerLogo
 *
 * @returns Componente com o logo responsivo do sistema.
 */

export type BannerLogoProps = {
  /**
   * Valor do tamanho do banner
   */
  size?: DimensionValue;
};
export function BannerLogo({ size = 70 }: BannerLogoProps) {
  return (
    <Image
      style={[style.banner, { height: size }]}
      source={require("@/assets/images/banner.png")}
    />
  );
}
