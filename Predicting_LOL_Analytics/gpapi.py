import requests
import csv
import pandas as pd

api_key = 'RGAPI-64357d5f-5450-4551-a987-b9226cccb680'
header = {"X-Riot-Token": "RGAPI-64357d5f-5450-4551-a987-b9226cccb680"}

url = 'http://static.developer.riotgames.com/docs/lol/maps.json'

data_to_write = open('maps.csv', 'w', encoding = 'utf-8')
csv_writer = csv.writer(data_to_write)

data = requests.get(url, headers = header)
data = data.json()

head = data[0].keys()
csv_writer.writerow(head)

for vals in data:
    csv_writer.writerow(vals.values())
    
       
