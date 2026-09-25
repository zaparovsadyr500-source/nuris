import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
import { useMemo, useRef, useState } from "react";
import "./App.css";

type Song = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  audioUrl: string;
};

const artists = [
  "Alem",
  "MiyaGi",
  "Jah Khalib",
  "Scriptonite",
  "Moldanazar",
  "The Weeknd",
  "Imagine Dragons",
  "Alan Walker",
  "Billie Eilish",
  "Ed Sheeran",
  "Dua Lipa",
  "Adele",
  "Post Malone",
  "OneRepublic",
  "Coldplay",
  "Maroon 5",
  "NF",
  "Avicii",
  "Tame Impala",
  "XXXTENTACION",
];

const genres = [
  "Pop",
  "Hip-Hop",
  "Rap",
  "Rock",
  "Electronic",
  "Chill",
  "R&B",
  "Lo-Fi",
];

const songs: Song[] = Array.from({ length: 500 }, (_, index) => {
  const artist = artists[index % artists.length];
  const genre = genres[index % genres.length];

  return {
    id: index + 1,
    title: `${artist} Music ${index + 1}`,
    artist,
    genre,
    audioUrl:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  };
});

export default function App() {
  const [search, setSearch] = useState("");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredSongs = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return songs;

    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(value) ||
        song.artist.toLowerCase().includes(value) ||
        song.genre.toLowerCase().includes(value)
    );
  }, [search]);

  const playSong = (song: Song) => {
    if (!audioRef.current) return;

    if (currentSong?.id === song.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    audioRef.current.src = song.audioUrl;
    audioRef.current.volume = volume;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));

    setCurrentSong(song);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const changeVolume = (value: number) => {
    setVolume(value);

    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  return (
    <div className="app">
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
      />

      <header className="header">
        <div className="logo">
          <span>🎵</span>
          MusicBox
        </div>

        <div className="searchBox">
          <span>🔎</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Музыка же артист изде..."
          />
        </div>

        <div className="headerCount">
          {songs.length} ыр
        </div>
      </header>

      <main>
        <section className="hero">
          <div>
            <p className="smallTitle">YOUR MUSIC</p>
            <h1>Музыка дүйнөсү 🎧</h1>
            <p>
              500 музыкадан каалаганыңды изде жана угуп көр.
            </p>
          </div>

          <div className="heroIcon">🎶</div>
        </section>

        <div className="content">
          <aside className="sidebar">
            <button className="menu active">🏠 Бардык музыка</button>
            <button className="menu">❤️ Favorites</button>
            <button className="menu">🔥 Популярдуу</button>
            <button className="menu">🆕 Жаңы музыка</button>

            <h3>Жанрлар</h3>

            {genres.map((genre) => (
              <button
                className="genre"
                key={genre}
                onClick={() => setSearch(genre)}
              >
                🎵 {genre}
              </button>
            ))}
          </aside>

          <section className="songsSection">
            <div className="sectionHeader">
              <div>
                <h2>Бардык ырлар</h2>
                <p>{filteredSongs.length} музыка табылды</p>
              </div>
            </div>

            <div className="songList">
              {filteredSongs.map((song) => {
                const favorite = favorites.includes(song.id);
                const playing = currentSong?.id === song.id && isPlaying;

                return (
                  <div
                    className={`song ${
                      playing ? "playing" : ""
                    }`}
                    key={song.id}
                  >
                    <div className="number">
                      {playing ? "🔊" : song.id}
                    </div>

                    <div className="cover">
                      🎵
                    </div>

                    <div className="songInfo">
                      <strong>{song.title}</strong>
                      <span>{song.artist}</span>
                    </div>

                    <span className="genreTag">
                      {song.genre}
                    </span>

                    <button
                      className="heart"
                      onClick={() => toggleFavorite(song.id)}
                    >
                      {favorite ? "❤️" : "🤍"}
                    </button>

                    <button
                      className="playButton"
                      onClick={() => playSong(song)}
                    >
                      {playing ? "⏸" : "▶"}
                    </button>
                  </div>
                );
              })}
            </div>

            {filteredSongs.length === 0 && (
              <div className="empty">
                😔 Музыка табылган жок
              </div>
            )}
          </section>
        </div>
      </main>

      {currentSong && (
        <div className="player">
          <div className="nowPlaying">
            <div className="miniCover">🎵</div>

            <div>
              <strong>{currentSong.title}</strong>
              <span>{currentSong.artist}</span>
            </div>
          </div>

          <button
            className="mainPlay"
            onClick={() => playSong(currentSong)}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <div className="volume">
            🔊
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) =>
                changeVolume(Number(e.target.value))
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}