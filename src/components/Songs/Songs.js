import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Songs.css";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    release_year: "",
    album_id: "",
  });

  const fetchSongs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/songs");
      setSongs(response.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/songs", formData);
      fetchSongs();
      setFormData({ name: "", release_year: "", album_id: "" });
    } catch (error) {
      console.error("Error creating song:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/songs/${id}`);
      fetchSongs();
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/songs/${id}`, updatedData);
      fetchSongs();
    } catch (error) {
      console.error("Error updating song:", error);
    }
  };

  return (
    <div className="songs-container">
      <h2 className="songs-title">Songs</h2>
      <form className="songs-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Song Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="release_year"
          placeholder="Release Year"
          value={formData.release_year}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="album_id"
          placeholder="Album ID"
          value={formData.album_id}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Song</button>
      </form>

      <div>
        <h3 className="songs-title">Song List</h3>
        <ul className="songs-list">
          {songs.map((song) => (
            <li key={song.id} className="song-item">
              <div className="song-info">
                {song.name} ({song.release_year}) - Album: {song.album_name} by:{" "}
                {song.artist_name}
              </div>
              <div className="song-actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(song.id)}
                >
                  Delete
                </button>
                <button
                  className="update-btn"
                  onClick={() => {
                    const newName = prompt("Enter new name:", song.name);
                    const newYear = prompt(
                      "Enter new release year:",
                      song.release_year
                    );
                    const newAlbum = prompt(
                      "Enter new album ID:",
                      song.album_id
                    );
                    if (newName && newYear && newAlbum) {
                      handleUpdate(song.id, {
                        name: newName,
                        release_year: parseInt(newYear),
                        album_id: newAlbum,
                      });
                    }
                  }}
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Songs;
