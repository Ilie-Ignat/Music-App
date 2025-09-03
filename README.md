# Music Database

A full-stack app created utilizing **React**, **PostgreSQL**, **Express**, **Node.JS** and **Axios**. An application capable of storing music information.

## Table of Contents

- [About](#about)
- [Prerequisits](#prerequisits)
- [Initialization](#Initialization)
- [Usage](#usage)

## About

- This application allows users to perform complete CRUD (Create, Read, Update, Delete) operations on artists, albums, and songs through an intuitive user interface. The project primarily demonstrates modern web development practices with a React frontend communicating with a RESTful API backend, which connects to a PostgreSQL database for data storage.

## Prerequisits

1. Visual Studio Code
2. The Project's files
3. pgAdmin 4
4. node.js

## Initialization

- Database table | pgAdmin 4 - Open pgAdmin, create a new database and execute the following command

          -- Artists table
          CREATE TABLE IF NOT EXISTS artists (
              id SERIAL PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              monthly_listeners INT DEFAULT 0,
              genre VARCHAR(100)
          );

          -- Albums table
          CREATE TABLE IF NOT EXISTS albums (
              id SERIAL PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              artist_id INT,
              release_year INT,
              listens INT DEFAULT 0,
              CONSTRAINT fk_artist FOREIGN KEY (artist_id)
                  REFERENCES artists(id)
                  ON DELETE CASCADE
          );

          -- Songs table
          CREATE TABLE IF NOT EXISTS songs (
              id SERIAL PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              release_year INT,
              album_id INT,
              CONSTRAINT fk_album FOREIGN KEY (album_id)
                  REFERENCES albums(id)
                  ON DELETE SET NULL
          );

- Update Database credentials

  - in the db.js file update the **user**, **host**, **database**, **password** and **port** values

- Starting the server | VS Code
  1. Open the project's folder with the files in VS Code
  2. Open the terminal and run
     - cd server
     - node server.js
  3. Open another terminal and run
     - npm start

## Usage

- Subsequently to the successful launch of the application, the user should see 3 buttons
  1. Artists
     Pressing the artists button will land the user on the Artists page, where they can add an artist by their name, their music genre and monthly listeners.
  2. Albums
     Pressing the albums button, the user will be able to then add an album using the album's name, the artist's id (visible on the artist list), the year of release and the amount of times the album has been listened to.
  3. Songs
     Pressing the songs button, the user will be able to add songs to the database using the song's name, the year of release and the respective album's id (visible on the album list).
