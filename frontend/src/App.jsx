import { useState } from "react";
import { MdTrain } from "react-icons/md";
import { FaInfoCircle,FaSpinner } from "react-icons/fa";
import SearchBar from "./components/SearchBar";
import StatusMessage from "./components/StatusMessage";
import StationCard from "./components/StationCard";
import { fetchDepartures } from "./api/api";
import "./styles.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [stations, setStations] = useState([]);
  const [matchedStations, setMatchedStations] = useState(0);
  const [totalDepartures, setTotalDepartures] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setMessage("")

    try {
      const data = await fetchDepartures(query);

      setStations(data.stations || []);
      setMatchedStations(data.matchedStations || 0);

      const total = (data.stations || []).reduce(
        (sum, s) => sum + s.departures.length, 0
      );
      setTotalDepartures(total);

      if (data.message) {
        setMessage(data.message);
      }

    } catch (err) {
      setStations([]);
      setMatchedStations(0);
      setTotalDepartures(0);

      setError(
        err.detail?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container">

      <h1 className="title">
        <MdTrain className="trainIcon" />
        Lagovia Train Tracker
      </h1>

      <div className="infoBox">
        <FaInfoCircle />
        {" "}
        Showing departures scheduled within
        the next 15 minutes.
      </div>
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
    
      />


      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {!error && (
        <StatusMessage
          matchedStations={matchedStations}
          totalDepartures={totalDepartures}
          message={message}
        />
      )}
      

     {loading && (
      <p className="loading">
        <FaSpinner className="spin" />
         {" "}Loading departures...
     </p>
    )}

      {stations.map((station) => (
        <StationCard
          key={station.stationName}
          station={station}
        />
      ))}

    </div>
  );
}