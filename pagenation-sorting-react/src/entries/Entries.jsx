import { useEffect, useState } from "react";

import "./entries.css";
function Entries() {
  const [entries, setEntries] = useState([]);
  const [entrySerial, setEntrySerial] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState("");
  useEffect(() => {
    const storedEntries = localStorage.getItem("entriedData");
    if (storedEntries) {
      setEntries(
        JSON.parse(storedEntries).entries.slice(entrySerial, entrySerial + 10)
      );
      setState("ogochalo");
    } else {
      fetchData();
    }
  }, [entrySerial]);

  
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://api.publicapis.org/entries");
      const data = await res.json();
      setEntries(data.entries.slice(entrySerial, entrySerial + 10));
      setState("ogochalo");
      localStorage.setItem("entriedData", JSON.stringify(data));
      // console.log(entries.state);
    } catch (err) {
      alert("failed to load data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  function showNext() {
    setEntrySerial((entrySerial) => entrySerial + 10);
    setPageNo((pageNo) => pageNo + 1);
  }
  function showPrevious() {
    setEntrySerial((entrySerial) => entrySerial - 10);
    setPageNo((pageNo) => pageNo - 1);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function sort__entries() {
    // setIsLoading(true);
    if (state === "ogochalo" || state === "descending") {
      setEntries((entries) =>
        entries.sort((entry_1, entry_2) => {
          return entry_1.Description > entry_2.Description ? 1 : -1;
        })
      );
      //   console.log(entries);
      // entries.sort();
      setState("ascending");
    } else if (state === "ascending") {
      setEntries((entries) =>
        entries.sort((entry_1, entry_2) => {
          return entry_1.Description < entry_2.Description ? 1 : -1;
        })
      );
      setState("descending");
      // setEntries((entries) => entries
      // .sort((a,b) => b.Description - a.Description));
    }
  }

  return (
    <div className="entries__output">
      {/* {console.log("rendered")} */}
      <table className="entry__tbl">
        <caption>Entry Table</caption>
        <thead>
          <tr>
            <th>
              Description
              {state === "ogochalo" || state === "descending" ? (
                <button onClick={sort__entries} className="sort__btn">
                  Ascending Sort
                </button>
              ) : (
                <button onClick={sort__entries} className="sort__btn">
                  Descending Sort
                </button>
              )}
            </th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
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
