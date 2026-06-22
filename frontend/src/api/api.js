export async function fetchDepartures(query) {
  const res = await fetch(
    `http://localhost:8000/departures?q=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
}