import { useEffect, useState } from "react";

import "./entries.css";
function Entries() {
  const [entries, setEntries] = useState([]);
  const [entrySerial, setEntrySerial] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    // console.log("effect hook triggered");
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.publicapis.org/entries");
        const data = await res.json();
        setEntries(data.entries.slice(entrySerial, entrySerial + 10));
      } catch (err) {
        alert("failed to load data");
        console.error(err);
      }
    };

    fetchData();
  }, [entrySerial]);

  function showNext() {
    setEntrySerial((entrySerial) => entrySerial + 10);
    setPageNo((pageNo) => pageNo + 1);
  }
  function showPrevious() {
    setEntrySerial((entrySerial) => entrySerial - 10);
    setPageNo((pageNo) => pageNo - 1);
  }

  return (
    <div className="entries__output">
      {/* {console.log("rendered")} */}
      <table className="entry__tbl">
        <caption>Entry Table</caption>
        <thead>
          <th>API</th>
          <th>Description</th>
          <th>Category</th>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.API}</td>
              <td>{entry.Description}</td>
              <td>{entry.Category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button__pageNo">
        <div className="btn">
          <button onClick={showNext} className="next__btn">
            Next Page
          </button>
          {entrySerial >= 10 ? (
            <button onClick={showPrevious} className="next__btn">
              Previous Page
            </button>
          ) : (
            <></>
          )}
        </div>
        <div>Page no: {pageNo}</div>
      </div>
    </div>
  );
}

export default Entries;
