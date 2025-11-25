import os
import time
import datetime
from bs4 import BeautifulSoup
from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# -----------------------------------
# MongoDB connection
# -----------------------------------
MONGO_URI = os.environ["MONGO_URI"]
client = MongoClient(MONGO_URI)
db = client["gather"]
players = db["players"]

# -----------------------------------
# URL list
# -----------------------------------
from urls import URLS   # OR paste the list directly here

# -----------------------------------
# Country normalization
# -----------------------------------
COUNTRY_MAP = {
    # (paste your entire dictionary here)
}

# -----------------------------------
# Scrape single profile
# -----------------------------------
def scrape_profile(driver, url):
    driver.get(url)
    time.sleep(2)

    soup = BeautifulSoup(driver.page_source, "html.parser")

    # --- Name ---
    name_tag = soup.find("strong")
    name = name_tag.text.strip() if name_tag else "Unknown"

    # --- Country ---
    country = "Unknown"
    about_header = soup.find("h4", string=lambda t: t and "About" in t)
    if about_header:
        about_div = about_header.find_parent("div")
        if about_div:
            first_em = about_div.find("em")
            if first_em:
                raw_country = first_em.text.strip()
                country = COUNTRY_MAP.get(raw_country, raw_country)

    # --- Rating ---
    rating = None
    rating_div = soup.find("div", class_="card-text text-center d-flex flex-column justify-content-around")
    if rating_div:
        for small in rating_div.find_all("small"):
            txt = small.text.strip()
            if txt.startswith("Rating"):
                try:
                    rating = int(txt.replace("Rating", "").strip())
                except:
                    rating = None
    
    return {
        "name": name,
        "country": country,
        "rating": rating,
        "profileUrl": url
    }

# -----------------------------------
# Save or update in MongoDB
# -----------------------------------
def save_to_mongo(data):
    aoe2_id = data["profileUrl"].split("/")[-1]

    players.update_one(
        {"aoe2InsightsId": aoe2_id},
        {
            "$set": {
                "aoe2InsightsId": aoe2_id,
                "name": data["name"],
                "country": data["country"],
                "rating": data["rating"],
                "currentRating": data["rating"],  # for compatibility
                "peakRating": data["rating"],      # initial value
                "winRate": 0,
                "isActive": True,
                "profileUrl": data["profileUrl"],
                "lastUpdated": datetime.datetime.utcnow()
            }
        },
        upsert=True
    )

# -----------------------------------
# Main loop
# -----------------------------------
def main():
    print("🔵 Starting AoE2 scraper...")

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)

    for i, url in enumerate(URLS, start=1):
        print(f"📌 [{i}/{len(URLS)}] Scraping {url}")
        try:
            data = scrape_profile(driver, url)
            save_to_mongo(data)
            print(f"✔ Updated: {data['name']} ({data['rating']})")
        except Exception as e:
            print(f"❌ Error: {e}")

    driver.quit()
    print("🎉 Scraping complete.")

if __name__ == "__main__":
    main()
