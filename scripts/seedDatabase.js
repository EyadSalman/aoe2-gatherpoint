// scripts/seedDatabase.js
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
    "rating": 1455.0,
    "profileUrl": "https://www.aoe2insights.com/user/2158159/",
    "isActive": true,
    "peakRating": 1537.0,
    "winRate": "51.02%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Adthor",
    "country": "United States",
    "rating": 944.0,
    "profileUrl": "https://www.aoe2insights.com/user/13054248/",
    "isActive": true,
    "peakRating": 971.0,
    "winRate": "51.33%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "AirBudGoldenRec",
    "country": "United States",
    "rating": 1129.0,
    "profileUrl": "https://www.aoe2insights.com/user/11683000/",
    "isActive": true,
    "peakRating": 1168.0,
    "winRate": "51.13%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "[KniN] Akkal",
    "country": "Norway",
    "rating": 1282.0,
    "profileUrl": "https://www.aoe2insights.com/user/277869/",
    "isActive": true,
    "peakRating": 1428.0,
    "winRate": "50.18%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "ITA 90 | Pagadona",
    "country": "Argentina",
    "rating": 1347.0,
    "profileUrl": "https://www.aoe2insights.com/user/5791522/",
    "isActive": true,
    "peakRating": 1386.0,
    "winRate": "51.03%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2"]
  },
  {
    "name": "ADoni1363211",
    "country": "Romania",
    "rating": 1337.0,
    "profileUrl": "https://www.aoe2insights.com/user/8669401/",
    "isActive": true,
    "peakRating": 1407.0,
    "winRate": "51.7%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "ALPHAKRIT",
    "country": "United States",
    "rating": 1273.0,
    "profileUrl": "https://www.aoe2insights.com/user/9934717/",
    "isActive": true,
    "peakRating": 1423.0,
    "winRate": "50.91%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "amonxzol",
    "country": "United Kingdom",
    "rating": 1636.0,
    "profileUrl": "https://www.aoe2insights.com/user/233750/",
    "isActive": true,
    "peakRating": 1716.0,
    "winRate": "52.38%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Amo",
    "country": "New Zealand",
    "rating": 1454.0,
    "profileUrl": "https://www.aoe2insights.com/user/11765693/",
    "isActive": true,
    "peakRating": 1626.0,
    "winRate": "50.56%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Apostic",
    "country": "United States",
    "rating": 1097.0,
    "profileUrl": "https://www.aoe2insights.com/user/4510278/",
    "isActive": true,
    "peakRating": 1158.0,
    "winRate": "51.12%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "|TN| TheOnlyNarwhal",
    "country": "United Kingdom",
    "rating": 1490.0,
    "profileUrl": "https://www.aoe2insights.com/user/10903621/",
    "isActive": true,
    "peakRating": 1523.0,
    "winRate": "53.82%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "ashoof",
    "country": "United States",
    "rating": 933.0,
    "profileUrl": "https://www.aoe2insights.com/user/13117300/",
    "isActive": true,
    "peakRating": 1002.0,
    "winRate": "53.17%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "avlid",
    "country": "Sweden",
    "rating": 1918.0,
    "profileUrl": "https://www.aoe2insights.com/user/254645/",
    "isActive": true,
    "peakRating": 2107.0,
    "winRate": "51.75%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "Beargwyn",
    "country": "Switzerland",
    "rating": 1296.0,
    "profileUrl": "https://www.aoe2insights.com/user/6859687/",
    "isActive": true,
    "peakRating": 1306.0,
    "winRate": "51.97%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "T90 Sudden Death Cup"]
  },
  {
    "name": "Bender",
    "country": "Australia",
    "rating": 1896.0,
    "profileUrl": "https://www.aoe2insights.com/user/12517895/",
    "isActive": true,
    "peakRating": 1924.0,
    "winRate": "51.9%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Bishop",
    "country": "United States",
    "rating": 1089.0,
    "profileUrl": "https://www.aoe2insights.com/user/950113/",
    "isActive": true,
    "peakRating": 1121.0,
    "winRate": "50.28%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Black Lotus",
    "country": "Poland",
    "rating": 1717.0,
    "profileUrl": "https://www.aoe2insights.com/user/941790/",
    "isActive": true,
    "peakRating": 1822.0,
    "winRate": "50.45%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "Bloomd",
    "country": "United States",
    "rating": 1724.0,
    "profileUrl": "https://www.aoe2insights.com/user/2239994/",
    "isActive": true,
    "peakRating": 1860.0,
    "winRate": "50.82%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "TulparFYNH",
    "country": "Turkey",
    "rating": 1617.0,
    "profileUrl": "https://www.aoe2insights.com/user/2363846/",
    "isActive": true,
    "peakRating": 1778.0,
    "winRate": "50.69%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "BoesBoes",
    "country": "Netherlands",
    "rating": 1384.0,
    "profileUrl": "https://www.aoe2insights.com/user/2010525/",
    "isActive": true,
    "peakRating": 1460.0,
    "winRate": "50.54%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "Boarderdudeman",
    "country": "United States",
    "rating": 1558.0,
    "profileUrl": "https://www.aoe2insights.com/user/237994/",
    "isActive": true,
    "peakRating": 1578.0,
    "winRate": "53.07%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "Breakfast",
    "country": "United Kingdom",
    "rating": 1982.0,
    "profileUrl": "https://www.aoe2insights.com/user/4851630/",
    "isActive": true,
    "peakRating": 2129.0,
    "winRate": "50.63%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2"]
  },
  {
    "name": "brydazi",
    "country": "United States",
    "rating": 1152.0,
    "profileUrl": "https://www.aoe2insights.com/user/12783556/",
    "isActive": true,
    "peakRating": 1152.0,
    "winRate": "51.65%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "bumbaloe",
    "country": "United States",
    "rating": 1081.0,
    "profileUrl": "https://www.aoe2insights.com/user/1722912/",
    "isActive": true,
    "peakRating": 1082.0,
    "winRate": "54.87%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2"]
  },
  {
    "name": "canttouchme",
    "country": "Germany",
    "rating": 1252.0,
    "profileUrl": "https://www.aoe2insights.com/user/1965270/",
    "isActive": true,
    "peakRating": 1397.0,
    "winRate": "50.37%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "rambonoon_25",
    "country": "Australia",
    "rating": 1108.0,
    "profileUrl": "https://www.aoe2insights.com/user/5553104/",
    "isActive": true,
    "peakRating": 1124.0,
    "winRate": "55.63%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2"]
  },
  {
    "name": "CheesecakeMasta",
    "country": "United States",
    "rating": 1545.0,
    "profileUrl": "https://www.aoe2insights.com/user/293313/",
    "isActive": true,
    "peakRating": 1642.0,
    "winRate": "51.15%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "chelbird",
    "country": "Austria",
    "rating": 1716.0,
    "profileUrl": "https://www.aoe2insights.com/user/2543478/",
    "isActive": true,
    "peakRating": 1858.0,
    "winRate": "50.36%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Chipmunk",
    "country": "Argentina",
    "rating": 1507.0,
    "profileUrl": "https://www.aoe2insights.com/user/282529/",
    "isActive": true,
    "peakRating": 1521.0,
    "winRate": "51.77%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Clarky0202",
    "country": "United Kingdom",
    "rating": 1224.0,
    "profileUrl": "https://www.aoe2insights.com/user/697097/",
    "isActive": true,
    "peakRating": 1270.0,
    "winRate": "50.98%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Coaltrain",
    "country": "United States",
    "rating": 1622.0,
    "profileUrl": "https://www.aoe2insights.com/user/1720213/",
    "isActive": true,
    "peakRating": 1708.0,
    "winRate": "53.58%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Code Name: Raven",
    "country": "United States",
    "rating": 1328.0,
    "profileUrl": "https://www.aoe2insights.com/user/402345/",
    "isActive": true,
    "peakRating": 1361.0,
    "winRate": "50.63%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "comfrick",
    "country": "New Zealand",
    "rating": 1628.0,
    "profileUrl": "https://www.aoe2insights.com/user/6368551/",
    "isActive": true,
    "peakRating": 1796.0,
    "winRate": "50.47%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "TheBeekeeper",
    "country": "Romania",
    "rating": 1297.0,
    "profileUrl": "https://www.aoe2insights.com/user/4285252/",
    "isActive": true,
    "peakRating": 1391.0,
    "winRate": "51.1%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "Custos",
    "country": "Germany",
    "rating": 948.0,
    "profileUrl": "https://www.aoe2insights.com/user/792014/",
    "isActive": true,
    "peakRating": 1058.0,
    "winRate": "41.38%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Cyvarios",
    "country": "Canada",
    "rating": 1596.0,
    "profileUrl": "https://www.aoe2insights.com/user/9058532/",
    "isActive": true,
    "peakRating": 1596.0,
    "winRate": "62.73%",
    "recentTournamentsPlayed": ["7ps Season 7", "Stronghold Frenzy 2"]
  },
  {
    "name": "DaSwedishBeast",
    "country": "United States",
    "rating": 1086.0,
    "profileUrl": "https://www.aoe2insights.com/user/2479744/",
    "isActive": true,
    "peakRating": 1086.0,
    "winRate": "54.01%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Dashermin",
    "country": "United States",
    "rating": 1152.0,
    "profileUrl": "https://www.aoe2insights.com/user/6073178/",
    "isActive": true,
    "peakRating": 1289.0,
    "winRate": "51.68%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Teba",
    "country": "Costa Rica",
    "rating": 990.0,
    "profileUrl": "https://www.aoe2insights.com/user/312182/",
    "isActive": true,
    "peakRating": 1124.0,
    "winRate": "50.8%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Dawn",
    "country": "Germany",
    "rating": 1483.0,
    "profileUrl": "https://www.aoe2insights.com/user/12202531/",
    "isActive": true,
    "peakRating": 1630.0,
    "winRate": "54.89%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "dhr10398",
    "country": "India",
    "rating": 856.0,
    "profileUrl": "https://www.aoe2insights.com/user/10510225/",
    "isActive": true,
    "peakRating": 911.0,
    "winRate": "50.29%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "dioroja",
    "country": "Finland",
    "rating": 1633.0,
    "profileUrl": "https://www.aoe2insights.com/user/2439151/",
    "isActive": true,
    "peakRating": 1655.0,
    "winRate": "61.84%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "dodo3011",
    "country": "Germany",
    "rating": 1519.0,
    "profileUrl": "https://www.aoe2insights.com/user/12559976/",
    "isActive": true,
    "peakRating": 1670.0,
    "winRate": "51.43%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "domhusk",
    "country": "Ireland",
    "rating": 1332.0,
    "profileUrl": "https://www.aoe2insights.com/user/3306988/",
    "isActive": true,
    "peakRating": 1465.0,
    "winRate": "51.93%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Dracarna",
    "country": "United Kingdom",
    "rating": 1004.0,
    "profileUrl": "https://www.aoe2insights.com/user/1394115/",
    "isActive": true,
    "peakRating": 1064.0,
    "winRate": "50.36%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "DrLoops",
    "country": "United Kingdom",
    "rating": 1884.0,
    "profileUrl": "https://www.aoe2insights.com/user/3903933/",
    "isActive": true,
    "peakRating": 1913.0,
    "winRate": "50.67%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Porozhniak Natria",
    "country": "Ukraine",
    "rating": 1401.0,
    "profileUrl": "https://www.aoe2insights.com/user/13060828/",
    "isActive": true,
    "peakRating": 1420.0,
    "winRate": "52.45%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Eden",
    "country": "Canada",
    "rating": 1632.0,
    "profileUrl": "https://www.aoe2insights.com/user/12592487/",
    "isActive": true,
    "peakRating": 1764.0,
    "winRate": "51.82%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "ITA | CivettaSuElefante",
    "country": "Italy",
    "rating": 1330.0,
    "profileUrl": "https://www.aoe2insights.com/user/229416/",
    "isActive": true,
    "peakRating": 1421.0,
    "winRate": "51.09%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "El Latigo",
    "country": "Argentina",
    "rating": 1217.0,
    "profileUrl": "https://www.aoe2insights.com/user/2770291/",
    "isActive": true,
    "peakRating": 1234.0,
    "winRate": "51.84%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8"]
  },
  {
    "name": "El Mikalos",
    "country": "United Kingdom",
    "rating": 1403.0,
    "profileUrl": "https://www.aoe2insights.com/user/12594426/",
    "isActive": true,
    "peakRating": 1505.0,
    "winRate": "50.85%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "EmperorNoob97",
    "country": "United Kingdom",
    "rating": 1042.0,
    "profileUrl": "https://www.aoe2insights.com/user/5422400/",
    "isActive": true,
    "peakRating": 1071.0,
    "winRate": "53.47%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Emp. Peter",
    "country": "Netherlands",
    "rating": 1096.0,
    "profileUrl": "https://www.aoe2insights.com/user/2558975/",
    "isActive": true,
    "peakRating": 1285.0,
    "winRate": "50.43%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "JJ23",
    "country": "Germany",
    "rating": 917.0,
    "profileUrl": "https://www.aoe2insights.com/user/1639985/",
    "isActive": true,
    "peakRating": 997.0,
    "winRate": "50.51%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "EnnoVonDerTanke",
    "country": "Germany",
    "rating": 1171.0,
    "profileUrl": "https://www.aoe2insights.com/user/9649575/",
    "isActive": true,
    "peakRating": 1251.0,
    "winRate": "50.75%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Escalus",
    "country": "United States",
    "rating": 1832.0,
    "profileUrl": "https://www.aoe2insights.com/user/757980/",
    "isActive": true,
    "peakRating": 1930.0,
    "winRate": "51.64%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "NuMa | Ezio",
    "country": "Colombia",
    "rating": 1288.0,
    "profileUrl": "https://www.aoe2insights.com/user/13124087/",
    "isActive": true,
    "peakRating": 1304.0,
    "winRate": "57.36%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "a very high fgzb",
    "country": "United States",
    "rating": 1248.0,
    "profileUrl": "https://www.aoe2insights.com/user/13045745/",
    "isActive": true,
    "peakRating": 1266.0,
    "winRate": "54.24%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "Stronghold Frenzy 2"]
  },
  {
    "name": "Firmatt",
    "country": "Czechia",
    "rating": 1267.0,
    "profileUrl": "https://www.aoe2insights.com/user/12858284/",
    "isActive": true,
    "peakRating": 1267.0,
    "winRate": "56.92%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Fishman",
    "country": "Australia",
    "rating": 1190.0,
    "profileUrl": "https://www.aoe2insights.com/user/295020/",
    "isActive": true,
    "peakRating": 1225.0,
    "winRate": "53.44%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "FiveCatsATrebuchetandaDream",
    "country": "United States",
    "rating": 1149.0,
    "profileUrl": "https://www.aoe2insights.com/user/9705242/",
    "isActive": true,
    "peakRating": 1158.0,
    "winRate": "50.76%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Fj5589",
    "country": "Argentina",
    "rating": 992.0,
    "profileUrl": "https://www.aoe2insights.com/user/5830463/",
    "isActive": true,
    "peakRating": 1088.0,
    "winRate": "50.89%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "FloosWorld",
    "country": "Germany",
    "rating": 886.0,
    "profileUrl": "https://www.aoe2insights.com/user/1349/",
    "isActive": true,
    "peakRating": 1043.0,
    "winRate": "50.58%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Flan Implacable",
    "country": "Spain",
    "rating": 1019.0,
    "profileUrl": "https://www.aoe2insights.com/user/393242/",
    "isActive": true,
    "peakRating": 1132.0,
    "winRate": "51.12%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "Flying Mouse -AOE-",
    "country": "Germany",
    "rating": 1631.0,
    "profileUrl": "https://www.aoe2insights.com/user/227587/",
    "isActive": true,
    "peakRating": 1631.0,
    "winRate": "53.28%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "TocToc.Fuegan33",
    "country": "France",
    "rating": 1581.0,
    "profileUrl": "https://www.aoe2insights.com/user/880156/",
    "isActive": true,
    "peakRating": 1652.0,
    "winRate": "51.27%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Ganjii x",
    "country": "United Kingdom",
    "rating": 1577.0,
    "profileUrl": "https://www.aoe2insights.com/user/2082547/",
    "isActive": true,
    "peakRating": 1600.0,
    "winRate": "51.29%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "NL-Gilli0315",
    "country": "Netherlands",
    "rating": 1049.0,
    "profileUrl": "https://www.aoe2insights.com/user/10377768/",
    "isActive": true,
    "peakRating": 1237.0,
    "winRate": "51.06%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "Genoese Crossbowman",
    "country": "Argentina",
    "rating": 1670.0,
    "profileUrl": "https://www.aoe2insights.com/user/270569/",
    "isActive": true,
    "peakRating": 1670.0,
    "winRate": "51.77%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "T90 Sudden Death Cup"]
  },
  {
    "name": "[82AD] GeneralOcto",
    "country": "Austria",
    "rating": 1043.0,
    "profileUrl": "https://www.aoe2insights.com/user/12448049/",
    "isActive": true,
    "peakRating": 1088.0,
    "winRate": "51.0%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "General Wakka",
    "country": "United States",
    "rating": 1437.0,
    "profileUrl": "https://www.aoe2insights.com/user/1226225/",
    "isActive": true,
    "peakRating": 1553.0,
    "winRate": "51.26%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "GeologyWade",
    "country": "United Kingdom",
    "rating": 1416.0,
    "profileUrl": "https://www.aoe2insights.com/user/1858991/",
    "isActive": true,
    "peakRating": 1568.0,
    "winRate": "50.64%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "gh0stwr1ter",
    "country": "United States",
    "rating": 1531.0,
    "profileUrl": "https://www.aoe2insights.com/user/12675701/",
    "isActive": true,
    "peakRating": 1735.0,
    "winRate": "50.57%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "gil",
    "country": "Australia",
    "rating": 1671.0,
    "profileUrl": "https://www.aoe2insights.com/user/330481/",
    "isActive": true,
    "peakRating": 1680.0,
    "winRate": "51.08%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Gonzaleki",
    "country": "Argentina",
    "rating": 1554.0,
    "profileUrl": "https://www.aoe2insights.com/user/12706469/",
    "isActive": true,
    "peakRating": 1570.0,
    "winRate": "65.08%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "GwizdeK",
    "country": "Poland",
    "rating": 1393.0,
    "profileUrl": "https://www.aoe2insights.com/user/245082/",
    "isActive": true,
    "peakRating": 1554.0,
    "winRate": "50.77%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Hagen",
    "country": "Czechia",
    "rating": 1341.0,
    "profileUrl": "https://www.aoe2insights.com/user/10002260/",
    "isActive": true,
    "peakRating": 1489.0,
    "winRate": "52.31%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "[????] Happytheandy",
    "country": "United Kingdom",
    "rating": 1891.0,
    "profileUrl": "https://www.aoe2insights.com/user/2397632/",
    "isActive": true,
    "peakRating": 1949.0,
    "winRate": "56.39%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2"]
  },
  {
    "name": "Hestia",
    "country": "China",
    "rating": 1732.0,
    "profileUrl": "https://www.aoe2insights.com/user/230265/",
    "isActive": true,
    "peakRating": 1843.0,
    "winRate": "50.85%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Hoppsywins",
    "country": "United Kingdom",
    "rating": 1743.0,
    "profileUrl": "https://www.aoe2insights.com/user/456135/",
    "isActive": true,
    "peakRating": 1771.0,
    "winRate": "50.55%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "Hornet-Wing",
    "country": "United Kingdom",
    "rating": 1419.0,
    "profileUrl": "https://www.aoe2insights.com/user/272604/",
    "isActive": true,
    "peakRating": 1460.0,
    "winRate": "55.78%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2"]
  },
  {
    "name": "hoyohoyo9",
    "country": "United States",
    "rating": 1495.0,
    "profileUrl": "https://www.aoe2insights.com/user/237553/",
    "isActive": true,
    "peakRating": 1715.0,
    "winRate": "50.28%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "Huggieg",
    "country": "United Kingdom",
    "rating": 1732.0,
    "profileUrl": "https://www.aoe2insights.com/user/89053/",
    "isActive": true,
    "peakRating": 1785.0,
    "winRate": "51.32%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "init2winek",
    "country": "United States",
    "rating": 1037.0,
    "profileUrl": "https://www.aoe2insights.com/user/1265221/",
    "isActive": true,
    "peakRating": 1040.0,
    "winRate": "51.18%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "JagWarrior",
    "country": "France",
    "rating": 1581.0,
    "profileUrl": "https://www.aoe2insights.com/user/11471863/",
    "isActive": true,
    "peakRating": 1684.0,
    "winRate": "51.99%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "T90 Sudden Death Cup"]
  },
  {
    "name": "janchezaoe",
    "country": "Germany",
    "rating": 1304.0,
    "profileUrl": "https://www.aoe2insights.com/user/5578711/",
    "isActive": true,
    "peakRating": 1506.0,
    "winRate": "50.15%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2"]
  },
  {
    "name": "JawolopingChris",
    "country": "United States",
    "rating": 1617.0,
    "profileUrl": "https://www.aoe2insights.com/user/303604/",
    "isActive": true,
    "peakRating": 1764.0,
    "winRate": "52.81%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 7", "T90 Sudden Death Cup"]
  },
  {
    "name": "Javisty",
    "country": "France",
    "rating": 1853.0,
    "profileUrl": "https://www.aoe2insights.com/user/392423/",
    "isActive": true,
    "peakRating": 1853.0,
    "winRate": "51.9%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "Joey the Bonqueror",
    "country": "United Kingdom",
    "rating": 1803.0,
    "profileUrl": "https://www.aoe2insights.com/user/300848/",
    "isActive": true,
    "peakRating": 1907.0,
    "winRate": "51.02%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2"]
  },
  {
    "name": "Jon",
    "country": "United States",
    "rating": 1270.0,
    "profileUrl": "https://www.aoe2insights.com/user/6073899/",
    "isActive": true,
    "peakRating": 1380.0,
    "winRate": "50.9%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "josenblad",
    "country": "United States",
    "rating": 1292.0,
    "profileUrl": "https://www.aoe2insights.com/user/92277/",
    "isActive": true,
    "peakRating": 1336.0,
    "winRate": "52.93%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "J0N-PERKiNS",
    "country": "United Kingdom",
    "rating": 1611.0,
    "profileUrl": "https://www.aoe2insights.com/user/3582838/",
    "isActive": true,
    "peakRating": 1723.0,
    "winRate": "51.65%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Its Jskillz",
    "country": "United States",
    "rating": 1703.0,
    "profileUrl": "https://www.aoe2insights.com/user/2363000/",
    "isActive": true,
    "peakRating": 1777.0,
    "winRate": "53.29%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Judean People's Front",
    "country": "Switzerland",
    "rating": 1073.0,
    "profileUrl": "https://www.aoe2insights.com/user/554997/",
    "isActive": true,
    "peakRating": 1120.0,
    "winRate": "33.33%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "kakabsen",
    "country": "Poland",
    "rating": 1287.0,
    "profileUrl": "https://www.aoe2insights.com/user/12784217/",
    "isActive": true,
    "peakRating": 1401.0,
    "winRate": "51.68%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8"]
  },
  {
    "name": "Kiki da Foxvoid",
    "country": "United Kingdom",
    "rating": 1022.0,
    "profileUrl": "https://www.aoe2insights.com/user/12563061/",
    "isActive": true,
    "peakRating": 1022.0,
    "winRate": "56.14%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "T90 Sudden Death Cup"]
  },
  {
    "name": "Flawless Majusia",
    "country": "Poland",
    "rating": 1410.0,
    "profileUrl": "https://www.aoe2insights.com/user/8996251/",
    "isActive": true,
    "peakRating": 1612.0,
    "winRate": "54.76%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "Stronghold Frenzy 2"]
  },
  {
    "name": "Dizzy Skies",
    "country": "United Kingdom",
    "rating": 1037.0,
    "profileUrl": "https://www.aoe2insights.com/user/12804586/",
    "isActive": true,
    "peakRating": 1037.0,
    "winRate": "55.17%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "T90 Sudden Death Cup"]
  },
  {
    "name": "KoaLollo",
    "country": "Italy",
    "rating": 1119.0,
    "profileUrl": "https://www.aoe2insights.com/user/10162879/",
    "isActive": true,
    "peakRating": 1185.0,
    "winRate": "48.54%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Koti",
    "country": "France",
    "rating": 1638.0,
    "profileUrl": "https://www.aoe2insights.com/user/4033024/",
    "isActive": true,
    "peakRating": 1747.0,
    "winRate": "52.59%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "Magnanimous Kruppe",
    "country": "United States",
    "rating": 1230.0,
    "profileUrl": "https://www.aoe2insights.com/user/449982/",
    "isActive": true,
    "peakRating": 1306.0,
    "winRate": "51.21%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "Kubya",
    "country": "Sweden",
    "rating": 1486.0,
    "profileUrl": "https://www.aoe2insights.com/user/15780/",
    "isActive": true,
    "peakRating": 1571.0,
    "winRate": "51.3%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "Lamo",
    "country": "Latvia",
    "rating": 2319.0,
    "profileUrl": "https://www.aoe2insights.com/user/5188554/",
    "isActive": true,
    "peakRating": 2543.0,
    "winRate": "53.19%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "Stronghold Frenzy 2"]
  },
  {
    "name": "Lartibro",
    "country": "United States",
    "rating": 1018.0,
    "profileUrl": "https://www.aoe2insights.com/user/12649900/",
    "isActive": true,
    "peakRating": 1078.0,
    "winRate": "53.41%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "LanaAio",
    "country": "Belgium",
    "rating": 998.0,
    "profileUrl": "https://www.aoe2insights.com/user/1399661/",
    "isActive": true,
    "peakRating": 1093.0,
    "winRate": "40.54%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Lheodoric",
    "country": "France",
    "rating": 1459.0,
    "profileUrl": "https://www.aoe2insights.com/user/12164510/",
    "isActive": true,
    "peakRating": 1459.0,
    "winRate": "51.6%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Lord Benji",
    "country": "United States",
    "rating": 1255.0,
    "profileUrl": "https://www.aoe2insights.com/user/1859305/",
    "isActive": true,
    "peakRating": 1270.0,
    "winRate": "53.85%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Lovee",
    "country": "India",
    "rating": 1641.0,
    "profileUrl": "https://www.aoe2insights.com/user/1041133/",
    "isActive": true,
    "peakRating": 1759.0,
    "winRate": "52.77%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "lukam",
    "country": "China",
    "rating": 1104.0,
    "profileUrl": "https://www.aoe2insights.com/user/13099567/",
    "isActive": true,
    "peakRating": 1177.0,
    "winRate": "54.64%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 7"]
  },
  {
    "name": "mckayrind",
    "country": "United States",
    "rating": 1367.0,
    "profileUrl": "https://www.aoe2insights.com/user/2311389/",
    "isActive": true,
    "peakRating": 1438.0,
    "winRate": "52.47%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Madbun",
    "country": "Ireland",
    "rating": 1180.0,
    "profileUrl": "https://www.aoe2insights.com/user/381651/",
    "isActive": true,
    "peakRating": 1274.0,
    "winRate": "50.89%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "MajorTawm",
    "country": "Guatemala",
    "rating": 1291.0,
    "profileUrl": "https://www.aoe2insights.com/user/2963781/",
    "isActive": true,
    "peakRating": 1419.0,
    "winRate": "50.82%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "Tand00riKnight",
    "country": "India",
    "rating": 1023.0,
    "profileUrl": "https://www.aoe2insights.com/user/2471138/",
    "isActive": true,
    "peakRating": 1037.0,
    "winRate": "52.02%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "MarmotteQuantique",
    "country": "France",
    "rating": 1463.0,
    "profileUrl": "https://www.aoe2insights.com/user/641/",
    "isActive": true,
    "peakRating": 1530.0,
    "winRate": "51.77%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Matze",
    "country": "Germany",
    "rating": 1998.0,
    "profileUrl": "https://www.aoe2insights.com/user/13123606/",
    "isActive": true,
    "peakRating": 2341.0,
    "winRate": "50.93%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8", "Stronghold Frenzy 2"]
  },
  {
    "name": "Mathmagician",
    "country": "Germany",
    "rating": 1190.0,
    "profileUrl": "https://www.aoe2insights.com/user/4845480/",
    "isActive": true,
    "peakRating": 1281.0,
    "winRate": "51.26%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "T90 Sudden Death Cup"]
  },
  {
    "name": "GdR_Mark_Landers",
    "country": "Italy",
    "rating": 1606.0,
    "profileUrl": "https://www.aoe2insights.com/user/2320032/",
    "isActive": true,
    "peakRating": 1712.0,
    "winRate": "51.86%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "maxymczech",
    "country": "Czechia",
    "rating": 2007.0,
    "profileUrl": "https://www.aoe2insights.com/user/5813618/",
    "isActive": true,
    "peakRating": 2007.0,
    "winRate": "50.67%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "mercurial",
    "country": "Russia",
    "rating": 1826.0,
    "profileUrl": "https://www.aoe2insights.com/user/1272377/",
    "isActive": true,
    "peakRating": 1885.0,
    "winRate": "51.19%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "The Meshuggle",
    "country": "Germany",
    "rating": 1165.0,
    "profileUrl": "https://www.aoe2insights.com/user/12730545/",
    "isActive": true,
    "peakRating": 1168.0,
    "winRate": "50.83%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Metalmania",
    "country": "Argentina",
    "rating": 1503.0,
    "profileUrl": "https://www.aoe2insights.com/user/12434787/",
    "isActive": true,
    "peakRating": 1649.0,
    "winRate": "50.98%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Mighty Space Fruit",
    "country": "United States",
    "rating": 1782.0,
    "profileUrl": "https://www.aoe2insights.com/user/12772982/",
    "isActive": true,
    "peakRating": 1909.0,
    "winRate": "53.44%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "RasantrasendesNilpferd",
    "country": "Switzerland",
    "rating": 1008.0,
    "profileUrl": "https://www.aoe2insights.com/user/4351574/",
    "isActive": true,
    "peakRating": 1023.0,
    "winRate": "50.97%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "OS+ | NeoZz",
    "country": "France",
    "rating": 2460.0,
    "profileUrl": "https://www.aoe2insights.com/user/11275434/",
    "isActive": true,
    "peakRating": 2564.0,
    "winRate": "56.54%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 7"]
  },
  {
    "name": "Nessius Blaze",
    "country": "Hungary",
    "rating": 1393.0,
    "profileUrl": "https://www.aoe2insights.com/user/12094556/",
    "isActive": true,
    "peakRating": 1555.0,
    "winRate": "50.46%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "Stronghold Frenzy 2"]
  },
  {
    "name": "Nope1585",
    "country": "India",
    "rating": 1437.0,
    "profileUrl": "https://www.aoe2insights.com/user/5968579/",
    "isActive": true,
    "peakRating": 1449.0,
    "winRate": "55.22%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Nutty",
    "country": "Norway",
    "rating": 1190.0,
    "profileUrl": "https://www.aoe2insights.com/user/11720179/",
    "isActive": true,
    "peakRating": 1291.0,
    "winRate": "53.36%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2"]
  },
  {
    "name": "OrangeMamba",
    "country": "United States",
    "rating": 1296.0,
    "profileUrl": "https://www.aoe2insights.com/user/648585/",
    "isActive": true,
    "peakRating": 1374.0,
    "winRate": "52.37%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "ozziey",
    "country": "Netherlands",
    "rating": 1190.0,
    "profileUrl": "https://www.aoe2insights.com/user/1530786/",
    "isActive": true,
    "peakRating": 1238.0,
    "winRate": "56.52%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "7ps Season 8"]
  },
  {
    "name": "Paapi",
    "country": "Slovakia",
    "rating": 1422.0,
    "profileUrl": "https://www.aoe2insights.com/user/503998/",
    "isActive": true,
    "peakRating": 1470.0,
    "winRate": "50.34%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Painter",
    "country": "United States",
    "rating": 1540.0,
    "profileUrl": "https://www.aoe2insights.com/user/4850176/",
    "isActive": true,
    "peakRating": 1595.0,
    "winRate": "51.53%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "Stronghold Frenzy 2"]
  },
  {
    "name": "Pasta",
    "country": "France",
    "rating": 1271.0,
    "profileUrl": "https://www.aoe2insights.com/user/1111750/",
    "isActive": true,
    "peakRating": 1368.0,
    "winRate": "52.59%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Pete",
    "country": "United Kingdom",
    "rating": 1742.0,
    "profileUrl": "https://www.aoe2insights.com/user/275448/",
    "isActive": true,
    "peakRating": 1869.0,
    "winRate": "57.73%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "Phoenix Oath",
    "country": "United States",
    "rating": 1831.0,
    "profileUrl": "https://www.aoe2insights.com/user/305008/",
    "isActive": true,
    "peakRating": 1854.0,
    "winRate": "56.4%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "[PYSA] - \u0f3aPisty\u0f3b",
    "country": "Argentina",
    "rating": 1396.0,
    "profileUrl": "https://www.aoe2insights.com/user/2798038/",
    "isActive": true,
    "peakRating": 1456.0,
    "winRate": "55.71%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "Pl0tterGhost",
    "country": "Netherlands",
    "rating": 1560.0,
    "profileUrl": "https://www.aoe2insights.com/user/375383/",
    "isActive": true,
    "peakRating": 1569.0,
    "winRate": "54.99%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "Player2",
    "country": "Italy",
    "rating": 1242.0,
    "profileUrl": "https://www.aoe2insights.com/user/1137204/",
    "isActive": true,
    "peakRating": 1421.0,
    "winRate": "50.12%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "PrinceFinnik",
    "country": "United States",
    "rating": 1078.0,
    "profileUrl": "https://www.aoe2insights.com/user/2637747/",
    "isActive": true,
    "peakRating": 1111.0,
    "winRate": "51.02%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Pride",
    "country": "Malta",
    "rating": 1226.0,
    "profileUrl": "https://www.aoe2insights.com/user/5634917/",
    "isActive": true,
    "peakRating": 1287.0,
    "winRate": "52.07%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "PsychedelicFalafel",
    "country": "United States",
    "rating": 1229.0,
    "profileUrl": "https://www.aoe2insights.com/user/13150242/",
    "isActive": true,
    "peakRating": 1272.0,
    "winRate": "60.71%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "PygmyGiant",
    "country": "United States",
    "rating": 1229.0,
    "profileUrl": "https://www.aoe2insights.com/user/5522724/",
    "isActive": true,
    "peakRating": 1229.0,
    "winRate": "53.49%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "raggnar_lothbrook",
    "country": "United States",
    "rating": 1200.0,
    "profileUrl": "https://www.aoe2insights.com/user/6270231/",
    "isActive": true,
    "peakRating": 1385.0,
    "winRate": "50.63%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Rameranic",
    "country": "United States",
    "rating": 1217.0,
    "profileUrl": "https://www.aoe2insights.com/user/3064960/",
    "isActive": true,
    "peakRating": 1302.0,
    "winRate": "52.92%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "7ps Season 8"]
  },
  {
    "name": "Ranzunn",
    "country": "United States",
    "rating": 1510.0,
    "profileUrl": "https://www.aoe2insights.com/user/1971123/",
    "isActive": true,
    "peakRating": 1551.0,
    "winRate": "51.78%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2"]
  },
  {
    "name": "Raudius",
    "country": "Netherlands",
    "rating": 1124.0,
    "profileUrl": "https://www.aoe2insights.com/user/285711/",
    "isActive": true,
    "peakRating": 1218.0,
    "winRate": "50.43%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Rayz",
    "country": "Taiwan",
    "rating": 2519.0,
    "profileUrl": "https://www.aoe2insights.com/user/12268569/",
    "isActive": true,
    "peakRating": 2577.0,
    "winRate": "55.45%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "RealTHF",
    "country": "United States",
    "rating": 1427.0,
    "profileUrl": "https://www.aoe2insights.com/user/1214206/",
    "isActive": true,
    "peakRating": 1470.0,
    "winRate": "50.69%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Enyaloth",
    "country": "United States",
    "rating": 1259.0,
    "profileUrl": "https://www.aoe2insights.com/user/1278251/",
    "isActive": true,
    "peakRating": 1337.0,
    "winRate": "51.79%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "RBase96",
    "country": "Netherlands",
    "rating": 1621.0,
    "profileUrl": "https://www.aoe2insights.com/user/2787704/",
    "isActive": true,
    "peakRating": 1789.0,
    "winRate": "51.46%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "RDO_AOE2",
    "country": "United Kingdom",
    "rating": 859.0,
    "profileUrl": "https://www.aoe2insights.com/user/5672310/",
    "isActive": true,
    "peakRating": 943.0,
    "winRate": "51.46%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "rickyld",
    "country": "Austria",
    "rating": 1108.0,
    "profileUrl": "https://www.aoe2insights.com/user/5172877/",
    "isActive": true,
    "peakRating": 1213.0,
    "winRate": "50.68%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "risendragongaming",
    "country": "United States",
    "rating": 611.0,
    "profileUrl": "https://www.aoe2insights.com/user/12864690/",
    "isActive": true,
    "peakRating": 702.0,
    "winRate": "41.77%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Robin5hood",
    "country": "Poland",
    "rating": 1454.0,
    "profileUrl": "https://www.aoe2insights.com/user/369054/",
    "isActive": true,
    "peakRating": 1530.0,
    "winRate": "53.69%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "7ps Season 8", "T90 Sudden Death Cup"]
  },
  {
    "name": "RoonTheEternal",
    "country": "United States",
    "rating": 1250.0,
    "profileUrl": "https://www.aoe2insights.com/user/189537/",
    "isActive": true,
    "peakRating": 1265.0,
    "winRate": "54.26%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Rema Rema tu Bota",
    "country": "United States",
    "rating": 1576.0,
    "profileUrl": "https://www.aoe2insights.com/user/524610/",
    "isActive": true,
    "peakRating": 1689.0,
    "winRate": "51.04%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "RoyaleWithCheese",
    "country": "Netherlands",
    "rating": 1247.0,
    "profileUrl": "https://www.aoe2insights.com/user/3222983/",
    "isActive": true,
    "peakRating": 1274.0,
    "winRate": "52.61%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Sandland",
    "country": "Denmark",
    "rating": 1855.0,
    "profileUrl": "https://www.aoe2insights.com/user/787064/",
    "isActive": true,
    "peakRating": 1898.0,
    "winRate": "51.19%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Satellites of Heaven",
    "country": "United Kingdom",
    "rating": 1278.0,
    "profileUrl": "https://www.aoe2insights.com/user/4985036/",
    "isActive": true,
    "peakRating": 1464.0,
    "winRate": "50.77%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Scipio",
    "country": "France",
    "rating": 1318.0,
    "profileUrl": "https://www.aoe2insights.com/user/66145/",
    "isActive": true,
    "peakRating": 1321.0,
    "winRate": "56.52%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Ronnie Hotdogs",
    "country": "United Kingdom",
    "rating": 1780.0,
    "profileUrl": "https://www.aoe2insights.com/user/5405126/",
    "isActive": true,
    "peakRating": 1843.0,
    "winRate": "50.81%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "The Vill's Gambit",
    "country": "Spain",
    "rating": 1418.0,
    "profileUrl": "https://www.aoe2insights.com/user/6400696/",
    "isActive": true,
    "peakRating": 1468.0,
    "winRate": "56.62%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2"]
  },
  {
    "name": "SenorBonas",
    "country": "Belgium",
    "rating": 1263.0,
    "profileUrl": "https://www.aoe2insights.com/user/248524/",
    "isActive": true,
    "peakRating": 1401.0,
    "winRate": "50.64%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "Shashlyk",
    "country": "Poland",
    "rating": 1773.0,
    "profileUrl": "https://www.aoe2insights.com/user/685782/",
    "isActive": true,
    "peakRating": 1805.0,
    "winRate": "50.96%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "T90 Sudden Death Cup"]
  },
  {
    "name": "Shibani",
    "country": "Brazil",
    "rating": 1267.0,
    "profileUrl": "https://www.aoe2insights.com/user/11718075/",
    "isActive": true,
    "peakRating": 1312.0,
    "winRate": "52.73%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "SilverEclipse",
    "country": "United States",
    "rating": 915.0,
    "profileUrl": "https://www.aoe2insights.com/user/5581979/",
    "isActive": true,
    "peakRating": 1049.0,
    "winRate": "51.02%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "Stronghold Frenzy 2"]
  },
  {
    "name": "ToXiicBLiitz",
    "country": "Bahrain",
    "rating": 1244.0,
    "profileUrl": "https://www.aoe2insights.com/user/2941867/",
    "isActive": true,
    "peakRating": 1454.0,
    "winRate": "51.32%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "Pangolin",
    "country": "United States",
    "rating": 1207.0,
    "profileUrl": "https://www.aoe2insights.com/user/215522/",
    "isActive": true,
    "peakRating": 1208.0,
    "winRate": "51.83%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2"]
  },
  {
    "name": "Soxs",
    "country": "United States",
    "rating": 1490.0,
    "profileUrl": "https://www.aoe2insights.com/user/2972583/",
    "isActive": true,
    "peakRating": 1543.0,
    "winRate": "51.35%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "spaz_the_adventurer",
    "country": "Canada",
    "rating": 1481.0,
    "profileUrl": "https://www.aoe2insights.com/user/3582974/",
    "isActive": true,
    "peakRating": 1554.0,
    "winRate": "56.91%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "T90 Sudden Death Cup"]
  },
  {
    "name": "SpiritOfTheUniverse",
    "country": "Germany",
    "rating": 1073.0,
    "profileUrl": "https://www.aoe2insights.com/user/4040905/",
    "isActive": true,
    "peakRating": 1113.0,
    "winRate": "51.63%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "Splattcol",
    "country": "Colombia",
    "rating": 1618.0,
    "profileUrl": "https://www.aoe2insights.com/user/2406441/",
    "isActive": true,
    "peakRating": 1712.0,
    "winRate": "50.99%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2"]
  },
  {
    "name": "StratoAge",
    "country": "United States",
    "rating": 1473.0,
    "profileUrl": "https://www.aoe2insights.com/user/11682569/",
    "isActive": true,
    "peakRating": 1496.0,
    "winRate": "51.37%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Syagrius",
    "country": "France",
    "rating": 1076.0,
    "profileUrl": "https://www.aoe2insights.com/user/4515093/",
    "isActive": true,
    "peakRating": 1110.0,
    "winRate": "50.12%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "szotyesz",
    "country": "Hungary",
    "rating": 1473.0,
    "profileUrl": "https://www.aoe2insights.com/user/232247/",
    "isActive": true,
    "peakRating": 1473.0,
    "winRate": "52.29%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "tmoneymcgetbunz",
    "country": "United States",
    "rating": 1102.0,
    "profileUrl": "https://www.aoe2insights.com/user/12158425/",
    "isActive": true,
    "peakRating": 1234.0,
    "winRate": "50.41%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "tinghay",
    "country": "France",
    "rating": 1323.0,
    "profileUrl": "https://www.aoe2insights.com/user/12965927/",
    "isActive": true,
    "peakRating": 1323.0,
    "winRate": "56.04%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "The Chancellor",
    "country": "United Kingdom",
    "rating": 1654.0,
    "profileUrl": "https://www.aoe2insights.com/user/253973/",
    "isActive": true,
    "peakRating": 1662.0,
    "winRate": "55.36%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "TheGardener",
    "country": "United States",
    "rating": 1216.0,
    "profileUrl": "https://www.aoe2insights.com/user/10764180/",
    "isActive": true,
    "peakRating": 1408.0,
    "winRate": "50.76%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "TheNight",
    "country": "Switzerland",
    "rating": 1274.0,
    "profileUrl": "https://www.aoe2insights.com/user/255714/",
    "isActive": true,
    "peakRating": 1377.0,
    "winRate": "52.17%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "TheSleepyBishop",
    "country": "India",
    "rating": 1725.0,
    "profileUrl": "https://www.aoe2insights.com/user/1030992/",
    "isActive": true,
    "peakRating": 1872.0,
    "winRate": "50.81%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "TheWyandotte",
    "country": "United States",
    "rating": 1467.0,
    "profileUrl": "https://www.aoe2insights.com/user/6801447/",
    "isActive": true,
    "peakRating": 1495.0,
    "winRate": "53.28%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "ThedissapointedInvader",
    "country": "Australia",
    "rating": 1617.0,
    "profileUrl": "https://www.aoe2insights.com/user/336892/",
    "isActive": true,
    "peakRating": 1750.0,
    "winRate": "51.12%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2"]
  },
  {
    "name": "TheSpicySicillian",
    "country": "United States",
    "rating": 1201.0,
    "profileUrl": "https://www.aoe2insights.com/user/9137593/",
    "isActive": true,
    "peakRating": 1267.0,
    "winRate": "51.11%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Tiltstars",
    "country": "Germany",
    "rating": 1435.0,
    "profileUrl": "https://www.aoe2insights.com/user/2627145/",
    "isActive": true,
    "peakRating": 1535.0,
    "winRate": "50.27%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "TomAquinas",
    "country": "United States",
    "rating": 1396.0,
    "profileUrl": "https://www.aoe2insights.com/user/11670083/",
    "isActive": true,
    "peakRating": 1558.0,
    "winRate": "50.98%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "TotillaTheHun",
    "country": "United States",
    "rating": 1209.0,
    "profileUrl": "https://www.aoe2insights.com/user/4820637/",
    "isActive": true,
    "peakRating": 1282.0,
    "winRate": "50.85%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "TrickyMicky90",
    "country": "Australia",
    "rating": 1464.0,
    "profileUrl": "https://www.aoe2insights.com/user/3083636/",
    "isActive": true,
    "peakRating": 1464.0,
    "winRate": "52.7%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "Twopenny Hangover",
    "country": "Poland",
    "rating": 1376.0,
    "profileUrl": "https://www.aoe2insights.com/user/4481462/",
    "isActive": true,
    "peakRating": 1500.0,
    "winRate": "50.57%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8", "7ps Season 7", "T90 Sudden Death Cup"]
  },
  {
    "name": "AGS.Eratuss",
    "country": "France",
    "rating": 2004.0,
    "profileUrl": "https://www.aoe2insights.com/user/1242469/",
    "isActive": true,
    "peakRating": 2010.0,
    "winRate": "51.19%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Validus",
    "country": "United Kingdom",
    "rating": 807.0,
    "profileUrl": "https://www.aoe2insights.com/user/13166108/",
    "isActive": true,
    "peakRating": 902.0,
    "winRate": "48.6%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "dadleisure",
    "country": "Canada",
    "rating": 1221.0,
    "profileUrl": "https://www.aoe2insights.com/user/2567136/",
    "isActive": true,
    "peakRating": 1401.0,
    "winRate": "50.5%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "Vomastek",
    "country": "Czech Republic",
    "rating": 1572.0,
    "profileUrl": "https://www.aoe2insights.com/user/1104040/",
    "isActive": true,
    "peakRating": 1621.0,
    "winRate": "53.6%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Wait...What?",
    "country": "United States",
    "rating": 1077.0,
    "profileUrl": "https://www.aoe2insights.com/user/12531213/",
    "isActive": true,
    "peakRating": 1155.0,
    "winRate": "50.92%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Islands Map Lover",
    "country": "Colombia",
    "rating": 1184.0,
    "profileUrl": "https://www.aoe2insights.com/user/3446799/",
    "isActive": true,
    "peakRating": 1234.0,
    "winRate": "50.98%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Whyza",
    "country": "Poland",
    "rating": 1042.0,
    "profileUrl": "https://www.aoe2insights.com/user/16309/",
    "isActive": true,
    "peakRating": 1113.0,
    "winRate": "50.65%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "willdbeast",
    "country": "United Kingdom",
    "rating": 1912.0,
    "profileUrl": "https://www.aoe2insights.com/user/278329/",
    "isActive": true,
    "peakRating": 1951.0,
    "winRate": "51.37%",
    "recentTournamentsPlayed": ["7ps Season 7"]
  },
  {
    "name": "witty_matty",
    "country": "Poland",
    "rating": 1409.0,
    "profileUrl": "https://www.aoe2insights.com/user/10667559/",
    "isActive": true,
    "peakRating": 1501.0,
    "winRate": "51.17%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Xardas_AoE",
    "country": "Germany",
    "rating": 1469.0,
    "profileUrl": "https://www.aoe2insights.com/user/186332/",
    "isActive": true,
    "peakRating": 1470.0,
    "winRate": "63.86%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "Nephthys123",
    "country": "United Kingdom",
    "rating": 1672.0,
    "profileUrl": "https://www.aoe2insights.com/user/3043685/",
    "isActive": true,
    "peakRating": 1674.0,
    "winRate": "53.11%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "xRavyn",
    "country": "Armenia",
    "rating": 1660.0,
    "profileUrl": "https://www.aoe2insights.com/user/6242021/",
    "isActive": true,
    "peakRating": 1794.0,
    "winRate": "50.76%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "yany",
    "country": "Hungary",
    "rating": 1177.0,
    "profileUrl": "https://www.aoe2insights.com/user/1930/",
    "isActive": true,
    "peakRating": 1229.0,
    "winRate": "50.9%",
    "recentTournamentsPlayed": ["T90 Community Cup 2"]
  },
  {
    "name": "Zark23",
    "country": "Canada",
    "rating": 1364.0,
    "profileUrl": "https://www.aoe2insights.com/user/5284914/",
    "isActive": true,
    "peakRating": 1473.0,
    "winRate": "51.08%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "T90 Sudden Death Cup"]
  },
  {
    "name": "[????]King_Boo",
    "country": "United Kingdom",
    "rating": 2154.0,
    "profileUrl": "https://www.aoe2insights.com/user/180520/",
    "isActive": true,
    "peakRating": 2278.0,
    "winRate": "54.39%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2"]
  },
  {
    "name": "randy pan",
    "country": "Canada",
    "rating": 1825.0,
    "profileUrl": "https://www.aoe2insights.com/user/1070306/",
    "isActive": true,
    "peakRating": 1908.0,
    "winRate": "52.99%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "7ps Season 8", "7ps Season 7", "T90 Sudden Death Cup"]
  },
  {
    "name": "Meh247",
    "country": "United States",
    "rating": 1553.0,
    "profileUrl": "https://www.aoe2insights.com/user/529262/",
    "isActive": true,
    "peakRating": 1705.0,
    "winRate": "51.76%",
    "recentTournamentsPlayed": ["7ps Season 8", "T90 Sudden Death Cup"]
  },
  {
    "name": "1Sh0t",
    "country": "Canada",
    "rating": 1445.0,
    "profileUrl": "https://www.aoe2insights.com/user/9319174/",
    "isActive": true,
    "peakRating": 1587.0,
    "winRate": "53.05%",
    "recentTournamentsPlayed": ["7ps Season 8"]
  },
  {
    "name": "Chris",
    "country": "United States",
    "rating": 1528.0,
    "profileUrl": "https://www.aoe2insights.com/user/11769331/",
    "isActive": true,
    "peakRating": 1528.0,
    "winRate": "52.28%",
    "recentTournamentsPlayed": ["7ps Season 8"]
  },
  {
    "name": "McNuggets",
    "country": "Switzerland",
    "rating": 1293.0,
    "profileUrl": "https://www.aoe2insights.com/user/334334/",
    "isActive": true,
    "peakRating": 1311.0,
    "winRate": "50.72%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "aje.omar",
    "country": "Mexico",
    "rating": 1267.0,
    "profileUrl": "https://www.aoe2insights.com/user/9189507/",
    "isActive": true,
    "peakRating": 1407.0,
    "winRate": "50.38%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8", "Stronghold Frenzy 2"]
  },
  {
    "name": "grapejuice",
    "country": "Australia",
    "rating": 1207.0,
    "profileUrl": "https://www.aoe2insights.com/user/11688652/",
    "isActive": true,
    "peakRating": 1207.0,
    "winRate": "53.47%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "7ps Season 8", "Stronghold Frenzy 2"]
  },
  {
    "name": "Laurie",
    "country": "United Kingdom",
    "rating": 1256.0,
    "profileUrl": "https://www.aoe2insights.com/user/243944/",
    "isActive": true,
    "peakRating": 1256.0,
    "winRate": "53.87%",
    "recentTournamentsPlayed": ["7ps Season 8"]
  },
  {
    "name": "Fairytale Belkross",
    "country": "France",
    "rating": 1251.0,
    "profileUrl": "https://www.aoe2insights.com/user/1370771/",
    "isActive": true,
    "peakRating": 1251.0,
    "winRate": "58.62%",
    "recentTournamentsPlayed": ["7ps Season 8"]
  },
  {
    "name": "Forteraiger",
    "country": "Ukraine",
    "rating": 1277.0,
    "profileUrl": "https://www.aoe2insights.com/user/13285902/",
    "isActive": true,
    "peakRating": 1312.0,
    "winRate": "53.61%",
    "recentTournamentsPlayed": ["7ps Season 8", "T90 Sudden Death Cup"]
  },
  {
    "name": "Smithers",
    "country": "Sweden",
    "rating": 1122.0,
    "profileUrl": "https://www.aoe2insights.com/user/1304628/",
    "isActive": true,
    "peakRating": 1254.0,
    "winRate": "50.58%",
    "recentTournamentsPlayed": ["7ps Season 8", "Stronghold Frenzy 2"]
  },
  {
    "name": "SoleZebrafish",
    "country": "United States",
    "rating": 1192.0,
    "profileUrl": "https://www.aoe2insights.com/user/2650734/",
    "isActive": true,
    "peakRating": 1275.0,
    "winRate": "50.75%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "Forkan Rick",
    "country": "United States",
    "rating": 1157.0,
    "profileUrl": "https://www.aoe2insights.com/user/2363867/",
    "isActive": true,
    "peakRating": 1185.0,
    "winRate": "53.78%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8", "Stronghold Frenzy 2"]
  },
  {
    "name": "marathaSun",
    "country": "India",
    "rating": 1057.0,
    "profileUrl": "https://www.aoe2insights.com/user/2543215/",
    "isActive": true,
    "peakRating": 1150.0,
    "winRate": "50.18%",
    "recentTournamentsPlayed": ["7ps Season 8"]
  },
  {
    "name": "Jasuni",
    "country": "United States",
    "rating": 1034.0,
    "profileUrl": "https://www.aoe2insights.com/user/1464223/",
    "isActive": true,
    "peakRating": 1072.0,
    "winRate": "52.0%",
    "recentTournamentsPlayed": ["7ps Season 8"]
  },
  {
    "name": "QuailzEnFire903",
    "country": "United States",
    "rating": 1111.0,
    "profileUrl": "https://www.aoe2insights.com/user/12964183/",
    "isActive": true,
    "peakRating": 1111.0,
    "winRate": "57.05%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8"]
  },
  {
    "name": "Nagraj",
    "country": "India",
    "rating": 1068.0,
    "profileUrl": "https://www.aoe2insights.com/user/6903668/",
    "isActive": true,
    "peakRating": 1068.0,
    "winRate": "62.5%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8", "7ps Season 7", "Stronghold Frenzy 2"]
  },
  {
    "name": "Fairytale Fox",
    "country": "Canada",
    "rating": 965.0,
    "profileUrl": "https://www.aoe2insights.com/user/4662319/",
    "isActive": true,
    "peakRating": 1110.0,
    "winRate": "50.48%",
    "recentTournamentsPlayed": ["T90 Community Cup 2", "7ps Season 8"]
  },
  {
    "name": "schmabenkl",
    "country": "Germany",
    "rating": 966.0,
    "profileUrl": "https://www.aoe2insights.com/user/1880713/",
    "isActive": true,
    "peakRating": 989.0,
    "winRate": "50.45%",
    "recentTournamentsPlayed": ["7ps Season 8", "7ps Season 7"]
  },
  {
    "name": "Crystella",
    "country": "United Kingdom",
    "rating": 819.0,
    "profileUrl": "https://www.aoe2insights.com/user/3892549/",
    "isActive": true,
    "peakRating": 819.0,
    "winRate": "38.46%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8"]
  },
  {
    "name": "Rodrixs",
    "country": "Argentina",
    "rating": 2404.0,
    "profileUrl": "https://www.aoe2insights.com/user/11440407/",
    "isActive": true,
    "peakRating": 2452.0,
    "winRate": "50.91%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "wR.Prisma09",
    "country": "Argentina",
    "rating": 2603.0,
    "profileUrl": "https://www.aoe2insights.com/user/3176045/",
    "isActive": true,
    "peakRating": 2766.0,
    "winRate": "53.95%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Ux'Ozone",
    "country": "Colombia",
    "rating": 2424.0,
    "profileUrl": "https://www.aoe2insights.com/user/2654577/",
    "isActive": true,
    "peakRating": 2636.0,
    "winRate": "51.53%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "Stronghold Frenzy 2"]
  },
  {
    "name": "T90Official",
    "country": "United States",
    "rating": 2401.0,
    "profileUrl": "https://www.aoe2insights.com/user/197930/",
    "isActive": true,
    "peakRating": 2516.0,
    "winRate": "54.37%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "NOC | Wean Dinchester",
    "country": "Germany",
    "rating": 2140.0,
    "profileUrl": "https://www.aoe2insights.com/user/300565/",
    "isActive": true,
    "peakRating": 2371.0,
    "winRate": "53.84%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "Stronghold Frenzy 2"]
  },
  {
    "name": "OS+ | shiXo.#",
    "country": "Germany",
    "rating": 2244.0,
    "profileUrl": "https://www.aoe2insights.com/user/1137086/",
    "isActive": true,
    "peakRating": 2371.0,
    "winRate": "50.31%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "RoR | Benanji",
    "country": "Germany",
    "rating": 2426.0,
    "profileUrl": "https://www.aoe2insights.com/user/2463959/",
    "isActive": true,
    "peakRating": 2469.0,
    "winRate": "54.06%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "NuMa | AngelR",
    "country": "Colombia",
    "rating": 2208.0,
    "profileUrl": "https://www.aoe2insights.com/user/6838238/",
    "isActive": true,
    "peakRating": 2319.0,
    "winRate": "52.63%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "OLADUSHEK",
    "country": "Belarusian",
    "rating": 2074.0,
    "profileUrl": "https://www.aoe2insights.com/user/1853187/",
    "isActive": true,
    "peakRating": 2104.0,
    "winRate": "53.15%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "Stronghold Frenzy 2"]
  },
  {
    "name": "[GLD] Abu abdullah",
    "country": "Saudi Arabia",
    "rating": 2144.0,
    "profileUrl": "https://www.aoe2insights.com/user/5839022/",
    "isActive": true,
    "peakRating": 2263.0,
    "winRate": "54.38%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "RoR | Bourbon",
    "country": "Russia",
    "rating": 2020.0,
    "profileUrl": "https://www.aoe2insights.com/user/1877180/",
    "isActive": true,
    "peakRating": 2067.0,
    "winRate": "53.62%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Umdeuter",
    "country": "Germany",
    "rating": 1770.0,
    "profileUrl": "https://www.aoe2insights.com/user/249384/",
    "isActive": true,
    "peakRating": 2009.0,
    "winRate": "50.4%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Auriko",
    "country": "France",
    "rating": 1722.0,
    "profileUrl": "https://www.aoe2insights.com/user/12642909/",
    "isActive": true,
    "peakRating": 1882.0,
    "winRate": "55.12%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "qso214",
    "country": "Argentina",
    "rating": 1729.0,
    "profileUrl": "https://www.aoe2insights.com/user/3150133/",
    "isActive": true,
    "peakRating": 1832.0,
    "winRate": "51.68%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Froman",
    "country": "United States",
    "rating": 1752.0,
    "profileUrl": "https://www.aoe2insights.com/user/4882298/",
    "isActive": true,
    "peakRating": 1775.0,
    "winRate": "55.53%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "DGHIR | Qeetsa",
    "country": "Mexico",
    "rating": 1817.0,
    "profileUrl": "https://www.aoe2insights.com/user/2075681/",
    "isActive": true,
    "peakRating": 1833.0,
    "winRate": "52.9%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "JustAGecko",
    "country": "United Kingdom",
    "rating": 1794.0,
    "profileUrl": "https://www.aoe2insights.com/user/236400/",
    "isActive": true,
    "peakRating": 1891.0,
    "winRate": "50.25%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8"]
  },
  {
    "name": "Cynthia",
    "country": "United States",
    "rating": 1622.0,
    "profileUrl": "https://www.aoe2insights.com/user/591709/",
    "isActive": true,
    "peakRating": 1733.0,
    "winRate": "51.95%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "edricsturm",
    "country": "Germany",
    "rating": 1697.0,
    "profileUrl": "https://www.aoe2insights.com/user/1467023/",
    "isActive": true,
    "peakRating": 1889.0,
    "winRate": "50.39%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "CharChar",
    "country": "Australia",
    "rating": 1564.0,
    "profileUrl": "https://www.aoe2insights.com/user/988308/",
    "isActive": true,
    "peakRating": 1733.0,
    "winRate": "53.5%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "ThisDino",
    "country": "Germany",
    "rating": 1574.0,
    "profileUrl": "https://www.aoe2insights.com/user/2533089/",
    "isActive": true,
    "peakRating": 1736.0,
    "winRate": "50.5%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "SHell | refraid",
    "country": "Russia",
    "rating": 1861.0,
    "profileUrl": "https://www.aoe2insights.com/user/2404771/",
    "isActive": true,
    "peakRating": 1997.0,
    "winRate": "53.19%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "bobolavache",
    "country": "France",
    "rating": 1492.0,
    "profileUrl": "https://www.aoe2insights.com/user/1972590/",
    "isActive": true,
    "peakRating": 1639.0,
    "winRate": "50.58%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Nown0",
    "country": "France",
    "rating": 1580.0,
    "profileUrl": "https://www.aoe2insights.com/user/4117931/",
    "isActive": true,
    "peakRating": 1630.0,
    "winRate": "53.67%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Zycherious",
    "country": "United States",
    "rating": 1623.0,
    "profileUrl": "https://www.aoe2insights.com/user/2542159/",
    "isActive": true,
    "peakRating": 1679.0,
    "winRate": "53.37%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Sylne4r",
    "country": "Germany",
    "rating": 1550.0,
    "profileUrl": "https://www.aoe2insights.com/user/1133888/",
    "isActive": true,
    "peakRating": 1646.0,
    "winRate": "50.7%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "Stronghold Frenzy 2"]
  },
  {
    "name": "gummi [Coleman]",
    "country": "Iceland",
    "rating": 1638.0,
    "profileUrl": "https://www.aoe2insights.com/user/260749/",
    "isActive": true,
    "peakRating": 1739.0,
    "winRate": "50.71%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Matthew",
    "country": "Australia",
    "rating": 1591.0,
    "profileUrl": "https://www.aoe2insights.com/user/348642/",
    "isActive": true,
    "peakRating": 1648.0,
    "winRate": "52.95%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Red Clifford",
    "country": "Netherlands",
    "rating": 1512.0,
    "profileUrl": "https://www.aoe2insights.com/user/1579558/",
    "isActive": true,
    "peakRating": 1598.0,
    "winRate": "52.81%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "tommy9512",
    "country": "Russia",
    "rating": 1527.0,
    "profileUrl": "https://www.aoe2insights.com/user/1133051/",
    "isActive": true,
    "peakRating": 1543.0,
    "winRate": "63.64%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "7ps Season 8"]
  },
  {
    "name": "Nessy",
    "country": "Australia",
    "rating": 1489.0,
    "profileUrl": "https://www.aoe2insights.com/user/730232/",
    "isActive": true,
    "peakRating": 1543.0,
    "winRate": "52.81%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Ex Lux",
    "country": "United States",
    "rating": 1425.0,
    "profileUrl": "https://www.aoe2insights.com/user/12372443/",
    "isActive": true,
    "peakRating": 1425.0,
    "winRate": "55.25%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2"]
  },
  {
    "name": "dead words",
    "country": "United States",
    "rating": 1468.0,
    "profileUrl": "https://www.aoe2insights.com/user/12870315/",
    "isActive": true,
    "peakRating": 1468.0,
    "winRate": "51.87%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "DraconicAspirant",
    "country": "Greece",
    "rating": 1483.0,
    "profileUrl": "https://www.aoe2insights.com/user/12558832/",
    "isActive": true,
    "peakRating": 1593.0,
    "winRate": "50.89%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Citizen Snips",
    "country": "United States",
    "rating": 1555.0,
    "profileUrl": "https://www.aoe2insights.com/user/318414/",
    "isActive": true,
    "peakRating": 1555.0,
    "winRate": "62.22%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "hjpotter92",
    "country": "India",
    "rating": 1251.0,
    "profileUrl": "https://www.aoe2insights.com/user/1228227/",
    "isActive": true,
    "peakRating": 1251.0,
    "winRate": "58.41%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "hooplah",
    "country": "United Kingdom",
    "rating": 1275.0,
    "profileUrl": "https://www.aoe2insights.com/user/2594407/",
    "isActive": true,
    "peakRating": 1369.0,
    "winRate": "52.46%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "Stronghold Frenzy 2"]
  },
  {
    "name": "R3ChuukLogan",
    "country": "United States",
    "rating": 1152.0,
    "profileUrl": "https://www.aoe2insights.com/user/686170/",
    "isActive": true,
    "peakRating": 1401.0,
    "winRate": "50.67%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Russian77",
    "country": "Slovakia",
    "rating": 1326.0,
    "profileUrl": "https://www.aoe2insights.com/user/1824106/",
    "isActive": true,
    "peakRating": 1379.0,
    "winRate": "56.3%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Temperance",
    "country": "Belarus",
    "rating": 1304.0,
    "profileUrl": "https://www.aoe2insights.com/user/3588422/",
    "isActive": true,
    "peakRating": 1317.0,
    "winRate": "64.1%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Sir_Duncan_The_Gull",
    "country": "Netherlands",
    "rating": 1271.0,
    "profileUrl": "https://www.aoe2insights.com/user/12626394/",
    "isActive": true,
    "peakRating": 1386.0,
    "winRate": "50.73%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "B\u00e9bou",
    "country": "France",
    "rating": 1300.0,
    "profileUrl": "https://www.aoe2insights.com/user/12744378/",
    "isActive": true,
    "peakRating": 1360.0,
    "winRate": "52.84%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2"]
  },
  {
    "name": "Philly Idle",
    "country": "Germany",
    "rating": 1012.0,
    "profileUrl": "https://www.aoe2insights.com/user/2105467/",
    "isActive": true,
    "peakRating": 1177.0,
    "winRate": "50.51%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Rodeo Jones",
    "country": "Australia",
    "rating": 1341.0,
    "profileUrl": "https://www.aoe2insights.com/user/6754763/",
    "isActive": true,
    "peakRating": 1346.0,
    "winRate": "51.29%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Lich King",
    "country": "Canada",
    "rating": 1240.0,
    "profileUrl": "https://www.aoe2insights.com/user/4049887/",
    "isActive": true,
    "peakRating": 1275.0,
    "winRate": "53.97%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "PajosPSCB",
    "country": "Czechia",
    "rating": 1227.0,
    "profileUrl": "https://www.aoe2insights.com/user/3528123/",
    "isActive": true,
    "peakRating": 1296.0,
    "winRate": "51.34%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "FT20",
    "country": "Chile",
    "rating": 1123.0,
    "profileUrl": "https://www.aoe2insights.com/user/12660890/",
    "isActive": true,
    "peakRating": 1275.0,
    "winRate": "50.51%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "Stronghold Frenzy 2"]
  },
  {
    "name": "Maestro | just a fish",
    "country": "Netherlands",
    "rating": 1261.0,
    "profileUrl": "https://www.aoe2insights.com/user/9440670/",
    "isActive": true,
    "peakRating": 1319.0,
    "winRate": "51.98%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "collace1",
    "country": "United Kingdom",
    "rating": 1164.0,
    "profileUrl": "https://www.aoe2insights.com/user/3084633/",
    "isActive": true,
    "peakRating": 1220.0,
    "winRate": "50.29%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Pairu",
    "country": "Belgium",
    "rating": 1148.0,
    "profileUrl": "https://www.aoe2insights.com/user/11662735/",
    "isActive": true,
    "peakRating": 1176.0,
    "winRate": "56.72%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "SavageDog",
    "country": "Mexico",
    "rating": 1112.0,
    "profileUrl": "https://www.aoe2insights.com/user/12975601/",
    "isActive": true,
    "peakRating": 1192.0,
    "winRate": "51.48%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2"]
  },
  {
    "name": "Biodox",
    "country": "United States",
    "rating": 1114.0,
    "profileUrl": "https://www.aoe2insights.com/user/213904/",
    "isActive": true,
    "peakRating": 1114.0,
    "winRate": "61.76%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Maudje10",
    "country": "Netherlands",
    "rating": 1065.0,
    "profileUrl": "https://www.aoe2insights.com/user/12257117/",
    "isActive": true,
    "peakRating": 1161.0,
    "winRate": "50.72%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Busfahrer Ulus",
    "country": "Germany",
    "rating": 994.0,
    "profileUrl": "https://www.aoe2insights.com/user/756434/",
    "isActive": true,
    "peakRating": 1094.0,
    "winRate": "50.31%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "JJNZ",
    "country": "New Zealand",
    "rating": 1001.0,
    "profileUrl": "https://www.aoe2insights.com/user/4320164/",
    "isActive": true,
    "peakRating": 1115.0,
    "winRate": "51.1%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "rey_erizo",
    "country": "Germany",
    "rating": 1044.0,
    "profileUrl": "https://www.aoe2insights.com/user/12790570/",
    "isActive": true,
    "peakRating": 1056.0,
    "winRate": "51.42%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "Stronghold Frenzy 2"]
  },
  {
    "name": "ClickBait",
    "country": "Denmark",
    "rating": 1054.0,
    "profileUrl": "https://www.aoe2insights.com/user/12225770/",
    "isActive": true,
    "peakRating": 1206.0,
    "winRate": "50.26%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2"]
  },
  {
    "name": "The Healing Monk",
    "country": "Netherlands",
    "rating": 933.0,
    "profileUrl": "https://www.aoe2insights.com/user/6901774/",
    "isActive": true,
    "peakRating": 1090.0,
    "winRate": "51.61%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "Stronghold Frenzy 2", "T90 Sudden Death Cup"]
  },
  {
    "name": "camfewell",
    "country": "United Kingdom",
    "rating": 961.0,
    "profileUrl": "https://www.aoe2insights.com/user/12605769/",
    "isActive": true,
    "peakRating": 1118.0,
    "winRate": "50.55%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "PilgrimSoul",
    "country": "Italy",
    "rating": 929.0,
    "profileUrl": "https://www.aoe2insights.com/user/12387823/",
    "isActive": true,
    "peakRating": 1092.0,
    "winRate": "50.97%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Sudden Death Cup"]
  },
  {
    "name": "RoboticPro",
    "country": "Netherlands",
    "rating": 964.0,
    "profileUrl": "https://www.aoe2insights.com/user/3877987/",
    "isActive": true,
    "peakRating": 965.0,
    "winRate": "52.13%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "MagratGarlick",
    "country": "Netherlands",
    "rating": 1028.0,
    "profileUrl": "https://www.aoe2insights.com/user/4061537/",
    "isActive": true,
    "peakRating": 1105.0,
    "winRate": "50.46%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "RKnight8",
    "country": "India",
    "rating": 1025.0,
    "profileUrl": "https://www.aoe2insights.com/user/12363008/",
    "isActive": true,
    "peakRating": 1028.0,
    "winRate": "51.59%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "Stronghold Frenzy 2"]
  },
  {
    "name": "Eljardinero4",
    "country": "Switzerland",
    "rating": 1064.0,
    "profileUrl": "https://www.aoe2insights.com/user/4954691/",
    "isActive": true,
    "peakRating": 1110.0,
    "winRate": "50.77%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Gaius Iulius Megas",
    "country": "Austria",
    "rating": 989.0,
    "profileUrl": "https://www.aoe2insights.com/user/3596974/",
    "isActive": true,
    "peakRating": 1040.0,
    "winRate": "43.21%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "Camaraderie",
    "country": "United States",
    "rating": 1027.0,
    "profileUrl": "https://www.aoe2insights.com/user/12081608/",
    "isActive": true,
    "peakRating": 1081.0,
    "winRate": "51.27%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2"]
  },
  {
    "name": "\ubc15\ud300",
    "country": "South Korea",
    "rating": 1115.0,
    "profileUrl": "https://www.aoe2insights.com/user/1545285/",
    "isActive": true,
    "peakRating": 1115.0,
    "winRate": "64.0%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "filipellopes",
    "country": "Brazil",
    "rating": 872.0,
    "profileUrl": "https://www.aoe2insights.com/user/5878630/",
    "isActive": true,
    "peakRating": 872.0,
    "winRate": "54.17%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "tumblwd",
    "country": "United Kingdom",
    "rating": 832.0,
    "profileUrl": "https://www.aoe2insights.com/user/1156997/",
    "isActive": true,
    "peakRating": 896.0,
    "winRate": "50.16%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "ButterFingerz",
    "country": "United States",
    "rating": 798.0,
    "profileUrl": "https://www.aoe2insights.com/user/12736422/",
    "isActive": true,
    "peakRating": 866.0,
    "winRate": "50.44%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2"]
  },
  {
    "name": "gurudeburdel",
    "country": "Argentina",
    "rating": 728.0,
    "profileUrl": "https://www.aoe2insights.com/user/12860672/",
    "isActive": true,
    "peakRating": 938.0,
    "winRate": "49.72%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14", "T90 Community Cup 2", "Stronghold Frenzy 2"]
  },
  {
    "name": "LeORI",
    "country": "Morocco",
    "rating": 811.0,
    "profileUrl": "https://www.aoe2insights.com/user/12893468/",
    "isActive": true,
    "peakRating": 838.0,
    "winRate": "51.96%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "InkMeBaby69",
    "country": "United Kingdom",
    "rating": 861.0,
    "profileUrl": "https://www.aoe2insights.com/user/13317354/",
    "isActive": true,
    "peakRating": 939.0,
    "winRate": "51.49%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "griff3n",
    "country": "Germany",
    "rating": 258.0,
    "profileUrl": "https://www.aoe2insights.com/user/289975/",
    "isActive": true,
    "peakRating": 577.0,
    "winRate": "19.51%",
    "recentTournamentsPlayed": ["AoeLeagues Season 14"]
  },
  {
    "name": "santiagoap",
    "country": "Argentina",
    "rating": 1769.0,
    "profileUrl": "https://www.aoe2insights.com/user/2429779/",
    "isActive": true,
    "peakRating": 1887.0,
    "winRate": "51.65%",
    "recentTournamentsPlayed": ["7ps Season 8"]
  },
  {
    "name": "Jarvin",
    "country": "Poland",
    "rating": 1809.0,
    "profileUrl": "https://www.aoe2insights.com/user/225026/",
    "isActive": true,
    "peakRating": 1883.0,
    "winRate": "50.69%",
    "recentTournamentsPlayed": ["7ps Season 8"]
  },
  {
    "name": "TrCL.Welcometorapture",
    "country": "Belgium",
    "rating": 1432.0,
    "profileUrl": "https://www.aoe2insights.com/user/4460059/",
    "isActive": true,
    "peakRating": 1432.0,
    "winRate": "62.39%",
    "recentTournamentsPlayed": ["7ps Season 8", "Stronghold Frenzy 2"]
  },
  {
    "name": "Mike'dugai",
    "country": "United Kingdom",
    "rating": 1330.0,
    "profileUrl": "https://www.aoe2insights.com/user/670688/",
    "isActive": true,
    "peakRating": 1393.0,
    "winRate": "59.6%",
    "recentTournamentsPlayed": ["7ps Season 8"]
  },
  {
    "name": "Tejanoheat",
    "country": "United States",
    "rating": 1349.0,
    "profileUrl": "https://www.aoe2insights.com/user/9330870/",
    "isActive": true,
    "peakRating": 1462.0,
    "winRate": "50.84%",
    "recentTournamentsPlayed": ["7ps Season 8"]
  },
  {
    "name": "apach2412",
    "country": "United States",
    "rating": 1336.0,
    "profileUrl": "https://www.aoe2insights.com/user/2783719/",
    "isActive": true,
    "peakRating": 1407.0,
    "winRate": "50.86%",
    "recentTournamentsPlayed": ["7ps Season 8"]
  },
  {
    "name": "xCONTORTIONISTx",
    "country": "United States",
    "rating": 1064.0,
    "profileUrl": "https://www.aoe2insights.com/user/440650/",
    "isActive": true,
    "peakRating": 1080.0,
    "winRate": "54.13%",
    "recentTournamentsPlayed": ["7ps Season 8"]
  },
  {
    "name": "dumbcube",
    "country": "United States",
    "rating": 668.0,
    "profileUrl": "https://www.aoe2insights.com/user/11763878/",
    "isActive": true,
    "peakRating": 697.0,
    "winRate": "50.62%",
    "recentTournamentsPlayed": ["7ps Season 8"]
  },
  {
    "name": "SlayerTTV750",
    "country": "Australia",
    "rating": 274.0,
    "profileUrl": "https://www.aoe2insights.com/user/13201730/",
    "isActive": true,
    "peakRating": 584.0,
    "winRate": "44.27%",
    "recentTournamentsPlayed": ["7ps Season 8"]
  }
];

