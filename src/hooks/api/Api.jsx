import { useEffect, useState } from "react";

const GamesData = ({ genre }) => {
  const [games, setGames] = useState([]);
  const [category, setCategory] = useState([]);

  //Llamo a la API y guardo su URL en una variable de entorno
  const fetchGamesData = () => {
    fetch(process.env.REACT_APP_API_URL, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchGamesData();
  }, []);

  //Objecto para mostrar titulo sin modificar URL
  useEffect(() => {
    const genres = {
      shooters: "Shooter",
      sports: "Sports",
      adventure: "MMORPG",
    };

    if (genre) {
      const filteredGames = games.filter((game) => game.genre === genres[genre]);
      setCategory(filteredGames);
    } else {
      setCategory(games);
    }
  }, [genre, games]);

  return { games, category };
};

export default GamesData;
