
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const ActiveResource = () => {
  const [resource, setResource] = useState({});
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    /* calculate seconds to end time and update that value in "seconds" state */
    async function fetchResource() {
      /* get the "active" resource // index.js -> app.get("/api/activeresource"... */
      const axiosRes = await axios.get("/api/activeresource");
      const resource = axiosRes.data;
      const timeToFinish = parseInt(resource.timeToFinish, 10);
      const elapsedTime = moment().diff(moment(resource.activationTime), "seconds");
      const updatedTimeToFinish = (timeToFinish * 60) - elapsedTime;

      /* if the time left is bigger than 0, the "seconds" state is updated with the new value */
      if (updatedTimeToFinish >= 0) {
        resource.timeToFinish = updatedTimeToFinish;
        setSeconds(updatedTimeToFinish);
      }

      setResource(resource);
    }

    fetchResource();
  }, [])


  /* called when state or prop is changed */   
  useEffect(() => {
    /* animate time on page every second - 1 */
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    /* remove animation (interval) when time < 0 */
    if (seconds < 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds])


  /* update resource to "complete" (called when button clicked) // index.js -> app.patch("/api/resources/:id" ... */
  const completeResource = () => {
    axios.patch("/api/resources", {...resource, status: "complete"})
      .then(_ => location.reload())
      .catch(_ => alert("Cannot complete the resource!"))
  }

  // verify resource
  const hasResource = resource && resource.id;


  return (
    <div className="active-resource">
      <h1 className="resource-name">
        {hasResource ? resource.title : "No Resource Active"}
      </h1>
      <div className="time-wrapper">
        { hasResource &&
          ( seconds > 0 ?
            <h2 className="elapsed-time">
              {seconds}
            </h2> :
            <h2 className="elapsed-time">
              <button
                onClick={completeResource}
                className="button is-success">
                Click and Done!
              </button>
            </h2>
          )
        }
      </div>
      {
        hasResource ?
          <Link href={`/resources/${resource.id}`}>
            <a className="button">
              Go to resource
            </a>
          </Link> :
          <Link href="/">
            <a className="button">
              Go to resources
            </a>
        </Link>
      }
    </div>
  )
}

export default ActiveResource;
