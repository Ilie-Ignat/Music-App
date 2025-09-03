import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Artists.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    monthly_listeners: "",
    genre: "",
  });

  const fetchArtists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/artists");
      setArtists(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/artists", formData);
      fetchArtists();
      setFormData({ name: "", monthly_listeners: "", genre: "" });
    } catch (error) {
      console.error("Error creating artist:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/artists/${id}`);
      fetchArtists();
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/artists/${id}`, updatedData);
      fetchArtists();
    } catch (error) {
      console.error("Error updating artist:", error);
    }
  };

  return (
    <div className="artists-container">
      <h2 className="artists-title">Artists</h2>
      <form className="artists-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Artist Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="monthly_listeners"
          placeholder="Monthly Listeners"
          value={formData.monthly_listeners}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Artist</button>
      </form>

      <div>
        <h3>Artist List</h3>
        <ul className="artists-list">
          {artists.map((artist) => (
            <li key={artist.id} className="artist-item">
              <div className="artist-info">
                {artist.name} - {artist.genre} ({artist.monthly_listeners}{" "}
                listeners) (id: {artist.id})
              </div>
              <div className="artist-actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(artist.id)}
                >
                  Delete
                </button>
                <button
                  className="update-btn"
                  onClick={() => {
                    const newName = prompt("Enter new name:", artist.name);
                    const newListeners = prompt(
                      "Enter new listeners:",
                      artist.monthly_listeners
                    );
                    const newGenre = prompt("Enter new genre:", artist.genre);
                    if (newName && newListeners && newGenre) {
                      handleUpdate(artist.id, {
                        name: newName,
                        monthly_listeners: parseInt(newListeners),
                        genre: newGenre,
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

export default Artists;
