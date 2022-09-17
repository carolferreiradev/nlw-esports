import logoImg from "/logo-nlw-esports.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { GameBanner } from "./components/GameBanner";
import { useEffect, useState } from "react";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";

// DICAS
// RESPONSIVO adicionar keen-slider para o carroussel validação(react-hook-form) e teste
// autenticação

interface GamesProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: { ads: number };
}
function App() {
  const [games, setGames] = useState<GamesProps[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:3333/games");
      setGames(data);
    })();
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient text-transparent bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            adsCount={game._count.ads}
            bannerUrl={game.bannerUrl}
            title={game.title}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
