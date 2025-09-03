const db = require("../db");

exports.getAllSongs = async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT songs.*, albums.name as album_name, artists.name as artist_name FROM songs JOIN albums ON songs.album_id = albums.id JOIN artists ON albums.artist_id = artists.id"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSongById = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM songs WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSong = async (req, res) => {
  try {
    const { name, release_year, album_id } = req.body;
    const { rows } = await db.query(
      "INSERT INTO songs (name, release_year, album_id) VALUES ($1, $2, $3) RETURNING *",
      [name, release_year, album_id]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSong = async (req, res) => {
  try {
    const { name, release_year, album_id } = req.body;
    const { rows } = await db.query(
      "UPDATE songs SET name = $1, release_year = $2, album_id = $3 WHERE id = $4 RETURNING *",
      [name, release_year, album_id, req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    const { rowCount } = await db.query("DELETE FROM songs WHERE id = $1", [
      req.params.id,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
