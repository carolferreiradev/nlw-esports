import logoImg from "/logo-nlw-esports.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { GameBanner } from "./components/GameBanner";
import { useEffect, useState } from "react";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { useKeenSlider } from "keen-slider/react";
import axios from "axios";

interface GamesProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: { ads: number };
}
function App() {
  const [slidesRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: 6,
      spacing: 15,
    },
  });
  const [games, setGames] = useState<GamesProps[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  async function getAllGames() {
    const { data } = await axios.get("http://localhost:3333/games");
    setGames(data);
  }

  useEffect(() => {
    getAllGames();
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

      <div className="grid grid-cols-6 gap-6 mt-16 keen-slider" ref={slidesRef}>
        {games.map((game) => (
          <GameBanner
            key={game.id}
            adsCount={game._count.ads}
            bannerUrl={game.bannerUrl}
            title={game.title}
          />
        ))}
      </div>

      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <CreateAdBanner />

        <CreateAdModal onOpenChange={setOpenDialog} getAllGames={getAllGames} />
      </Dialog.Root>
    </div>
  );
}

export default App;
