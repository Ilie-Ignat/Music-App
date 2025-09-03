const db = require("../db");

exports.getAllArtists = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM artists");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getArtistById = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM artists WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Artist not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createArtist = async (req, res) => {
  try {
    const { name, monthly_listeners, genre } = req.body;
    const { rows } = await db.query(
      "INSERT INTO artists (name, monthly_listeners, genre) VALUES ($1, $2, $3) RETURNING *",
      [name, monthly_listeners, genre]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateArtist = async (req, res) => {
  try {
    const { name, monthly_listeners, genre } = req.body;
    const { rows } = await db.query(
      "UPDATE artists SET name = $1, monthly_listeners = $2, genre = $3 WHERE id = $4 RETURNING *",
      [name, monthly_listeners, genre, req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Artist not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteArtist = async (req, res) => {
  try {
    const { rowCount } = await db.query("DELETE FROM artists WHERE id = $1", [
      req.params.id,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({ error: "Artist not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
