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
    "rating": 1537.0,
    "profileUrl": "https://www.aoe2insights.com/user/2158159",
    "isActive": true,
    "peakRating": 1537.0,
    "winRate": 51.0
  },
  {
    "name": "Adthor",
    "country": "United States",
    "rating": 925.0,
    "profileUrl": "https://www.aoe2insights.com/user/13054248",
    "isActive": true,
    "peakRating": 971.0,
    "winRate": 51.0
  },
  {
    "name": "Airbudgoldenrec",
    "country": "United States",
    "rating": 1129.0,
    "profileUrl": "https://www.aoe2insights.com/user/11683000",
    "isActive": true,
    "peakRating": 1168.0,
    "winRate": 51.0
  },
  {
    "name": "Akkal",
    "country": "Norway",
    "rating": 1278.0,
    "profileUrl": "https://www.aoe2insights.com/user/277869",
    "isActive": true,
    "peakRating": 1428.0,
    "winRate": 50.0
  },
  {
    "name": "Alepsi",
    "country": "Argentina",
    "rating": 1171.0,
    "profileUrl": "https://www.aoe2insights.com/user/5791522",
    "isActive": true,
    "peakRating": 1386.0,
    "winRate": 51.0
  },
  {
    "name": "AlexDonat",
    "country": "Romania",
    "rating": 1337.0,
    "profileUrl": "https://www.aoe2insights.com/user/8669401",
    "isActive": true,
    "peakRating": 1407.0,
    "winRate": 52.0
  },
  {
    "name": "Alpha krit",
    "country": "United States",
    "rating": 1254.0,
    "profileUrl": "https://www.aoe2insights.com/user/9934717",
    "isActive": true,
    "peakRating": 1423.0,
    "winRate": 51.0
  },
  {
    "name": "amon",
    "country": "United Kingdom",
    "rating": 1643.0,
    "profileUrl": "https://www.aoe2insights.com/user/233750",
    "isActive": true,
    "peakRating": 1707.0,
    "winRate": 53.0
  },
  {
    "name": "Amokura",
    "country": "New Zealand",
    "rating": 1483.0,
    "profileUrl": "https://www.aoe2insights.com/user/11765693",
    "isActive": true,
    "peakRating": 1608.0,
    "winRate": 50.0
  },
  {
    "name": "Apostic",
    "country": "United States",
    "rating": 1097.0,
    "profileUrl": "https://www.aoe2insights.com/user/4510278",
    "isActive": true,
    "peakRating": 1158.0,
    "winRate": 51.0
  },
  {
    "name": "arwhal",
    "country": "United Kingdom",
    "rating": 1431.0,
    "profileUrl": "https://www.aoe2insights.com/user/10903621",
    "isActive": true,
    "peakRating": 1446.0,
    "winRate": 54.0
  },
  {
    "name": "Ashoof",
    "country": "United States",
    "rating": 920.0,
    "profileUrl": "https://www.aoe2insights.com/user/13117300",
    "isActive": true,
    "peakRating": 1002.0,
    "winRate": 53.0
  },
  {
    "name": "avlid",
    "country": "Sweden",
    "rating": 2104.0,
    "profileUrl": "https://www.aoe2insights.com/user/254645",
    "isActive": true,
    "peakRating": 2104.0,
    "winRate": 52.0
  },
  {
    "name": "Beargwyn",
    "country": "Switzerland",
    "rating": 1225.0,
    "profileUrl": "https://www.aoe2insights.com/user/6859687",
    "isActive": true,
    "peakRating": 1264.0,
    "winRate": 52.0
  },
  {
    "name": "Bender",
    "country": "Australia",
    "rating": 1724.0,
    "profileUrl": "https://www.aoe2insights.com/user/12517895",
    "isActive": true,
    "peakRating": 1822.0,
    "winRate": 52.0
  },
  {
    "name": "Bishop",
    "country": "United States",
    "rating": 1089.0,
    "profileUrl": "https://www.aoe2insights.com/user/950113",
    "isActive": true,
    "peakRating": 1121.0,
    "winRate": 50.0
  },
  {
    "name": "Black Lotus",
    "country": "Poland",
    "rating": 1646.0,
    "profileUrl": "https://www.aoe2insights.com/user/941790",
    "isActive": true,
    "peakRating": 1817.0,
    "winRate": 51.0
  },
  {
    "name": "Bloomd",
    "country": "United States",
    "rating": 1807.0,
    "profileUrl": "https://www.aoe2insights.com/user/2239994",
    "isActive": true,
    "peakRating": 1860.0,
    "winRate": 51.0
  },
  {
    "name": "BloodForTheSkyGod",
    "country": "Turkey",
    "rating": 1633.0,
    "profileUrl": "https://www.aoe2insights.com/user/2363846",
    "isActive": true,
    "peakRating": 1702.0,
    "winRate": 51.0
  },
  {
    "name": "BoesBoes",
    "country": "Netherlands",
    "rating": 1384.0,
    "profileUrl": "https://www.aoe2insights.com/user/2010525",
    "isActive": true,
    "peakRating": 1460.0,
    "winRate": 51.0
  },
  {
    "name": "Boarderdudeman",
    "country": "United States",
    "rating": 1513.0,
    "profileUrl": "https://www.aoe2insights.com/user/237994",
    "isActive": true,
    "peakRating": 1568.0,
    "winRate": 53.0
  },
  {
    "name": "Breakfast",
    "country": "United Kingdom",
    "rating": 2034.0,
    "profileUrl": "https://www.aoe2insights.com/user/4851630",
    "isActive": true,
    "peakRating": 2129.0,
    "winRate": 51.0
  },
  {
    "name": "Brydazi",
    "country": "United States",
    "rating": 1093.0,
    "profileUrl": "https://www.aoe2insights.com/user/12783556",
    "isActive": true,
    "peakRating": 1117.0,
    "winRate": 51.0
  },
  {
    "name": "Bumbaloe",
    "country": "United States",
    "rating": 1081.0,
    "profileUrl": "https://www.aoe2insights.com/user/1722912",
    "isActive": true,
    "peakRating": 1082.0,
    "winRate": 55.0
  },
  {
    "name": "Canttouchme",
    "country": "Germany",
    "rating": 1397.0,
    "profileUrl": "https://www.aoe2insights.com/user/1965270",
    "isActive": true,
    "peakRating": 1397.0,
    "winRate": 51.0
  },
  {
    "name": "Charlies Alpaca",
    "country": "Australia",
    "rating": 1108.0,
    "profileUrl": "https://www.aoe2insights.com/user/5553104",
    "isActive": true,
    "peakRating": 1124.0,
    "winRate": 56.0
  },
  {
    "name": "CheesecakeMasta",
    "country": "United States",
    "rating": 1545.0,
    "profileUrl": "https://www.aoe2insights.com/user/293313",
    "isActive": true,
    "peakRating": 1642.0,
    "winRate": 51.0
  },
  {
    "name": "Chelbird",
    "country": "Austria",
    "rating": 1785.0,
    "profileUrl": "https://www.aoe2insights.com/user/2543478",
    "isActive": true,
    "peakRating": 1785.0,
    "winRate": 50.0
  },
  {
    "name": "Chipmunk",
    "country": "Argentina",
    "rating": 1466.0,
    "profileUrl": "https://www.aoe2insights.com/user/282529",
    "isActive": true,
    "peakRating": 1466.0,
    "winRate": 52.0
  },
  {
    "name": "Clarky0202",
    "country": "United Kingdom",
    "rating": 1224.0,
    "profileUrl": "https://www.aoe2insights.com/user/697097",
    "isActive": true,
    "peakRating": 1270.0,
    "winRate": 51.0
  },
  {
    "name": "CoalTrain",
    "country": "United States",
    "rating": 1700.0,
    "profileUrl": "https://www.aoe2insights.com/user/1720213",
    "isActive": true,
    "peakRating": 1700.0,
    "winRate": 54.0
  },
  {
    "name": "Code Name Raven",
    "country": "United States",
    "rating": 1298.0,
    "profileUrl": "https://www.aoe2insights.com/user/402345",
    "isActive": true,
    "peakRating": 1317.0,
    "winRate": 51.0
  },
  {
    "name": "Comfrick",
    "country": "New Zealand",
    "rating": 1676.0,
    "profileUrl": "https://www.aoe2insights.com/user/6368551",
    "isActive": true,
    "peakRating": 1796.0,
    "winRate": 51.0
  },
  {
    "name": "Cosminb",
    "country": "Romania",
    "rating": 1283.0,
    "profileUrl": "https://www.aoe2insights.com/user/4285252",
    "isActive": true,
    "peakRating": 1391.0,
    "winRate": 51.0
  },
  {
    "name": "Cu5T05",
    "country": "Germany",
    "rating": 948.0,
    "profileUrl": "https://www.aoe2insights.com/user/792014",
    "isActive": true,
    "peakRating": 1058.0,
    "winRate": 41.0
  },
  {
    "name": "Cyvarios",
    "country": "Canada",
    "rating": 1505.0,
    "profileUrl": "https://www.aoe2insights.com/user/9058532",
    "isActive": true,
    "peakRating": 1505.0,
    "winRate": 61.0
  },
  {
    "name": "DaSwedishBeast",
    "country": "United States",
    "rating": 1069.0,
    "profileUrl": "https://www.aoe2insights.com/user/2479744",
    "isActive": true,
    "peakRating": 1084.0,
    "winRate": 54.0
  },
  {
    "name": "Dashermin",
    "country": "United States",
    "rating": 1239.0,
    "profileUrl": "https://www.aoe2insights.com/user/6073178",
    "isActive": true,
    "peakRating": 1289.0,
    "winRate": 52.0
  },
  {
    "name": "Dasein",
    "country": "Costa Rica",
    "rating": 1003.0,
    "profileUrl": "https://www.aoe2insights.com/user/312182",
    "isActive": true,
    "peakRating": 1124.0,
    "winRate": 51.0
  },
  {
    "name": "Dawn",
    "country": "Germany",
    "rating": 1493.0,
    "profileUrl": "https://www.aoe2insights.com/user/12202531",
    "isActive": true,
    "peakRating": 1630.0,
    "winRate": 55.0
  },
  {
    "name": "Dhruv47",
    "country": "India",
    "rating": 810.0,
    "profileUrl": "https://www.aoe2insights.com/user/10510225",
    "isActive": true,
    "peakRating": 911.0,
    "winRate": 50.0
  },
  {
    "name": "Dio_roja",
    "country": "Finland",
    "rating": 1632.0,
    "profileUrl": "https://www.aoe2insights.com/user/2439151",
    "isActive": true,
    "peakRating": 1655.0,
    "winRate": 62.0
  },
  {
    "name": "Dodo3011",
    "country": "Germany",
    "rating": 1616.0,
    "profileUrl": "https://www.aoe2insights.com/user/12559976",
    "isActive": true,
    "peakRating": 1653.0,
    "winRate": 52.0
  },
  {
    "name": "DomHUSK",
    "country": "Ireland",
    "rating": 1358.0,
    "profileUrl": "https://www.aoe2insights.com/user/3306988",
    "isActive": true,
    "peakRating": 1465.0,
    "winRate": 52.0
  },
  {
    "name": "Dracarna",
    "country": "United Kingdom",
    "rating": 1004.0,
    "profileUrl": "https://www.aoe2insights.com/user/1394115",
    "isActive": true,
    "peakRating": 1064.0,
    "winRate": 50.0
  },
  {
    "name": "DrLoops",
    "country": "United Kingdom",
    "rating": 1779.0,
    "profileUrl": "https://www.aoe2insights.com/user/3903933",
    "isActive": true,
    "peakRating": 1913.0,
    "winRate": 51.0
  },
  {
    "name": "Duhak.Natria",
    "country": "Ukraine",
    "rating": 1340.0,
    "profileUrl": "https://www.aoe2insights.com/user/13060828",
    "isActive": true,
    "peakRating": 1420.0,
    "winRate": 52.0
  },
  {
    "name": "Eden",
    "country": "Canada",
    "rating": 1613.0,
    "profileUrl": "https://www.aoe2insights.com/user/12592487",
    "isActive": true,
    "peakRating": 1673.0,
    "winRate": 50.0
  },
  {
    "name": "El CivettaDiTozzi",
    "country": "Italy",
    "rating": 1273.0,
    "profileUrl": "https://www.aoe2insights.com/user/229416",
    "isActive": true,
    "peakRating": 1421.0,
    "winRate": 51.0
  },
  {
    "name": "El Latigo",
    "country": "Argentina",
    "rating": 1161.0,
    "profileUrl": "https://www.aoe2insights.com/user/2770291",
    "isActive": true,
    "peakRating": 1234.0,
    "winRate": 52.0
  },
  {
    "name": "El Mikalos",
    "country": "United Kingdom",
    "rating": 1413.0,
    "profileUrl": "https://www.aoe2insights.com/user/12594426",
    "isActive": true,
    "peakRating": 1429.0,
    "winRate": 51.0
  },
  {
    "name": "EmperorNoob97",
    "country": "United Kingdom",
    "rating": 1056.0,
    "profileUrl": "https://www.aoe2insights.com/user/5422400",
    "isActive": true,
    "peakRating": 1071.0,
    "winRate": 54.0
  },
  {
    "name": "Emp. Peter",
    "country": "Netherlands",
    "rating": 1181.0,
    "profileUrl": "https://www.aoe2insights.com/user/2558975",
    "isActive": true,
    "peakRating": 1285.0,
    "winRate": 51.0
  },
  {
    "name": "Enki",
    "country": "Germany",
    "rating": 900.0,
    "profileUrl": "https://www.aoe2insights.com/user/1639985",
    "isActive": true,
    "peakRating": 951.0,
    "winRate": 50.0
  },
  {
    "name": "EnnoVonDerTanke",
    "country": "Germany",
    "rating": 1188.0,
    "profileUrl": "https://www.aoe2insights.com/user/9649575",
    "isActive": true,
    "peakRating": 1188.0,
    "winRate": 51.0
  },
  {
    "name": "Escalus",
    "country": "United States",
    "rating": 1856.0,
    "profileUrl": "https://www.aoe2insights.com/user/757980",
    "isActive": true,
    "peakRating": 1856.0,
    "winRate": 52.0
  },
  {
    "name": "Ezioauditore0109",
    "country": "Colombia",
    "rating": 1285.0,
    "profileUrl": "https://www.aoe2insights.com/user/13124087",
    "isActive": true,
    "peakRating": 1285.0,
    "winRate": 58.0
  },
  {
    "name": "Fgzb",
    "country": "United States",
    "rating": 1220.0,
    "profileUrl": "https://www.aoe2insights.com/user/13045745",
    "isActive": true,
    "peakRating": 1220.0,
    "winRate": 54.0
  },
  {
    "name": "Firmatt",
    "country": "Czechia",
    "rating": 1237.0,
    "profileUrl": "https://www.aoe2insights.com/user/12858284",
    "isActive": true,
    "peakRating": 1237.0,
    "winRate": 56.0
  },
  {
    "name": "Fishmanoli",
    "country": "Australia",
    "rating": 1190.0,
    "profileUrl": "https://www.aoe2insights.com/user/295020",
    "isActive": true,
    "peakRating": 1225.0,
    "winRate": 53.0
  },
  {
    "name": "FiveCatsATrebuchetAndADream",
    "country": "United States",
    "rating": 1078.0,
    "profileUrl": "https://www.aoe2insights.com/user/9705242",
    "isActive": true,
    "peakRating": 1158.0,
    "winRate": 51.0
  },
  {
    "name": "Fj5589",
    "country": "Argentina",
    "rating": 952.0,
    "profileUrl": "https://www.aoe2insights.com/user/5830463",
    "isActive": true,
    "peakRating": 1088.0,
    "winRate": 51.0
  },
  {
    "name": "FloosWorld",
    "country": "Germany",
    "rating": 886.0,
    "profileUrl": "https://www.aoe2insights.com/user/1349",
    "isActive": true,
    "peakRating": 1043.0,
    "winRate": 51.0
  },
  {
    "name": "Flan Implacable",
    "country": "Spain",
    "rating": 1019.0,
    "profileUrl": "https://www.aoe2insights.com/user/393242",
    "isActive": true,
    "peakRating": 1132.0,
    "winRate": 51.0
  },
  {
    "name": "Flying Mouse",
    "country": "Germany",
    "rating": 1557.0,
    "profileUrl": "https://www.aoe2insights.com/user/227587",
    "isActive": true,
    "peakRating": 1619.0,
    "winRate": 53.0
  },
  {
    "name": "Fuegan33",
    "country": "France",
    "rating": 1609.0,
    "profileUrl": "https://www.aoe2insights.com/user/880156",
    "isActive": true,
    "peakRating": 1652.0,
    "winRate": 51.0
  },
  {
    "name": "Ganjiix",
    "country": "United Kingdom",
    "rating": 1600.0,
    "profileUrl": "https://www.aoe2insights.com/user/2082547",
    "isActive": true,
    "peakRating": 1600.0,
    "winRate": 51.0
  },
  {
    "name": "Gilli0315",
    "country": "Netherlands",
    "rating": 1104.0,
    "profileUrl": "https://www.aoe2insights.com/user/10377768",
    "isActive": true,
    "peakRating": 1237.0,
    "winRate": 51.0
  },
  {
    "name": "Genoese Crossbowman",
    "country": "Argentina",
    "rating": 1552.0,
    "profileUrl": "https://www.aoe2insights.com/user/270569",
    "isActive": true,
    "peakRating": 1610.0,
    "winRate": 52.0
  },
  {
    "name": "GeneralOcto",
    "country": "Austria",
    "rating": 956.0,
    "profileUrl": "https://www.aoe2insights.com/user/12448049",
    "isActive": true,
    "peakRating": 1088.0,
    "winRate": 51.0
  },
  {
    "name": "GeneralWakka",
    "country": "United States",
    "rating": 1437.0,
    "profileUrl": "https://www.aoe2insights.com/user/1226225",
    "isActive": true,
    "peakRating": 1553.0,
    "winRate": 51.0
  },
  {
    "name": "Geologywade",
    "country": "United Kingdom",
    "rating": 1470.0,
    "profileUrl": "https://www.aoe2insights.com/user/1858991",
    "isActive": true,
    "peakRating": 1568.0,
    "winRate": 51.0
  },
  {
    "name": "Ghostwriter39",
    "country": "United States",
    "rating": 1622.0,
    "profileUrl": "https://www.aoe2insights.com/user/12675701",
    "isActive": true,
    "peakRating": 1735.0,
    "winRate": 51.0
  },
  {
    "name": "Gil",
    "country": "Australia",
    "rating": 1524.0,
    "profileUrl": "https://www.aoe2insights.com/user/330481",
    "isActive": true,
    "peakRating": 1632.0,
    "winRate": 51.0
  },
  {
    "name": "Gonzaleki",
    "country": "Argentina",
    "rating": 1520.0,
    "profileUrl": "https://www.aoe2insights.com/user/12706469",
    "isActive": true,
    "peakRating": 1520.0,
    "winRate": 65.0
  },
  {
    "name": "GwizdeK",
    "country": "Poland",
    "rating": 1332.0,
    "profileUrl": "https://www.aoe2insights.com/user/245082",
    "isActive": true,
    "peakRating": 1554.0,
    "winRate": 51.0
  },
  {
    "name": "Hagenhagen",
    "country": "Czechia",
    "rating": 1358.0,
    "profileUrl": "https://www.aoe2insights.com/user/10002260",
    "isActive": true,
    "peakRating": 1489.0,
    "winRate": 53.0
  },
  {
    "name": "[????] Happytheandy",
    "country": "United Kingdom",
    "rating": 1895.0,
    "profileUrl": "https://www.aoe2insights.com/user/2397632",
    "isActive": true,
    "peakRating": 1949.0,
    "winRate": 56.0
  },
  {
    "name": "Hestia",
    "country": "China",
    "rating": 1648.0,
    "profileUrl": "https://www.aoe2insights.com/user/230265",
    "isActive": true,
    "peakRating": 1773.0,
    "winRate": 51.0
  },
  {
    "name": "Hoppsy",
    "country": "United Kingdom",
    "rating": 1766.0,
    "profileUrl": "https://www.aoe2insights.com/user/456135",
    "isActive": true,
    "peakRating": 1768.0,
    "winRate": 51.0
  },
  {
    "name": "Hornet-Wing",
    "country": "United Kingdom",
    "rating": 1204.0,
    "profileUrl": "https://www.aoe2insights.com/user/272604",
    "isActive": true,
    "peakRating": 1266.0,
    "winRate": 57.0
  },
  {
    "name": "Hoyohoyo9",
    "country": "United States",
    "rating": 1545.0,
    "profileUrl": "https://www.aoe2insights.com/user/237553",
    "isActive": true,
    "peakRating": 1715.0,
    "winRate": 50.0
  },
  {
    "name": "Huggie",
    "country": "United Kingdom",
    "rating": 1665.0,
    "profileUrl": "https://www.aoe2insights.com/user/89053",
    "isActive": true,
    "peakRating": 1742.0,
    "winRate": 51.0
  },
  {
    "name": "Init2winek",
    "country": "United States",
    "rating": 963.0,
    "profileUrl": "https://www.aoe2insights.com/user/1265221",
    "isActive": true,
    "peakRating": 1036.0,
    "winRate": 51.0
  },
  {
    "name": "JagWarrior",
    "country": "France",
    "rating": 1552.0,
    "profileUrl": "https://www.aoe2insights.com/user/11471863",
    "isActive": true,
    "peakRating": 1571.0,
    "winRate": 52.0
  },
  {
    "name": "Janchez",
    "country": "Germany",
    "rating": 1322.0,
    "profileUrl": "https://www.aoe2insights.com/user/5578711",
    "isActive": true,
    "peakRating": 1483.0,
    "winRate": 50.0
  },
  {
    "name": "JawolopingChris",
    "country": "United States",
    "rating": 1665.0,
    "profileUrl": "https://www.aoe2insights.com/user/303604",
    "isActive": true,
    "peakRating": 1693.0,
    "winRate": 53.0
  },
  {
    "name": "Javisty",
    "country": "France",
    "rating": 1795.0,
    "profileUrl": "https://www.aoe2insights.com/user/392423",
    "isActive": true,
    "peakRating": 1828.0,
    "winRate": 52.0
  },
  {
    "name": "Joey the Bonqueror",
    "country": "United Kingdom",
    "rating": 1832.0,
    "profileUrl": "https://www.aoe2insights.com/user/300848",
    "isActive": true,
    "peakRating": 1907.0,
    "winRate": 51.0
  },
  {
    "name": "Jon",
    "country": "United States",
    "rating": 1286.0,
    "profileUrl": "https://www.aoe2insights.com/user/6073899",
    "isActive": true,
    "peakRating": 1380.0,
    "winRate": 50.0
  },
  {
    "name": "Josenblad",
    "country": "United States",
    "rating": 1322.0,
    "profileUrl": "https://www.aoe2insights.com/user/92277",
    "isActive": true,
    "peakRating": 1336.0,
    "winRate": 53.0
  },
  {
    "name": "J0N-PERKiNS",
    "country": "United Kingdom",
    "rating": 1610.0,
    "profileUrl": "https://www.aoe2insights.com/user/3582838",
    "isActive": true,
    "peakRating": 1723.0,
    "winRate": 52.0
  },
  {
    "name": "Jskillz",
    "country": "United States",
    "rating": 1757.0,
    "profileUrl": "https://www.aoe2insights.com/user/2363000",
    "isActive": true,
    "peakRating": 1757.0,
    "winRate": 54.0
  },
  {
    "name": "Judean People's Front",
    "country": "Switzerland",
    "rating": 1073.0,
    "profileUrl": "https://www.aoe2insights.com/user/554997",
    "isActive": true,
    "peakRating": 1120.0,
    "winRate": 33.0
  },
  {
    "name": "Kakabsen",
    "country": "Poland",
    "rating": 1334.0,
    "profileUrl": "https://www.aoe2insights.com/user/12784217",
    "isActive": true,
    "peakRating": 1401.0,
    "winRate": 52.0
  },
  {
    "name": "Kiki da Foxvoid (Mikikki)",
    "country": "United Kingdom",
    "rating": 1008.0,
    "profileUrl": "https://www.aoe2insights.com/user/12563061",
    "isActive": true,
    "peakRating": 1010.0,
    "winRate": 56.0
  },
  {
    "name": "Kisiel",
    "country": "Poland",
    "rating": 1402.0,
    "profileUrl": "https://www.aoe2insights.com/user/8996251",
    "isActive": true,
    "peakRating": 1612.0,
    "winRate": 55.0
  },
  {
    "name": "Kitty",
    "country": "United Kingdom",
    "rating": 979.0,
    "profileUrl": "https://www.aoe2insights.com/user/12804586",
    "isActive": true,
    "peakRating": 979.0,
    "winRate": 55.0
  },
  {
    "name": "KoaLollo",
    "country": "Italy",
    "rating": 1119.0,
    "profileUrl": "https://www.aoe2insights.com/user/10162879",
    "isActive": true,
    "peakRating": 1185.0,
    "winRate": null
  },
  {
    "name": "Koti",
    "country": "France",
    "rating": 1646.0,
    "profileUrl": "https://www.aoe2insights.com/user/4033024",
    "isActive": true,
    "peakRating": 1747.0,
    "winRate": 53.0
  },
  {
    "name": "Kruppe",
    "country": "United States",
    "rating": 1230.0,
    "profileUrl": "https://www.aoe2insights.com/user/449982",
    "isActive": true,
    "peakRating": 1306.0,
    "winRate": 51.0
  },
  {
    "name": "Kubya",
    "country": "Sweden",
    "rating": 1464.0,
    "profileUrl": "https://www.aoe2insights.com/user/15780",
    "isActive": true,
    "peakRating": 1571.0,
    "winRate": 51.0
  },
  {
    "name": "Lamo",
    "country": "Latvia",
    "rating": 2427.0,
    "profileUrl": "https://www.aoe2insights.com/user/5188554",
    "isActive": true,
    "peakRating": 2543.0,
    "winRate": 53.0
  },
  {
    "name": "Lartibro",
    "country": "United States",
    "rating": 1002.0,
    "profileUrl": "https://www.aoe2insights.com/user/12649900",
    "isActive": true,
    "peakRating": 1078.0,
    "winRate": 53.0
  },
  {
    "name": "Levana",
    "country": "Belgium",
    "rating": 1045.0,
    "profileUrl": "https://www.aoe2insights.com/user/1399661",
    "isActive": true,
    "peakRating": 1093.0,
    "winRate": 43.0
  },
  {
    "name": "Lheodoric",
    "country": "France",
    "rating": 1368.0,
    "profileUrl": "https://www.aoe2insights.com/user/12164510",
    "isActive": true,
    "peakRating": 1410.0,
    "winRate": 51.0
  },
  {
    "name": "Lord Benji",
    "country": "United States",
    "rating": 1255.0,
    "profileUrl": "https://www.aoe2insights.com/user/1859305",
    "isActive": true,
    "peakRating": 1270.0,
    "winRate": 54.0
  },
  {
    "name": "Lovee",
    "country": "India",
    "rating": 1670.0,
    "profileUrl": "https://www.aoe2insights.com/user/1041133",
    "isActive": true,
    "peakRating": 1728.0,
    "winRate": 53.0
  },
  {
    "name": "Lukam10",
    "country": "China",
    "rating": 1104.0,
    "profileUrl": "https://www.aoe2insights.com/user/13099567",
    "isActive": true,
    "peakRating": 1177.0,
    "winRate": 55.0
  },
  {
    "name": "Macklez",
    "country": "United States",
    "rating": 1367.0,
    "profileUrl": "https://www.aoe2insights.com/user/2311389",
    "isActive": true,
    "peakRating": 1438.0,
    "winRate": 52.0
  },
  {
    "name": "Madbun",
    "country": "Ireland",
    "rating": 1212.0,
    "profileUrl": "https://www.aoe2insights.com/user/381651",
    "isActive": true,
    "peakRating": 1274.0,
    "winRate": 51.0
  },
  {
    "name": "MajorTawm",
    "country": "Guatemala",
    "rating": 1291.0,
    "profileUrl": "https://www.aoe2insights.com/user/2963781",
    "isActive": true,
    "peakRating": 1419.0,
    "winRate": 51.0
  },
  {
    "name": "Majormelancholy",
    "country": "India",
    "rating": 1022.0,
    "profileUrl": "https://www.aoe2insights.com/user/2471138",
    "isActive": true,
    "peakRating": 1037.0,
    "winRate": 52.0
  },
  {
    "name": "MarmotteQuantique",
    "country": "France",
    "rating": 1463.0,
    "profileUrl": "https://www.aoe2insights.com/user/641",
    "isActive": true,
    "peakRating": 1530.0,
    "winRate": 52.0
  },
  {
    "name": "Matze",
    "country": "Germany",
    "rating": 2067.0,
    "profileUrl": "https://www.aoe2insights.com/user/13123606",
    "isActive": true,
    "peakRating": 2341.0,
    "winRate": 50.0
  },
  {
    "name": "Mathmagician",
    "country": "Germany",
    "rating": 1226.0,
    "profileUrl": "https://www.aoe2insights.com/user/4845480",
    "isActive": true,
    "peakRating": 1226.0,
    "winRate": 52.0
  },
  {
    "name": "Maxpower973",
    "country": "Italy",
    "rating": 1648.0,
    "profileUrl": "https://www.aoe2insights.com/user/2320032",
    "isActive": true,
    "peakRating": 1712.0,
    "winRate": 52.0
  },
  {
    "name": "Maxymczech",
    "country": "Czechia",
    "rating": 1569.0,
    "profileUrl": "https://www.aoe2insights.com/user/5813618",
    "isActive": true,
    "peakRating": 1793.0,
    "winRate": 50.0
  },
  {
    "name": "Mercurial",
    "country": "Russia",
    "rating": 1633.0,
    "profileUrl": "https://www.aoe2insights.com/user/1272377",
    "isActive": true,
    "peakRating": 1885.0,
    "winRate": 51.0
  },
  {
    "name": "Meshuggle",
    "country": "Germany",
    "rating": 1073.0,
    "profileUrl": "https://www.aoe2insights.com/user/12730545",
    "isActive": true,
    "peakRating": 1136.0,
    "winRate": 50.0
  },
  {
    "name": "Metalmania",
    "country": "Argentina",
    "rating": 1537.0,
    "profileUrl": "https://www.aoe2insights.com/user/12434787",
    "isActive": true,
    "peakRating": 1649.0,
    "winRate": 51.0
  },
  {
    "name": "MightySpaceFruit",
    "country": "United States",
    "rating": 1834.0,
    "profileUrl": "https://www.aoe2insights.com/user/12772982",
    "isActive": true,
    "peakRating": 1909.0,
    "winRate": 54.0
  },
  {
    "name": "MonkeyJuggler",
    "country": "Switzerland",
    "rating": 988.0,
    "profileUrl": "https://www.aoe2insights.com/user/4351574",
    "isActive": true,
    "peakRating": 1013.0,
    "winRate": 51.0
  },
  {
    "name": "NeoZz",
    "country": "France",
    "rating": 2398.0,
    "profileUrl": "https://www.aoe2insights.com/user/11275434",
    "isActive": true,
    "peakRating": 2564.0,
    "winRate": 57.0
  },
  {
    "name": "Nessius Blaze",
    "country": "Hungary",
    "rating": 1392.0,
    "profileUrl": "https://www.aoe2insights.com/user/12094556",
    "isActive": true,
    "peakRating": 1509.0,
    "winRate": 51.0
  },
  {
    "name": "Nope1585",
    "country": "India",
    "rating": 1364.0,
    "profileUrl": "https://www.aoe2insights.com/user/5968579",
    "isActive": true,
    "peakRating": 1449.0,
    "winRate": 55.0
  },
  {
    "name": "Nutty",
    "country": "Norway",
    "rating": 1113.0,
    "profileUrl": "https://www.aoe2insights.com/user/11720179",
    "isActive": true,
    "peakRating": 1291.0,
    "winRate": 53.0
  },
  {
    "name": "OrangeMamba",
    "country": "United States",
    "rating": 1311.0,
    "profileUrl": "https://www.aoe2insights.com/user/648585",
    "isActive": true,
    "peakRating": 1344.0,
    "winRate": 54.0
  },
  {
    "name": "Ozziey",
    "country": "Netherlands",
    "rating": 1205.0,
    "profileUrl": "https://www.aoe2insights.com/user/1530786",
    "isActive": true,
    "peakRating": 1238.0,
    "winRate": 58.0
  },
  {
    "name": "Paapi",
    "country": "Slovakia",
    "rating": 1434.0,
    "profileUrl": "https://www.aoe2insights.com/user/503998",
    "isActive": true,
    "peakRating": 1434.0,
    "winRate": 50.0
  },
  {
    "name": "Painter",
    "country": "United States",
    "rating": 1541.0,
    "profileUrl": "https://www.aoe2insights.com/user/4850176",
    "isActive": true,
    "peakRating": 1578.0,
    "winRate": 52.0
  },
  {
    "name": "Pasta",
    "country": "France",
    "rating": 1300.0,
    "profileUrl": "https://www.aoe2insights.com/user/1111750",
    "isActive": true,
    "peakRating": 1368.0,
    "winRate": 53.0
  },
  {
    "name": "Pete26196",
    "country": "United Kingdom",
    "rating": 1794.0,
    "profileUrl": "https://www.aoe2insights.com/user/275448",
    "isActive": true,
    "peakRating": 1869.0,
    "winRate": 58.0
  },
  {
    "name": "Phoenix Oath",
    "country": "United States",
    "rating": 1734.0,
    "profileUrl": "https://www.aoe2insights.com/user/305008",
    "isActive": true,
    "peakRating": 1843.0,
    "winRate": 56.0
  },
  {
    "name": "Pisty",
    "country": "Argentina",
    "rating": 1417.0,
    "profileUrl": "https://www.aoe2insights.com/user/2798038",
    "isActive": true,
    "peakRating": 1456.0,
    "winRate": 57.0
  },
  {
    "name": "Pl0tterGhost",
    "country": "Netherlands",
    "rating": 1547.0,
    "profileUrl": "https://www.aoe2insights.com/user/375383",
    "isActive": true,
    "peakRating": 1569.0,
    "winRate": 55.0
  },
  {
    "name": "Player123",
    "country": "Italy",
    "rating": 1287.0,
    "profileUrl": "https://www.aoe2insights.com/user/1137204",
    "isActive": true,
    "peakRating": 1334.0,
    "winRate": 50.0
  },
  {
    "name": "PrinceFinnik",
    "country": "United States",
    "rating": 1093.0,
    "profileUrl": "https://www.aoe2insights.com/user/2637747",
    "isActive": true,
    "peakRating": 1111.0,
    "winRate": 51.0
  },
  {
    "name": "Pride",
    "country": "Malta",
    "rating": 1226.0,
    "profileUrl": "https://www.aoe2insights.com/user/5634917",
    "isActive": true,
    "peakRating": 1287.0,
    "winRate": 52.0
  },
  {
    "name": "PsychedelicTDog",
    "country": "United States",
    "rating": 1166.0,
    "profileUrl": "https://www.aoe2insights.com/user/13150242",
    "isActive": true,
    "peakRating": 1166.0,
    "winRate": 61.0
  },
  {
    "name": "PygmyGiant",
    "country": "United States",
    "rating": 1199.0,
    "profileUrl": "https://www.aoe2insights.com/user/5522724",
    "isActive": true,
    "peakRating": 1227.0,
    "winRate": 53.0
  },
  {
    "name": "Ragnarthetueton",
    "country": "United States",
    "rating": 1228.0,
    "profileUrl": "https://www.aoe2insights.com/user/6270231",
    "isActive": true,
    "peakRating": 1385.0,
    "winRate": 51.0
  },
  {
    "name": "Rameranic",
    "country": "United States",
    "rating": 1193.0,
    "profileUrl": "https://www.aoe2insights.com/user/3064960",
    "isActive": true,
    "peakRating": 1302.0,
    "winRate": 53.0
  },
  {
    "name": "Ranzunn",
    "country": "United States",
    "rating": 1471.0,
    "profileUrl": "https://www.aoe2insights.com/user/1971123",
    "isActive": true,
    "peakRating": 1533.0,
    "winRate": 52.0
  },
  {
    "name": "Raudius",
    "country": "Netherlands",
    "rating": 1153.0,
    "profileUrl": "https://www.aoe2insights.com/user/285711",
    "isActive": true,
    "peakRating": 1218.0,
    "winRate": 50.0
  },
  {
    "name": "Rayz",
    "country": "Taiwan",
    "rating": 2347.0,
    "profileUrl": "https://www.aoe2insights.com/user/12268569",
    "isActive": true,
    "peakRating": 2577.0,
    "winRate": 53.0
  },
  {
    "name": "RealTHF",
    "country": "United States",
    "rating": 1310.0,
    "profileUrl": "https://www.aoe2insights.com/user/1214206",
    "isActive": true,
    "peakRating": 1469.0,
    "winRate": 51.0
  },
  {
    "name": "Rebekah",
    "country": "United States",
    "rating": 1293.0,
    "profileUrl": "https://www.aoe2insights.com/user/1278251",
    "isActive": true,
    "peakRating": 1337.0,
    "winRate": 52.0
  },
  {
    "name": "Rbase96",
    "country": "Netherlands",
    "rating": 1587.0,
    "profileUrl": "https://www.aoe2insights.com/user/2787704",
    "isActive": true,
    "peakRating": 1789.0,
    "winRate": 51.0
  },
  {
    "name": "RDO_AOE2",
    "country": "United Kingdom",
    "rating": 857.0,
    "profileUrl": "https://www.aoe2insights.com/user/5672310",
    "isActive": true,
    "peakRating": 943.0,
    "winRate": 51.0
  },
  {
    "name": "Ricky_ld",
    "country": "Austria",
    "rating": 1155.0,
    "profileUrl": "https://www.aoe2insights.com/user/5172877",
    "isActive": true,
    "peakRating": 1213.0,
    "winRate": 51.0
  },
  {
    "name": "Risendragon Gaming",
    "country": "United States",
    "rating": 611.0,
    "profileUrl": "https://www.aoe2insights.com/user/12864690",
    "isActive": true,
    "peakRating": 702.0,
    "winRate": 42.0
  },
  {
    "name": "Robin5hood",
    "country": "Poland",
    "rating": 1383.0,
    "profileUrl": "https://www.aoe2insights.com/user/369054",
    "isActive": true,
    "peakRating": 1530.0,
    "winRate": 53.0
  },
  {
    "name": "Roon Osricson",
    "country": "United States",
    "rating": 1228.0,
    "profileUrl": "https://www.aoe2insights.com/user/189537",
    "isActive": true,
    "peakRating": 1228.0,
    "winRate": 54.0
  },
  {
    "name": "Row row your boat",
    "country": "United States",
    "rating": 1536.0,
    "profileUrl": "https://www.aoe2insights.com/user/524610",
    "isActive": true,
    "peakRating": 1686.0,
    "winRate": 51.0
  },
  {
    "name": "Royalewithcheese",
    "country": "Netherlands",
    "rating": 1247.0,
    "profileUrl": "https://www.aoe2insights.com/user/3222983",
    "isActive": true,
    "peakRating": 1274.0,
    "winRate": 53.0
  },
  {
    "name": "Sandland",
    "country": "Denmark",
    "rating": 1829.0,
    "profileUrl": "https://www.aoe2insights.com/user/787064",
    "isActive": true,
    "peakRating": 1855.0,
    "winRate": 51.0
  },
  {
    "name": "Satellites of Heaven",
    "country": "United Kingdom",
    "rating": 1431.0,
    "profileUrl": "https://www.aoe2insights.com/user/4985036",
    "isActive": true,
    "peakRating": 1464.0,
    "winRate": 51.0
  },
  {
    "name": "Scipio",
    "country": "France",
    "rating": 1318.0,
    "profileUrl": "https://www.aoe2insights.com/user/66145",
    "isActive": true,
    "peakRating": 1321.0,
    "winRate": 57.0
  },
  {
    "name": "Seb",
    "country": "United Kingdom",
    "rating": 1791.0,
    "profileUrl": "https://www.aoe2insights.com/user/5405126",
    "isActive": true,
    "peakRating": 1803.0,
    "winRate": 51.0
  },
  {
    "name": "Selava",
    "country": "Spain",
    "rating": 1421.0,
    "profileUrl": "https://www.aoe2insights.com/user/6400696",
    "isActive": true,
    "peakRating": 1468.0,
    "winRate": 57.0
  },
  {
    "name": "SenorBonas",
    "country": "Belgium",
    "rating": 1330.0,
    "profileUrl": "https://www.aoe2insights.com/user/248524",
    "isActive": true,
    "peakRating": 1353.0,
    "winRate": 51.0
  },
  {
    "name": "Shashlyk",
    "country": "Poland",
    "rating": 1736.0,
    "profileUrl": "https://www.aoe2insights.com/user/685782",
    "isActive": true,
    "peakRating": 1805.0,
    "winRate": 51.0
  },
  {
    "name": "Shibani",
    "country": "Brazil",
    "rating": 1295.0,
    "profileUrl": "https://www.aoe2insights.com/user/11718075",
    "isActive": true,
    "peakRating": 1312.0,
    "winRate": 53.0
  },
  {
    "name": "SilverEclipse",
    "country": "United States",
    "rating": 929.0,
    "profileUrl": "https://www.aoe2insights.com/user/5581979",
    "isActive": true,
    "peakRating": 1049.0,
    "winRate": 51.0
  },
  {
    "name": "SimpleMint",
    "country": "Bahrain",
    "rating": 1244.0,
    "profileUrl": "https://www.aoe2insights.com/user/2941867",
    "isActive": true,
    "peakRating": 1454.0,
    "winRate": 51.0
  },
  {
    "name": "Skinwimmel",
    "country": "United States",
    "rating": 1166.0,
    "profileUrl": "https://www.aoe2insights.com/user/215522",
    "isActive": true,
    "peakRating": 1181.0,
    "winRate": 52.0
  },
  {
    "name": "Soxs",
    "country": "United States",
    "rating": 1490.0,
    "profileUrl": "https://www.aoe2insights.com/user/2972583",
    "isActive": true,
    "peakRating": 1543.0,
    "winRate": 51.0
  },
  {
    "name": "Spaz the Adventurer",
    "country": "Canada",
    "rating": 1552.0,
    "profileUrl": "https://www.aoe2insights.com/user/3582974",
    "isActive": true,
    "peakRating": 1554.0,
    "winRate": 58.0
  },
  {
    "name": "SpiritOfTheUniverse",
    "country": "Germany",
    "rating": 1073.0,
    "profileUrl": "https://www.aoe2insights.com/user/4040905",
    "isActive": true,
    "peakRating": 1113.0,
    "winRate": 52.0
  },
  {
    "name": "Splattcol",
    "country": "Colombia",
    "rating": 1629.0,
    "profileUrl": "https://www.aoe2insights.com/user/2406441",
    "isActive": true,
    "peakRating": 1673.0,
    "winRate": 51.0
  },
  {
    "name": "Strato",
    "country": "United States",
    "rating": 1473.0,
    "profileUrl": "https://www.aoe2insights.com/user/11682569",
    "isActive": true,
    "peakRating": 1496.0,
    "winRate": 51.0
  },
  {
    "name": "Syagrius",
    "country": "France",
    "rating": 949.0,
    "profileUrl": "https://www.aoe2insights.com/user/4515093",
    "isActive": true,
    "peakRating": 1099.0,
    "winRate": 50.0
  },
  {
    "name": "Szotyesz",
    "country": "Hungary",
    "rating": 1331.0,
    "profileUrl": "https://www.aoe2insights.com/user/232247",
    "isActive": true,
    "peakRating": 1430.0,
    "winRate": 52.0
  },
  {
    "name": "T-Money",
    "country": "United States",
    "rating": 1112.0,
    "profileUrl": "https://www.aoe2insights.com/user/12158425",
    "isActive": true,
    "peakRating": 1234.0,
    "winRate": 50.0
  },
  {
    "name": "Tanghay",
    "country": "France",
    "rating": 1323.0,
    "profileUrl": "https://www.aoe2insights.com/user/12965927",
    "isActive": true,
    "peakRating": 1323.0,
    "winRate": 56.0
  },
  {
    "name": "The Chancellor",
    "country": "United Kingdom",
    "rating": 1654.0,
    "profileUrl": "https://www.aoe2insights.com/user/253973",
    "isActive": true,
    "peakRating": 1662.0,
    "winRate": 55.0
  },
  {
    "name": "The Gardener",
    "country": "United States",
    "rating": 1255.0,
    "profileUrl": "https://www.aoe2insights.com/user/10764180",
    "isActive": true,
    "peakRating": 1408.0,
    "winRate": 51.0
  },
  {
    "name": "The Night",
    "country": "Switzerland",
    "rating": 1341.0,
    "profileUrl": "https://www.aoe2insights.com/user/255714",
    "isActive": true,
    "peakRating": 1341.0,
    "winRate": 53.0
  },
  {
    "name": "The Sleepy Bishop",
    "country": "India",
    "rating": 1767.0,
    "profileUrl": "https://www.aoe2insights.com/user/1030992",
    "isActive": true,
    "peakRating": 1872.0,
    "winRate": 51.0
  },
  {
    "name": "The Wyandotte",
    "country": "United States",
    "rating": 1425.0,
    "profileUrl": "https://www.aoe2insights.com/user/6801447",
    "isActive": true,
    "peakRating": 1495.0,
    "winRate": 53.0
  },
  {
    "name": "Thedissapointedinvader",
    "country": "Australia",
    "rating": 1561.0,
    "profileUrl": "https://www.aoe2insights.com/user/336892",
    "isActive": true,
    "peakRating": 1750.0,
    "winRate": 51.0
  },
  {
    "name": "Thespicysicillian",
    "country": "United States",
    "rating": 1116.0,
    "profileUrl": "https://www.aoe2insights.com/user/9137593",
    "isActive": true,
    "peakRating": 1156.0,
    "winRate": 51.0
  },
  {
    "name": "Tiltstars",
    "country": "Germany",
    "rating": 1389.0,
    "profileUrl": "https://www.aoe2insights.com/user/2627145",
    "isActive": true,
    "peakRating": 1535.0,
    "winRate": 50.0
  },
  {
    "name": "TomAquinas",
    "country": "United States",
    "rating": 1430.0,
    "profileUrl": "https://www.aoe2insights.com/user/11670083",
    "isActive": true,
    "peakRating": 1516.0,
    "winRate": 51.0
  },
  {
    "name": "Totillathehun",
    "country": "United States",
    "rating": 1124.0,
    "profileUrl": "https://www.aoe2insights.com/user/4820637",
    "isActive": true,
    "peakRating": 1282.0,
    "winRate": 51.0
  },
  {
    "name": "TrickyMicky90",
    "country": "Australia",
    "rating": 1464.0,
    "profileUrl": "https://www.aoe2insights.com/user/3083636",
    "isActive": true,
    "peakRating": 1464.0,
    "winRate": 53.0
  },
  {
    "name": "Twopenny Hangover",
    "country": "Poland",
    "rating": 1348.0,
    "profileUrl": "https://www.aoe2insights.com/user/4481462",
    "isActive": true,
    "peakRating": 1500.0,
    "winRate": 51.0
  },
  {
    "name": "Tuss",
    "country": "France",
    "rating": 1886.0,
    "profileUrl": "https://www.aoe2insights.com/user/1242469",
    "isActive": true,
    "peakRating": 1966.0,
    "winRate": 51.0
  },
  {
    "name": "Validus87",
    "country": "United Kingdom",
    "rating": 807.0,
    "profileUrl": "https://www.aoe2insights.com/user/13166108",
    "isActive": true,
    "peakRating": 902.0,
    "winRate": 49.0
  },
  {
    "name": "Volunteer Dominos\u00ae Employee",
    "country": "Canada",
    "rating": 1332.0,
    "profileUrl": "https://www.aoe2insights.com/user/2567136",
    "isActive": true,
    "peakRating": 1401.0,
    "winRate": 51.0
  },
  {
    "name": "Vomastek",
    "country": "Czech Republic",
    "rating": 1584.0,
    "profileUrl": "https://www.aoe2insights.com/user/1104040",
    "isActive": true,
    "peakRating": 1621.0,
    "winRate": 54.0
  },
  {
    "name": "Wait...What?",
    "country": "United States",
    "rating": 1077.0,
    "profileUrl": "https://www.aoe2insights.com/user/12531213",
    "isActive": true,
    "peakRating": 1155.0,
    "winRate": 51.0
  },
  {
    "name": "Warchief_Link",
    "country": "Colombia",
    "rating": 1066.0,
    "profileUrl": "https://www.aoe2insights.com/user/3446799",
    "isActive": true,
    "peakRating": 1234.0,
    "winRate": 51.0
  },
  {
    "name": "Whyza",
    "country": "Poland",
    "rating": 1042.0,
    "profileUrl": "https://www.aoe2insights.com/user/16309",
    "isActive": true,
    "peakRating": 1113.0,
    "winRate": 51.0
  },
  {
    "name": "Willdbeast",
    "country": "United Kingdom",
    "rating": 1786.0,
    "profileUrl": "https://www.aoe2insights.com/user/278329",
    "isActive": true,
    "peakRating": 1937.0,
    "winRate": 51.0
  },
  {
    "name": "Witty_matty",
    "country": "Poland",
    "rating": 1368.0,
    "profileUrl": "https://www.aoe2insights.com/user/10667559",
    "isActive": true,
    "peakRating": 1461.0,
    "winRate": 51.0
  },
  {
    "name": "Xardas_AOE",
    "country": "Germany",
    "rating": 1469.0,
    "profileUrl": "https://www.aoe2insights.com/user/186332",
    "isActive": true,
    "peakRating": 1470.0,
    "winRate": 64.0
  },
  {
    "name": "Xolotl",
    "country": "United Kingdom",
    "rating": 1645.0,
    "profileUrl": "https://www.aoe2insights.com/user/3043685",
    "isActive": true,
    "peakRating": 1645.0,
    "winRate": 53.0
  },
  {
    "name": "xRavyn",
    "country": "Armenia",
    "rating": 1552.0,
    "profileUrl": "https://www.aoe2insights.com/user/6242021",
    "isActive": true,
    "peakRating": 1794.0,
    "winRate": 51.0
  },
  {
    "name": "Yany",
    "country": "Hungary",
    "rating": 1192.0,
    "profileUrl": "https://www.aoe2insights.com/user/1930",
    "isActive": true,
    "peakRating": 1229.0,
    "winRate": 51.0
  },
  {
    "name": "Zark23",
    "country": "Canada",
    "rating": 1306.0,
    "profileUrl": "https://www.aoe2insights.com/user/5284914",
    "isActive": true,
    "peakRating": 1473.0,
    "winRate": 51.0
  },
  {
    "name": "[????]King_Boo",
    "country": "United Kingdom",
    "rating": 2154.0,
    "profileUrl": "https://www.aoe2insights.com/user/180520",
    "isActive": true,
    "peakRating": 2278.0,
    "winRate": 54.0
  },
  {
    "name": "randy pan",
    "country": "Canada",
    "rating": 1781.0,
    "profileUrl": "https://www.aoe2insights.com/user/1070306",
    "isActive": true,
    "peakRating": 1859.0,
    "winRate": 53.0
  },
  {
    "name": "Meh247",
    "country": "United States",
    "rating": 1653.0,
    "profileUrl": "https://www.aoe2insights.com/user/529262",
    "isActive": true,
    "peakRating": 1705.0,
    "winRate": 52.0
  },
  {
    "name": "1Sh0t",
    "country": "Canada",
    "rating": 1511.0,
    "profileUrl": "https://www.aoe2insights.com/user/9319174",
    "isActive": true,
    "peakRating": 1533.0,
    "winRate": 54.0
  },
  {
    "name": "Chris",
    "country": "United States",
    "rating": 1438.0,
    "profileUrl": "https://www.aoe2insights.com/user/11769331",
    "isActive": true,
    "peakRating": 1493.0,
    "winRate": 51.0
  },
  {
    "name": "McNuggets",
    "country": "Switzerland",
    "rating": 1292.0,
    "profileUrl": "https://www.aoe2insights.com/user/334334",
    "isActive": true,
    "peakRating": 1311.0,
    "winRate": 51.0
  },
  {
    "name": "aje.omar",
    "country": "Mexico",
    "rating": 1313.0,
    "profileUrl": "https://www.aoe2insights.com/user/9189507",
    "isActive": true,
    "peakRating": 1352.0,
    "winRate": 50.0
  },
  {
    "name": "grapejuice",
    "country": "Australia",
    "rating": 1207.0,
    "profileUrl": "https://www.aoe2insights.com/user/11688652",
    "isActive": true,
    "peakRating": 1207.0,
    "winRate": 53.0
  },
  {
    "name": "Laurie",
    "country": "United Kingdom",
    "rating": 1147.0,
    "profileUrl": "https://www.aoe2insights.com/user/243944",
    "isActive": true,
    "peakRating": 1200.0,
    "winRate": 53.0
  },
  {
    "name": "Fairytale Belkross",
    "country": "France",
    "rating": 1235.0,
    "profileUrl": "https://www.aoe2insights.com/user/1370771",
    "isActive": true,
    "peakRating": 1235.0,
    "winRate": 58.0
  },
  {
    "name": "Forteraiger",
    "country": "Ukraine",
    "rating": 1158.0,
    "profileUrl": "https://www.aoe2insights.com/user/13285902",
    "isActive": true,
    "peakRating": 1218.0,
    "winRate": 54.0
  },
  {
    "name": "Smithers",
    "country": "Sweden",
    "rating": 1154.0,
    "profileUrl": "https://www.aoe2insights.com/user/1304628",
    "isActive": true,
    "peakRating": 1210.0,
    "winRate": 51.0
  },
  {
    "name": "SoleZebrafish",
    "country": "United States",
    "rating": 1191.0,
    "profileUrl": "https://www.aoe2insights.com/user/2650734",
    "isActive": true,
    "peakRating": 1219.0,
    "winRate": 51.0
  },
  {
    "name": "Forkan Rick",
    "country": "United States",
    "rating": 1150.0,
    "profileUrl": "https://www.aoe2insights.com/user/2363867",
    "isActive": true,
    "peakRating": 1178.0,
    "winRate": 55.0
  },
  {
    "name": "marathaSun",
    "country": "India",
    "rating": 1012.0,
    "profileUrl": "https://www.aoe2insights.com/user/2543215",
    "isActive": true,
    "peakRating": 1150.0,
    "winRate": 50.0
  },
  {
    "name": "Jasuni",
    "country": "United States",
    "rating": 1038.0,
    "profileUrl": "https://www.aoe2insights.com/user/1464223",
    "isActive": true,
    "peakRating": 1072.0,
    "winRate": 52.0
  },
  {
    "name": "QuailzEnFire903",
    "country": "United States",
    "rating": 1034.0,
    "profileUrl": "https://www.aoe2insights.com/user/12964183",
    "isActive": true,
    "peakRating": 1035.0,
    "winRate": 56.0
  },
  {
    "name": "Nagraj",
    "country": "India",
    "rating": 1007.0,
    "profileUrl": "https://www.aoe2insights.com/user/6903668",
    "isActive": true,
    "peakRating": 1024.0,
    "winRate": 61.0
  },
  {
    "name": "Fairytale Fox",
    "country": "Canada",
    "rating": 919.0,
    "profileUrl": "https://www.aoe2insights.com/user/4662319",
    "isActive": true,
    "peakRating": 1040.0,
    "winRate": 51.0
  },
  {
    "name": "schmabenkl",
    "country": "Germany",
    "rating": 923.0,
    "profileUrl": "https://www.aoe2insights.com/user/1880713",
    "isActive": true,
    "peakRating": 989.0,
    "winRate": 50.0
  },
  {
    "name": "Crystella",
    "country": "United Kingdom",
    "rating": 819.0,
    "profileUrl": "https://www.aoe2insights.com/user/3892549",
    "isActive": true,
    "peakRating": 819.0,
    "winRate": 38.0
  },
  {
    "name": "Rodrixs Black Reaper",
    "country": "Argentina",
    "rating": 2341.0,
    "profileUrl": "https://www.aoe2insights.com/user/11440407",
    "isActive": true,
    "peakRating": 2431.0,
    "winRate": 51.0
  },
  {
    "name": "wR.Prisma",
    "country": "Argentina",
    "rating": 2567.0,
    "profileUrl": "https://www.aoe2insights.com/user/3176045",
    "isActive": true,
    "peakRating": 2766.0,
    "winRate": 54.0
  },
  {
    "name": "DS_Ozone",
    "country": "Colombia",
    "rating": 2489.0,
    "profileUrl": "https://www.aoe2insights.com/user/2654577",
    "isActive": true,
    "peakRating": 2636.0,
    "winRate": 51.0
  },
  {
    "name": "T90Official",
    "country": "United States",
    "rating": 2414.0,
    "profileUrl": "https://www.aoe2insights.com/user/197930",
    "isActive": true,
    "peakRating": 2435.0,
    "winRate": 54.0
  },
  {
    "name": "NOC | Wean Dinchester",
    "country": "Germany",
    "rating": 2279.0,
    "profileUrl": "https://www.aoe2insights.com/user/300565",
    "isActive": true,
    "peakRating": 2371.0,
    "winRate": 54.0
  },
  {
    "name": "OS+ | shiXo.#",
    "country": "Germany",
    "rating": 2261.0,
    "profileUrl": "https://www.aoe2insights.com/user/1137086",
    "isActive": true,
    "peakRating": 2371.0,
    "winRate": 50.0
  },
  {
    "name": "DarK | Benanji",
    "country": "Germany",
    "rating": 2357.0,
    "profileUrl": "https://www.aoe2insights.com/user/2463959",
    "isActive": true,
    "peakRating": 2403.0,
    "winRate": 53.0
  },
  {
    "name": "NuMa | AngelR",
    "country": "Colombia",
    "rating": 2215.0,
    "profileUrl": "https://www.aoe2insights.com/user/6838238",
    "isActive": true,
    "peakRating": 2263.0,
    "winRate": 52.0
  },
  {
    "name": "OLADUSHEK",
    "country": "Belarus",
    "rating": 2074.0,
    "profileUrl": "https://www.aoe2insights.com/user/1853187",
    "isActive": true,
    "peakRating": 2104.0,
    "winRate": 53.0
  },
  {
    "name": "[GLD] Abu abdullah",
    "country": "Saudi Arabia",
    "rating": 2228.0,
    "profileUrl": "https://www.aoe2insights.com/user/5839022",
    "isActive": true,
    "peakRating": 2228.0,
    "winRate": 54.0
  },
  {
    "name": "RoR | Bourbon",
    "country": "Russia",
    "rating": 1942.0,
    "profileUrl": "https://www.aoe2insights.com/user/1877180",
    "isActive": true,
    "peakRating": 2067.0,
    "winRate": 54.0
  },
  {
    "name": "Umdeuter",
    "country": "Germany",
    "rating": 1822.0,
    "profileUrl": "https://www.aoe2insights.com/user/249384",
    "isActive": true,
    "peakRating": 2009.0,
    "winRate": 50.0
  },
  {
    "name": "Auriko",
    "country": "France",
    "rating": 1731.0,
    "profileUrl": "https://www.aoe2insights.com/user/12642909",
    "isActive": true,
    "peakRating": 1882.0,
    "winRate": 55.0
  },
  {
    "name": "DS_qso214",
    "country": "Argentina",
    "rating": 1762.0,
    "profileUrl": "https://www.aoe2insights.com/user/3150133",
    "isActive": true,
    "peakRating": 1832.0,
    "winRate": 52.0
  },
  {
    "name": "Froman",
    "country": "United States",
    "rating": 1752.0,
    "profileUrl": "https://www.aoe2insights.com/user/4882298",
    "isActive": true,
    "peakRating": 1775.0,
    "winRate": 56.0
  },
  {
    "name": "DGHIR | Qeetsa",
    "country": "Mexico",
    "rating": 1794.0,
    "profileUrl": "https://www.aoe2insights.com/user/2075681",
    "isActive": true,
    "peakRating": 1827.0,
    "winRate": 53.0
  },
  {
    "name": "JustAGecko",
    "country": "United Kingdom",
    "rating": 1870.0,
    "profileUrl": "https://www.aoe2insights.com/user/236400",
    "isActive": true,
    "peakRating": 1891.0,
    "winRate": 50.0
  },
  {
    "name": "Cynthia",
    "country": "United States",
    "rating": 1637.0,
    "profileUrl": "https://www.aoe2insights.com/user/591709",
    "isActive": true,
    "peakRating": 1733.0,
    "winRate": 52.0
  },
  {
    "name": "edricsturm",
    "country": "Germany",
    "rating": 1674.0,
    "profileUrl": "https://www.aoe2insights.com/user/1467023",
    "isActive": true,
    "peakRating": 1889.0,
    "winRate": 50.0
  },
  {
    "name": "CharChar",
    "country": "Australia",
    "rating": 1580.0,
    "profileUrl": "https://www.aoe2insights.com/user/988308",
    "isActive": true,
    "peakRating": 1733.0,
    "winRate": 54.0
  },
  {
    "name": "ThisDino",
    "country": "Germany",
    "rating": 1714.0,
    "profileUrl": "https://www.aoe2insights.com/user/2533089",
    "isActive": true,
    "peakRating": 1736.0,
    "winRate": 51.0
  },
  {
    "name": "Refraid",
    "country": "Russia",
    "rating": 1787.0,
    "profileUrl": "https://www.aoe2insights.com/user/2404771",
    "isActive": true,
    "peakRating": 1802.0,
    "winRate": 53.0
  },
  {
    "name": "bobolavache",
    "country": "France",
    "rating": 1492.0,
    "profileUrl": "https://www.aoe2insights.com/user/1972590",
    "isActive": true,
    "peakRating": 1639.0,
    "winRate": 51.0
  },
  {
    "name": "Nown0",
    "country": "France",
    "rating": 1580.0,
    "profileUrl": "https://www.aoe2insights.com/user/4117931",
    "isActive": true,
    "peakRating": 1630.0,
    "winRate": 54.0
  },
  {
    "name": "Zycherious",
    "country": "United States",
    "rating": 1610.0,
    "profileUrl": "https://www.aoe2insights.com/user/2542159",
    "isActive": true,
    "peakRating": 1659.0,
    "winRate": 54.0
  },
  {
    "name": "Sylne4r",
    "country": "Germany",
    "rating": 1569.0,
    "profileUrl": "https://www.aoe2insights.com/user/1133888",
    "isActive": true,
    "peakRating": 1646.0,
    "winRate": 51.0
  },
  {
    "name": "gummi [Coleman]",
    "country": "Iceland",
    "rating": 1578.0,
    "profileUrl": "https://www.aoe2insights.com/user/260749",
    "isActive": true,
    "peakRating": 1739.0,
    "winRate": 51.0
  },
  {
    "name": "Matthew",
    "country": "Australia",
    "rating": 1597.0,
    "profileUrl": "https://www.aoe2insights.com/user/348642",
    "isActive": true,
    "peakRating": 1616.0,
    "winRate": 53.0
  },
  {
    "name": "Red Clifford",
    "country": "Netherlands",
    "rating": 1584.0,
    "profileUrl": "https://www.aoe2insights.com/user/1579558",
    "isActive": true,
    "peakRating": 1598.0,
    "winRate": 53.0
  },
  {
    "name": "tommy9512",
    "country": "Russia",
    "rating": 1527.0,
    "profileUrl": "https://www.aoe2insights.com/user/1133051",
    "isActive": true,
    "peakRating": 1527.0,
    "winRate": 67.0
  },
  {
    "name": "Nessy",
    "country": "Australia",
    "rating": 1448.0,
    "profileUrl": "https://www.aoe2insights.com/user/730232",
    "isActive": true,
    "peakRating": 1483.0,
    "winRate": 53.0
  },
  {
    "name": "Ex Lux",
    "country": "United States",
    "rating": 1363.0,
    "profileUrl": "https://www.aoe2insights.com/user/12372443",
    "isActive": true,
    "peakRating": 1371.0,
    "winRate": 55.0
  },
  {
    "name": "dead words",
    "country": "United States",
    "rating": 1394.0,
    "profileUrl": "https://www.aoe2insights.com/user/12870315",
    "isActive": true,
    "peakRating": 1468.0,
    "winRate": 52.0
  },
  {
    "name": "DraconicAspirant",
    "country": "Greece",
    "rating": 1579.0,
    "profileUrl": "https://www.aoe2insights.com/user/12558832",
    "isActive": true,
    "peakRating": 1579.0,
    "winRate": 51.0
  },
  {
    "name": "Citizen Snips",
    "country": "United States",
    "rating": 1448.0,
    "profileUrl": "https://www.aoe2insights.com/user/318414",
    "isActive": true,
    "peakRating": 1448.0,
    "winRate": 60.0
  },
  {
    "name": "hjpotter92",
    "country": "India",
    "rating": 1251.0,
    "profileUrl": "https://www.aoe2insights.com/user/1228227",
    "isActive": true,
    "peakRating": 1251.0,
    "winRate": 58.0
  },
  {
    "name": "hooplah",
    "country": "United Kingdom",
    "rating": 1337.0,
    "profileUrl": "https://www.aoe2insights.com/user/2594407",
    "isActive": true,
    "peakRating": 1369.0,
    "winRate": 53.0
  },
  {
    "name": "R3ChuukLogan",
    "country": "United States",
    "rating": 1268.0,
    "profileUrl": "https://www.aoe2insights.com/user/686170",
    "isActive": true,
    "peakRating": 1401.0,
    "winRate": 51.0
  },
  {
    "name": "Russian77",
    "country": "Slovakia",
    "rating": 1305.0,
    "profileUrl": "https://www.aoe2insights.com/user/1824106",
    "isActive": true,
    "peakRating": 1379.0,
    "winRate": 58.0
  },
  {
    "name": "Temperance",
    "country": "Belarus",
    "rating": 1285.0,
    "profileUrl": "https://www.aoe2insights.com/user/3588422",
    "isActive": true,
    "peakRating": 1317.0,
    "winRate": 63.0
  },
  {
    "name": "Sir_Duncan_The_Gull",
    "country": "Netherlands",
    "rating": 1271.0,
    "profileUrl": "https://www.aoe2insights.com/user/12626394",
    "isActive": true,
    "peakRating": 1386.0,
    "winRate": 51.0
  },
  {
    "name": "B\u00e9bou",
    "country": "France",
    "rating": 1300.0,
    "profileUrl": "https://www.aoe2insights.com/user/12744378",
    "isActive": true,
    "peakRating": 1360.0,
    "winRate": 53.0
  },
  {
    "name": "Philly Idle",
    "country": "Germany",
    "rating": 1001.0,
    "profileUrl": "https://www.aoe2insights.com/user/2105467",
    "isActive": true,
    "peakRating": 1177.0,
    "winRate": 50.0
  },
  {
    "name": "Rodeo Jones",
    "country": "Australia",
    "rating": 1220.0,
    "profileUrl": "https://www.aoe2insights.com/user/6754763",
    "isActive": true,
    "peakRating": 1346.0,
    "winRate": 51.0
  },
  {
    "name": "Lich King",
    "country": "Canada",
    "rating": 1240.0,
    "profileUrl": "https://www.aoe2insights.com/user/4049887",
    "isActive": true,
    "peakRating": 1275.0,
    "winRate": 54.0
  },
  {
    "name": "PajosPSCB",
    "country": "Czechia",
    "rating": 1203.0,
    "profileUrl": "https://www.aoe2insights.com/user/3528123",
    "isActive": true,
    "peakRating": 1296.0,
    "winRate": 51.0
  },
  {
    "name": "FT20",
    "country": "Chile",
    "rating": 1213.0,
    "profileUrl": "https://www.aoe2insights.com/user/12660890",
    "isActive": true,
    "peakRating": 1275.0,
    "winRate": 51.0
  },
  {
    "name": "Maestro | just a fish",
    "country": "Netherlands",
    "rating": 1300.0,
    "profileUrl": "https://www.aoe2insights.com/user/9440670",
    "isActive": true,
    "peakRating": 1315.0,
    "winRate": 52.0
  },
  {
    "name": "collace1",
    "country": "United Kingdom",
    "rating": 1158.0,
    "profileUrl": "https://www.aoe2insights.com/user/3084633",
    "isActive": true,
    "peakRating": 1220.0,
    "winRate": 50.0
  },
  {
    "name": "Pairu",
    "country": "Belgium",
    "rating": 1148.0,
    "profileUrl": "https://www.aoe2insights.com/user/11662735",
    "isActive": true,
    "peakRating": 1176.0,
    "winRate": 57.0
  },
  {
    "name": "SavageDog",
    "country": "Mexico",
    "rating": 1112.0,
    "profileUrl": "https://www.aoe2insights.com/user/12975601",
    "isActive": true,
    "peakRating": 1192.0,
    "winRate": 51.0
  },
  {
    "name": "Biodox",
    "country": "United States",
    "rating": 1114.0,
    "profileUrl": "https://www.aoe2insights.com/user/213904",
    "isActive": true,
    "peakRating": 1114.0,
    "winRate": 62.0
  },
  {
    "name": "Maudje10",
    "country": "Netherlands",
    "rating": 1059.0,
    "profileUrl": "https://www.aoe2insights.com/user/12257117",
    "isActive": true,
    "peakRating": 1161.0,
    "winRate": 51.0
  },
  {
    "name": "Busfahrer Ulus",
    "country": "Germany",
    "rating": 1007.0,
    "profileUrl": "https://www.aoe2insights.com/user/756434",
    "isActive": true,
    "peakRating": 1094.0,
    "winRate": 50.0
  },
  {
    "name": "JJNZ",
    "country": "New Zealand",
    "rating": 1024.0,
    "profileUrl": "https://www.aoe2insights.com/user/4320164",
    "isActive": true,
    "peakRating": 1115.0,
    "winRate": 52.0
  },
  {
    "name": "rey_erizo",
    "country": "Germany",
    "rating": 962.0,
    "profileUrl": "https://www.aoe2insights.com/user/12790570",
    "isActive": true,
    "peakRating": 1056.0,
    "winRate": 50.0
  },
  {
    "name": "ClickBait",
    "country": "Denmark",
    "rating": 969.0,
    "profileUrl": "https://www.aoe2insights.com/user/12225770",
    "isActive": true,
    "peakRating": 1206.0,
    "winRate": 50.0
  },
  {
    "name": "The Healing Monk",
    "country": "Netherlands",
    "rating": 999.0,
    "profileUrl": "https://www.aoe2insights.com/user/6901774",
    "isActive": true,
    "peakRating": 1090.0,
    "winRate": 53.0
  },
  {
    "name": "camfewell",
    "country": "United Kingdom",
    "rating": 1034.0,
    "profileUrl": "https://www.aoe2insights.com/user/12605769",
    "isActive": true,
    "peakRating": 1118.0,
    "winRate": 53.0
  },
  {
    "name": "PilgrimSoul",
    "country": "Italy",
    "rating": 1022.0,
    "profileUrl": "https://www.aoe2insights.com/user/12387823",
    "isActive": true,
    "peakRating": 1092.0,
    "winRate": 52.0
  },
  {
    "name": "RoboticPro",
    "country": "Netherlands",
    "rating": 948.0,
    "profileUrl": "https://www.aoe2insights.com/user/3877987",
    "isActive": true,
    "peakRating": 965.0,
    "winRate": 52.0
  },
  {
    "name": "MagratGarlick",
    "country": "Netherlands",
    "rating": 1017.0,
    "profileUrl": "https://www.aoe2insights.com/user/4061537",
    "isActive": true,
    "peakRating": 1049.0,
    "winRate": 50.0
  },
  {
    "name": "RKnight8",
    "country": "India",
    "rating": 1011.0,
    "profileUrl": "https://www.aoe2insights.com/user/12363008",
    "isActive": true,
    "peakRating": 1028.0,
    "winRate": 51.0
  },
  {
    "name": "Eljardinero4",
    "country": "Switzerland",
    "rating": 1079.0,
    "profileUrl": "https://www.aoe2insights.com/user/4954691",
    "isActive": true,
    "peakRating": 1096.0,
    "winRate": 51.0
  },
  {
    "name": "Gaius Iulius Megas",
    "country": "Austria",
    "rating": 1025.0,
    "profileUrl": "https://www.aoe2insights.com/user/3596974",
    "isActive": true,
    "peakRating": 1040.0,
    "winRate": 44.0
  },
  {
    "name": "Camaraderie",
    "country": "United States",
    "rating": 1012.0,
    "profileUrl": "https://www.aoe2insights.com/user/12081608",
    "isActive": true,
    "peakRating": 1081.0,
    "winRate": 51.0
  },
  {
    "name": "\ubc15\ud300",
    "country": "South Korea",
    "rating": 993.0,
    "profileUrl": "https://www.aoe2insights.com/user/1545285",
    "isActive": true,
    "peakRating": 993.0,
    "winRate": 50.0
  },
  {
    "name": "filipellopes",
    "country": "Brazil",
    "rating": 872.0,
    "profileUrl": "https://www.aoe2insights.com/user/5878630",
    "isActive": true,
    "peakRating": 872.0,
    "winRate": 54.0
  },
  {
    "name": "tumblwd",
    "country": "United Kingdom",
    "rating": 832.0,
    "profileUrl": "https://www.aoe2insights.com/user/1156997",
    "isActive": true,
    "peakRating": 896.0,
    "winRate": 50.0
  },
  {
    "name": "ButterFingerz",
    "country": "United States",
    "rating": 771.0,
    "profileUrl": "https://www.aoe2insights.com/user/12736422",
    "isActive": true,
    "peakRating": 866.0,
    "winRate": 50.0
  },
  {
    "name": "gurudeburdel",
    "country": "Argentina",
    "rating": 784.0,
    "profileUrl": "https://www.aoe2insights.com/user/12860672",
    "isActive": true,
    "peakRating": 903.0,
    "winRate": 50.0
  },
  {
    "name": "LeORI",
    "country": "Morocco",
    "rating": 811.0,
    "profileUrl": "https://www.aoe2insights.com/user/12893468",
    "isActive": true,
    "peakRating": 838.0,
    "winRate": 51.0
  },
  {
    "name": "InkMeBaby69",
    "country": "United Kingdom",
    "rating": 893.0,
    "profileUrl": "https://www.aoe2insights.com/user/13317354",
    "isActive": true,
    "peakRating": 939.0,
    "winRate": 52.0
  },
  {
    "name": "griff3n",
    "country": "Germany",
    "rating": 258.0,
    "profileUrl": "https://www.aoe2insights.com/user/289975",
    "isActive": true,
    "peakRating": 577.0,
    "winRate": 20.0
  },
  {
    "name": "santiagoap",
    "country": "Argentina",
    "rating": 1867.0,
    "profileUrl": "https://www.aoe2insights.com/user/2429779",
    "isActive": true,
    "peakRating": 1887.0,
    "winRate": 52.0
  },
  {
    "name": "wosm",
    "country": "Poland",
    "rating": 1760.0,
    "profileUrl": "https://www.aoe2insights.com/user/12767241",
    "isActive": true,
    "peakRating": 1778.0,
    "winRate": 61.0
  },
  {
    "name": "Jarvin",
    "country": "Poland",
    "rating": 1709.0,
    "profileUrl": "https://www.aoe2insights.com/user/225026",
    "isActive": true,
    "peakRating": 1883.0,
    "winRate": 51.0
  },
  {
    "name": "TrCL.Welcometorapture",
    "country": "Belgium",
    "rating": 1432.0,
    "profileUrl": "https://www.aoe2insights.com/user/4460059",
    "isActive": true,
    "peakRating": 1432.0,
    "winRate": 62.0
  },
  {
    "name": "Mike'dugai",
    "country": "United Kingdom",
    "rating": 1357.0,
    "profileUrl": "https://www.aoe2insights.com/user/670688",
    "isActive": true,
    "peakRating": 1389.0,
    "winRate": 62.0
  },
  {
    "name": "Tejanoheat",
    "country": "United States",
    "rating": 1278.0,
    "profileUrl": "https://www.aoe2insights.com/user/9330870",
    "isActive": true,
    "peakRating": 1462.0,
    "winRate": 51.0
  },
  {
    "name": "apach2412",
    "country": "United States",
    "rating": 1319.0,
    "profileUrl": "https://www.aoe2insights.com/user/2783719",
    "isActive": true,
    "peakRating": 1407.0,
    "winRate": 51.0
  },
  {
    "name": "xCONTORTIONISTx",
    "country": "United States",
    "rating": 1017.0,
    "profileUrl": "https://www.aoe2insights.com/user/440650",
    "isActive": true,
    "peakRating": 1033.0,
    "winRate": 54.0
  },
  {
    "name": "dumbcube",
    "country": "United States",
    "rating": 594.0,
    "profileUrl": "https://www.aoe2insights.com/user/11763878",
    "isActive": true,
    "peakRating": 697.0,
    "winRate": 50.0
  },
  {
    "name": "SlayerTTV750",
    "country": "Australia",
    "rating": 336.0,
    "profileUrl": "https://www.aoe2insights.com/user/13201730",
    "isActive": true,
    "peakRating": 584.0,
    "winRate": 44.0
  }
];

