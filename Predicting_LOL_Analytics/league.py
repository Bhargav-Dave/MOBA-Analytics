import requests
import csv
import pandas as pd

api_key = 'RGAPI-64357d5f-5450-4551-a987-b9226cccb680'
header = {"X-Riot-Token": "RGAPI-64357d5f-5450-4551-a987-b9226cccb680"}

url = 'https://euw1.api.riotgames.com/lol/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5'

data = requests.get(url, headers = header)
data = data.json()
league_entries = data['entries']


data_csv = open('league_solo_5x5.csv', 'w', encoding = "utf-8")
csv_writer = csv.writer(data_csv)



header = league_entries[0].keys()
csv_writer.writerow(header)

for vals in league_entries:
    csv_writer.writerow(vals.values())

print(len(data['entries']))