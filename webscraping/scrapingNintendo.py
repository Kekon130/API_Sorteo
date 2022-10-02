from bs4 import BeautifulSoup
import requests
import pandas as pd
from tabulate import tabulate

url = "https://nintendo.fandom.com/wiki/Nintendo_characters"

# GET request to download HTML
r = requests.get(url)
soup = BeautifulSoup(r.content, "lxml")

# get all tables and titles
tables = soup.find_all("table", class_="wikitable")
headers = soup.find_all("h2")

# not all headers contain game titles
# removing useless headers and storing relevant ones here:
game_titles = []

# list to gather objects with the desired data structure
all_data = []

# gather relevant titles and removing "series"
for header in headers:
    header_text = header.get_text()
    if(header_text.__contains__("series")):
        title = header_text.rsplit(' ', 1)[0]
        game_titles.append(title)


# append character names to list
for game in game_titles:
    # finding corresponding characters table
    table_index = game_titles.index(game)
    table = tables[table_index]
    rows = table.find_all("tr")

    # grab first column in each row
    for row in rows:
        char_name = row.find("td")
        name_text = char_name.get_text()

        # filtering out "Character" columns, parsing name so it doesn't contain "\n"
        if(name_text != "Character"):
            name_fields = name_text.split("\\", 1)
            name_clean = name_fields[0]
            
            # object with desired data structure
            d = { 'name': name_clean,
                  'game': game,
                  'C_ID': "NULL",
                  'S_ID': "NULL"

                }
            all_data.append(d)

# putting results into dataframe, then saving as csv
#df = pd.DataFrame(name_outputs)

df = pd.DataFrame(all_data)
print(tabulate(df))

df.to_csv("nintendo.csv")

