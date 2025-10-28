// scripts/seedDatabase.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import { connectDB } from "../lib/db.js";
import Tournament from "../models/Tournament.js";
import Player from "../models/Player.js";
import Map from "../models/Map.js";
import DiscordServer from "../models/DiscordServer.js";
import User from "../models/User.js";
import Leaderboard from "../models/Leaderboard.js";

dotenv.config(); // explicitly load .env.local

console.log("🌱 Starting database seeding...");
// Connect to database
const samplePlayers = [
  {
    name: "Addictiveme",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/2158159/",
    isActive: true
  },
  {
    name: "Adthor",
    country: "Unknown",
    rating: 1042,
    profileUrl: "https://www.aoe2insights.com/user/13054248/",
    isActive: true
  },
  {
    name: "Airbudgoldenrec",
    country: "Unknown",
    rating: 1129,
    profileUrl: "https://www.aoe2insights.com/user/11683000/",
    isActive: true
  },
  {
    name: "Akkal",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/277869/",
    isActive: true
  },
  {
    name: "Alepsi",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/5791522/",
    isActive: true
  },
  {
    name: "AlexDonat",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/8669401/",
    isActive: true
  },
  {
    name: "Alpha krit",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/9934717/",
    isActive: true
  },
  {
    name: "amon",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/233750/",
    isActive: true
  },
  {
    name: "Amokura",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/11765693/",
    isActive: true
  },
  {
    name: "Apostic",
    country: "Unknown",
    rating: 1144,
    profileUrl: "https://www.aoe2insights.com/user/4510278/",
    isActive: true
  },
  {
    name: "arwhal",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/10903621/",
    isActive: true
  },
  {
    name: "Ashoof",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/13117300/",
    isActive: true
  },
  {
    name: "avlid",
    country: "Unknown",
    rating: 1915,
    profileUrl: "https://www.aoe2insights.com/user/254645/",
    isActive: true
  },
  {
    name: "Beargwyn",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/6859687/",
    isActive: true
  },
  {
    name: "Bender",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12517895/",
    isActive: true
  },
  {
    name: "Biscuits",
    country: "Unknown",
    rating: 1612,
    profileUrl: "https://www.aoe2insights.com/user/12772982/",
    isActive: true
  },
  {
    name: "Bishop",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/950113/",
    isActive: true
  },
  {
    name: "Black Lotus",
    country: "Unknown",
    rating: 1687,
    profileUrl: "https://www.aoe2insights.com/user/941790/",
    isActive: true
  },
  {
    name: "Bloomd",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/2239994/",
    isActive: true
  },
  {
    name: "BloodForTheSkyGod",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/2363846/",
    isActive: true
  },
  {
    name: "BoesBoes",
    country: "Unknown",
    rating: 1372,
    profileUrl: "https://www.aoe2insights.com/user/2010525/",
    isActive: true
  },
  {
    name: "Boarderdudeman",
    country: "Unknown",
    rating: 1546,
    profileUrl: "https://www.aoe2insights.com/user/237994/",
    isActive: true
  },
  {
    name: "Breakfast",
    country: "Unknown",
    rating: 1929,
    profileUrl: "https://www.aoe2insights.com/user/4851630/",
    isActive: true
  },
  {
    name: "Brydazi",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12783556/",
    isActive: true
  },
  {
    name: "Bumbaloe",
    country: "Unknown",
    rating: 1017,
    profileUrl: "https://www.aoe2insights.com/user/1722912/",
    isActive: true
  },
  {
    name: "Canttouchme",
    country: "Unknown",
    rating: 1267,
    profileUrl: "https://www.aoe2insights.com/user/1965270/",
    isActive: true
  },
  {
    name: "Charlies Alpaca",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/5553104/",
    isActive: true
  },
  {
    name: "CheesecakeMasta",
    country: "Unknown",
    rating: 1438,
    profileUrl: "https://www.aoe2insights.com/user/293313/",
    isActive: true
  },
  {
    name: "Chelbird",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/2543478/",
    isActive: true
  },
  {
    name: "Chipmunk",
    country: "Unknown",
    rating: 1338,
    profileUrl: "https://www.aoe2insights.com/user/282529/",
    isActive: true
  },
  {
    name: "Clarky0202",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/697097/",
    isActive: true
  },
  {
    name: "CoalTrain",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1720213/",
    isActive: true
  },
  {
    name: "Code Name Raven",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/402345/",
    isActive: true
  },
  {
    name: "Comfrick",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/6368551/",
    isActive: true
  },
  {
    name: "Cosminb",
    country: "Unknown",
    rating: 1279,
    profileUrl: "https://www.aoe2insights.com/user/4285252/",
    isActive: true
  },
  {
    name: "Crystella",
    country: "Unknown",
    rating: 458,
    profileUrl: "https://www.aoe2insights.com/user/3892612/",
    isActive: true
  },
  {
    name: "Cu5T05",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/792014/",
    isActive: true
  },
  {
    name: "Cyvarios",
    country: "Unknown",
    rating: 1296,
    profileUrl: "https://www.aoe2insights.com/user/9058532/",
    isActive: true
  },
  {
    name: "DaSwedishBeast",
    country: "Unknown",
    rating: 1019,
    profileUrl: "https://www.aoe2insights.com/user/2479744/",
    isActive: true
  },
  {
    name: "Dashermin",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/6073178/",
    isActive: true
  },
  {
    name: "Dasein",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/312182/",
    isActive: true
  },
  {
    name: "Dawn",
    country: "Unknown",
    rating: 1458,
    profileUrl: "https://www.aoe2insights.com/user/12202531/",
    isActive: true
  },
  {
    name: "Dhruv47",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/10510225/",
    isActive: true
  },
  {
    name: "Dio_roja",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/2439151/",
    isActive: true
  },
  {
    name: "Dodo3011",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12559976/",
    isActive: true
  },
  {
    name: "DomHUSK",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/3306988/",
    isActive: true
  },
  {
    name: "Dracarna",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1394115/",
    isActive: true
  },
  {
    name: "DrLoops",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/3903933/",
    isActive: true
  },
  {
    name: "Duhak.Natria",
    country: "Unknown",
    rating: 1358,
    profileUrl: "https://www.aoe2insights.com/user/13060828/",
    isActive: true
  },
  {
    name: "Eden",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12592487/",
    isActive: true
  },
  {
    name: "El CivettaDiTozzi",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/229416/",
    isActive: true
  },
  {
    name: "El Latigo",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/2770291/",
    isActive: true
  },
  {
    name: "El Mikalos",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12594426/",
    isActive: true
  },
  {
    name: "EmperorNoob97",
    country: "Unknown",
    rating: 930,
    profileUrl: "https://www.aoe2insights.com/user/5422400/",
    isActive: true
  },
  {
    name: "Emp. Peter",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/2558975/",
    isActive: true
  },
  {
    name: "Enki",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1639985/",
    isActive: true
  },
  {
    name: "EnnoVonDerTanke",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/9649575/",
    isActive: true
  },
  {
    name: "Escalus",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/757980/",
    isActive: true
  },
  {
    name: "Ezioauditore0109",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/13124087/",
    isActive: true
  },
  {
    name: "Fgzb",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/13045745/",
    isActive: true
  },
  {
    name: "Firmatt",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12858284/",
    isActive: true
  },
  {
    name: "Fishmanoli",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/295020/",
    isActive: true
  },
  {
    name: "FiveCatsATrebuchetAndADream",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/9705242/",
    isActive: true
  },
  {
    name: "Fj5589",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/5830463/",
    isActive: true
  },
  {
    name: "FloosWorld",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1349/",
    isActive: true
  },
  {
    name: "Flan Implacable",
    country: "Unknown",
    rating: 1084,
    profileUrl: "https://www.aoe2insights.com/user/393242/",
    isActive: true
  },
  {
    name: "Flying Mouse",
    country: "Unknown",
    rating: 1570,
    profileUrl: "https://www.aoe2insights.com/user/227587/",
    isActive: true
  },
  {
    name: "Fuegan33",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/880156/",
    isActive: true
  },
  {
    name: "Ganjiix",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/2082547/",
    isActive: true
  },
  {
    name: "Gilli0315",
    country: "Unknown",
    rating: 1142,
    profileUrl: "https://www.aoe2insights.com/user/10377768/",
    isActive: true
  },
  {
    name: "Genoese Crossbowman",
    country: "Unknown",
    rating: 1509,
    profileUrl: "https://www.aoe2insights.com/user/270569/",
    isActive: true
  },
  {
    name: "GeneralOcto",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12448049/",
    isActive: true
  },
  {
    name: "GeneralWakka",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1226225/",
    isActive: true
  },
  {
    name: "Geologywade",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1858991/",
    isActive: true
  },
  {
    name: "Ghostwriter39",
    country: "Unknown",
    rating: 1483,
    profileUrl: "https://www.aoe2insights.com/user/12675701/",
    isActive: true
  },
  {
    name: "Gil",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/330481/",
    isActive: true
  },
  {
    name: "GoldRoger",
    country: "Unknown",
    rating: 1099,
    profileUrl: "https://aoe2.gg/profile/415167",
    isActive: true
  },
  {
    name: "Gonzaleki",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12706469/",
    isActive: true
  },
  {
    name: "GwizdeK",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/245082/",
    isActive: true
  },
  {
    name: "Hagenhagen",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/10002260/",
    isActive: true
  },
  {
    name: "Happytheandy",
    country: "Unknown",
    rating: 1856,
    profileUrl: "https://www.aoe2insights.com/user/2397632/",
    isActive: true
  },
  {
    name: "Hestia",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/230265/",
    isActive: true
  },
  {
    name: "Hoppsy",
    country: "Unknown",
    rating: 1633,
    profileUrl: "https://www.aoe2insights.com/user/456135/",
    isActive: true
  },
  {
    name: "Hornet-Wing",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/272604/",
    isActive: true
  },
  {
    name: "Hoyohoyo9",
    country: "Unknown",
    rating: 1571,
    profileUrl: "https://www.aoe2insights.com/user/237553/",
    isActive: true
  },
  {
    name: "Huggie",
    country: "Unknown",
    rating: 1628,
    profileUrl: "https://www.aoe2insights.com/user/89053/",
    isActive: true
  },
  {
    name: "Init2winek",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1265221/",
    isActive: true
  },
  {
    name: "JagWarrior",
    country: "Unknown",
    rating: 1457,
    profileUrl: "https://www.aoe2insights.com/user/11471863/",
    isActive: true
  },
  {
    name: "Janchez",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/5578711/",
    isActive: true
  },
  {
    name: "JawolopingChris",
    country: "Unknown",
    rating: 1649,
    profileUrl: "https://www.aoe2insights.com/user/303604/",
    isActive: true
  },
  {
    name: "Javisty",
    country: "Unknown",
    rating: 1722,
    profileUrl: "https://www.aoe2insights.com/user/392423/",
    isActive: true
  },
  {
    name: "Joey the Bonqueror",
    country: "Unknown",
    rating: 1663,
    profileUrl: "https://www.aoe2insights.com/user/300848/",
    isActive: true
  },
  {
    name: "Jon",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/6073899/",
    isActive: true
  },
  {
    name: "Josenblad",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/92277/",
    isActive: true
  },
  {
    name: "J0N-PERKiNS",
    country: "Unknown",
    rating: 1510,
    profileUrl: "https://www.aoe2insights.com/user/3582838/",
    isActive: true
  },
  {
    name: "Jskillz",
    country: "Unknown",
    rating: 1630,
    profileUrl: "https://www.aoe2insights.com/user/2363000/",
    isActive: true
  },
  {
    name: "Judean People's Front",
    country: "Unknown",
    rating: 1118,
    profileUrl: "https://www.aoe2insights.com/user/554997/",
    isActive: true
  },
  {
    name: "Kakabsen",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12784217/",
    isActive: true
  },
  {
    name: "Kiki da Foxvoid (Mikikki)",
    country: "Unknown",
    rating: 979,
    profileUrl: "https://www.aoe2insights.com/user/12563061/",
    isActive: true
  },
  {
    name: "Kisiel",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/8996251/",
    isActive: true
  },
  {
    name: "Kitty",
    country: "Unknown",
    rating: 802,
    profileUrl: "https://www.aoe2insights.com/user/12804586/",
    isActive: true
  },
  {
    name: "KoaLollo",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/10162879/",
    isActive: true
  },
  {
    name: "Koti",
    country: "Unknown",
    rating: 1719,
    profileUrl: "https://www.aoe2insights.com/user/4033024/",
    isActive: true
  },
  {
    name: "Kruppe",
    country: "Unknown",
    rating: 1253,
    profileUrl: "https://www.aoe2insights.com/user/449982/",
    isActive: true
  },
  {
    name: "Kubya",
    country: "Unknown",
    rating: 1432,
    profileUrl: "https://www.aoe2insights.com/user/15780/",
    isActive: true
  },
  {
    name: "Lamo",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/5188554/",
    isActive: true
  },
  {
    name: "Lartibro",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12649900/",
    isActive: true
  },
  {
    name: "Levana",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1399661/",
    isActive: true
  },
  {
    name: "Lheodoric",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12164510/",
    isActive: true
  },
  {
    name: "Lord Benji",
    country: "Unknown",
    rating: 1202,
    profileUrl: "https://www.aoe2insights.com/user/1859305/",
    isActive: true
  },
  {
    name: "Lovee",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1041133/",
    isActive: true
  },
  {
    name: "Lukam10",
    country: "Unknown",
    rating: 1036,
    profileUrl: "https://www.aoe2insights.com/user/13099567/",
    isActive: true
  },
  {
    name: "Macklez",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/2311389/",
    isActive: true
  },
  {
    name: "Madbun",
    country: "Unknown",
    rating: 1068,
    profileUrl: "https://www.aoe2insights.com/user/381651/",
    isActive: true
  },
  {
    name: "MajorTawm",
    country: "Unknown",
    rating: 1220,
    profileUrl: "https://www.aoe2insights.com/user/2963781/",
    isActive: true
  },
  {
    name: "Majormelancholy",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/2471138/",
    isActive: true
  },
  {
    name: "MarmotteQuantique",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/641/",
    isActive: true
  },
  {
    name: "Matze",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/13123606/",
    isActive: true
  },
  {
    name: "Mathmagician",
    country: "Unknown",
    rating: 1042,
    profileUrl: "https://www.aoe2insights.com/user/4845480/",
    isActive: true
  },
  {
    name: "Maxpower973",
    country: "Unknown",
    rating: 1600,
    profileUrl: "https://www.aoe2insights.com/user/2320032/",
    isActive: true
  },
  {
    name: "Maxymczech",
    country: "Unknown",
    rating: 1497,
    profileUrl: "https://www.aoe2insights.com/user/5813618/",
    isActive: true
  },
  {
    name: "Mercurial",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1272377/",
    isActive: true
  },
  {
    name: "Meshuggle",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12730545/",
    isActive: true
  },
  {
    name: "Metalmania",
    country: "Unknown",
    rating: 1511,
    profileUrl: "https://www.aoe2insights.com/user/12434787/",
    isActive: true
  },
  {
    name: "Mikikki",
    country: "Unknown",
    rating: 979,
    profileUrl: "https://www.aoe2insights.com/user/12563061/",
    isActive: true
  },
  {
    name: "MightySpaceFruit",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12772982/",
    isActive: true
  },
  {
    name: "MonkeyJuggler",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/4351574/",
    isActive: true
  },
  {
    name: "NeoZz",
    country: "Unknown",
    rating: 2564,
    profileUrl: "https://www.aoe2insights.com/user/11275434/",
    isActive: true
  },
  {
    name: "Nessius Blaze",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12094556/",
    isActive: true
  },
  {
    name: "Nope1585",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/5968579/",
    isActive: true
  },
  {
    name: "Nutty",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/11720179/",
    isActive: true
  },
  {
    name: "OrangeMamba",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/648585/",
    isActive: true
  },
  {
    name: "OS+",
    country: "Unknown",
    rating: 2564,
    profileUrl: "https://www.aoe2insights.com/user/11275434/",
    isActive: true
  },
  {
    name: "Ozziey",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1530786/",
    isActive: true
  },
  {
    name: "Paapi",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/503998/",
    isActive: true
  },
  {
    name: "Painter",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/4850176/",
    isActive: true
  },
  {
    name: "Pasta",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1111750/",
    isActive: true
  },
  {
    name: "Pete26196",
    country: "Unknown",
    rating: 1821,
    profileUrl: "https://www.aoe2insights.com/user/275448/",
    isActive: true
  },
  {
    name: "Phoenix Oath",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/305008/",
    isActive: true
  },
  {
    name: "Pisty",
    country: "Unknown",
    rating: 1380,
    profileUrl: "https://www.aoe2insights.com/user/2798038/",
    isActive: true
  },
  {
    name: "Pl0tterGhost",
    country: "Unknown",
    rating: 1520,
    profileUrl: "https://www.aoe2insights.com/user/375383/",
    isActive: true
  },
  {
    name: "Player123",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1137204/",
    isActive: true
  },
  {
    name: "PrinceFinnik",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/2637747/",
    isActive: true
  },
  {
    name: "Pride",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/5634917/",
    isActive: true
  },
  {
    name: "PsychedelicTDog",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/13150242/",
    isActive: true
  },
  {
    name: "PygmyGiant",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/5522724/",
    isActive: true
  },
  {
    name: "Ragnarthetueton",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/6270231/",
    isActive: true
  },
  {
    name: "Rameranic",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/3064960/",
    isActive: true
  },
  {
    name: "Ranzunn",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1971123/",
    isActive: true
  },
  {
    name: "Raudius",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/285711/",
    isActive: true
  },
  {
    name: "Rayz",
    country: "Unknown",
    rating: 2492,
    profileUrl: "https://www.aoe2insights.com/user/12268569/",
    isActive: true
  },
  {
    name: "RealTHF",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1214206/",
    isActive: true
  },
  {
    name: "Rebekah",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1278251/",
    isActive: true
  },
  {
    name: "Rbase96",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/2787704/",
    isActive: true
  },
  {
    name: "RDO_AOE2",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/5672310/",
    isActive: true
  },
  {
    name: "Ricky_ld",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/5172877/",
    isActive: true
  },
  {
    name: "Risendragon Gaming",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12864690/",
    isActive: true
  },
  {
    name: "Robin5hood",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/369054/",
    isActive: true
  },
  {
    name: "Roon Osricson",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/189537/",
    isActive: true
  },
  {
    name: "Row row your boat",
    country: "Unknown",
    rating: 1603,
    profileUrl: "https://www.aoe2insights.com/user/524610/",
    isActive: true
  },
  {
    name: "Royalewithcheese",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/3222983/",
    isActive: true
  },
  {
    name: "Sandland",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/787064/",
    isActive: true
  },
  {
    name: "Satellites of Heaven",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/4985036/",
    isActive: true
  },
  {
    name: "Scipio",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/66145/",
    isActive: true
  },
  {
    name: "Seb",
    country: "Unknown",
    rating: 1749,
    profileUrl: "https://www.aoe2insights.com/user/5405126/",
    isActive: true
  },
  {
    name: "Selava",
    country: "Unknown",
    rating: 1366,
    profileUrl: "https://www.aoe2insights.com/user/6400696/",
    isActive: true
  },
  {
    name: "SenorBonas",
    country: "Unknown",
    rating: 1267,
    profileUrl: "https://www.aoe2insights.com/user/248524/",
    isActive: true
  },
  {
    name: "Shashlyk",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/685782/",
    isActive: true
  },
  {
    name: "Shibani",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/11718075/",
    isActive: true
  },
  {
    name: "SilverEclipse",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/5581979/",
    isActive: true
  },
  {
    name: "SimpleMint",
    country: "Unknown",
    rating: 1420,
    profileUrl: "https://www.aoe2insights.com/user/2941867/",
    isActive: true
  },
  {
    name: "Skinwimmel",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/215522/",
    isActive: true
  },
  {
    name: "Soxs",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/2972583/",
    isActive: true
  },
  {
    name: "Spaz the Adventurer",
    country: "Unknown",
    rating: 1536,
    profileUrl: "https://www.aoe2insights.com/user/3582974/",
    isActive: true
  },
  {
    name: "SpiritOfTheUniverse",
    country: "Unknown",
    rating: 1058,
    profileUrl: "https://www.aoe2insights.com/user/4040905/",
    isActive: true
  },
  {
    name: "Splattcol",
    country: "Unknown",
    rating: 1545,
    profileUrl: "https://www.aoe2insights.com/user/2406441/",
    isActive: true
  },
  {
    name: "Strato",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/11682569/",
    isActive: true
  },
  {
    name: "Syagrius",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/4515093/",
    isActive: true
  },
  {
    name: "Szotyesz",
    country: "Unknown",
    rating: 1225,
    profileUrl: "https://www.aoe2insights.com/user/232247/",
    isActive: true
  },
  {
    name: "T-Money",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12158425/",
    isActive: true
  },
  {
    name: "Tanghay",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12965927/",
    isActive: true
  },
  {
    name: "The Chancellor",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/253973/",
    isActive: true
  },
  {
    name: "The Gardener",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/10764180/",
    isActive: true
  },
  {
    name: "The Night",
    country: "Unknown",
    rating: 1182,
    profileUrl: "https://www.aoe2insights.com/user/255714/",
    isActive: true
  },
  {
    name: "The Sleepy Bishop",
    country: "Unknown",
    rating: 1724,
    profileUrl: "https://www.aoe2insights.com/user/1030992/",
    isActive: true
  },
  {
    name: "The Wyandotte",
    country: "Unknown",
    rating: 1341,
    profileUrl: "https://www.aoe2insights.com/user/6801447/",
    isActive: true
  },
  {
    name: "Thedissapointedinvader",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/336892/",
    isActive: true
  },
  {
    name: "Thespicysicillian",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/9137593/",
    isActive: true
  },
  {
    name: "Tiltstars",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/2627145/",
    isActive: true
  },
  {
    name: "TomAquinas",
    country: "Unknown",
    rating: 1413,
    profileUrl: "https://www.aoe2insights.com/user/11670083/",
    isActive: true
  },
  {
    name: "Totillathehun",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/4820637/",
    isActive: true
  },
  {
    name: "TrickyMicky90",
    country: "Unknown",
    rating: 1161,
    profileUrl: "https://www.aoe2insights.com/user/3083636/",
    isActive: true
  },
  {
    name: "Twopenny Hangover",
    country: "Unknown",
    rating: 1310,
    profileUrl: "https://www.aoe2insights.com/user/4481462/",
    isActive: true
  },
  {
    name: "Tuss",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1242469/",
    isActive: true
  },
  {
    name: "Validus87",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/13166108/",
    isActive: true
  },
  {
    name: "Volunteer Dominos® Employee",
    country: "Unknown",
    rating: 1184,
    profileUrl: "https://www.aoe2insights.com/user/2567136/",
    isActive: true
  },
  {
    name: "Vomastek",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1104040/",
    isActive: true
  },
  {
    name: "Wait...What?",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/12531213/",
    isActive: true
  },
  {
    name: "Warchief_Link",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/3446799/",
    isActive: true
  },
  {
    name: "Whyza",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/16309/",
    isActive: true
  },
  {
    name: "Willdbeast",
    country: "Unknown",
    rating: 1851,
    profileUrl: "https://www.aoe2insights.com/user/278329/",
    isActive: true
  },
  {
    name: "Witty_matty",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/10667559/",
    isActive: true
  },
  {
    name: "Xardas",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/186332/",
    isActive: true
  },
  {
    name: "Xolotl",
    country: "Unknown",
    rating: 1544,
    profileUrl: "https://www.aoe2insights.com/user/3043685/",
    isActive: true
  },
  {
    name: "xRavyn",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/6242021/",
    isActive: true
  },
  {
    name: "Yany",
    country: "Unknown",
    rating: null,
    profileUrl: "https://www.aoe2insights.com/user/1930/",
    isActive: true
  },
  {
    name: "Zark",
    country: "Unknown",
    rating: 1204,
    profileUrl: "https://www.aoe2insights.com/user/5284914/",
    isActive: true
  }
];


