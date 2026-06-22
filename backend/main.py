import asyncio
from fastapi import  FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from irail import get_stations,matching_stations, get_liveboard
from service import format_departure,convert_timestamp, is_within_15_minutes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def process_station(station):
    
    liveboard = await get_liveboard(station["name"])
    filtered = []
    for dep in liveboard:
        raw_time = dep.get("time")
        if not raw_time:
            continue
        scheduled_dt = convert_timestamp(raw_time)
        if not is_within_15_minutes(scheduled_dt):
            continue
        filtered.append(format_departure(dep, station["name"]))
    if filtered:
        return {"stationName": station["name"], "departures": filtered}
    return None

@app.get("/departures")
async def get_departures(q: str | None = None):
    if not q or len(q) < 3:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "INVALID_QUERY",
                "message": "Search term must be at least 3 characters"
            }
        )

    all_stations = await get_stations()
    matches = matching_stations(all_stations, q)

    if not matches:
        return {
            "query": q,
            "matchedStations": 0,
            "message": "No matching stations found",
            "stations": []
        }

    
    tasks = [process_station(station) for station in matches]
    results = await asyncio.gather(*tasks)

    
    stations_output = [r for r in results if r is not None]

    if not stations_output:
        return {
            "query": q,
            "matchedStations": len(matches),
            "message": "No departures in the next 15 minutes for this search",
            "stations": []
        }

    return {
        "query": q,
        "matchedStations": len(matches),
        "stations": stations_output
    }