export default samplePlayers;

const sampleMaps = [
  {
    id: "badlands",
    name: "Badlands",
    image: "/maps/badlands.png",
    type: "Open",
    description:
      "Players cannot farm near town centers. Wood in the immediate area is scarce. More wood rests in the central pit, but there are wolves in that area.",
    bestCivs: ["Romans", "Magyars", "Khmer", "Japanese"],
    strategies: ["20 pop MAA", "19 pop Scouts"],
    tournaments: ["T90 Community Cup 2"],
    bonus: "Heavy feudal aggression is preferred since villagers are scattered and map is hard to wall.",
  },
  {
    id: "big-freeze",
    name: "Big Freeze",
    image: "/maps/big-freeze.png",
    type: "Closed",
    description:
      "Players start surrounded by palisade walls as a weak defence. The middle of the map is a frozen lake with cracks that allow fishing.",
    bestCivs: ["Romans", "Japanese", "Armenians"],
    strategies: ["20 pop MAA + Archers/Skirms", "20 pop MAA + towers"],
    tournaments: ["T90 Community Cup 2"],
    bonus: "Shore fish control is vital; a well-timed MAA opening and the initial fight can define the entire game’s momentum."
  },
  {
    id: "coast-arena",
    name: "Coast Arena",
    image: "/maps/coast-arena.png",
    type: "Water",
    description:
      "Arena-style map but surrounded by water. Open space toward opponents and relics in the center.",
    bestCivs: ["Malay", "Bengalis", "Italians", "Armenians"],
    strategies: [
      "Triple Dock Galleys",
      "FC Fires/War Galleys",
      "Castle Drop + UU/Fast Imp",
      "Monk Rush"
    ],
    tournaments: ["T90 Community Cup 2"],
    bonus: "Water control is crucial because there is limited space for villagers to gather resources so fishing ships are economically superior. Castle drops and monk rushes also work well as supporting strategies"
  },
  {
    id: "hoodoo",
    name: "Hoodoo",
    image: "/maps/hoodoo.png",
    type: "Nomad",
    description:
      "Nomad start on a Scandinavian-like map with heavy hunts scattered around.",
    bestCivs: ["Spanish", "Koreans", "Italians"],
    strategies: [
      "FC Unique Unit/Smush",
      "Fast Feudal + Double Dock Fires",
      "Fast Feudal Archers"
    ],
    tournaments: ["T90 Community Cup 2"],
    bonus: "Prioritize fast TC placement near hunts for a strong early eco."
  },
  {
    id: "koala",
    name: "Koala",
    image: "/maps/koala.png",
    type: "Open",
    description:
      "A random map in the shape of a koala head. Players always start with a curved back woodline. Additional gold and stone can be found on the mountainous outer reaches of the map.",
    bestCivs: ["Lithuanians", "Aztecs"],
    strategies: [
      "20 pop MAA + Archers/Skirms",
      "19 pop Scouts + Skirms/Archers",
      "19 pop Spear Skirm Rush"
    ],
    tournaments: ["T90 Community Cup 2"],
    bonus: "The close distance makes laming easy to execute. Berries and gold are always forward, so a forward range can be effective for applying pressure."
  },
  {
    id: "le-grand-fosse",
    name: "Le Grand Fosse",
    image: "/maps/le-grand-fosse.png",
    type: "Closed",
    description:
      "Each player starts in half a village, separated by a ditch. Resources within the village are scarce and there are no safe woodlines inside the palisade walls. Wild boars are found near the forests.",
    bestCivs: ["Dravidians", "Romans", "Mongols"],
    strategies: [
      "20 pop MAA + Archers/Skirms",
      "20 pop MAA + Towers",
    ],
    tournaments: ["T90 Community Cup 2"],
    bonus: "Woodlines are always outside, so pressuring them with ranged units or towers can decide the game."
  },
  {
    id: "northern-crossings",
    name: "Northern Crossings",
    image: "/maps/northen-crossings.png",
    type: "Hybrid",
    description:
      "Northern Isles but with shallow crossings, so players don’t need transport ships to reach the opponent’s island.",
    bestCivs: ["Dravidians", "Italians", "Armenians", "Koreans"],
    strategies: [
      "Double Dock Fires + Archers/Skirms",
      "Triple Dock Galleys",
      "FC War Galleys/Fires"
    ],
    tournaments: ["T90 Community Cup 2"],
  },
  {
    id: "roe-rage",
    name: "Roe Rage",
    image: "/Roe_rage_aoe2_map.png",
    type: "Hybrid",
    description:
      "Kawasan-style map with extra cows and a pond in the middle. Each player starts with deep fish directly under their Town Center",
    bestCivs: ["Georgians", "Chinese", "Lithuanians"],
    strategies: [
      "MAA + Archers/Skirms",
      "Scouts + Skirms/Archers",
    ],
    tournaments: ["T90 Community Cup 2"],
    bonus: "Fish is vulnerable to land units, so overinvesting in a single pond can be risky."
  },
  {
    id: "sunburn",
    name: "Sunburn",
    image: "/maps/sunburn.png",
    type: "Open",
    description:
      "A savannah with a single large forest dividing the map.  The berry bush clusters will always spawn with two on one half of the map and one on the other.",
    bestCivs: ["Mayans", "Goths", "Mongols"],
    strategies: [
      "19 pop Archers/Skirms",
      "19 pop Scouts + Skirms",
    ],
    tournaments: ["T90 Community Cup 2", "Secret Desert Cup"],
  },
  {
    id: "triple-tunnel",
    name: "Triple Tunnel",
    image: "/triple-tunnel.png",
    type: "Closed",
    description:
      "Black Forest-esque with three openings and a pond for fish booming.",
    bestCivs: ["Malay", "Burgundians", "Japanese"],
    strategies: [
      "FC Unique Unit/Boom",
      "MAA + Forward Range into Archers/Skirms",
    ],
    tournaments: ["T90 Community Cup 2"],
    bonus: "Fish booming is very strong to gain an economic advantage"
  },
  {
    id: "african-rivers",
    name: "African Rivers",
    image: "/maps/african-rivers.png",
    type: "Hybrid",
    description:
      "Players start very close to each other with a tiny lake running through the center of the map. Players spawn on the inner ring, separated by a river from the outer ring where most resources are located.",
    bestCivs: ["Japanese", "Georgians", "Chinese"],
    strategies: [
      "Double Dock Fires + Archers/Skirms",
      "Double Dock Fires + MAA into Skirms/Archers", 
    ],
    tournaments: ["T90 Community Cup 2"],
  },
  {
    id: "dzimbabwe",
    name: "Dzimbabwe",
    image: "/maps/dzimbabwe.png",
    type: "Closed",
    description:
      "The map spawns players in a resource-rich stone-walled base. To their left, players have plenty of hunt to fight over. The rich mines on their right must be contested for the extra stone and gold on the map.",
    bestCivs: ["Bohemians", "Turks ", "Bengalis"],
    strategies: [
      "FC Castle drop into Fast Imp",
      "FC Siege + Monk Push", 
    ],
    tournaments: ["Stronghold Frenzy 2"],
  },
  {
    id: "todai-ji",
    name: "Todai-ji",
    image: "/maps/todai-ji.png",
    type: "Closed",
    description:
      "The map spawns players in a resource-rich stone-walled base. To their left, players have plenty of hunt to fight over. The rich mines on their right must be contested for the extra stone and gold on the map.",
    bestCivs: ["Bohemians", "Spanish ", "Bengalis"],
    strategies: [
      "FC Castle drop into Fast Imp",
      "FC Siege Push the Wonder",
      "FC Defensive Castle (Wonder area) into UU", 
    ],
    tournaments: ["Stronghold Frenzy 2"],
  },
  {
    id: "kolo",
    name: "Kolo",
    image: "/maps/kolo.png",
    type: "Hybrid",
    description:
      "Kolo has 3 versions of the map wrapped in one. In all cases, players spawn with 3 lands, only one of which has a Town Center surrounded by fortified palisades, within which you have starting herdables and hunt, others containing additional resources.in 2 of the versions, additional small gold mines are located at the center.",
    bestCivs: ["Japanese", "Romans", "Bulgarians"],
    strategies: [
      "Fast Feudal MAA + towers",
    ],
    tournaments: ["Stronghold Frenzy 2"],
  },
  {
    id: "narak",
    name: "Narak",
    image: "/maps/Narak.png",
    type: "Closed",
    description:
      "Narak (previously known as Shattered Plains) is played as Regicide. Players start with a Fortified Tower. The middle of the map holds Gold and Stone on elevated plateaus, while Forage Bushes and Box Turtles fill the ditches. Four plateaus with Gold spawn on the outside ring. The map holds six Relics.",
    bestCivs: ["Chinese", "Bengalis", "Burgundians"],
    strategies: [
      "FC Castle Drop into UU/Fast Imp",
      "FC Boom + fight for relics"
    ],
    tournaments: ["Stronghold Frenzy 2"],
  },
  {
    id: "sardis",
    name: "Sardis",
    image: "/maps/sardis.png",
    type: "Closed",
    description:
      "Sardis is separated from players by uncaptureable, neutral Fortified Walls. The quickest to find their way to Sardis proper will find great benefit from the captureable Trade Workshop. Wood and other resources in the base are limited.",
    bestCivs: ["Sarceans"],
    strategies: [
      "Peltast rush into workshop control",
      "FC Siege push",
      "Hoplite wall rush into workshop"
    ],
    tournaments: ["Stronghold Frenzy 2"],
  },
  {
    id: "ngome",
    name: "Ngome",
    image: "/maps/ngome.png",
    type: "Hybrid",
    description:
      "On one side players start safely walled in on an island, but connected to each other! On the other side Villagers are stranded on the mainland. These Villagers can start making additional Town Centers straight away.",
    bestCivs: ["Lithuanians", "Malay", "Bengalis"],
    strategies: [
      "2-3 TC FC into castle drop + FI,",
      "Take over water/ land section",
    ],
    tournaments: ["Stronghold Frenzy 2"],
  },
  {
  id: "treasure-beach",
  name: "Treasure Beach",
  image: "/maps/treasure-beach.png",
  type: "Hybrid",
  description:
    "Players receive only one starting Boar, but there are plenty of herdables to be found. An enclosure opposite your spawn holds huntables.",
  bestCivs: ["Mongols", "Celts", "Ethiopians"],
  strategies: [
    "Forward Range Archers/Skrims",
    "MAA into Archers",
    "Drush into Archers",
  ],
  tournaments: ["Stronghold Frenzy 2"],
},

{
  id: "tulou",
  name: "Tulou",
  image: "/maps/tulou.png",
  type: "Closed",
  description:
    "The map features a small base protected by circular fortified palisade walls. The players can find plenty of gold inside and outside their bases. For stone and a little surplus of food, they need to cut to the outside of the map.",
  bestCivs: ["Malay", "Bohemians"],
  strategies: [
    "FC Monk + siege push",
    "Men-at-Arms into tower rush",
    "FC Boom",
  ],
  tournaments: ["Stronghold Frenzy 2"],
},

{
  id: "veldschans",
  name: "Veldschans",
  image: "/maps/veldschans.png",
  type: "Closed",
  description:
    "Players fight over the valuable resources held inside the neutral Fortified Palisades. These walls are uncaptureable and have 300 hit points each. Players start with 3 Farms, but only 1 Boar to hunt. The rock terrain connecting players to the middle is unwallable.",
  bestCivs: ["Goths"],
  strategies: [
    "Forward villagers for walling",
    "Forward Archery Range Archers/Skirms",
    "FC Boom behind walls",
  ],
   tournaments: ["Stronghold Frenzy 2"],
},
];



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
    name: 'T90 Sudden Death Cup',
    organizer: 'Rbase',
    date: new Date('2025-11-24'),
    prizePool: { amount: 0, currency: 'USD' },
    status: 'ongoing', // upcoming
    registrationDeadline: new Date('2025-11-21'),
    registrationLink: 'https://discord.com/invite/vMpPuPjba8',
    type: 'Community',
    format: 'Round Robin',
    description: 'New T90 community event with sudden death settings',
    playoffsStarted: true,
    featured: false,
    isActive: true
  },
  {
    name: 'Nomad League: Relocated',
    organizer: 'Sokół, Mikedugai, Nessy, Kajarson',
    date: new Date('2025-12-08'),
    prizePool: { amount: 0, currency: 'USD' },
    status: 'ongoing', 
    registrationDeadline: new Date('2025-12-05'),
    registrationLink: 'https://discord.gg/etdpkXuyzK',
    type: 'Community',
    format: 'Round Robin',
    description: 'First official Low Elo Legion 1v1 Nomad League! This event is designed to give players of all skill levels a chance to compete in a structured, fun, and community-driven format.',
    featured: false,
    playoffsStarted: false,
    isActive: true
  },
  {
    name: 'AoeLeagues Season 15',
    organizer: 'Javisty, KoaLollo, RoboticPro',
    date: new Date('2026-01-05'),
    prizePool: { amount: 35.54, currency: 'USD' },
    status: 'ongoing', 
    registrationDeadline: new Date('2026-01-02'),
    registrationLink: 'https://discord.com/invite/CzAccxRX63',
    type: 'Community',
    format: 'Round Robin',
    description: 'Pick a Home map of your choice to play throughout the season!',
    featured: false,
    playoffsStarted: false,
    isActive: true
  },
  {
    name: 'Akkal’s 4v4 League Season 5',
    organizer: 'Akkal',
    date: new Date('2026-01-05'),
    prizePool: { amount: 0, currency: 'USD' },
    status: 'ongoing', 
    registrationDeadline: new Date('2026-01-05'),
    registrationLink: 'https://discord.com/invite/3GwJ22zr3Y',
    type: 'Community',
    format: 'Round Robin',
    description: 'Single-elimination playoff between top4 finishing teams in each division.',
    featured: false,
    playoffsStarted: false,
    isActive: true
  },
  {
    name: 'Alchemy League Season 9',
    organizer: 'TechChariot',
    date: new Date('2026-01-07'),
    prizePool: { amount: 333, currency: 'USD' },
    status: 'ongoing', 
    registrationDeadline: new Date('2026-01-05'),
    registrationLink: 'https://discord.com/invite/h9DvzHBNPr',
    type: 'Community',
    format: 'Round Robin',
    description: 'Unique Round Robin System. Three Independently-Scored Sprints with 3, 3, and 5 Round Each. Each Round is Play-All-Two or Play-All-Three',
    featured: false,
    playoffsStarted: false,
    isActive: true
  },
   {
    name: 'The Bear Cave',
    organizer: 'Beargwyn',
    date: new Date('2026-01-16'),
    prizePool: { amount: 0, currency: 'USD' },
    status: 'ongoing', 
    registrationDeadline: new Date('2026-01-14'),
    registrationLink: 'https://discord.com/invite/WTmvCdP63g',
    type: 'Community',
    format: 'Round Robin',
    description: 'Ever got curious about the standard maps that never get picked for tournaments or ranked ladder? Wonder no more!',
    featured: false,
    playoffsStarted: false,
    isActive: true
  },
  {
    name: 'Dual Domination 2',
    organizer: 'dodo3011',
    date: new Date('2026-01-26'),
    prizePool: { amount: 0, currency: 'USD' },
    status: 'ongoing', 
    registrationDeadline: new Date('2026-01-23'),
    registrationLink: 'https://discord.com/invite/AYFpkT6qRA',
    type: 'Community',
    format: 'Round Robin',
    description: 'You Play in Coop and control 1 Civ together',
    featured: false,
    playoffsStarted: false,
    isActive: true
  },
  {
    name: 'The Chosen Ones III',
    organizer: 'ThisDino',
    date: new Date('2026-02-02'),
    prizePool: { amount: 355.64, currency: 'USD' },
    status: 'registration', 
    registrationDeadline: new Date('2026-01-31'),
    registrationLink: 'https://discord.com/invite/e5gA2EdQxq',
    type: 'Community',
    format: 'Round Robin',
    description: 'The Chosen Ones 3 is an Age of Empires 2 tournament in which the competitors preselect a fixed number of civilizations. Throughout the tournament, each civilization may be played only once per Player.',
    featured: false,
    playoffsStarted: false,
    isActive: true
  },
  {
    name: 'Six Nations Cup',
    organizer: 'Kajarson, Nessy, Sokół',
    date: new Date('2026-03-01'),
    prizePool: { amount: 0, currency: 'USD' },
    status: 'registration', 
    registrationDeadline: new Date('2026-02-27'),
    registrationLink: 'https://discord.com/invite/ujPKayHTjm',
    type: 'Community',
    format: 'Round Robin',
    description: 'The Six American Civilizations will fight for supremacy of the AMERICAS!',
    featured: false,
    playoffsStarted: false,
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
    name: "AoELeagues Season 14",
    organizer:
      "Javisty, ReaperWins, RoboticPro, FloosWorld, Red Clifford, Ganji X, Maudje10",
    date: "2025-11-10",
    winners: [
      { division: "Division A", player: "Ozone", rating: null },
      { division: "Division B", player: "Abu Abdullah", rating: null },
      { division: "Division C", player: "TheSleepyBishop", rating: null },
      { division: "Division D", player: "Metal", rating: null },
      { division: "Division E", player: "Flying Mouse", rating: null },
      { division: "Division F", player: "tommy9512", rating: null },
      { division: "Division G", player: "Nope1585", rating: null },
      { division: "Division H", player: "Ezio", rating: null },
      { division: "Division I", player: "El Mikalos", rating: null },
      { division: "Division J", player: "Shibani", rating: null },
      { division: "Division K", player: "Biodox", rating: null },
      { division: "Division L", player: "Forkan Rick", rating: null },
      { division: "Division M", player: "박팀", rating: null },
      { division: "Division N", player: "EmperorNoob97", rating: null },
    ],
    runnerUps: [
      { division: "Division A", player: "Rodrixs", rating: null },
      { division: "Division B", player: "xRavyn", rating: null },
      { division: "Division C", player: "JustAGecko", rating: null },
      { division: "Division D", player: "gh0stwriter", rating: null },
      { division: "Division E", player: "Spaz The Adventurer", rating: null },
      { division: "Division F", player: "Red Clifford", rating: null },
      { division: "Division G", player: "Citizen Snips", rating: null },
      { division: "Division H", player: "canttouchme", rating: null },
      { division: "Division I", player: "Hornet-Wing", rating: null },
      { division: "Division J", player: "Fishman", rating: null },
      { division: "Division K", player: "Pangolin", rating: null },
      { division: "Division L", player: "ClickBait", rating: null },
      { division: "Division M", player: "Camaraderie", rating: null },
      { division: "Division N", player: "gurudeburdel", rating: null },
    ],
    isActive: true,
  },

  {
    name: "Super Idiot Cup 3",
    organizer: "ThisDino",
    date: "2025-12-30",
    winners: [
      { division: "Division 1", player: "Chelbird", rating: null },
      { division: "Division 2", player: "The Otter One", rating: null },
      { division: "Division 3", player: "Spaz the Adventurer", rating: null },
      { division: "Division 4", player: "NOPE1585", rating: null },
      { division: "Division 5", player: "Deadmeat", rating: null },
    ],
    runnerUps: [
      { division: "Division 1", player: "Mighty Space Fruit", rating: null },
      { division: "Division 2", player: "maxymczech", rating: null },
      { division: "Division 3", player: "hitman999", rating: null },
      { division: "Division 4", player: "Robin5hood", rating: null },
      { division: "Division 5", player: "Frozen - Hot Pepper Pizza", rating: null },
    ],
    isActive: true,
  },

  {
    name: "Alchemy League Season 8 Sprint 1",
    organizer: "TechChariot",
    date: "2025-10-26",
    winners: [
      { division: "Rank 1", player: "YoSoyPacho", rating: null },
      { division: "Rank 2", player: "Kingofn00b", rating: null },
      { division: "Rank 3", player: "Metalmania", rating: null },
      { division: "Rank 4", player: "Chipmunk", rating: null },
      { division: "Rank 5", player: "Flying Mouse", rating: null },
      { division: "Rank 6", player: "e1sTea", rating: null },
      { division: "Rank 7", player: "Ezio", rating: null },
      { division: "Rank 8", player: "RaiD_", rating: null },
    ],
    runnerUps: [],
    isActive: true,
  },

  {
    name: "Alchemy League Season 8 Sprint 2",
    organizer: "TechChariot",
    date: "2025-12-05",
    winners: [
      { division: "Rank 1", player: "Hydur", rating: null },
      { division: "Rank 2", player: "chanchilaru", rating: null },
      { division: "Rank 3", player: "maxymczech", rating: null },
      { division: "Rank 4", player: "LoreDek", rating: null },
      { division: "Rank 5", player: "Ezio", rating: null },
      { division: "Rank 6", player: "Forteraiger", rating: null },
      { division: "Rank 7", player: "e1sTea", rating: null },
      { division: "Rank 8", player: "PlushWerewolf", rating: null },
    ],
    runnerUps: [],
    isActive: true,
  },

  {
    name: "7ps League Season 8",
    organizer: "Zark, Huggie, J0N-PERKiNS, Pl0tterGhost",
    date: "2026-01-13",
    winners: [
      { division: "Division 1", player: "King_Boo", rating: null },
      { division: "Division 2", player: "TheSleepyBishop", rating: null },
      { division: "Division 3", player: "Jskillz", rating: null },
      { division: "Division 4", player: "Spaz the Adventurer", rating: null },
      { division: "Division 5", player: "The Wyandotte", rating: null },
      { division: "Division 6", player: "Mike'dugai", rating: null },
      { division: "Division 7", player: "Fairytale Belkross", rating: null },
      { division: "Division 8", player: "bumbaloe", rating: null },
      { division: "Division 9", player: "QuailzEnFire903", rating: null },
    ],
    runnerUps: [
      { division: "Division 1", player: "Pete", rating: null },
      { division: "Division 2", player: "JustAGecko", rating: null },
      { division: "Division 3", player: "Metalmania", rating: null },
      { division: "Division 4", player: "Nephthys123", rating: null },
      { division: "Division 5", player: "1Sh0t", rating: null },
      { division: "Division 6", player: "apach2412", rating: null },
      { division: "Division 7", player: "aje.omar", rating: null },
      { division: "Division 8", player: "Judean People's Front", rating: null },
      { division: "Division 9", player: "Kiki da Foxvoid", rating: null },
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
