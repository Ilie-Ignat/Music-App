const db = require("../db");

exports.getAllAlbums = async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT albums.*, artists.name as artist_name FROM albums JOIN artists ON albums.artist_id = artists.id"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAlbumById = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM albums WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Album not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAlbum = async (req, res) => {
  try {
    const { name, artist_id, release_year, listens } = req.body;
    const { rows } = await db.query(
      "INSERT INTO albums (name, artist_id, release_year, listens) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, artist_id, release_year, listens]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAlbum = async (req, res) => {
  try {
    const { name, artist_id, release_year, listens } = req.body;
    const { rows } = await db.query(
      "UPDATE albums SET name = $1, artist_id = $2, release_year = $3, listens = $4 WHERE id = $5 RETURNING *",
      [name, artist_id, release_year, listens, req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Album not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    const { rowCount } = await db.query("DELETE FROM albums WHERE id = $1", [
      req.params.id,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({ error: "Album not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