const sampleMaps = [
  {
    id: "badlands",
    name: "Badlands",
    image: "/maps/badlands.png",
    type: "Open",
    description: "A desert map with scattered resources and strategic positioning opportunities.",
    bestCivs: ["Byzantines", "Saracens", "Berbers"],
    strategies: ["Fast Castle into Knights", "Archer rush with tower support", "Camel rush for counter-play"],
    tournaments: ["Red Bull Wololo", "King of the Desert", "Hidden Cup"],
    features: ["Open terrain", "Scattered resources", "Multiple attack angles"],
  },
  {
    id: "big-freeze",
    name: "Big Freeze",
    image: "/maps/big-freeze.png",
    type: "Closed",
    description: "A frozen map with water features and unique strategic elements.",
    bestCivs: ["Vikings", "Japanese", "Celts"],
    strategies: ["Dock control for fish boom", "Infantry rush across ice", "Defensive castle play"],
    tournaments: ["AoeLeagues Championship", "Low Elo Legends"],
    features: ["Water control", "Ice passages", "Limited resources"],
  },
  {
    id: "coast-arena",
    name: "Coast Arena",
    image: "/maps/coast-arena.png",
    type: "Water",
    description: "An arena-style map with coastal elements and defensive opportunities.",
    bestCivs: ["Teutons", "Byzantines", "Koreans"],
    strategies: ["Fast Imperial with unique units", "Monk rush through gaps", "Siege workshop timing"],
    tournaments: ["Masters of Arena", "Alchemy Masters"],
    features: ["Walled start", "Coastal access", "Defensive positioning"],
  },
  {
    id: "hoodoo",
    name: "Hoodoo",
    image: "/maps/hoodoo.png",
    type: "Nomad",
    description: "A unique map with central forest and multiple expansion opportunities.",
    bestCivs: ["Mayans", "Aztecs", "Incas"],
    strategies: ["Eagle warrior raids", "Archer mass with micro", "Economic boom to Imperial"],
    tournaments: ["King of the Desert", "T90 Community"],
    features: ["Central forest", "Multiple expansions", "Raid opportunities"],
  },
  {
    id: "koala",
    name: "Koala",
    image: "/maps/koala.png",
    type: "Open",
    description: "A forested map with multiple clearings and strategic choke points.",
    bestCivs: ["Celts", "Britons", "Vietnamese"],
    strategies: ["Archer play with forest advantage", "Siege push through chokes", "Economic focus with trade"],
    tournaments: ["Practice Squad Tournaments", "Akkal Championships"],
    features: ["Forest advantage", "Multiple clearings", "Choke points"],
  },
  {
    id: "le-grand-fosse",
    name: "Le Grand Fosse",
    image: "/maps/le-grand-fosse.png",
    type: "Closed",
    description: "A map with a large central depression and elevated positions.",
    bestCivs: ["Franks", "Persians", "Huns"],
    strategies: ["Cavalry dominance on open areas", "Control of high ground", "Multi-pronged attacks"],
    tournaments: ["Red Bull Wololo", "European Championships"],
    features: ["Elevation differences", "Central depression", "Strategic positioning"],
  },
  {
    id: "northern-crossings",
    name: "Northern Crossings",
    image: "/maps/northen-crossings.png",
    type: "Hybrid",
    description: "An island map with multiple landmasses and naval combat focus.",
    bestCivs: ["Vikings", "Portuguese", "Malay"],
    strategies: ["Fast galley rush", "Island hopping with transports", "Cannon galleon control"],
    tournaments: ["Naval Masters", "Island Kings"],
    features: ["Multiple islands", "Naval combat", "Transport warfare"],
  },
  {
    id: "roe-rage",
    name: "Roe Rage",
    image: "/Roe_rage_aoe2_map.png",
    type: "Hybrid",
    description: "A water map with central island and aggressive naval gameplay.",
    bestCivs: ["Vikings", "Saracens", "Italians"],
    strategies: ["Aggressive galley play", "Fire ship counters", "Central island control"],
    tournaments: ["Water Warriors", "Naval Championships"],
    features: ["Central island", "Aggressive gameplay", "Naval focus"],
  },
  {
    id: "sunburn",
    name: "Sunburn",
    image: "/maps/sunburn.png",
    type: "Open",
    description: "A map with multiple ponds and hybrid land-water gameplay.",
    bestCivs: ["Japanese", "Aztecs", "Malians"],
    strategies: ["Hybrid army composition", "Pond control for fish", "Flexible unit production"],
    tournaments: ["Hybrid Masters", "Community Cups"],
    features: ["Multiple ponds", "Hybrid gameplay", "Flexible strategies"],
  },
  {
    id: "triple-tunnel",
    name: "Triple Tunnel",
    image: "/triple-tunnel.png",
    type: "Closed",
    description: "A coastal map with unique tunnel features and strategic depth.",
    bestCivs: ["Spanish", "Portuguese", "Turks"],
    strategies: ["Gunpowder unit advantage", "Coastal control", "Tunnel warfare tactics"],
    tournaments: ["Coastal Conquest", "Strategic Masters"],
    features: ["Tunnel systems", "Coastal elements", "Strategic depth"],
  },
  {
    id: "african-rivers",
    name: "African Rivers",
    image: "/maps/african-rivers.png",
    type: "Hybrid",
    description:
      "A unique map where players start without a Town Center and must build their civilization from scratch.",
    bestCivs: ["Chinese", "Persians", "Mayans"],
    strategies: ["Fast Town Center placement", "Villager fights for resources", "Quick military production"],
    tournaments: ["Nomad Masters", "Hidden Cup Nomad Special"],
    features: ["No starting Town Center", "Resource competition", "High skill ceiling"],
  },
]


