import { useEffect, useState } from "react";

import "./entries.css";
function Entries() {
  const [entries, setEntries] = useState([]);
  const [entrySerial, setEntrySerial] = useState(0);
  useEffect(() => {
    // console.log("effect hook triggered");
    fetch("https://api.publicapis.org/entries")
      .then((res) => res.json())
      .then((data) => {
        setEntries(data.entries.slice(entrySerial, entrySerial + 10));

        // console.log(`${entries[0]}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [entrySerial]);

  function showNext() {
    setEntrySerial((entrySerial) => entrySerial + 10);
  }
  function showPrevious() {
    setEntrySerial((entrySerial) => entrySerial - 10);
  }

  return (
    <div className="entries__output">
      {console.log("rendered")}
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>{entry.Description}</li>
        ))}
      </ul>
      <button onClick={showNext} className="next__btn">
        Next Page
      </button>
      {(entrySerial >= 10) ? (
        <button onClick={showPrevious} className="next__btn">
        Previous Page
      </button>) : <></>}
    </div>
  );
}

export default Entries;
