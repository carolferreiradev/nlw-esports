import { ImageBackground } from "react-native";
import backgroundImage from "../../assets/background-galaxy.png";
import { styles } from "./styles";

interface Props {
  children: React.ReactNode;
}

export function Background(props: Props) {
  const { children } = props;
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      defaultSource={backgroundImage}
    >
      {children}
    </ImageBackground>
  );
}