const sampleDiscordServers = [
  {
    name: 'AoeLeagues',
    description: 'Premier competitive Age of Empires 2 tournaments and leagues',
    inviteUrl: 'https://discord.gg/5dkUe5xtzq',
    memberCount: 15000,
    featured: true,
    category: 'Tournament'
  },
  {
    name: 'T90 Community Tournaments',
    description: 'Community-driven tournaments hosted by T90Official',
    inviteUrl: 'https://discord.gg/t90official',
    memberCount: 25000,
    featured: true,
    category: 'Tournament'
  }
];

const sampleTournaments = [
  {
    name: 'Pick and Mixer 2',
    organizer: 'HappytheAndy',
    date: new Date('2025-01-10'),
    prizePool: { amount: 296.18, currency: 'USD' },
    status: 'ongoing', // current
    type: 'Community',
    format: 'Round Robin',
    description: 'Second edition of Pick and Mixer with mixed maps and civs.',
    featured: true,
    isActive: true
  },
  {
    name: 'Stronghold Frenzy 2',
    organizer: 'Unknown Player',
    date: new Date('2025-01-20'),
    prizePool: { amount: 636, currency: 'USD' },
    status: 'ongoing', // current
    type: 'Community',
    format: 'Double Elimination',
    description: 'Fast-paced Stronghold tournament, back for season 2.',
    featured: false,
    isActive: true
  },
  {
    name: 'AoeLeagues Season 14',
    organizer: 'KoaLollo, Javisty, RoboticPro',
    date: new Date('2025-02-05'),
    prizePool: { amount: 59, currency: 'USD' },
    status: 'ongoing', // current
    type: 'Community',
    format: 'Round Robin',
    description: 'The 14th season of AoeLeagues featuring top players.',
    featured: true,
    isActive: true
  },
  {
    name: 'Alchemy League Season 8',
    organizer: 'Tech Chariot',
    date: new Date('2025-02-15'),
    prizePool: { amount: 160, currency: 'USD' },
    status: 'ongoing', // current
    type: 'Community',
    format: 'Round Robin',
    description: 'The 8th season of the Alchemy League.',
    featured: false,
    isActive: true
  },
  {
    name: '7Ps League Season 8',
    organizer: 'Zark',
    date: new Date('2025-11-02'),
    prizePool: { amount: 0, currency: 'USD' },
    status: 'registration', // upcoming
    registrationDeadline: new Date('2025-10-31'),
    registrationLink: 'https://discord.com/invite/Wz57XRkmQh',
    type: 'Community',
    format: 'Round Robin',
    description: 'Eight edition of the 7Ps League for piss poor performance players',
    featured: false,
    isActive: true
  },
  {
    name: 'Aoe Pong Season 4',
    organizer: 'Aramatu',
    date: new Date('2025-11-05'),
    prizePool: { amount: 0, currency: 'USD' },
    status: 'registration', // upcoming
    registrationDeadline: new Date('2025-11-04'),
    registrationLink: 'https://discord.com/invite/bUgV2saKUN',
    type: 'Community',
    format: 'Round Robin',
    description: 'At the end of each round, winners move up, losers move down. This dynamic "ping-pong" system ensures increasingly balanced matchups week after week.',
    featured: false,
    isActive: true
  }
];

