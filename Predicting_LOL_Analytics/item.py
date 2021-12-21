import requests,json
import csv
response=requests.get("http://ddragon.leagueoflegends.com/cdn/9.24.2/data/en_US/item.json")

matchData=json.loads(response.text)
#print(matchData['data']['1001']['name'])
c="1001"
with open("item.csv","a")as f:
    writer=csv.writer(f)
    writer.writerow(['Name','Description','stats','gold','tags','plaintext'])
    for i in range(0,4000):
        if(c in matchData['data']):
            writer.writerow([matchData['data'][c]['name'],matchData['data'][c]['description'],matchData['data'][c]['stats'],matchData['data'][c]['gold'],matchData['data'][c]['tags'],matchData['data'][c]['plaintext']])
        c=(str(int (c)+1))
    

