import { useMemo, useState } from "react";
import "./app.css";

type Song = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  cover: string;
  audio: string;
};

const songs: Song[] = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    genre: "Pop",
    duration: "3:20",
    cover:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
    audio:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Midnight",
    artist: "Drake",
    genre: "Hip-Hop",
    duration: "3:45",
    cover:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
    audio:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Dreams",
    artist: "Taylor Swift",
    genre: "Pop",
    duration: "3:12",
    cover:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=80",
    audio:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: 4,
    title: "Ocean Eyes",
    artist: "Billie Eilish",
    genre: "Chill",
    duration: "3:40",
    cover:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80",
    audio:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: 5,
    title: "Calm Down",
    artist: "Ed Sheeran",
    genre: "Chill",
    duration: "3:28",
    cover:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
    audio:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    id: 6,
    title: "Night Drive",
    artist: "VIBEFY",
    genre: "Electronic",
    duration: "4:02",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
    audio:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
];

const playlists = [
  {
    title: "Хиты 2024",
    text: "Топ треки этого года",
    color: "purple",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Чиллаут",
    text: "Расслабляющая музыка",
    color: "pink",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Тренировка",
    text: "Энергия для спорта",
    color: "blue",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Фокус",
    text: "Музыка для концентрации",
    color: "green",
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1000&q=80",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playing, setPlaying] = useState(false);

  const filteredSongs = useMemo(() => {
    if (!search.trim()) return songs;

    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase()) ||
        song.genre.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const playSong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setPlaying(!playing);
    } else {
      setCurrentSong(song);
      setPlaying(true);
    }
  };

  const goSearch = (value = "") => {
    setSearch(value);
    setPage("search");
  };

  const favoriteSongs = songs.filter((song) => favorites.includes(song.id));

  return (
    <div className="app">
      <div className="glow glow1"></div>
      <div className="glow glow2"></div>
      <div className="glow glow3"></div>

      <header className="header">
        <div className="logo" onClick={() => setPage("home")}>
          <span className="logoShape"></span>
          <span>VIBEFY</span>
        </div>

        <nav>
          <button
            className={page === "home" ? "navBtn active" : "navBtn"}
            onClick={() => setPage("home")}
          >
            ⌂ <span>Главная</span>
          </button>

          <button
            className={page === "search" ? "navBtn active" : "navBtn"}
            onClick={() => setPage("search")}
          >
            🔎 <span>Поиск</span>
          </button>

          <button
            className={page === "favorites" ? "navBtn active" : "navBtn"}
            onClick={() => setPage("favorites")}
          >
            ♥ <span>Избранное</span>
          </button>

          <button
            className={page === "recommendations" ? "navBtn active" : "navBtn"}
            onClick={() => setPage("recommendations")}
          >
            ✦ <span>Рекомендации</span>
          </button>
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <section className="hero">
              <div className="heroText">
                <h1>
                  Добро пожаловать в{" "}
                  <span className="gradientText">VIBEFY</span>
                </h1>

                <p>Открывай новую музыку каждый день</p>

                <div className="heroButtons">
                  <button onClick={() => setPage("search")}>
                    🔎 Найти музыку
                  </button>

                  <button onClick={() => setPage("favorites")}>
                    ♥ Избранное
                  </button>

                  <button onClick={() => setPage("recommendations")}>
                    ✦ Рекомендации
                  </button>
                </div>
              </div>
            </section>

            <section className="playlistSection">
              <h2 className="sectionTitle">ПОПУЛЯРНЫЕ ПЛЕЙЛИСТЫ</h2>

              <div className="playlistGrid">
                {playlists.map((playlist, index) => (
                  <div
                    className={`playlistCard ${playlist.color}`}
                    key={index}
                  >
                    <img src={playlist.image} alt={playlist.title} />

                    <div className="playlistInfo">
                      <h3>{playlist.title}</h3>
                      <p>{playlist.text}</p>

                      <button
                        className="playCircle"
                        onClick={() => playSong(songs[index])}
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="tracksSection">
              <h2 className="sectionTitle">ПОПУЛЯРНЫЕ ТРЕКИ</h2>

              <div className="trackList">
                {songs.map((song) => (
                  <TrackCard
                    key={song.id}
                    song={song}
                    favorite={favorites.includes(song.id)}
                    playing={currentSong?.id === song.id && playing}
                    onFavorite={() => toggleFavorite(song.id)}
                    onPlay={() => playSong(song)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {page === "search" && (
          <section className="page">
            <h1 className="pageTitle">
              Найди <span className="gradientText">свой трек</span>
            </h1>

            <p className="pageSubtitle">Ищи среди миллионов песен</p>

            <div className="bigSearch">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Название песни, исполнитель..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setPage("search");
                  }
                }}
              />

              <button onClick={() => setPage("search")}>🔎</button>
            </div>

            <div className="trySearch">
              <h2>Попробуй искать:</h2>

              <div className="tags">
                {[
                  "The Weeknd",
                  "Drake",
                  "Taylor Swift",
                  "Billie Eilish",
                  "Ed Sheeran",
                ].map((name) => (
                  <button key={name} onClick={() => goSearch(name)}>
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div className="results">
              <h2>Результаты поиска</h2>

              {filteredSongs.length === 0 ? (
                <div className="empty">
                  <span>🎵</span>
                  <h3>Ничего не найдено</h3>
                  <p>Попробуй другое название или исполнителя</p>
                </div>
              ) : (
                <div className="trackList">
                  {filteredSongs.map((song) => (
                    <TrackCard
                      key={song.id}
                      song={song}
                      favorite={favorites.includes(song.id)}
                      playing={currentSong?.id === song.id && playing}
                      onFavorite={() => toggleFavorite(song.id)}
                      onPlay={() => playSong(song)}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {page === "favorites" && (
          <section className="page favoritePage">
            <div className="bigFavoriteIcon">♥</div>

            <h1 className="pageTitle">
              <span className="gradientText">Избранное</span>
            </h1>

            <p className="count">{favoriteSongs.length} треков</p>

            {favoriteSongs.length === 0 ? (
              <div className="empty favoriteEmpty">
                <div>♡</div>
                <h3>Пока ничего нет</h3>
                <p>Добавляй любимые треки в избранное</p>
              </div>
            ) : (
              <div className="trackList">
                {favoriteSongs.map((song) => (
                  <TrackCard
                    key={song.id}
                    song={song}
                    favorite={true}
                    playing={currentSong?.id === song.id && playing}
                    onFavorite={() => toggleFavorite(song.id)}
                    onPlay={() => playSong(song)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {page === "recommendations" && (
          <section className="page recommendations">
            <div className="recommendIcon">✦</div>

            <h1 className="pageTitle">
              <span className="gradientText">Рекомендации</span>
            </h1>

            <p className="pageSubtitle">
              Персональные рекомендации на основе твоих вкусов
            </p>

            <div className="recommendBox">
              <h2>✨ Для тебя</h2>
              <p>Мы подобрали музыку, которая может тебе понравиться.</p>
            </div>

            <div className="trackList">
              {songs.slice(2, 6).map((song) => (
                <TrackCard
                  key={song.id}
                  song={song}
                  favorite={favorites.includes(song.id)}
                  playing={currentSong?.id === song.id && playing}
                  onFavorite={() => toggleFavorite(song.id)}
                  onPlay={() => playSong(song)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {currentSong && (
        <div className="player">
          <img src={currentSong.cover} alt={currentSong.title} />

          <div className="playerInfo">
            <strong>{currentSong.title}</strong>
            <span>{currentSong.artist}</span>
          </div>

          <button
            className="playerButton"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? "❚❚" : "▶"}
          </button>

          <div className="playerProgress">
            <div className={playing ? "progress active" : "progress"}></div>
          </div>
        </div>
      )}
    </div>
  );
}

type TrackProps = {
  song: Song;
  favorite: boolean;
  playing: boolean;
  onFavorite: () => void;
  onPlay: () => void;
};

function TrackCard({
  song,
  favorite,
  playing,
  onFavorite,
  onPlay,
}: TrackProps) {
  return (
    <div className="trackCard">
      <img src={song.cover} alt={song.title} />

      <div className="trackData">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
        <small>
          {song.genre} • {song.duration}
        </small>
      </div>

      <button
        className={favorite ? "heart activeHeart" : "heart"}
        onClick={onFavorite}
      >
        {favorite ? "♥" : "♡"}
      </button>

      <button className="trackPlay" onClick={onPlay}>
        {playing ? "❚❚" : "▶"}
      </button>
    </div>
  );
}

export default App;
import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

type Page = "home" | "search" | "favorites" | "recommend";

type Track = {
  id: number;
  title: string;
  artist: string;
  category: string;
  gradient: string;
};

const tracks: Track[] = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    category: "Хиты 2024",
    gradient: "purple",
  },
  {
    id: 2,
    title: "God's Plan",
    artist: "Drake",
    category: "Чиллаут",
    gradient: "pink",
  },
  {
    id: 3,
    title: "Cruel Summer",
    artist: "Taylor Swift",
    category: "Тренировка",
    gradient: "cyan",
  },
  {
    id: 4,
    title: "Lovely",
    artist: "Billie Eilish",
    category: "Фокус",
    gradient: "green",
  },
  {
    id: 5,
    title: "DÁKITI",
    artist: "Bad Bunny",
    category: "Вечеринка",
    gradient: "orange",
  },
  {
    id: 6,
    title: "Perfect",
    artist: "Ed Sheeran",
    category: "Романтика",
    gradient: "red",
  },
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [current, setCurrent] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Избранное сактоо
  useEffect(() => {
    const saved = localStorage.getItem("vibefy-favorites");

    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "vibefy-favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // Fake progress
  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          setPlaying(false);
          return 0;
        }

        return old + 1;
      });
    }, 700);

    return () => clearInterval(timer);
  }, [playing]);

  const filteredTracks = useMemo(() => {
    return tracks.filter(
      (track) =>
        track.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        track.artist
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search]);

  const favoriteTracks = tracks.filter((track) =>
    favorites.includes(track.id)
  );

  function toggleFavorite(id: number) {
    setFavorites((old) =>
      old.includes(id)
        ? old.filter((item) => item !== id)
        : [...old, id]
    );
  }

  function playTrack(track: Track) {
    setCurrent(track);
    setPlaying(true);
    setProgress(0);

    // Эгер public/music папкасына mp3 койсоң,
    // бул жерден чыныгы музыка ойнойт.
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(`/music/song${track.id}.mp3`);
    audioRef.current = audio;

    audio.play().catch(() => {
      // mp3 жок болсо интерфейстеги player иштей берет
    });
  }

  function pauseTrack() {
    setPlaying(false);

    if (audioRef.current) {
      audioRef.current.pause();
    }
  }

  function nextTrack() {
    if (!current) {
      playTrack(tracks[0]);
      return;
    }

    const index = tracks.findIndex(
      (track) => track.id === current.id
    );

    const next = tracks[(index + 1) % tracks.length];

    playTrack(next);
  }

  function previousTrack() {
    if (!current) {
      playTrack(tracks[0]);
      return;
    }

    const index = tracks.findIndex(
      (track) => track.id === current.id
    );

    const previous =
      tracks[
        index === 0
          ? tracks.length - 1
          : index - 1
      ];

    playTrack(previous);
  }

  function searchArtist(name: string) {
    setSearch(name);
    setPage("search");
  }

  return (
    <div className="app">

      <div className="bg bg1"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>

      {/* HEADER */}
      <header className="header">

        <div
          className="logo"
          onClick={() => setPage("home")}
        >
          <span className="logo-shape"></span>
          VIBEFY
        </div>

        <nav>
          <button
            className={page === "home" ? "nav-active" : ""}
            onClick={() => setPage("home")}
          >
            ⌂ Главная
          </button>

          <button
            className={page === "search" ? "nav-active" : ""}
            onClick={() => setPage("search")}
          >
            ⌕ Поиск
          </button>

          <button
            className={
              page === "favorites"
                ? "nav-active"
                : ""
            }
            onClick={() => setPage("favorites")}
          >
            ♥ Избранное
          </button>

          <button
            className={
              page === "recommend"
                ? "nav-active"
                : ""
            }
            onClick={() => setPage("recommend")}
          >
            ✦ Рекомендации
          </button>
        </nav>
      </header>

      {/* MOBILE NAV */}
      <div className="mobile-nav">

        <button
          className={page === "home" ? "mobile-active" : ""}
          onClick={() => setPage("home")}
        >
          <span>⌂</span>
          <small>Главная</small>
        </button>

        <button
          className={
            page === "search"
              ? "mobile-active"
              : ""
          }
          onClick={() => setPage("search")}
        >
          <span>⌕</span>
          <small>Поиск</small>
        </button>

        <button
          className={
            page === "favorites"
              ? "mobile-active"
              : ""
          }
          onClick={() => setPage("favorites")}
        >
          <span>♥</span>
          <small>Избранное</small>
        </button>

        <button
          className={
            page === "recommend"
              ? "mobile-active"
              : ""
          }
          onClick={() => setPage("recommend")}
        >
          <span>✦</span>
          <small>Рекомендации</small>
        </button>

      </div>

      {/* ================= HOME ================= */}

      {page === "home" && (
        <main>

          <section className="hero">

            <h1>
              Найди свой <span>трек</span>
            </h1>

            <p>
              Ищи среди миллионов песен
            </p>

            <div className="search-box">

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setPage("search");
                  }
                }}
                placeholder="Название песни, исполнитель..."
              />

            </div>

            <button
              className="big-search"
              onClick={() => setPage("search")}
            >
              ⌕
            </button>

            <h2>Попробуй искать:</h2>

            <div className="artist-buttons">

              <button
                onClick={() =>
                  searchArtist("The Weeknd")
                }
              >
                The Weeknd
              </button>

              <button
                onClick={() =>
                  searchArtist("Drake")
                }
              >
                Drake
              </button>

              <button
                onClick={() =>
                  searchArtist("Taylor Swift")
                }
              >
                Taylor Swift
              </button>

              <button
                onClick={() =>
                  searchArtist("Billie Eilish")
                }
              >
                Billie Eilish
              </button>

              <button
                onClick={() =>
                  searchArtist("Bad Bunny")
                }
              >
                Bad Bunny
              </button>

              <button
                onClick={() =>
                  searchArtist("Ed Sheeran")
                }
              >
                Ed Sheeran
              </button>

            </div>

          </section>

          {/* WELCOME */}
          <section className="welcome">

            <div className="welcome-icon">♫</div>

            <h2>
              Добро
              <br />
              пожаловать в
              <br />
              <span>VIBEFY</span>
            </h2>

            <p>
              Открывай новую музыку каждый день
            </p>

            <button
              onClick={() => setPage("search")}
            >
              ⌕ &nbsp; Найти музыку
            </button>

            <button
              onClick={() => setPage("favorites")}
            >
              ♥ &nbsp; Избранное
            </button>

            <button
              onClick={() => setPage("recommend")}
            >
              ✦ &nbsp; Рекомендации
            </button>

          </section>

        </main>
      )}

      {/* ================= SEARCH ================= */}

      {page === "search" && (
        <section className="page">

          <div className="page-heading">
            <span>DISCOVER</span>
            <h2>Результаты поиска</h2>

            <div className="search-box second">
              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Название песни..."
              />

              <button
                onClick={() => setSearch("")}
              >
                ×
              </button>
            </div>
          </div>

          <div className="track-grid">

            {filteredTracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                playing={
                  current?.id === track.id &&
                  playing
                }
                favorite={favorites.includes(track.id)}
                onPlay={() => playTrack(track)}
                onFavorite={() =>
                  toggleFavorite(track.id)
                }
              />
            ))}

          </div>

          {filteredTracks.length === 0 && (
            <div className="empty">
              <div>⌕</div>
              <h3>Ничего не найдено</h3>
              <p>
                Попробуй другое название или исполнителя
              </p>
            </div>
          )}

        </section>
      )}

      {/* ================= FAVORITES ================= */}

      {page === "favorites" && (
        <section className="page">

          <div className="favorite-hero">

            <div className="favorite-big-icon">
              ♥
            </div>

            <h1>
              <span>Избранное</span>
            </h1>

            <p>
              {favoriteTracks.length} треков
            </p>

          </div>

          {favoriteTracks.length > 0 ? (
            <div className="track-grid">

              {favoriteTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  playing={
                    current?.id === track.id &&
                    playing
                  }
                  favorite={true}
                  onPlay={() => playTrack(track)}
                  onFavorite={() =>
                    toggleFavorite(track.id)
                  }
                />
              ))}

            </div>
          ) : (
            <div className="empty favorite-empty">

              <div className="empty-heart">
                ♡
              </div>

              <h2>
                Здесь пока пусто
              </h2>

              <p>
                Добавляй любимые треки,
                <br />
                и они появятся здесь
              </p>

              <button
                onClick={() => setPage("search")}
              >
                Найти музыку
              </button>

            </div>
          )}

        </section>
      )}

      {/* ================= RECOMMENDATIONS ================= */}

      {page === "recommend" && (
        <section className="page">

          <div className="recommend-hero">

            <div>✦</div>

            <h1>
              <span>Рекомендации</span>
            </h1>

            <p>
              Персональные рекомендации
              <br />
              на основе твоих вкусов
            </p>

          </div>

          <div className="recommend-list">

            <h2>Тебе может понравиться</h2>

            {tracks.slice(0, 4).map((track) => (
              <TrackRow
                key={track.id}
                track={track}
                playing={
                  current?.id === track.id &&
                  playing
                }
                favorite={favorites.includes(track.id)}
                onPlay={() => playTrack(track)}
                onFavorite={() =>
                  toggleFavorite(track.id)
                }
              />
            ))}

          </div>

        </section>
      )}

      {/* ================= PLAYER ================= */}

      {current && (
        <div className="player">

          <div className="player-info">
            <div
              className={`mini-cover ${current.gradient}`}
            >
              ♫
            </div>

            <div>
              <strong>{current.title}</strong>
              <small>{current.artist}</small>
            </div>
          </div>

          <div className="player-controls">

            <button onClick={previousTrack}>
              ⏮
            </button>

            <button
              className="player-play"
              onClick={() => {
                if (playing) {
                  pauseTrack();
                } else {
                  playTrack(current);
                }
              }}
            >
              {playing ? "Ⅱ" : "▶"}
            </button>

            <button onClick={nextTrack}>
              ⏭🌐
            </button>

          </div>

          <div className="progress">

            <div
              className="progress-line"
              style={{
                width: `${progress}%`,
              }}
            ></div>

          </div>

        </div>
      )}

    </div>
  );
}


function TrackCard({
  track,
  playing,
  favorite,
  onPlay,
  onFavorite,
}: {
  track: Track;
  playing: boolean;
  favorite: boolean;
  onPlay: () => void;
  onFavorite: () => void;
}) {
  return (
    <article className="track-card">

      <div
        className={`track-image ${track.gradient}`}
      >
        <div className="music-symbol">
          ♫
        </div>

        <button
          className="card-play"
          onClick={onPlay}
        >
          {playing ? "Ⅱ" : "▶"}
        </button>
      </div>

      <div className="track-bottom">

        <div>
          <h3>{track.title}</h3>
          <p>{track.artist}</p>
        </div>

        <button
          className={`heart ${
            favorite ? "heart-active" : ""
          }`}
          onClick={onFavorite}
        >
          {favorite ? "♥" : "♡"}
        </button>

      </div>

      <small className="category">
        {track.category}
      </small>

    </article>
  );
}

/* =========================
   TRACK ROW
========================= */

function TrackRow({
  track,
  playing,
  favorite,
  onPlay,
  onFavorite,
}: {
  track: Track;
  playing: boolean;
  favorite: boolean;
  onPlay: () => void;
  onFavorite: () => void;
}) {
  return (
    <div className="track-row">

      <div
        className={`row-cover ${track.gradient}`}
      >
        ♫
      </div>

      <div className="row-info">
        <strong>{track.title}</strong>
        <span>{track.artist}</span>
      </div>

      <button onClick={onFavorite}>
        {favorite ? "♥" : "♡"}
      </button>

      <button
        className="row-play"
        onClick={onPlay}
      >
        {playing ? "Ⅱ" : "▶"}
      </button>

    </div>
  );
}

export default App;
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