const sampleLeaderboard = [
  {
    name: "Arabia Lovers 2",
    date: "2025-10-25",
    winners: [
      { division: "Division 1", player: "Breakfast", rating: null },
      { division: "Division 2", player: "LilyBear", rating: null },
      { division: "Division 3", player: "xRavyn", rating: null },
      { division: "Division 4", player: "ThisDino", rating: null },
    ],
    runnerUps: [
      { division: "Division 1", player: "kataphraktos", rating: null },
      { division: "Division 2", player: "BigTastyBacon", rating: null },
      { division: "Division 3", player: "JawolopingChris", rating: null },
      { division: "Division 4", player: "Flying Mouse", rating: null },
    ],
    isActive: true,
  },
];

// Seeding functions
const seedPlayers = async () => {
  try {
    await Player.deleteMany({});
    await Player.insertMany(samplePlayers);
    console.log('✅ Players seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding players:', error.message);
  }
};

const seedMaps = async () => {
  try {
    await Map.deleteMany({});
    await Map.insertMany(sampleMaps);
    console.log('✅ Maps seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding maps:', error.message);
  }
};

async function seedDiscordServers() {
  await DiscordServer.deleteMany({});
  await DiscordServer.insertMany(sampleDiscordServers);
  console.log("✅ Discord servers seeded");
}

