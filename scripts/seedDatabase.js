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
    "name": "Addictiveme",
    "country": "Ireland",
    "rating": 1446.0,
    "profileUrl": "https://www.aoe2insights.com/user/2158159/",
    "isActive": true
  },
  {
    "name": "Adthor",
    "country": "United States",
    "rating": 925.0,
    "profileUrl": "https://www.aoe2insights.com/user/13054248/",
    "isActive": true
  },
  {
    "name": "Airbudgoldenrec",
    "country": "United States",
    "rating": 1129.0,
    "profileUrl": "https://www.aoe2insights.com/user/11683000/",
    "isActive": true
  },
  {
    "name": "Akkal",
    "country": "Norway",
    "rating": 1295.0,
    "profileUrl": "https://www.aoe2insights.com/user/277869/",
    "isActive": true
  },
  {
    "name": "Alepsi",
    "country": "Argentina",
    "rating": 1221.0,
    "profileUrl": "https://www.aoe2insights.com/user/5791522/",
    "isActive": true
  },
  {
    "name": "AlexDonat",
    "country": "Romania",
    "rating": 1337.0,
    "profileUrl": "https://www.aoe2insights.com/user/8669401/",
    "isActive": true
  },
  {
    "name": "Alpha krit",
    "country": "United States",
    "rating": 1330.0,
    "profileUrl": "https://www.aoe2insights.com/user/9934717/",
    "isActive": true
  },
  {
    "name": "amon",
    "country": "United Kingdom",
    "rating": 1643.0,
    "profileUrl": "https://www.aoe2insights.com/user/233750/",
    "isActive": true
  },
  {
    "name": "Amokura",
    "country": "New Zealand",
    "rating": 1517.0,
    "profileUrl": "https://www.aoe2insights.com/user/11765693/",
    "isActive": true
  },
  {
    "name": "Apostic",
    "country": "United States",
    "rating": 1097.0,
    "profileUrl": "https://www.aoe2insights.com/user/4510278/",
    "isActive": true
  },
  {
    "name": "arwhal",
    "country": "United Kingdom",
    "rating": 1443.0,
    "profileUrl": "https://www.aoe2insights.com/user/10903621/",
    "isActive": true
  },
  {
    "name": "Ashoof",
    "country": "United States",
    "rating": 986.0,
    "profileUrl": "https://www.aoe2insights.com/user/13117300/",
    "isActive": true
  },
  {
    "name": "avlid",
    "country": "Sweden",
    "rating": 1913.0,
    "profileUrl": "https://www.aoe2insights.com/user/254645/",
    "isActive": true
  },
  {
    "name": "Beargwyn",
    "country": "Switzerland",
    "rating": 1171.0,
    "profileUrl": "https://www.aoe2insights.com/user/6859687/",
    "isActive": true
  },
  {
    "name": "Bender",
    "country": "Australia",
    "rating": 1686.0,
    "profileUrl": "https://www.aoe2insights.com/user/12517895/",
    "isActive": true
  },
  {
    "name": "Bishop",
    "country": "United States",
    "rating": 1089.0,
    "profileUrl": "https://www.aoe2insights.com/user/950113/",
    "isActive": true
  },
  {
    "name": "Black Lotus",
    "country": "Poland",
    "rating": 1649.0,
    "profileUrl": "https://www.aoe2insights.com/user/941790/",
    "isActive": true
  },
  {
    "name": "Bloomd",
    "country": "United States",
    "rating": 1824.0,
    "profileUrl": "https://www.aoe2insights.com/user/2239994/",
    "isActive": true
  },
  {
    "name": "BloodForTheSkyGod",
    "country": "Turkey",
    "rating": 1593.0,
    "profileUrl": "https://www.aoe2insights.com/user/2363846/",
    "isActive": true
  },
  {
    "name": "BoesBoes",
    "country": "Netherlands",
    "rating": 1384.0,
    "profileUrl": "https://www.aoe2insights.com/user/2010525/",
    "isActive": true
  },
  {
    "name": "Boarderdudeman",
    "country": "United States",
    "rating": 1513.0,
    "profileUrl": "https://www.aoe2insights.com/user/237994/",
    "isActive": true
  },
  {
    "name": "Breakfast",
    "country": "United Kingdom",
    "rating": 1924.0,
    "profileUrl": "https://www.aoe2insights.com/user/4851630/",
    "isActive": true
  },
  {
    "name": "Brydazi",
    "country": "United States",
    "rating": 1009.0,
    "profileUrl": "https://www.aoe2insights.com/user/12783556/",
    "isActive": true
  },
  {
    "name": "Bumbaloe",
    "country": "United States",
    "rating": 1081.0,
    "profileUrl": "https://www.aoe2insights.com/user/1722912/",
    "isActive": true
  },
  {
    "name": "Canttouchme",
    "country": "Germany",
    "rating": 1255.0,
    "profileUrl": "https://www.aoe2insights.com/user/1965270/",
    "isActive": true
  },
  {
    "name": "Charlies Alpaca",
    "country": "Australia",
    "rating": 1108.0,
    "profileUrl": "https://www.aoe2insights.com/user/5553104/",
    "isActive": true
  },
  {
    "name": "CheesecakeMasta",
    "country": "United States",
    "rating": 1545.0,
    "profileUrl": "https://www.aoe2insights.com/user/293313/",
    "isActive": true
  },
  {
    "name": "Chelbird",
    "country": "Austria",
    "rating": 1662.0,
    "profileUrl": "https://www.aoe2insights.com/user/2543478/",
    "isActive": true
  },
  {
    "name": "Chipmunk",
    "country": "Argentina",
    "rating": 1466.0,
    "profileUrl": "https://www.aoe2insights.com/user/282529/",
    "isActive": true
  },
  {
    "name": "Clarky0202",
    "country": "United Kingdom",
    "rating": 1209.0,
    "profileUrl": "https://www.aoe2insights.com/user/697097/",
    "isActive": true
  },
  {
    "name": "CoalTrain",
    "country": "United States",
    "rating": 1630.0,
    "profileUrl": "https://www.aoe2insights.com/user/1720213/",
    "isActive": true
  },
  {
    "name": "Code Name Raven",
    "country": "United States",
    "rating": 1300.0,
    "profileUrl": "https://www.aoe2insights.com/user/402345/",
    "isActive": true
  },
  {
    "name": "Comfrick",
    "country": "New Zealand",
    "rating": 1721.0,
    "profileUrl": "https://www.aoe2insights.com/user/6368551/",
    "isActive": true
  },
  {
    "name": "Cosminb",
    "country": "Romania",
    "rating": 1281.0,
    "profileUrl": "https://www.aoe2insights.com/user/4285252/",
    "isActive": true
  },
  {
    "name": "Cu5T05",
    "country": "Germany",
    "rating": 948.0,
    "profileUrl": "https://www.aoe2insights.com/user/792014/",
    "isActive": true
  },
  {
    "name": "Cyvarios",
    "country": "Canada",
    "rating": 1505.0,
    "profileUrl": "https://www.aoe2insights.com/user/9058532/",
    "isActive": true
  },
  {
    "name": "DaSwedishBeast",
    "country": "United States",
    "rating": 1069.0,
    "profileUrl": "https://www.aoe2insights.com/user/2479744/",
    "isActive": true
  },
  {
    "name": "Dashermin",
    "country": "United States",
    "rating": 1223.0,
    "profileUrl": "https://www.aoe2insights.com/user/6073178/",
    "isActive": true
  },
  {
    "name": "Dasein",
    "country": "Costa Rica",
    "rating": 1078.0,
    "profileUrl": "https://www.aoe2insights.com/user/312182/",
    "isActive": true
  },
  {
    "name": "Dawn",
    "country": "Germany",
    "rating": 1560.0,
    "profileUrl": "https://www.aoe2insights.com/user/12202531/",
    "isActive": true
  },
  {
    "name": "Dhruv47",
    "country": "India",
    "rating": 826.0,
    "profileUrl": "https://www.aoe2insights.com/user/10510225/",
    "isActive": true
  },
  {
    "name": "Dio_roja",
    "country": "Finland",
    "rating": 1638.0,
    "profileUrl": "https://www.aoe2insights.com/user/2439151/",
    "isActive": true
  },
  {
    "name": "Dodo3011",
    "country": "Germany",
    "rating": 1616.0,
    "profileUrl": "https://www.aoe2insights.com/user/12559976/",
    "isActive": true
  },
  {
    "name": "DomHUSK",
    "country": "Ireland",
    "rating": 1358.0,
    "profileUrl": "https://www.aoe2insights.com/user/3306988/",
    "isActive": true
  },
  {
    "name": "Dracarna",
    "country": "United Kingdom",
    "rating": 1004.0,
    "profileUrl": "https://www.aoe2insights.com/user/1394115/",
    "isActive": true
  },
  {
    "name": "DrLoops",
    "country": "United Kingdom",
    "rating": 1893.0,
    "profileUrl": "https://www.aoe2insights.com/user/3903933/",
    "isActive": true
  },
  {
    "name": "Duhak.Natria",
    "country": "Ukraine",
    "rating": 1370.0,
    "profileUrl": "https://www.aoe2insights.com/user/13060828/",
    "isActive": true
  },
  {
    "name": "Eden",
    "country": "Canada",
    "rating": 1640.0,
    "profileUrl": "https://www.aoe2insights.com/user/12592487/",
    "isActive": true
  },
  {
    "name": "El CivettaDiTozzi",
    "country": "Italy",
    "rating": 1301.0,
    "profileUrl": "https://www.aoe2insights.com/user/229416/",
    "isActive": true
  },
  {
    "name": "El Latigo",
    "country": "Argentina",
    "rating": 1207.0,
    "profileUrl": "https://www.aoe2insights.com/user/2770291/",
    "isActive": true
  },
  {
    "name": "El Mikalos",
    "country": "United Kingdom",
    "rating": 1357.0,
    "profileUrl": "https://www.aoe2insights.com/user/12594426/",
    "isActive": true
  },
  {
    "name": "EmperorNoob97",
    "country": "United Kingdom",
    "rating": 992.0,
    "profileUrl": "https://www.aoe2insights.com/user/5422400/",
    "isActive": true
  },
  {
    "name": "Emp. Peter",
    "country": "Netherlands",
    "rating": 1181.0,
    "profileUrl": "https://www.aoe2insights.com/user/2558975/",
    "isActive": true
  },
  {
    "name": "Enki",
    "country": "Germany",
    "rating": 869.0,
    "profileUrl": "https://www.aoe2insights.com/user/1639985/",
    "isActive": true
  },
  {
    "name": "EnnoVonDerTanke",
    "country": "Germany",
    "rating": 1140.0,
    "profileUrl": "https://www.aoe2insights.com/user/9649575/",
    "isActive": true
  },
  {
    "name": "Escalus",
    "country": "United States",
    "rating": 1812.0,
    "profileUrl": "https://www.aoe2insights.com/user/757980/",
    "isActive": true
  },
  {
    "name": "Ezioauditore0109",
    "country": "Colombia",
    "rating": 1285.0,
    "profileUrl": "https://www.aoe2insights.com/user/13124087/",
    "isActive": true
  },
  {
    "name": "Fgzb",
    "country": "United States",
    "rating": 1220.0,
    "profileUrl": "https://www.aoe2insights.com/user/13045745/",
    "isActive": true
  },
  {
    "name": "Firmatt",
    "country": "Czechia",
    "rating": 1237.0,
    "profileUrl": "https://www.aoe2insights.com/user/12858284/",
    "isActive": true
  },
  {
    "name": "Fishmanoli",
    "country": "Australia",
    "rating": 1148.0,
    "profileUrl": "https://www.aoe2insights.com/user/295020/",
    "isActive": true
  },
  {
    "name": "FiveCatsATrebuchetAndADream",
    "country": "United States",
    "rating": 1080.0,
    "profileUrl": "https://www.aoe2insights.com/user/9705242/",
    "isActive": true
  },
  {
    "name": "Fj5589",
    "country": "Argentina",
    "rating": 1003.0,
    "profileUrl": "https://www.aoe2insights.com/user/5830463/",
    "isActive": true
  },
  {
    "name": "FloosWorld",
    "country": "Germany",
    "rating": 886.0,
    "profileUrl": "https://www.aoe2insights.com/user/1349/",
    "isActive": true
  },
  {
    "name": "Flan Implacable",
    "country": "Spain",
    "rating": 1019.0,
    "profileUrl": "https://www.aoe2insights.com/user/393242/",
    "isActive": true
  },
  {
    "name": "Flying Mouse",
    "country": "Germany",
    "rating": 1560.0,
    "profileUrl": "https://www.aoe2insights.com/user/227587/",
    "isActive": true
  },
  {
    "name": "Fuegan33",
    "country": "France",
    "rating": 1576.0,
    "profileUrl": "https://www.aoe2insights.com/user/880156/",
    "isActive": true
  },
  {
    "name": "Ganjiix",
    "country": "United Kingdom",
    "rating": 1486.0,
    "profileUrl": "https://www.aoe2insights.com/user/2082547/",
    "isActive": true
  },
  {
    "name": "Gilli0315",
    "country": "Netherlands",
    "rating": 1104.0,
    "profileUrl": "https://www.aoe2insights.com/user/10377768/",
    "isActive": true
  },
  {
    "name": "Genoese Crossbowman",
    "country": "Argentina",
    "rating": 1595.0,
    "profileUrl": "https://www.aoe2insights.com/user/270569/",
    "isActive": true
  },
  {
    "name": "GeneralOcto",
    "country": "Austria",
    "rating": 1001.0,
    "profileUrl": "https://www.aoe2insights.com/user/12448049/",
    "isActive": true
  },
  {
    "name": "GeneralWakka",
    "country": "United States",
    "rating": 1437.0,
    "profileUrl": "https://www.aoe2insights.com/user/1226225/",
    "isActive": true
  },
  {
    "name": "Geologywade",
    "country": "United Kingdom",
    "rating": 1441.0,
    "profileUrl": "https://www.aoe2insights.com/user/1858991/",
    "isActive": true
  },
  {
    "name": "Ghostwriter39",
    "country": "United States",
    "rating": 1531.0,
    "profileUrl": "https://www.aoe2insights.com/user/12675701/",
    "isActive": true
  },
  {
    "name": "Gil",
    "country": "Australia",
    "rating": 1524.0,
    "profileUrl": "https://www.aoe2insights.com/user/330481/",
    "isActive": true
  },
  {
    "name": "Gonzaleki",
    "country": "Argentina",
    "rating": 1474.0,
    "profileUrl": "https://www.aoe2insights.com/user/12706469/",
    "isActive": true
  },
  {
    "name": "GwizdeK",
    "country": "Poland",
    "rating": 1301.0,
    "profileUrl": "https://www.aoe2insights.com/user/245082/",
    "isActive": true
  },
  {
    "name": "Hagenhagen",
    "country": "Czechia",
    "rating": 1337.0,
    "profileUrl": "https://www.aoe2insights.com/user/10002260/",
    "isActive": true
  },
  {
    "name": "Happytheandy",
    "country": "United Kingdom",
    "rating": 1855.0,
    "profileUrl": "https://www.aoe2insights.com/user/2397632/",
    "isActive": true
  },
  {
    "name": "Hestia",
    "country": "China",
    "rating": 1707.0,
    "profileUrl": "https://www.aoe2insights.com/user/230265/",
    "isActive": true
  },
  {
    "name": "Hoppsy",
    "country": "United Kingdom",
    "rating": 1552.0,
    "profileUrl": "https://www.aoe2insights.com/user/456135/",
    "isActive": true
  },
  {
    "name": "Hornet-Wing",
    "country": "United Kingdom",
    "rating": 1204.0,
    "profileUrl": "https://www.aoe2insights.com/user/272604/",
    "isActive": true
  },
  {
    "name": "Hoyohoyo9",
    "country": "United States",
    "rating": 1588.0,
    "profileUrl": "https://www.aoe2insights.com/user/237553/",
    "isActive": true
  },
  {
    "name": "Huggie",
    "country": "United Kingdom",
    "rating": 1620.0,
    "profileUrl": "https://www.aoe2insights.com/user/89053/",
    "isActive": true
  },
  {
    "name": "Init2winek",
    "country": "United States",
    "rating": 992.0,
    "profileUrl": "https://www.aoe2insights.com/user/1265221/",
    "isActive": true
  },
  {
    "name": "JagWarrior",
    "country": "France",
    "rating": 1523.0,
    "profileUrl": "https://www.aoe2insights.com/user/11471863/",
    "isActive": true
  },
  {
    "name": "Janchez",
    "country": "Germany",
    "rating": 1305.0,
    "profileUrl": "https://www.aoe2insights.com/user/5578711/",
    "isActive": true
  },
  {
    "name": "JawolopingChris",
    "country": "United States",
    "rating": 1680.0,
    "profileUrl": "https://www.aoe2insights.com/user/303604/",
    "isActive": true
  },
  {
    "name": "Javisty",
    "country": "France",
    "rating": 1784.0,
    "profileUrl": "https://www.aoe2insights.com/user/392423/",
    "isActive": true
  },
  {
    "name": "Joey the Bonqueror",
    "country": "United Kingdom",
    "rating": 1784.0,
    "profileUrl": "https://www.aoe2insights.com/user/300848/",
    "isActive": true
  },
  {
    "name": "Jon",
    "country": "United States",
    "rating": 1286.0,
    "profileUrl": "https://www.aoe2insights.com/user/6073899/",
    "isActive": true
  },
  {
    "name": "Josenblad",
    "country": "United States",
    "rating": 1260.0,
    "profileUrl": "https://www.aoe2insights.com/user/92277/",
    "isActive": true
  },
  {
    "name": "J0N-PERKiNS",
    "country": "United Kingdom",
    "rating": 1563.0,
    "profileUrl": "https://www.aoe2insights.com/user/3582838/",
    "isActive": true
  },
  {
    "name": "Jskillz",
    "country": "United States",
    "rating": 1711.0,
    "profileUrl": "https://www.aoe2insights.com/user/2363000/",
    "isActive": true
  },
  {
    "name": "Judean People's Front",
    "country": "Switzerland",
    "rating": 1073.0,
    "profileUrl": "https://www.aoe2insights.com/user/554997/",
    "isActive": true
  },
  {
    "name": "Kakabsen",
    "country": "Poland",
    "rating": 1367.0,
    "profileUrl": "https://www.aoe2insights.com/user/12784217/",
    "isActive": true
  },
  {
    "name": "Kiki da Foxvoid (Mikikki)",
    "country": "United Kingdom",
    "rating": 1008.0,
    "profileUrl": "https://www.aoe2insights.com/user/12563061/",
    "isActive": true
  },
  {
    "name": "Kisiel",
    "country": "Poland",
    "rating": 1402.0,
    "profileUrl": "https://www.aoe2insights.com/user/8996251/",
    "isActive": true
  },
  {
    "name": "Kitty",
    "country": "United Kingdom",
    "rating": 961.0,
    "profileUrl": "https://www.aoe2insights.com/user/12804586/",
    "isActive": true
  },
  {
    "name": "KoaLollo",
    "country": "Italy",
    "rating": 1119.0,
    "profileUrl": "https://www.aoe2insights.com/user/10162879/",
    "isActive": true
  },
  {
    "name": "Koti",
    "country": "France",
    "rating": 1646.0,
    "profileUrl": "https://www.aoe2insights.com/user/4033024/",
    "isActive": true
  },
  {
    "name": "Kruppe",
    "country": "United States",
    "rating": 1230.0,
    "profileUrl": "https://www.aoe2insights.com/user/449982/",
    "isActive": true
  },
  {
    "name": "Kubya",
    "country": "Sweden",
    "rating": 1464.0,
    "profileUrl": "https://www.aoe2insights.com/user/15780/",
    "isActive": true
  },
  {
    "name": "Lamo",
    "country": "Latvia",
    "rating": 2336.0,
    "profileUrl": "https://www.aoe2insights.com/user/5188554/",
    "isActive": true
  },
  {
    "name": "Lartibro",
    "country": "United States",
    "rating": 1002.0,
    "profileUrl": "https://www.aoe2insights.com/user/12649900/",
    "isActive": true
  },
  {
    "name": "Levana",
    "country": "Belgium",
    "rating": 1045.0,
    "profileUrl": "https://www.aoe2insights.com/user/1399661/",
    "isActive": true
  },
  {
    "name": "Lheodoric",
    "country": "France",
    "rating": 1349.0,
    "profileUrl": "https://www.aoe2insights.com/user/12164510/",
    "isActive": true
  },
  {
    "name": "Lord Benji",
    "country": "United States",
    "rating": 1255.0,
    "profileUrl": "https://www.aoe2insights.com/user/1859305/",
    "isActive": true
  },
  {
    "name": "Lovee",
    "country": "India",
    "rating": 1678.0,
    "profileUrl": "https://www.aoe2insights.com/user/1041133/",
    "isActive": true
  },
  {
    "name": "Lukam10",
    "country": "China",
    "rating": 1136.0,
    "profileUrl": "https://www.aoe2insights.com/user/13099567/",
    "isActive": true
  },
  {
    "name": "Macklez",
    "country": "United States",
    "rating": 1367.0,
    "profileUrl": "https://www.aoe2insights.com/user/2311389/",
    "isActive": true
  },
  {
    "name": "Madbun",
    "country": "Ireland",
    "rating": 1063.0,
    "profileUrl": "https://www.aoe2insights.com/user/381651/",
    "isActive": true
  },
  {
    "name": "MajorTawm",
    "country": "Guatemala",
    "rating": 1291.0,
    "profileUrl": "https://www.aoe2insights.com/user/2963781/",
    "isActive": true
  },
  {
    "name": "Majormelancholy",
    "country": "India",
    "rating": 1022.0,
    "profileUrl": "https://www.aoe2insights.com/user/2471138/",
    "isActive": true
  },
  {
    "name": "MarmotteQuantique",
    "country": "France",
    "rating": 1463.0,
    "profileUrl": "https://www.aoe2insights.com/user/641/",
    "isActive": true
  },
  {
    "name": "Matze",
    "country": "Germany",
    "rating": 2130.0,
    "profileUrl": "https://www.aoe2insights.com/user/13123606/",
    "isActive": true
  },
  {
    "name": "Mathmagician",
    "country": "Germany",
    "rating": 1209.0,
    "profileUrl": "https://www.aoe2insights.com/user/4845480/",
    "isActive": true
  },
  {
    "name": "Maxpower973",
    "country": "Italy",
    "rating": 1648.0,
    "profileUrl": "https://www.aoe2insights.com/user/2320032/",
    "isActive": true
  },
  {
    "name": "Maxymczech",
    "country": "Czechia",
    "rating": 1526.0,
    "profileUrl": "https://www.aoe2insights.com/user/5813618/",
    "isActive": true
  },
  {
    "name": "Mercurial",
    "country": "Russia",
    "rating": 1633.0,
    "profileUrl": "https://www.aoe2insights.com/user/1272377/",
    "isActive": true
  },
  {
    "name": "Meshuggle",
    "country": "Germany",
    "rating": 1086.0,
    "profileUrl": "https://www.aoe2insights.com/user/12730545/",
    "isActive": true
  },
  {
    "name": "Metalmania",
    "country": "Argentina",
    "rating": 1559.0,
    "profileUrl": "https://www.aoe2insights.com/user/12434787/",
    "isActive": true
  },
  {
    "name": "MightySpaceFruit",
    "country": "United States",
    "rating": 1884.0,
    "profileUrl": "https://www.aoe2insights.com/user/12772982/",
    "isActive": true
  },
  {
    "name": "MonkeyJuggler",
    "country": "Switzerland",
    "rating": 1003.0,
    "profileUrl": "https://www.aoe2insights.com/user/4351574/",
    "isActive": true
  },
  {
    "name": "NeoZz",
    "country": "France",
    "rating": 2374.0,
    "profileUrl": "https://www.aoe2insights.com/user/11275434/",
    "isActive": true
  },
  {
    "name": "Nessius Blaze",
    "country": "Hungary",
    "rating": 1380.0,
    "profileUrl": "https://www.aoe2insights.com/user/12094556/",
    "isActive": true
  },
  {
    "name": "Nope1585",
    "country": "India",
    "rating": 1398.0,
    "profileUrl": "https://www.aoe2insights.com/user/5968579/",
    "isActive": true
  },
  {
    "name": "Nutty",
    "country": "Norway",
    "rating": 1259.0,
    "profileUrl": "https://www.aoe2insights.com/user/11720179/",
    "isActive": true
  },
  {
    "name": "OrangeMamba",
    "country": "United States",
    "rating": 1232.0,
    "profileUrl": "https://www.aoe2insights.com/user/648585/",
    "isActive": true
  },
  {
    "name": "Ozziey",
    "country": "Netherlands",
    "rating": 1205.0,
    "profileUrl": "https://www.aoe2insights.com/user/1530786/",
    "isActive": true
  },
  {
    "name": "Paapi",
    "country": "Slovakia",
    "rating": 1417.0,
    "profileUrl": "https://www.aoe2insights.com/user/503998/",
    "isActive": true
  },
  {
    "name": "Painter",
    "country": "United States",
    "rating": 1517.0,
    "profileUrl": "https://www.aoe2insights.com/user/4850176/",
    "isActive": true
  },
  {
    "name": "Pasta",
    "country": "France",
    "rating": 1300.0,
    "profileUrl": "https://www.aoe2insights.com/user/1111750/",
    "isActive": true
  },
  {
    "name": "Pete26196",
    "country": "United Kingdom",
    "rating": 1768.0,
    "profileUrl": "https://www.aoe2insights.com/user/275448/",
    "isActive": true
  },
  {
    "name": "Phoenix Oath",
    "country": "United States",
    "rating": 1756.0,
    "profileUrl": "https://www.aoe2insights.com/user/305008/",
    "isActive": true
  },
  {
    "name": "Pisty",
    "country": "Argentina",
    "rating": 1417.0,
    "profileUrl": "https://www.aoe2insights.com/user/2798038/",
    "isActive": true
  },
  {
    "name": "Pl0tterGhost",
    "country": "Netherlands",
    "rating": 1545.0,
    "profileUrl": "https://www.aoe2insights.com/user/375383/",
    "isActive": true
  },
  {
    "name": "Player123",
    "country": "Italy",
    "rating": 1273.0,
    "profileUrl": "https://www.aoe2insights.com/user/1137204/",
    "isActive": true
  },
  {
    "name": "PrinceFinnik",
    "country": "United States",
    "rating": 1111.0,
    "profileUrl": "https://www.aoe2insights.com/user/2637747/",
    "isActive": true
  },
  {
    "name": "Pride",
    "country": "Malta",
    "rating": 1226.0,
    "profileUrl": "https://www.aoe2insights.com/user/5634917/",
    "isActive": true
  },
  {
    "name": "PsychedelicTDog",
    "country": "United States",
    "rating": 1095.0,
    "profileUrl": "https://www.aoe2insights.com/user/13150242/",
    "isActive": true
  },
  {
    "name": "PygmyGiant",
    "country": "United States",
    "rating": 1209.0,
    "profileUrl": "https://www.aoe2insights.com/user/5522724/",
    "isActive": true
  },
  {
    "name": "Ragnarthetueton",
    "country": "United States",
    "rating": 1228.0,
    "profileUrl": "https://www.aoe2insights.com/user/6270231/",
    "isActive": true
  },
  {
    "name": "Rameranic",
    "country": "United States",
    "rating": 1227.0,
    "profileUrl": "https://www.aoe2insights.com/user/3064960/",
    "isActive": true
  },
  {
    "name": "Ranzunn",
    "country": "United States",
    "rating": 1471.0,
    "profileUrl": "https://www.aoe2insights.com/user/1971123/",
    "isActive": true
  },
  {
    "name": "Raudius",
    "country": "Netherlands",
    "rating": 1129.0,
    "profileUrl": "https://www.aoe2insights.com/user/285711/",
    "isActive": true
  },
  {
    "name": "Rayz",
    "country": "Taiwan",
    "rating": 2322.0,
    "profileUrl": "https://www.aoe2insights.com/user/12268569/",
    "isActive": true
  },
  {
    "name": "RealTHF",
    "country": "United States",
    "rating": 1367.0,
    "profileUrl": "https://www.aoe2insights.com/user/1214206/",
    "isActive": true
  },
  {
    "name": "Rebekah",
    "country": "United States",
    "rating": 1293.0,
    "profileUrl": "https://www.aoe2insights.com/user/1278251/",
    "isActive": true
  },
  {
    "name": "Rbase96",
    "country": "Netherlands",
    "rating": 1614.0,
    "profileUrl": "https://www.aoe2insights.com/user/2787704/",
    "isActive": true
  },
  {
    "name": "RDO_AOE2",
    "country": "United Kingdom",
    "rating": 871.0,
    "profileUrl": "https://www.aoe2insights.com/user/5672310/",
    "isActive": true
  },
  {
    "name": "Ricky_ld",
    "country": "Austria",
    "rating": 1152.0,
    "profileUrl": "https://www.aoe2insights.com/user/5172877/",
    "isActive": true
  },
  {
    "name": "Risendragon Gaming",
    "country": "United States",
    "rating": 611.0,
    "profileUrl": "https://www.aoe2insights.com/user/12864690/",
    "isActive": true
  },
  {
    "name": "Robin5hood",
    "country": "Poland",
    "rating": 1465.0,
    "profileUrl": "https://www.aoe2insights.com/user/369054/",
    "isActive": true
  },
  {
    "name": "Roon Osricson",
    "country": "United States",
    "rating": 1228.0,
    "profileUrl": "https://www.aoe2insights.com/user/189537/",
    "isActive": true
  },
  {
    "name": "Row row your boat",
    "country": "United States",
    "rating": 1562.0,
    "profileUrl": "https://www.aoe2insights.com/user/524610/",
    "isActive": true
  },
  {
    "name": "Royalewithcheese",
    "country": "Netherlands",
    "rating": 1199.0,
    "profileUrl": "https://www.aoe2insights.com/user/3222983/",
    "isActive": true
  },
  {
    "name": "Sandland",
    "country": "Denmark",
    "rating": 1698.0,
    "profileUrl": "https://www.aoe2insights.com/user/787064/",
    "isActive": true
  },
  {
    "name": "Satellites of Heaven",
    "country": "United Kingdom",
    "rating": 1425.0,
    "profileUrl": "https://www.aoe2insights.com/user/4985036/",
    "isActive": true
  },
  {
    "name": "Scipio",
    "country": "France",
    "rating": 1318.0,
    "profileUrl": "https://www.aoe2insights.com/user/66145/",
    "isActive": true
  },
  {
    "name": "Seb",
    "country": "United Kingdom",
    "rating": 1717.0,
    "profileUrl": "https://www.aoe2insights.com/user/5405126/",
    "isActive": true
  },
  {
    "name": "Selava",
    "country": "Spain",
    "rating": 1421.0,
    "profileUrl": "https://www.aoe2insights.com/user/6400696/",
    "isActive": true
  },
  {
    "name": "SenorBonas",
    "country": "Belgium",
    "rating": 1318.0,
    "profileUrl": "https://www.aoe2insights.com/user/248524/",
    "isActive": true
  },
  {
    "name": "Shashlyk",
    "country": "Poland",
    "rating": 1717.0,
    "profileUrl": "https://www.aoe2insights.com/user/685782/",
    "isActive": true
  },
  {
    "name": "Shibani",
    "country": "Brazil",
    "rating": 1246.0,
    "profileUrl": "https://www.aoe2insights.com/user/11718075/",
    "isActive": true
  },
  {
    "name": "SilverEclipse",
    "country": "United States",
    "rating": 929.0,
    "profileUrl": "https://www.aoe2insights.com/user/5581979/",
    "isActive": true
  },
  {
    "name": "SimpleMint",
    "country": "Bahrain",
    "rating": 1244.0,
    "profileUrl": "https://www.aoe2insights.com/user/2941867/",
    "isActive": true
  },
  {
    "name": "Skinwimmel",
    "country": "United States",
    "rating": 1163.0,
    "profileUrl": "https://www.aoe2insights.com/user/215522/",
    "isActive": true
  },
  {
    "name": "Soxs",
    "country": "United States",
    "rating": 1490.0,
    "profileUrl": "https://www.aoe2insights.com/user/2972583/",
    "isActive": true
  },
  {
    "name": "Spaz the Adventurer",
    "country": "Canada",
    "rating": 1525.0,
    "profileUrl": "https://www.aoe2insights.com/user/3582974/",
    "isActive": true
  },
  {
    "name": "SpiritOfTheUniverse",
    "country": "Germany",
    "rating": 1073.0,
    "profileUrl": "https://www.aoe2insights.com/user/4040905/",
    "isActive": true
  },
  {
    "name": "Splattcol",
    "country": "Colombia",
    "rating": 1595.0,
    "profileUrl": "https://www.aoe2insights.com/user/2406441/",
    "isActive": true
  },
  {
    "name": "Strato",
    "country": "United States",
    "rating": 1473.0,
    "profileUrl": "https://www.aoe2insights.com/user/11682569/",
    "isActive": true
  },
  {
    "name": "Syagrius",
    "country": "France",
    "rating": 968.0,
    "profileUrl": "https://www.aoe2insights.com/user/4515093/",
    "isActive": true
  },
  {
    "name": "Szotyesz",
    "country": "Hungary",
    "rating": 1375.0,
    "profileUrl": "https://www.aoe2insights.com/user/232247/",
    "isActive": true
  },
  {
    "name": "T-Money",
    "country": "United States",
    "rating": 1096.0,
    "profileUrl": "https://www.aoe2insights.com/user/12158425/",
    "isActive": true
  },
  {
    "name": "Tanghay",
    "country": "France",
    "rating": 1323.0,
    "profileUrl": "https://www.aoe2insights.com/user/12965927/",
    "isActive": true
  },
  {
    "name": "The Chancellor",
    "country": "United Kingdom",
    "rating": 1654.0,
    "profileUrl": "https://www.aoe2insights.com/user/253973/",
    "isActive": true
  },
  {
    "name": "The Gardener",
    "country": "United States",
    "rating": 1234.0,
    "profileUrl": "https://www.aoe2insights.com/user/10764180/",
    "isActive": true
  },
  {
    "name": "The Night",
    "country": "Switzerland",
    "rating": 1328.0,
    "profileUrl": "https://www.aoe2insights.com/user/255714/",
    "isActive": true
  },
  {
    "name": "The Sleepy Bishop",
    "country": "India",
    "rating": 1756.0,
    "profileUrl": "https://www.aoe2insights.com/user/1030992/",
    "isActive": true
  },
  {
    "name": "The Wyandotte",
    "country": "United States",
    "rating": 1373.0,
    "profileUrl": "https://www.aoe2insights.com/user/6801447/",
    "isActive": true
  },
  {
    "name": "Thedissapointedinvader",
    "country": "Australia",
    "rating": 1718.0,
    "profileUrl": "https://www.aoe2insights.com/user/336892/",
    "isActive": true
  },
  {
    "name": "Thespicysicillian",
    "country": "United States",
    "rating": 1116.0,
    "profileUrl": "https://www.aoe2insights.com/user/9137593/",
    "isActive": true
  },
  {
    "name": "Tiltstars",
    "country": "Germany",
    "rating": 1352.0,
    "profileUrl": "https://www.aoe2insights.com/user/2627145/",
    "isActive": true
  },
  {
    "name": "TomAquinas",
    "country": "United States",
    "rating": 1331.0,
    "profileUrl": "https://www.aoe2insights.com/user/11670083/",
    "isActive": true
  },
  {
    "name": "Totillathehun",
    "country": "United States",
    "rating": 1138.0,
    "profileUrl": "https://www.aoe2insights.com/user/4820637/",
    "isActive": true
  },
  {
    "name": "TrickyMicky90",
    "country": "Australia",
    "rating": 1464.0,
    "profileUrl": "https://www.aoe2insights.com/user/3083636/",
    "isActive": true
  },
  {
    "name": "Twopenny Hangover",
    "country": "Poland",
    "rating": 1305.0,
    "profileUrl": "https://www.aoe2insights.com/user/4481462/",
    "isActive": true
  },
  {
    "name": "Tuss",
    "country": "France",
    "rating": 1885.0,
    "profileUrl": "https://www.aoe2insights.com/user/1242469/",
    "isActive": true
  },
  {
    "name": "Validus87",
    "country": "United Kingdom",
    "rating": 807.0,
    "profileUrl": "https://www.aoe2insights.com/user/13166108/",
    "isActive": true
  },
  {
    "name": "Volunteer Dominos® Employee",
    "country": "Canada",
    "rating": 1363.0,
    "profileUrl": "https://www.aoe2insights.com/user/2567136/",
    "isActive": true
  },
  {
    "name": "Vomastek",
    "country": "Czech Republic",
    "rating": 1565.0,
    "profileUrl": "https://www.aoe2insights.com/user/1104040/",
    "isActive": true
  },
  {
    "name": "Wait...What?",
    "country": "United States",
    "rating": 1077.0,
    "profileUrl": "https://www.aoe2insights.com/user/12531213/",
    "isActive": true
  },
  {
    "name": "Warchief_Link",
    "country": "Colombia",
    "rating": 1035.0,
    "profileUrl": "https://www.aoe2insights.com/user/3446799/",
    "isActive": true
  },
  {
    "name": "Whyza",
    "country": "Poland",
    "rating": 1042.0,
    "profileUrl": "https://www.aoe2insights.com/user/16309/",
    "isActive": true
  },
  {
    "name": "Willdbeast",
    "country": "United Kingdom",
    "rating": 1762.0,
    "profileUrl": "https://www.aoe2insights.com/user/278329/",
    "isActive": true
  },
  {
    "name": "Witty_matty",
    "country": "Poland",
    "rating": 1401.0,
    "profileUrl": "https://www.aoe2insights.com/user/10667559/",
    "isActive": true
  },
  {
    "name": "Xardas_AOE",
    "country": "Germany",
    "rating": 1469.0,
    "profileUrl": "https://www.aoe2insights.com/user/186332/",
    "isActive": true
  },
  {
    "name": "Xolotl",
    "country": "United Kingdom",
    "rating": 1561.0,
    "profileUrl": "https://www.aoe2insights.com/user/3043685/",
    "isActive": true
  },
  {
    "name": "xRavyn",
    "country": "Armenia",
    "rating": 1554.0,
    "profileUrl": "https://www.aoe2insights.com/user/6242021/",
    "isActive": true
  },
  {
    "name": "Yany",
    "country": "Hungary",
    "rating": 1162.0,
    "profileUrl": "https://www.aoe2insights.com/user/1930/",
    "isActive": true
  },
  {
    "name": "Zark23",
    "country": "Canada",
    "rating": 1323.0,
    "profileUrl": "https://www.aoe2insights.com/user/5284914/",
    "isActive": true
  },
  {
    "name": "King_Boo",
    "country": "United Kingdom",
    "rating": 2154,
    "profileUrl": "https://www.aoe2insights.com/user/180520",
    "isActive": true
  },
  {
    "name": "randy pan",
    "country": "Canada",
    "rating": 1682,
    "profileUrl": "https://www.aoe2insights.com/user/1070306",
    "isActive": true
  },
  {
    "name": "Meh247",
    "country": "United States",
    "rating": 1675,
    "profileUrl": "https://www.aoe2insights.com/user/529262",
    "isActive": true
  },
  {
    "name": "1Sh0t",
    "country": "Canada",
    "rating": 1460,
    "profileUrl": "https://www.aoe2insights.com/user/9319174",
    "isActive": true
  },
  {
    "name": "Chris",
    "country": "United States",
    "rating": 1438,
    "profileUrl": "https://www.aoe2insights.com/user/11769331",
    "isActive": true
  },
  {
    "name": "McNuggets",
    "country": "Switzerland",
    "rating": 1294,
    "profileUrl": "https://www.aoe2insights.com/user/334334",
    "isActive": true
  },
  {
    "name": "aje.omar",
    "country": "Mexico",
    "rating": 1245,
    "profileUrl": "https://www.aoe2insights.com/user/9189507",
    "isActive": true
  },
  {
    "name": "grapejuice",
    "country": "Australia",
    "rating": 1207,
    "profileUrl": "https://www.aoe2insights.com/user/11688652",
    "isActive": true
  },
  {
    "name": "Laurie",
    "country": "United Kingdom",
    "rating": 1200,
    "profileUrl": "https://www.aoe2insights.com/user/243944",
    "isActive": true
  },
  {
    "name": "Fairytale Belkross",
    "country": "France",
    "rating": 1187,
    "profileUrl": "https://www.aoe2insights.com/user/1370771",
    "isActive": true
  },
  {
    "name": "Forteraiger",
    "country": "Ukraine",
    "rating": 1142,
    "profileUrl": "https://www.aoe2insights.com/user/13285902",
    "isActive": true
  },
  {
    "name": "Smithers",
    "country": "Sweden",
    "rating": 1173,
    "profileUrl": "https://www.aoe2insights.com/user/1304628",
    "isActive": true
  },
  {
    "name": "SoleZebrafish",
    "country": "United States",
    "rating": 1061,
    "profileUrl": "https://www.aoe2insights.com/user/2650734",
    "isActive": true
  },
  {
    "name": "Forkan Rick",
    "country": "United States",
    "rating": 1077,
    "profileUrl": "https://www.aoe2insights.com/user/2363867",
    "isActive": true
  },
  {
    "name": "marathaSun",
    "country": "India",
    "rating": 1081,
    "profileUrl": "https://www.aoe2insights.com/user/2543215",
    "isActive": true
  },
  {
    "name": "Jasuni",
    "country": "United States",
    "rating": 1057,
    "profileUrl": "https://www.aoe2insights.com/user/1464223",
    "isActive": true
  },
  {
    "name": "QuailzEnFire903",
    "country": "United States",
    "rating": 1034,
    "profileUrl": "https://www.aoe2insights.com/user/12964183",
    "isActive": true
  },
  {
    "name": "Nagraj",
    "country": "India",
    "rating": 1007,
    "profileUrl": "https://www.aoe2insights.com/user/6903668",
    "isActive": true
  },
  {
    "name": "Fairytale Fox",
    "country": "Canada",
    "rating": 908,
    "profileUrl": "https://www.aoe2insights.com/user/4662319",
    "isActive": true
  },
  {
    "name": "schmabenkl",
    "country": "Germany",
    "rating": 924,
    "profileUrl": "https://www.aoe2insights.com/user/1880713",
    "isActive": true
  },
  {
    "name": "Crystella",
    "country": "United Kingdom",
    "rating": 790,
    "profileUrl": "https://www.aoe2insights.com/user/3892549",
    "isActive": true
  },
  {
    "name": "Rodrixs Black Reaper",
    "country": "Argentina",
    "rating": 2376,
    "profileUrl": "https://www.aoe2insights.com/user/11440407",
    "isActive": true
  },
  {
    "name": "wR.Prisma",
    "country": "Argentina",
    "rating": 2502,
    "profileUrl": "https://www.aoe2insights.com/user/3176045",
    "isActive": true
  },
  {
    "name": "DS_Ozone",
    "country": "Colombia",
    "rating": 2536,
    "profileUrl": "https://www.aoe2insights.com/user/2654577",
    "isActive": true
  },
  {
    "name": "T90Official",
    "country": "United States",
    "rating": 2359,
    "profileUrl": "https://www.aoe2insights.com/user/197930",
    "isActive": true
  },
  {
    "name": "NOC | Wean Dinchester",
    "country": "Germany",
    "rating": 2321,
    "profileUrl": "https://www.aoe2insights.com/user/300565",
    "isActive": true
  },
  {
    "name": "OS+ | shiXo.#",
    "country": "Germany",
    "rating": 2216,
    "profileUrl": "https://www.aoe2insights.com/user/1137086",
    "isActive": true
  },
  {
    "name": "DarK | Benanji",
    "country": "Germany",
    "rating": 2400,
    "profileUrl": "https://www.aoe2insights.com/user/2463959",
    "isActive": true
  },
  {
    "name": "NuMa | AngelR",
    "country": "Colombia",
    "rating": 2200,
    "profileUrl": "https://www.aoe2insights.com/user/6838238",
    "isActive": true
  },
  {
    "name": "OLADUSHEK",
    "country": "Belarus",
    "rating": 2104,
    "profileUrl": "https://www.aoe2insights.com/user/1853187",
    "isActive": true
  },
  {
    "name": "[GLD] Abu abdullah",
    "country": "Saudi Arabia",
    "rating": 2166,
    "profileUrl": "https://www.aoe2insights.com/user/5839022",
    "isActive": true
  },
  {
    "name": "RoR | Bourbon",
    "country": "Russia",
    "rating": 1978,
    "profileUrl": "https://www.aoe2insights.com/user/1877180",
    "isActive": true
  },
  {
    "name": "Umdeuter",
    "country": "Germany",
    "rating": 1790,
    "profileUrl": "https://www.aoe2insights.com/user/249384",
    "isActive": true
  },
  {
    "name": "Auriko",
    "country": "France",
    "rating": 1731,
    "profileUrl": "https://www.aoe2insights.com/user/12642909",
    "isActive": true
  },
  {
    "name": "DS_qso214",
    "country": "Argentina",
    "rating": 1779,
    "profileUrl": "https://www.aoe2insights.com/user/3150133",
    "isActive": true
  },
  {
    "name": "Froman",
    "country": "United States",
    "rating": 1752,
    "profileUrl": "https://www.aoe2insights.com/user/4882298",
    "isActive": true
  },
  {
    "name": "DGHIR | Qeetsa",
    "country": "Mexico",
    "rating": 1752,
    "profileUrl": "https://www.aoe2insights.com/user/2075681",
    "isActive": true
  },
  {
    "name": "JustAGecko",
    "country": "United Kingdom",
    "rating": 1821,
    "profileUrl": "https://www.aoe2insights.com/user/236400",
    "isActive": true
  },
  {
    "name": "Cynthia",
    "country": "United States",
    "rating": 1644,
    "profileUrl": "https://www.aoe2insights.com/user/591709",
    "isActive": true
  },
  {
    "name": "edricsturm",
    "country": "Germany",
    "rating": 1633,
    "profileUrl": "https://www.aoe2insights.com/user/1467023",
    "isActive": true
  },
  {
    "name": "CharChar",
    "country": "Australia",
    "rating": 1612,
    "profileUrl": "https://www.aoe2insights.com/user/988308",
    "isActive": true
  },
  {
    "name": "ThisDino",
    "country": "Germany",
    "rating": 1639,
    "profileUrl": "https://www.aoe2insights.com/user/2533089",
    "isActive": true
  },
  {
    "name": "Refraid",
    "country": "Russia",
    "rating": 1728,
    "profileUrl": "https://www.aoe2insights.com/user/2404771",
    "isActive": true
  },
  {
    "name": "bobolavache",
    "country": "France",
    "rating": 1492,
    "profileUrl": "https://www.aoe2insights.com/user/1972590",
    "isActive": true
  },
  {
    "name": "Nown0",
    "country": "France",
    "rating": 1584,
    "profileUrl": "https://www.aoe2insights.com/user/4117931",
    "isActive": true
  },
  {
    "name": "Zycherious",
    "country": "United States",
    "rating": 1603,
    "profileUrl": "https://www.aoe2insights.com/user/2542159",
    "isActive": true
  },
  {
    "name": "Sylne4r",
    "country": "Germany",
    "rating": 1572,
    "profileUrl": "https://www.aoe2insights.com/user/1133888",
    "isActive": true
  },
  {
    "name": "gummi [Coleman]",
    "country": "Iceland",
    "rating": 1541,
    "profileUrl": "https://www.aoe2insights.com/user/260749",
    "isActive": true
  },
  {
    "name": "Matthew",
    "country": "Australia",
    "rating": 1602,
    "profileUrl": "https://www.aoe2insights.com/user/348642",
    "isActive": true
  },
  {
    "name": "Red Clifford",
    "country": "Netherlands",
    "rating": 1525,
    "profileUrl": "https://www.aoe2insights.com/user/1579558",
    "isActive": true
  },
  {
    "name": "tommy9512",
    "country": "Russia",
    "rating": 1499,
    "profileUrl": "https://www.aoe2insights.com/user/1133051",
    "isActive": true
  },
  {
    "name": "Nessy",
    "country": "Australia",
    "rating": 1448,
    "profileUrl": "https://www.aoe2insights.com/user/730232",
    "isActive": true
  },
  {
    "name": "Ex Lux",
    "country": "United States",
    "rating": 1363,
    "profileUrl": "https://www.aoe2insights.com/user/12372443",
    "isActive": true
  },
  {
    "name": "dead words",
    "country": "United States",
    "rating": 1453,
    "profileUrl": "https://www.aoe2insights.com/user/12870315",
    "isActive": true
  },
  {
    "name": "DraconicAspirant",
    "country": "Greece",
    "rating": 1372,
    "profileUrl": "https://www.aoe2insights.com/user/12558832",
    "isActive": true
  },
  {
    "name": "Citizen Snips",
    "country": "United States",
    "rating": 1448,
    "profileUrl": "https://www.aoe2insights.com/user/318414",
    "isActive": true
  },
  {
    "name": "hjpotter92",
    "country": "India",
    "rating": 1251,
    "profileUrl": "https://www.aoe2insights.com/user/1228227",
    "isActive": true
  },
  {
    "name": "hooplah",
    "country": "United Kingdom",
    "rating": 1337,
    "profileUrl": "https://www.aoe2insights.com/user/2594407",
    "isActive": true
  },
  {
    "name": "R3ChuukLogan",
    "country": "United States",
    "rating": 1292,
    "profileUrl": "https://www.aoe2insights.com/user/686170",
    "isActive": true
  },
  {
    "name": "Russian77",
    "country": "Slovakia",
    "rating": 1305,
    "profileUrl": "https://www.aoe2insights.com/user/1824106",
    "isActive": true
  },
  {
    "name": "Temperance",
    "country": "Belarus",
    "rating": 1285,
    "profileUrl": "https://www.aoe2insights.com/user/3588422",
    "isActive": true
  },
  {
    "name": "Sir_Duncan_The_Gull",
    "country": "Netherlands",
    "rating": 1304,
    "profileUrl": "https://www.aoe2insights.com/user/12626394",
    "isActive": true
  },
  {
    "name": "Bébou",
    "country": "France",
    "rating": 1300,
    "profileUrl": "https://www.aoe2insights.com/user/12744378",
    "isActive": true
  },
  {
    "name": "Philly Idle",
    "country": "Germany",
    "rating": 1016,
    "profileUrl": "https://www.aoe2insights.com/user/2105467",
    "isActive": true
  },
  {
    "name": "Rodeo Jones",
    "country": "Australia",
    "rating": 1233,
    "profileUrl": "https://www.aoe2insights.com/user/6754763",
    "isActive": true
  },
  {
    "name": "Lich King",
    "country": "Canada",
    "rating": 1216,
    "profileUrl": "https://www.aoe2insights.com/user/4049887",
    "isActive": true
  },
  {
    "name": "PajosPSCB",
    "country": "Czechia",
    "rating": 1140,
    "profileUrl": "https://www.aoe2insights.com/user/3528123",
    "isActive": true
  },
  {
    "name": "FT20",
    "country": "Chile",
    "rating": 1235,
    "profileUrl": "https://www.aoe2insights.com/user/12660890",
    "isActive": true
  },
  {
    "name": "Maestro | just a fish",
    "country": "Netherlands",
    "rating": 1215,
    "profileUrl": "https://www.aoe2insights.com/user/9440670",
    "isActive": true
  },
  {
    "name": "collace1",
    "country": "United Kingdom",
    "rating": 1158,
    "profileUrl": "https://www.aoe2insights.com/user/3084633",
    "isActive": true
  },
  {
    "name": "Pairu",
    "country": "Belgium",
    "rating": 1148,
    "profileUrl": "https://www.aoe2insights.com/user/11662735",
    "isActive": true
  },
  {
    "name": "SavageDog",
    "country": "Mexico",
    "rating": 1112,
    "profileUrl": "https://www.aoe2insights.com/user/12975601",
    "isActive": true
  },
  {
    "name": "Biodox",
    "country": "United States",
    "rating": 1114,
    "profileUrl": "https://www.aoe2insights.com/user/213904",
    "isActive": true
  },
  {
    "name": "Maudje10",
    "country": "Netherlands",
    "rating": 1106,
    "profileUrl": "https://www.aoe2insights.com/user/12257117",
    "isActive": true
  },
  {
    "name": "Busfahrer Ulus",
    "country": "Germany",
    "rating": 1043,
    "profileUrl": "https://www.aoe2insights.com/user/756434",
    "isActive": true
  },
  {
    "name": "JJNZ",
    "country": "New Zealand",
    "rating": 990,
    "profileUrl": "https://www.aoe2insights.com/user/4320164",
    "isActive": true
  },
  {
    "name": "rey_erizo",
    "country": "Germany",
    "rating": 991,
    "profileUrl": "https://www.aoe2insights.com/user/12790570",
    "isActive": true
  },
  {
    "name": "ClickBait",
    "country": "Denmark",
    "rating": 944,
    "profileUrl": "https://www.aoe2insights.com/user/12225770",
    "isActive": true
  },
  {
    "name": "The Healing Monk",
    "country": "Netherlands",
    "rating": 1013,
    "profileUrl": "https://www.aoe2insights.com/user/6901774",
    "isActive": true
  },
  {
    "name": "camfewell",
    "country": "United Kingdom",
    "rating": 1051,
    "profileUrl": "https://www.aoe2insights.com/user/12605769",
    "isActive": true
  },
  {
    "name": "PilgrimSoul",
    "country": "Italy",
    "rating": 1004,
    "profileUrl": "https://www.aoe2insights.com/user/12387823",
    "isActive": true
  },
  {
    "name": "RoboticPro",
    "country": "Netherlands",
    "rating": 948,
    "profileUrl": "https://www.aoe2insights.com/user/3877987",
    "isActive": true
  },
  {
    "name": "MagratGarlick",
    "country": "Netherlands",
    "rating": 985,
    "profileUrl": "https://www.aoe2insights.com/user/4061537",
    "isActive": true
  },
  {
    "name": "RKnight8",
    "country": "India",
    "rating": 1012,
    "profileUrl": "https://www.aoe2insights.com/user/12363008",
    "isActive": true
  },
  {
    "name": "Eljardinero4",
    "country": "Switzerland",
    "rating": 1049,
    "profileUrl": "https://www.aoe2insights.com/user/4954691",
    "isActive": true
  },
  {
    "name": "Gaius Iulius Megas",
    "country": "Austria",
    "rating": 1025,
    "profileUrl": "https://www.aoe2insights.com/user/3596974",
    "isActive": true
  },
  {
    "name": "Camaraderie",
    "country": "United States",
    "rating": 1047,
    "profileUrl": "https://www.aoe2insights.com/user/12081608",
    "isActive": true
  },
  {
    "name": "박팀",
    "country": "South Korea",
    "rating": 993,
    "profileUrl": "https://www.aoe2insights.com/user/1545285",
    "isActive": true
  },
  {
    "name": "filipellopes",
    "country": "Brazil",
    "rating": 872,
    "profileUrl": "https://www.aoe2insights.com/user/5878630",
    "isActive": true
  },
  {
    "name": "tumblwd",
    "country": "United Kingdom",
    "rating": 832,
    "profileUrl": "https://www.aoe2insights.com/user/1156997",
    "isActive": true
  },
  {
    "name": "ButterFingerz",
    "country": "United States",
    "rating": 771,
    "profileUrl": "https://www.aoe2insights.com/user/12736422",
    "isActive": true
  },
  {
    "name": "gurudeburdel",
    "country": "Argentina",
    "rating": 740,
    "profileUrl": "https://www.aoe2insights.com/user/12860672",
    "isActive": true
  },
  {
    "name": "LeORI",
    "country": "Morocco",
    "rating": 811,
    "profileUrl": "https://www.aoe2insights.com/user/12893468",
    "isActive": true
  },
  {
    "name": "InkMeBaby69",
    "country": "United Kingdom",
    "rating": 733,
    "profileUrl": "https://www.aoe2insights.com/user/13317354",
    "isActive": true
  },
  {
    "name": "griff3n",
    "country": "Germany",
    "rating": 258,
    "profileUrl": "https://www.aoe2insights.com/user/289975",
    "isActive": true
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
  },
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
