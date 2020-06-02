import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-dropdown";
import parse from "html-react-parser";
import { fetchShow } from "./api/fetchShow";

import { formatSeasons } from "./utils/formatSeasons";

import Episodes from "./components/Episodes";
import "./styles.css";

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [showText, setShowText] = useState("");
  const [error, setError] = useState("");
  const [showApi, setShowApi] = useState(
    "https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes"
  );
  const [selectedSeason, setSelectedSeason] = useState("");
  const episodes = seasons[selectedSeason] || [];

  useEffect(() => {
    fetchShow(showApi)
      .then((res) => {
        setShow(res.data);
        setError("");
        setSeasons(formatSeasons(res.data._embedded.episodes));
      })
      .catch((error) => {
        console.log("fetchig error", error);
        setError(error);
      });
  }, [showApi]);

  const handleChanges = (e) => {
    setShowText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const showWords = showText.split(" ").join("-").toLowerCase();
    setShowApi(
      `https://api.tvmaze.com/singlesearch/shows?q=${showWords}&embed=episodes`
    );
    console.log(showWords);
  };

  const handleSelect = (e) => {
    setSelectedSeason(e.value);
  };

  if (!show) {
    return <h2>Fetching data...</h2>;
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          id="show"
          type="text"
          name="show"
          placeholder="Enter TV show"
          value={showText}
          onChange={handleChanges}
        />
      </form>
      {error ? (
        <p style={{ color: "red" }}>
          We do not have this TV Show, please, enter another one.
        </p>
      ) : null}
      <img className="poster-img" src={show.image.original} alt={show.name} />
      <h1>{show.name}</h1>
      {parse(show.summary)}
      <Dropdown
        options={Object.keys(seasons)}
        onChange={handleSelect}
        value={selectedSeason || "Select a season"}
        placeholder="Select an option"
      />
      <Episodes episodes={episodes} />
    </div>
  );
}