async function seedLeaderboard() {
  await Leaderboard.deleteMany(); 
  await Leaderboard.insertMany(sampleLeaderboard);
  console.log("🏆 Leaderboard data seeded successfully");
}

async function seedTournaments() {
  try {
    await Tournament.deleteMany({});
    
    // Get some players to reference
    const players = await Player.find().limit(3);
    
    // Add winner references to completed tournaments
    const tournamentsWithWinners = sampleTournaments.map(tournament => {
      if (tournament.status === 'completed' && players.length > 0) {
        tournament.winner = players[0]._id;
      }
      return tournament;
    });
    
    await Tournament.insertMany(tournamentsWithWinners);
    console.log('✅ Tournaments seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding tournaments:', error.message);
  }
}


const seedAdminUser = async () => {
  try {
    await User.deleteMany({});
    
    const adminUser = new User({
      email: process.env.ADMIN_EMAIL || 'admin@aoe2gatherpoint.com',
      password: process.env.ADMIN_PASSWORD || 'admin123456',
      name: 'Admin User',
      role: 'admin'
    });
    
    await adminUser.save();
    console.log('✅ Admin user created successfully');
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  }
};

// Main seeding function
// Main seeding function
const seedDatabase = async () => {
  try {
    console.log("⚙️  Connecting to MongoDB...");
    await connectDB();
    console.log("✅ MongoDB connected successfully!");

    console.log("🌱 Starting data seeding...");
    await seedAdminUser();
    await seedPlayers();
    await seedMaps();
    await seedDiscordServers();
    await seedTournaments();
    await seedLeaderboard();

    console.log("🎉 Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};
/// 👇 Just run it directly
seedDatabase();
