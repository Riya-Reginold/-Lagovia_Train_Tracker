import {
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";

export default function DeparturesTable({
  departures
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Train</th>
          <th>Destination</th>
          <th>Scheduled</th>
          <th>Delay</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {departures.map((d, i) => (
          <tr key={i}>
            <td>{d.trainNumber}</td>
            <td>{d.destination}</td>
            <td>
           {new Date(
           d.scheduledDeparture
            ).toLocaleTimeString()}
          </td>

          <td>
           {d.delayMinutes > 0 ? (
           <span className="delay">
            + {d.delayMinutes} min
          </span>
         ) : (
          <span className="OnTime">
            On Time
         </span>
         )}
        </td>

            <td>
             {d.cancelled ? (
              <span className="statusCancelled">
              <FaTimesCircle />
              {" "}
             Cancelled
              </span>
              ) : (
           <span className="statusRunning">
           <FaCheckCircle />
            {" "}
           Running
        </span>
         )}
        </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}