import { useEffect, useState } from "react";

import { Image, FlatList } from "react-native";

import { Heading } from "../../components/Heading";
import { GameCard, GameCardProps } from "../../components/GameCard";

import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

import logoImg from "../../assets/logo-nlw-esports.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";

export function Home() {
  const navigation = useNavigation();
  const [games, setGames] = useState<GameCardProps[]>([]);

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }
  useEffect(() => {
    fetch("http://192.168.1.6:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          renderItem={({ item }) => (
            <GameCard
              key={item.id}
              id={item.id}
              title={item.title}
              _count={item._count}
              bannerUrl={item.bannerUrl}
              onPress={() => handleOpenGame(item)}
            />
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
