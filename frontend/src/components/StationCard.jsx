import { FaMapMarkerAlt } from "react-icons/fa";
import DeparturesTable from "./DeparturesTable";

export default function StationCard({ station }) {
  const count = station.departures.length;

  return (
    <div className="stationCard">
      <h3 className="stationname">
        <FaMapMarkerAlt />
        {" "}
        {station.stationName}
        <span className="departureBadge">
          {count} {count === 1 ? "departure" : "departures"}
        </span>
      </h3>

      <DeparturesTable departures={station.departures} />
    </div>
  );
}