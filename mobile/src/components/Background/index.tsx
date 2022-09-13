import { ImageBackground, ImageURISource } from "react-native";

import { styles } from "./styles";

interface Props {
  children: React.ReactNode;
  source: ImageURISource;
}

export function Background(props: Props) {
  const { children, source } = props;
  return (
    <ImageBackground
      source={source}
      style={styles.container}
      defaultSource={source}
    >
      {children}
    </ImageBackground>
  );
}
