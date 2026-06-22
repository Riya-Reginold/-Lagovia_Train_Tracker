import httpx

BASE_URL= "https://api.irail.be"

async def get_stations():
    async with httpx.AsyncClient(follow_redirects=True) as client:
        response = await client.get(
            f"{BASE_URL}/stations/",
            params={"format": "json", "lang": "en"}
        )
        response.raise_for_status()
    return response.json()["station"]

def matching_stations(stations, query):
    return [
        {"id": s["id"], "name": s["name"]}
        for s in stations
        if query.lower() in s["name"].lower()
    ]

async def get_liveboard(station_name):
    try:
        async with httpx.AsyncClient(follow_redirects=True) as client:
            response = await client.get(
                f"{BASE_URL}/liveboard/",
                params={"station": station_name, "format": "json"}
            )
            response.raise_for_status()
        data = response.json()
        return data.get("departures", {}).get("departure", [])
    except Exception:
        return []