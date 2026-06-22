from datetime import datetime, timezone, timedelta
from zoneinfo import ZoneInfo


BELGIUM_TZ = ZoneInfo("Europe/Brussels")


def convert_timestamp(timestamp):
    return (
        datetime
        .fromtimestamp(int(timestamp), BELGIUM_TZ)
    )

def is_within_15_minutes(dt):
    now = datetime.now(BELGIUM_TZ)
    diff = (dt - now).total_seconds()
    return 0 <= diff <= 15 * 60

def calculate_actual_departure(scheduled_dt, delay_seconds):
    return scheduled_dt + timedelta(seconds=delay_seconds)




def format_departure(departure, station_name):

 
    raw_time = departure.get("time")
    scheduled_dt = convert_timestamp(raw_time)
    delay_seconds = int(departure.get("delay", 0))
    delay_minutes = delay_seconds // 60

    actual_dt = calculate_actual_departure(scheduled_dt,delay_seconds)
    cancelled = str(departure.get("canceled", "0")) == "1"
    vehicle_info = departure.get("vehicleinfo", {})
    train_number = vehicle_info.get("shortname") or departure.get("vehicle")

    return {
        "stationName": station_name,
        "trainNumber": train_number,
        "destination": (departure.get("direction")or departure.get("to") or departure.get("station")or "Unknown"),
        "scheduledDeparture": scheduled_dt.isoformat(),
        "actualDeparture": actual_dt.isoformat(),
        "delayMinutes": delay_minutes,
        "cancelled": cancelled
    }