export default samplePlayers;

const sampleMaps = [
  {
    id: "badlands",
    name: "Badlands",
    image: "/maps/badlands.png",
    type: "Open",
    description: "Players cannot farm near town centers. Wood in the immediate area is scarce. More wood rests in the central pit. Players can expect to have scattered economies and endless raiding throughout the game",
    bestCivs: ["Romans", "Magyars", "Khmer", "Japanese"],
    strategies: ["20 pop MAA", "19 pop Scouts", "Heavy Feudal aggression"],
    tournaments: ["T90 Community Cup 2"],
    features: ["Open terrain", "Scattered resources", "Multiple attack angles"],
  },
  {
    id: "big-freeze",
    name: "Big Freeze",
    image: "/maps/big-freeze.png",
    type: "Closed",
    description: "Players start surrounded by palisade walls as a weak defence against early aggression. The middle of the map is a big frozen lake, but with a few cracks and exposed water, players will be able to fish through the cracks.",
    bestCivs: ["Romans", "Japanese", "Armenians"],
    strategies: ["MAA + archers/skirms", "MAA + towers"],
    tournaments: ["T90 Community Cup 2"],
    features: ["Water control", "Ice passages", "Limited resources"],
  },
  {
    id: "coast-arena",
    name: "Coast Arena",
    image: "/maps/coast-arena.png",
    type: "Water",
    description: "Imagine Arena, but with water all around the map’s edge. Open space towards your opponents and relics in the center, forests on both sides of your base",
    bestCivs: ["Malay", "Bengalis", "Italians", "Armenians"],
    strategies: ["Triple Dock Galleys", "FC Fires/War Galleys", "Castle Drop + UU/Fast Imp", "Monk Rush"],
    tournaments: ["T90 Community Cup 2"],
    features: ["Walled start", "Coastal access", "Defensive positioning"],
  },
  {
    id: "hoodoo",
    name: "Hoodoo",
    image: "/maps/hoodoo.png",
    type: "Nomad",
    description: "Nomad start for Scandavia like map. Has a lot of hunts available nearby.",
    bestCivs: ["Spanish", "Koreans", "Italians"],
    strategies: ["Eagle warrior raids", "Archer mass with micro", "Economic boom to Imperial"],
    tournaments: ["T90 Community Cup 2"],
    features: ["Central forest", "Multiple expansions", "Raid opportunities"],
  },
  {
    id: "koala",
    name: "Koala",
    image: "/maps/koala.png",
    type: "Open",
    description: "A random map in the shape of a koala head. Curved back woodline might give a false sense of security as the berries and one of your two gold and stone piles will always spawn forward. Additional gold and stone can be found on the mountainous outer reaches of the map",
    bestCivs: ["Lithuanians", "Aztecs"],
    strategies: ["Archer play with forest advantage", "Siege push through chokes", "Economic focus with trade"],
    tournaments: ["T90 Community Cup 2"],
    features: ["Forest advantage", "Multiple clearings", "Choke points"],
  },
  {
    id: "le-grand-fosse",
    name: "Le Grand Fosse",
    image: "/maps/le-grand-fosse.png",
    type: "Closed",
    description: "Each player starts in half a village, separated by a ditch. Resources within the village are scarce and there are no safe woodlines inside the palisade walls. Wild boars are found near the forests. All the neutral gold is protected by four fortified Roman camps in the corners.",
    bestCivs: ["Dravidians", "Romans", "Mongols"],
    strategies: ["Cavalry dominance on open areas", "Control of high ground", "Multi-pronged attacks"],
    tournaments: ["T90 Community Cup 2"],
    features: ["Elevation differences", "Central depression", "Strategic positioning"],
  },
  {
    id: "northern-crossings",
    name: "Northern Crossings",
    image: "/maps/northen-crossings.png",
    type: "Hybrid",
    description: "Similar to Northen Isles but adds shallow connections between the player islands on both sides. Players start with a transport ship. ",
    bestCivs: ["Dravidians", "Italians", "Armenians"],
    strategies: ["Fast galley rush", "Island hopping with transports", "Cannon galleon control"],
    tournaments: ["T90 Community Cup 2"],
    features: ["Multiple islands", "Naval combat", "Transport warfare"],
  },
  {
    id: "roe-rage",
    name: "Roe Rage",
    image: "/Roe_rage_aoe2_map.png",
    type: "Hybrid",
    description: "Described as a Kawasan cousin, Roe Rage features extra cows and a pond in the middle, which players can get to once they cut through a ring of trees. Extra gold and stone are scattered throughout the map",
    bestCivs: ["Georgians", "Chinese", "Lithuanians"],
    strategies: ["Aggressive galley play", "Fire ship counters", "Central island control"],
    tournaments: ["T90 Community Cup 2"],
    features: ["Central island", "Aggressive gameplay", "Naval focus"],
  },
  {
    id: "sunburn",
    name: "Sunburn",
    image: "/maps/sunburn.png",
    type: "Open",
    description: "With one extensive forest dividing the savannah, choosing the right direction of attack will be critical in the quest for complete domination. The savannah is home to many resources",
    bestCivs: ["Mayans", "Goths", "Incas"],
    strategies: ["Hybrid army composition", "Pond control for fish", "Flexible unit production"],
    tournaments: ["T90 Community Cup 2", "Secret Desert Cup"],
    features: ["Multiple ponds", "Hybrid gameplay", "Flexible strategies"],
  },
  {
    id: "triple-tunnel",
    name: "Triple Tunnel",
    image: "/triple-tunnel.png",
    type: "Closed",
    description: "Similar to Black Forest but has three openings always and a pond for fish boom. Extra golds and stone positioned in each opening ",
    bestCivs: ["Malay", "Burgundians", "Japanese"],
    strategies: ["Gunpowder unit advantage", "Coastal control", "Tunnel warfare tactics"],
    tournaments: ["T90 Community Cup 2"],
    features: ["Tunnel systems", "Coastal elements", "Strategic depth"],
  },
  {
    id: "african-rivers",
    name: "African Rivers",
    image: "/maps/african-rivers.png",
    type: "Hybrid",
    description:
      "Players start very close to each other with a tiny lake running through the center of the map. Players spawn on the inner ring, separated by a river from the outer ring where most resources are located.",
    bestCivs: ["Japanese", "Georgians", "Chinese"],
    strategies: ["Fast Town Center placement", "Villager fights for resources", "Quick military production"],
   tournaments: ["T90 Community Cup 2"],
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
    playoffsStarted: true,
    format: 'Round Robin',
    description: 'Second edition of Pick and Mixer with mixed maps and civs',
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
    playoffsStarted: true,
    format: 'Double Elimination',
    description: 'Fast-paced Stronghold tournament, back for season 2',
    featured: false,
    isActive: true
  },
  {
    name: 'Alchemy League Season 8',
    organizer: 'Tech Chariot',
    date: new Date('2025-02-15'),
    prizePool: { amount: 160, currency: 'USD' },
    status: 'ongoing', // current
    type: 'Community',
    playoffsStarted: false,
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
    status: 'ongoing', // upcoming
    registrationDeadline: new Date('2025-10-31'),
    registrationLink: 'https://discord.com/invite/Wz57XRkmQh',
    type: 'Community',
    playoffsStarted: false,
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
    status: 'ongoing', // upcoming
    registrationDeadline: new Date('2025-11-04'),
    registrationLink: 'https://discord.com/invite/bUgV2saKUN',
    type: 'Community',
    playoffsStarted: false,
    format: 'Round Robin',
    description: 'At the end of each round, winners move up, losers move down. This dynamic "ping-pong" system ensures increasingly balanced matchups week after week',
    featured: false,
    isActive: true
  },
  {
    name: 'T90 Sudden Death Cup',
    organizer: 'Rbase',
    date: new Date('2025-11-24'),
    prizePool: { amount: 0, currency: 'USD' },
    status: 'registration', // upcoming
    registrationDeadline: new Date('2025-11-21'),
    registrationLink: 'https://discord.com/invite/vMpPuPjba8',
    type: 'Community',
    format: 'Round Robin',
    description: 'New T90 community event with sudden death settings',
    featured: false,
    isActive: true
  },
  {
    name: 'Super Idiot Cup 3',
    organizer: 'ThisDino',
    date: new Date('2025-11-10'),
    prizePool: { amount: 0, currency: 'USD' },
    status: 'ongoing', // upcoming
    registrationDeadline: new Date('2025-11-09'),
    registrationLink: 'https://discord.gg/JH45NZTmT4',
    type: 'Community',
    playoffsStarted: false,
    format: 'Round Robin',
    description: 'Anything can happen to you. Exploding Vills, Dodgeball, Cheat Codes and more',
    featured: false,
    isActive: true
  },
];

