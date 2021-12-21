import pandas as pd
import json

API_KEY = 'RGAPI-b7870d20-cd2e-4a8f-b2fe-b59117497431'
DEV_API = 'RGAPI-b7870d20-cd2e-4a8f-b2fe-b59117497431'

#mapper for champion name to its id
mapper = {}
championId = pd.read_csv("lol_frontend/functionality/champion.csv", usecols = ["key"], squeeze = True).to_numpy()
championName = pd.read_csv("lol_frontend/functionality/champion.csv", usecols = ["name"], squeeze = True).to_numpy()
for i in range(championId.size):
    mapper[championId[i]] = championName[i]

#leaderboard data fetch in variable 
with open('lol_frontend/functionality/leaderboard.json') as f:
    leaderboard_DATA = json.load(f)

#upcomingLeague data fetch in variable
with open('lol_frontend/functionality/upcomingLeagueInfo.json') as f:
    upcomingleague_DATA = json.load(f)

#fetch player champion data for suggestion
with open('lol_frontend/functionality/br1sample.json') as f:
    br1_DATA = json.load(f)
