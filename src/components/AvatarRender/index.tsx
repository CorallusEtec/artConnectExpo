import { Avatar } from "react-native-paper";

type AvatarRenderProps = {
  uri?: string;
  nome?: string;
  size?: number;
};

/**
 *
 * @param param0 Props do componente
 * @returns Renderiza o avatar do usuário com ou sem foto e nome.
 */
function renderAvatar({ nome, size = 70, uri }: AvatarRenderProps) {
  if (uri) {
    return <Avatar.Image size={size} source={{ uri }} />;
  } else if (nome) {
    return <Avatar.Text size={size} label={nome[0]} />;
  } else {
    return (
      <Avatar.Image
        size={size}
        source={require("@/assets/template/avatar.png")}
      />
    );
  }
}

export function AvatarRender(props: AvatarRenderProps) {
  return renderAvatar(props);
}
