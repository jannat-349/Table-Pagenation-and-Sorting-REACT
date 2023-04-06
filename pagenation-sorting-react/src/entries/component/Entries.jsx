import { useEffect, useState } from "react";

import "./entries.css";
function Entries() {
  const [entries, setEntries] = useState([]);
  const [entrySerial, setEntrySerial] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState("");
  useEffect(() => {
    fetchData();
  }, [entrySerial]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/products/");
      const data = await res.json();
      // console.log([...data]);
      setEntries([...data].slice(entrySerial, entrySerial + 10));
      setState("ogochalo");
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

  function sortEntries() {
    if (state === "ogochalo" || state === "descending") {
      setEntries((entries) =>
        entries.sort((entry_1, entry_2) => {
          return entry_1.name > entry_2.name ? 1 : -1;
        })
      );
      setState("ascending");
    } else if (state === "ascending") {
      setEntries((entries) =>
        entries.sort((entry_1, entry_2) => {
          return entry_1.name < entry_2.name ? 1 : -1;
        })
      );
      setState("descending");
    }
  }

  return (
    <div className="entries__output">
      <table className="entry__tbl">
        <caption>Entry Table</caption>
        <thead>
          <tr>
            <th>
              Name
              {state === "ogochalo" || state === "descending" ? (
                <button onClick={sortEntries} className="sort__btn">
                  Ascending Sort
                </button>
              ) : (
                <button onClick={sortEntries} className="sort__btn">
                  Descending Sort
                </button>
              )}
            </th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {[...entries].map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.price}</td>
              <td>{entry.quantity}</td>
              <td>{entry.unit}</td>
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
