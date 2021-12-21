import requests,json
import csv
'''response=requests.get("https://na1.api.riotgames.com/lol/league/v4/leagues/0003dc0a-d06f-4a0f-872f-bfcc4f526f90?api_key=RGAPI-19ec3f46-fb59-410c-a4f7-37598db8eb95")
response1=requests.get("https://na1.api.riotgames.com/lol/league/v4/leagues/0005c9e5-61a5-488a-9bfc-dade2f25e406?api_key=RGAPI-19ec3f46-fb59-410c-a4f7-37598db8eb95")
response2=requests.get("https://na1.api.riotgames.com/lol/league/v4/leagues/0009901b-f9b9-40ec-9aaf-48b0ba0c2530?api_key=RGAPI-19ec3f46-fb59-410c-a4f7-37598db8eb95")
response3=requests.get("https://na1.api.riotgames.com/lol/league/v4/leagues/000fa54e-619a-4289-b69e-961e0a0ee289?api_key=RGAPI-19ec3f46-fb59-410c-a4f7-37598db8eb95")
response4=requests.get("https://na1.api.riotgames.com/lol/league/v4/leagues/0022b169-5615-4dc6-b3bc-8f2cda99e79b?api_key=RGAPI-19ec3f46-fb59-410c-a4f7-37598db8eb95")

summData=json.loads(response.text)
summData1=json.loads(response1.text)
summData2=json.loads(response2.text)
summData3=json.loads(response3.text)
summData4=json.loads(response4.text)

with open("summonerDetails.csv","w")as f:
    writer=csv.writer(f)
    writer.writerow(['summonerId','summonerName','leaguePoints','rank','wins','losses','tier'])
    for item in summData['entries']:
        writer.writerow([item['summonerId'],item['summonerName'],item['leaguePoints'],item['rank'],item['wins'],item['losses'],"IRON"])


with open("summonerDetails.csv","a",newline="",encoding="utf-8")as f1:
    writer1=csv.writer(f1)
    for item1 in summData1['entries']:
        writer1.writerow([item1['summonerId'],item1['summonerName'],item1['leaguePoints'],item1['rank'],item1['wins'],item1['losses'],"GOLD"])
with open("summonerDetails.csv","a",newline="",encoding="utf-8")as f2:
    writer2=csv.writer(f2)
    for item2 in summData2['entries']:
        writer2.writerow([item2['summonerId'],item2['summonerName'],item2['leaguePoints'],item2['rank'],item2['wins'],item2['losses'],"SILVER"])

with open("summonerDetails.csv","a",newline="",encoding="utf-8")as f3:
    writer3=csv.writer(f3)
    for item3 in summData3['entries']:
        writer3.writerow([item3['summonerId'],item3['summonerName'],item3['leaguePoints'],item3['rank'],item3['wins'],item3['losses'],"BRONZE"])
with open("summonerDetails.csv","a",newline="",encoding="utf-8")as f4:
    writer4=csv.writer(f4)
    for item4 in summData4['entries']:
        writer4.writerow([item4['summonerId'],item4['summonerName'],item4['leaguePoints'],item4['rank'],item4['wins'],item4['losses'],"PLATINUM"])'''



