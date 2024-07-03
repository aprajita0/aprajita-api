import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState({ song: '', artist: '', genre: '', releaseDate: '' });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/music');
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching the songs', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSong({ ...song, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateSong(currentId, song);
    } else {
      await addSong(song);
    }
    setSong({ song: '', artist: '', genre: '', releaseDate: '' });
    setEditing(false);
    setCurrentId(null);
    fetchSongs();
  };

  const addSong = async (newSong) => {
    try {
      await axios.post('http://localhost:5000/music', newSong);
    } catch (error) {
      console.error('Error adding the song', error);
    }
  };

  const updateSong = async (id, updatedSong) => {
    try {
      await axios.put(`http://localhost:5000/music/${id}`, updatedSong);
    } catch (error) {
      console.error('Error updating the song', error);
    }
  };

  const deleteSong = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/music/${id}`);
      fetchSongs();
    } catch (error) {
      console.error('Error deleting the song', error);
    }
  };

  const editSong = (song) => {
    setEditing(true);
    setCurrentId(song._id);
    setSong(song);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Music API</h1>
        <p>
          You can test the CRUD Features below, you can update, delete and add a song into the database. The song list contains all the data from the music database created in MongoDB. To test this on postman go to use the link https://mern-aprajitas-api.vercel.app/, to test the get, update and delete functions add /music to the url.
        </p>
        
        <h2>{editing ? 'Edit Song' : 'Add a New Song'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="song"
            value={song.song}
            onChange={handleInputChange}
            placeholder="Song Name"
            required
          />
          <input
            type="text"
            name="artist"
            value={song.artist}
            onChange={handleInputChange}
            placeholder="Artist"
            required
          />
          <input
            type="text"
            name="genre"
            value={song.genre}
            onChange={handleInputChange}
            placeholder="Genre"
            required
          />
          <input
            type="date"
            name="releaseDate"
            value={song.releaseDate}
            onChange={handleInputChange}
            placeholder="Release Date"
          />
          <button type="submit">{editing ? 'Update Song' : 'Add Song'}</button>
        </form>
        <h2>Song List from the Database</h2>
        <div className="songs-container">
          {songs.map((song) => (
            <div key={song._id} className="song-card">
              <p><strong>Song:</strong> {song.song}</p>
              <p><strong>Artist:</strong> {song.artist}</p>
              <p><strong>Genre:</strong> {song.genre}</p>
              <p><strong>Release Date:</strong> {song.releaseDate ? new Date(song.releaseDate).toLocaleDateString() : 'N/A'}</p>
              <button className="edit-button" onClick={() => editSong(song)}>Edit</button>
              <button className="delete-button" onClick={() => deleteSong(song._id)}>Delete</button>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
