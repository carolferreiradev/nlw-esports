import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { CaretDown, Check, GameController } from "phosphor-react";

import { TextField } from "../inputs/TextField";
import { FormEvent, useEffect, useState } from "react";

interface GamesProps {
  id: string;
  title: string;
}

interface Props {
  onOpenChange: (value: boolean) => void;
  getAllGames: () => void;
}

export function CreateAdModal(props: Props) {
  const { onOpenChange, getAllGames } = props;
  const [games, setGames] = useState<GamesProps[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:3333/games");
      setGames(data);
    })();
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target as HTMLFormElement);

      const data = Object.fromEntries(formData);

      const request = {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      };
      await axios.post(`http://localhost:3333/ads/games/${data.game}`, request);
      toast.success("Anúncio criado com sucesso");
      await getAllGames();
      onOpenChange(false);
    } catch (error) {
      toast.error(`ERRO: Ocorreu um erro ao incluir anúncio`);
    } finally {
    }
  }
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content
        className="
      fixed
     bg-[#2a2634]
      py-8
      px-10
    text-white
      top-1/2 
      left-1/2 
      -translate-x-1/2 
      -translate-y-1/2
      rounded-lg
      w-[480px]
      shadow-lg
      shadow-black/25
      "
      >
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleCreateAd}>
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <Select.Root name="game">
              <Select.Trigger
                aria-label="game"
                className="
                bg-zinc-900
                  py-3
                  px-4
                  rounded
                  text-sm
                  flex
                  justify-between
                  items-center
                placeholder:text-zinc-500"
              >
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon>
                  <CaretDown />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="bg-zinc-900 text-white p-3 rounded">
                  <Select.ScrollUpButton />
                  <Select.Viewport className="flex flex-col gap-1">
                    {games.map((game) => (
                      <Select.Item
                        value={game.id}
                        key={game.id}
                        className="cursor-pointer hover:text-emerald-300"
                      >
                        <Select.ItemText>{game.title}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <TextField
              type="text"
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <TextField
                type="number"
                id="yearsPlaying"
                name="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu discord?</label>
              <TextField
                type="text"
                id="discord"
                name="discord"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("0") ? "bg-violet-500" : " bg-zinc-900"
                  }`}
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900 "
                  }`}
                  title="Segunda-feira"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900 "
                  }`}
                  title="Terça-feira"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900 "
                  }`}
                  title="Quarta-feira"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900 "
                  }`}
                  title="Quinta-feira"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Sexta-feira"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Sábado"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia</label>
              <div className="grid grid-cols-2 gap-2">
                <TextField
                  type="time"
                  name="hourStart"
                  id="hourStart"
                  placeholder="De"
                />
                <TextField type="time" name="hourEnd" placeholder="Até" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              name="voiceChannel"
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(checked);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
            >
              <Checkbox.Indicator id="voiceChannel">
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>

      <ToastContainer />
    </Dialog.Portal>
  );
}
