import { useEffect, useState } from "react";

function Entries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("https://api.publicapis.org/entries")
      .then((res) => res.json())
      .then((data) => {
        setEntries(data.entries.slice(0, 10));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="entries__output">
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>{entry.Description}</li>
        ))}
      </ul>
    </div>
  );
}

export default Entries;
