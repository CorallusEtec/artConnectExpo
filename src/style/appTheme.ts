import { TipoConta } from "@/models/enumeration/enumeration";

/**
 * Tema padrão / Artista — Azul
 * (tema original do app, mantido como padrão para ARTISTA e CONVIDADO)
 */
export const ArtistaColorTheme = JSON.parse(
  `
{
  "colors": {
    "primary": "rgb(34, 90, 186)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(217, 226, 255)",
    "onPrimaryContainer": "rgb(0, 25, 68)",
    "secondary": "rgb(50, 92, 169)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(216, 226, 255)",
    "onSecondaryContainer": "rgb(0, 26, 66)",
    "tertiary": "rgb(0, 98, 157)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(207, 229, 255)",
    "onTertiaryContainer": "rgb(0, 29, 52)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(254, 251, 255)",
    "onBackground": "rgb(27, 27, 31)",
    "surface": "rgb(254, 251, 255)",
    "onSurface": "rgb(27, 27, 31)",
    "surfaceVariant": "rgb(225, 226, 236)",
    "onSurfaceVariant": "rgb(68, 70, 79)",
    "outline": "rgb(117, 119, 128)",
    "outlineVariant": "rgb(197, 198, 208)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(48, 48, 52)",
    "inverseOnSurface": "rgb(242, 240, 244)",
    "inversePrimary": "rgb(175, 198, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(243, 243, 252)",
      "level2": "rgb(236, 238, 250)",
      "level3": "rgb(230, 233, 247)",
      "level4": "rgb(228, 232, 247)",
      "level5": "rgb(223, 229, 245)"
    },
    "surfaceDisabled": "rgba(27, 27, 31, 0.12)",
    "onSurfaceDisabled": "rgba(27, 27, 31, 0.38)",
    "backdrop": "rgba(46, 48, 56, 0.4)"
  }
}
`,
);

/**
 * Tema Contratante — Vermelho
 */
export const ContratanteColorTheme = JSON.parse(
  `
{
  "colors": {
    "primary": "rgb(183, 32, 39)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(255, 218, 215)",
    "onPrimaryContainer": "rgb(65, 0, 4)",
    "secondary": "rgb(170, 51, 57)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(255, 218, 216)",
    "onSecondaryContainer": "rgb(65, 0, 7)",
    "tertiary": "rgb(151, 72, 0)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 219, 199)",
    "onTertiaryContainer": "rgb(49, 19, 0)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(32, 26, 26)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(32, 26, 26)",
    "surfaceVariant": "rgb(245, 221, 219)",
    "onSurfaceVariant": "rgb(83, 67, 66)",
    "outline": "rgb(133, 115, 113)",
    "outlineVariant": "rgb(216, 194, 192)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(54, 47, 46)",
    "inverseOnSurface": "rgb(251, 238, 236)",
    "inversePrimary": "rgb(255, 179, 174)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(251, 240, 244)",
      "level2": "rgb(249, 234, 238)",
      "level3": "rgb(247, 227, 231)",
      "level4": "rgb(246, 225, 229)",
      "level5": "rgb(245, 220, 225)"
    },
    "surfaceDisabled": "rgba(32, 26, 26, 0.12)",
    "onSurfaceDisabled": "rgba(32, 26, 26, 0.38)",
    "backdrop": "rgba(59, 45, 44, 0.4)"
  }
}
`,
);


export const ArtConnectColorTheme = ArtistaColorTheme;

export function getThemeByTipoConta(tipoConta: TipoConta) {
  switch (tipoConta) {
    case "CONTRATANTE":
      return ContratanteColorTheme;
    case "ARTISTA":
    default:
      return ArtistaColorTheme;
  }
}