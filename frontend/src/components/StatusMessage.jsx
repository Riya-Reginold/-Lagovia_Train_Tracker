import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineTrain } from "react-icons/md";
import { FaRegFaceSadTear } from "react-icons/fa6";

export default function StatusMessage({
  matchedStations,
  totalDepartures,
  message
}) {
  return (
    <>
       {matchedStations > 0 && (
        <p className="summaryLine">
          Searched {matchedStations} matched station(s) —  found {totalDepartures} departure(s) within 15 minutes
        </p>
      )}

      {message && (
        <div className="infoBox">
          {
            message === "No matching stations found"
              ? <FaRegFaceSadTear />
              : <FaInfoCircle />
          }

          {" "}
          {message}
        </div>
      )}
    </>
  );
}