const sampleLeaderboard = [
  {
    name: "Arabia Lovers 2",
    organizer: "ThisDino",
    date: "2025-10-25",
    winners: [
      { division: "Division 1", player: "Breakfast", rating: null },
      { division: "Division 2", player: "LilyBear", rating: null },
      { division: "Division 3", player: "xRavyn", rating: null },
      { division: "Division 4", player: "ThisDino", rating: null },
      { division: "Division 5", player: "Amo", rating: null },
      { division: "Division 6", player: "Lucky23", rating: null },
      { division: "Division 7", player: "Satellites of Heaven", rating: null },
      { division: "Division 8", player: "GoldRoger", rating: null },
    ],
    runnerUps: [
      { division: "Division 1", player: "kataphraktos", rating: null },
      { division: "Division 2", player: "BigTastyBacon", rating: null },
      { division: "Division 3", player: "JawolopingChris", rating: null },
      { division: "Division 4", player: "Flying Mouse", rating: null },
      { division: "Division 5", player: "Abigaille", rating: null },
      { division: "Division 6", player: "Chipmunk", rating: null },
      { division: "Division 7", player: "rOb", rating: null },
      { division: "Division 8", player: "El Renegado", rating: null },
    ],
    isActive: true,
  },
  {
  name: "AoELeagues",
  organizer: "Javisty, KoaLollo, RoboticPro",
  date: "2025-11-12",
  winners: [
    { division: "Division A", player: "Ozone", rating: null },
    { division: "Division B", player: "Abu Abdullah", rating: null },
    { division: "Division C", player: "TheSleepyBishop", rating: null },
    { division: "Division D", player: "Metal", rating: null },
    { division: "Division F", player: "tommy9512", rating: null },
    { division: "Division G", player: "Nope1585", rating: null },
    { division: "Division H", player: "Ezio", rating: null },
    { division: "Division I", player: "El Mikalos", rating: null }
  ],
  runnerUps: [
    { division: "Division A", player: "Rodrixs", rating: null },
    { division: "Division B", player: "xRavyn", rating: null },
    { division: "Division C", player: "JustAGecko", rating: null },
    { division: "Division D", player: "gh0stwriter", rating: null },
    { division: "Division F", player: "Red Clifford", rating: null },
    { division: "Division G", player: "Citizen Snips", rating: null },
    { division: "Division H", player: "canttouchme", rating: null },
    { division: "Division I", player: "Hornet-Wing", rating: null }
  ],
  isActive: true
}

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
