import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";
import { checkIfAdsGamesPostRequestIsValid } from "./validations/ads-games-post";

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ["query"],
});

app.get("/games", async (_, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.status(201).json(games);
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const response = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  const ads: any = response.map((ad: any) => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(","),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    };
  });
  return res.send(ads);
});

app.post("/ads/games/:gameId", async (req, res) => {
  const gameId = req.params.gameId;
  const body: any = req.body;
  const data = {
    gameId,
    name: body?.name,
    yearsPlaying: body?.yearsPlaying,
    discord: body?.discord,
    weekDays: body?.weekDays?.join(","),
    hourStart: body?.hourStart && convertHourStringToMinutes(body?.hourStart),
    hourEnd: body?.hourEnd && convertHourStringToMinutes(body?.hourEnd),
    useVoiceChannel: body?.useVoiceChannel,
  };

  const { isValid, valuesEmpty } = checkIfAdsGamesPostRequestIsValid(data);

  if (!isValid) {
    return res.status(422).send({
      message: `${valuesEmpty?.join(",")} cannot be null`,
    });
  }

  const ad = await prisma.ad.create({ data });
  return res.status(201).json(ad);
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;
  const { discord } = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return res.json({
    discord,
  });
});

app.listen(3333);
