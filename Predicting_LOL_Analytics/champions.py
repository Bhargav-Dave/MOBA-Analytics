import requests
import csv
import pandas as pd

api_key = 'RGAPI-64357d5f-5450-4551-a987-b9226cccb680'
header = {"X-Riot-Token": "RGAPI-64357d5f-5450-4551-a987-b9226cccb680"}

url = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/data/en_US/champion.json'

champ = open('champion.csv', 'w', encoding = 'utf-8')
info = open('champion_info.csv', 'w', encoding = 'utf-8')
stats = open('champion_stats.csv', 'w', encoding = 'utf-8')
champ_writer = csv.writer(champ)
info_writer = csv.writer(info)
stats_writer = csv.writer(stats)

data = requests.get(url, headers = header)
data = data.json()


stats_head = ["id","hp", "hpperlevel", "mp","mpperlevel","movespeed","armor","armorperlevel","spellblock","spellblockperlevel","attackrange","hpregen","hpregenperlevel","mpregen","mpregenperlevel","crit","critperlevel","attackdamage","attackdamageperlevel","attackspeedperlevel","attackspeed"]
champ_head = ['version', 'id', 'key', 'name', 'title', 'blurb', 'tags', 'partype']
info_head = ['id', 'attack', 'defense', 'magic', 'difficulty']

champ_writer.writerow(champ_head)
info_writer.writerow(info_head)
stats_writer.writerow(stats_head)

for details in data['data'].values():
    champ_dict = {x:details[x] for x in champ_head}
    stats_dict = {'id':details['id']}
    info_dict = {'id':details['id']}
    stats_dict.update(details['stats'])
    info_dict.update(details['info'])
    champ_writer.writerow(champ_dict.values())
    stats_writer.writerow(stats_dict.values())
    info_writer.writerow(info_dict.values())
    

    
    
    