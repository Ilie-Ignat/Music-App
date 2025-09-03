import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Albums.css";
import "./Albums.css";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    artist_id: "",
    release_year: "",
    listens: "",
  });

  const fetchAlbums = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/albums");
      setAlbums(response.data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/albums", formData);
      fetchAlbums();
      setFormData({ name: "", artist_id: "", release_year: "", listens: "" });
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/albums/${id}`);
      fetchAlbums();
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/albums/${id}`, updatedData);
      fetchAlbums();
    } catch (error) {
      console.error("Error updating album:", error);
    }
  };

  return (
    <div className="albums-container">
      <h2 className="albums-title">Albums</h2>
      <form className="albums-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Album Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="artist_id"
          placeholder="Artist ID"
          value={formData.artist_id}
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
          name="listens"
          placeholder="Number of Listens"
          value={formData.listens}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Album</button>
      </form>

      <div>
        <h3 className="albums-title">Album List</h3>
        <ul className="albums-list">
          {albums.map((album) => (
            <li key={album.id} className="album-item">
              <div className="album-info">
                {album.name} ({album.release_year}) - Artist:{" "}
                {album.artist_name} - Listens: {album.listens} (id: {album.id})
              </div>
              <div className="album-actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(album.id)}
                >
                  Delete
                </button>
                <button
                  className="update-btn"
                  onClick={() => {
                    const newName = prompt("Enter new name:", album.name);
                    const newArtist = prompt(
                      "Enter new artist ID:",
                      album.artist_id
                    );
                    const newYear = prompt(
                      "Enter new release year:",
                      album.release_year
                    );
                    const newListens = prompt(
                      "Enter new listens count:",
                      album.listens
                    );
                    if (newName && newArtist && newYear && newListens) {
                      handleUpdate(album.id, {
                        name: newName,
                        artist_id: newArtist,
                        release_year: parseInt(newYear),
                        listens: parseInt(newListens),
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

export default Albums;
