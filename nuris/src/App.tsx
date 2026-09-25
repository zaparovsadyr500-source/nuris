import { useMemo, useRef, useState } from "react";
import "./App.css";

type Song = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  cover: string;
  audio: string;
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
  "Travis Scott",
  "Drake",
  "Bruno Mars",
  "Justin Bieber",
  "Rihanna",
  "Taylor Swift",
  "Ariana Grande",
  "Selena Gomez",
  "Sia",
  "Eminem",
  "Kendrick Lamar",
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
  "Dance",
  "Indie",
];

const songNames = [
  "Midnight Dreams",
  "Night Drive",
  "Ocean",
  "Energy",
  "Sunset",
  "Paradise",
  "Lost Stars",
  "Moonlight",
  "After Dark",
  "Dreams",
  "Memories",
  "Forever",
  "Heartbeat",
  "Summer",
  "Rain",
  "Sky",
  "Fire",
  "Freedom",
  "Horizon",
  "Future",
  "Tonight",
  "Neon",
  "City Lights",
  "Golden Hour",
  "Deep Ocean",
];


const audioUrls = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
];

const russianHits = [
  // 👇 СЕН БЕРГЕН 150 ЫРДЫН БААРЫН УШУЛ ЖЕРГЕ КОЙ
  { title: "Шадэ", artist: "Индия, Xcho & МОТ" },
  { title: "ДИНАСТИЯ", artist: "VILLIAN & madk1d" },
  { title: "Ты не бойся ночи", artist: "ENZRO" },
  { title: "ЗНАК", artist: "Toxi$ & Dora" },
  { title: "Феникс", artist: "BEARWOLF" },
  { title: "Шадэ", artist: "Индия, Xcho & МОТ" },
  { title: "ДИНАСТИЯ", artist: "VILLIAN & madk1d" },
  { title: "Ты не бойся ночи", artist: "ENZRO" },
  { title: "ЗНАК", artist: "Toxi$ & Dora" },
  { title: "Феникс", artist: "BEARWOLF" },
  { title: "БАНК", artist: "Icegergert & Zivert" },
  { title: "Тону", artist: "HOLLYFLAME" },
  { title: "Мальборо", artist: "SAYAN" },
  { title: "Шёлк", artist: "Ваня Дмитриенко" },
  { title: "Силуэт", artist: "Ваня Дмитриенко & Аня Пересильд" },
  { title: "Асфальт", artist: "Jakone & Kiliana" },
  { title: "Жиганская", artist: "Jakone & Kiliana" },
  { title: "NOBODY", artist: "Aarne, Toxi$ & Big Baby Tape" },
  { title: "I Got Love", artist: "Miyagi & Эндшпиль" },
  { title: "Пожары", artist: "XOLIDAYBOY" },
  { title: "Худи", artist: "Джиган, ARTIK & ASTI & NILETTO" },
  { title: "Положение", artist: "Скриптонит" },
  { title: "Наследство", artist: "Icegergert & SKY RAE" },
  { title: "Внутренний голос", artist: "Jeny Vesna" },
  { title: "днями и ночами", artist: "BUSHIDO ZHO, Scally Milano & Полка" },
  { title: "В сигаретном дыму", artist: "Баста & Гуф" },
  { title: "Иордан", artist: "MONA" },
  { title: "Кухни", artist: "Бонд с кнопкой" },
  { title: "Поезда", artist: "Женя Трофимов & Комната культуры" },
  { title: "Царица", artist: "ANNA ASTI" },
  { title: "Самолеты", artist: "Женя Трофимов" },
  { title: "Матушка", artist: "Татьяна Куртукова" },
  { title: "Гармония", artist: "ARTIK & ASTI" },
  { title: "Валькирия", artist: "BEARWOLF" },
  { title: "По барам", artist: "ANNA ASTI" },
  { title: "Птичка", artist: "HammAli & Navai" },
  { title: "Привет", artist: "Женя Трофимов & Комната культуры" },
  { title: "Кукла колдуна", artist: "Король и Шут" },
  { title: "Зелёные волны", artist: "Zivert" },
  { title: "Девочка танцуй", artist: "ARTIK & ASTI" },
  { title: "неболей", artist: "Баста & Zivert" },
  { title: "Абсолютно всё", artist: "МОТ & Бьянка" },
  { title: "Воин и дракон", artist: "MONA" },
  { title: "ЭКСПОНАТ", artist: "MIA BOYKA" },
  { title: "Омут", artist: "Полка & YASMI" },
  { title: "Лесник", artist: "Король и Шут" },
  { title: "Намёк на нас", artist: "МОТ" },
  { title: "Ворона", artist: "Кэнни" },
  { title: "На заре", artist: "Баста" },
  { title: "Сансара", artist: "Баста" },
  { title: "КУПЕР", artist: "SQWOZ BAB" },
  { title: "С неба", artist: "ELMAN & TRIDA" },
  { title: "Таю", artist: "TASSO" },
  { title: "Плакала надежда", artist: "Любовь Успенская, Jakone & Kiliana" },
  { title: "Больше, чем ближе", artist: "NAVAI" },
  { title: "Мало 2.0", artist: "Egor Kreed" },
  { title: "Базовый минимум", artist: "SABI & MIA BOYKA" },
  { title: "Чегери", artist: "Shamo" },
  { title: "Я твой номер один", artist: "Дима Билан" },
  { title: "МЫ", artist: "IOWA" },
  { title: "Обнял, поцеловал", artist: "Whole Lotta Swag" },
  { title: "Лампочки", artist: "ARTIK & ASTI" },
  { title: "Прощание", artist: "Три дня дождя & MONA" },
  { title: "СОЛНЦЕ МОНАКО", artist: "Люся Чеботина" },
  { title: "Седьмой лепесток", artist: "Антон Токарев" },
  { title: "Моя игра", artist: "Баста & Guf" },
  { title: "Грустный дэнс", artist: "Артём Качер & ARTIK & ASTI" },
  { title: "Шиншиллы", artist: "ЛСП" },
  { title: "Мир", artist: "Гио ПиКа & MIRAVI" },
  { title: "Улицам нужен твой огонь", artist: "Баста & Гуф" },
  { title: "Дэнс", artist: "9 Gramm" },
  { title: "Мать императрица", artist: "Icegergert" },
  { title: "Москва любит...", artist: "Скриптонит" },
  { title: "Есенин", artist: "NAVAI & MONA" },
  { title: "Ты ли?", artist: "Edvan" },
  { title: "Настоящая", artist: "Ваня Дмитриенко" },
  { title: "Вселенная", artist: "Баста" },
  { title: "Бит шатает голову", artist: "Хаски" },
  { title: "Цепи", artist: "Скриптонит" },
  { title: "Из-за тебя", artist: "Akmal'" },
  { title: "Антигейша 2021", artist: "ВИА Гра" },
  { title: "Эпилог", artist: "ANNA ASTI & Дима Билан" },
  { title: "кавaлерия", artist: "Индия" },
  { title: "Доедешь - пиши", artist: "Каспийский груз & Баста" },
  { title: "Санта Лючия", artist: "GAYAZOV$ BROTHER$" },
  { title: "Если я буду танцевать", artist: "Баста & Моя Мишель" },
  { title: "Моя хулиганка", artist: "XOLIDAYBOY" },
  { title: "Одного", artist: "Татьяна Куртукова" },
  { title: "Чем прежде", artist: "Полка" },
  { title: "Богиня моря", artist: "Фара Ночи" },
  { title: "Буду всегда с тобой", artist: "Баста & AMCHI" },
  { title: "Мир нам завидовал", artist: "Akmal'" },
  { title: "Ты мне покажи", artist: "Akmal'" },
  { title: "Выпускной", artist: "Баста" },
  { title: "Как сам", artist: "Баста & Гуф" },
  { title: "БИЗИ", artist: "Police in Paris & Ida Galich" },
  { title: "Давай на самый верх", artist: "Zivert" },
  { title: "Отражение", artist: "Ваня Дмитриенко, Мальбэк & Сюзанна" },
  { title: "Наоборот", artist: "Miyagi & Эндшпиль" },
  { title: "Зима в сердце", artist: "Моя Мишель" },
  { title: "МАЛИНОВАЯ ЛАДА", artist: "GAYAZOV$ BROTHER$" },
  { title: "Беверли Хиллс", artist: "Zivert" },
  { title: "Credo", artist: "Zivert" },
  { title: "Океаны", artist: "XOLIDAYBOY" },
  { title: "По весне", artist: "Jakone & SCIRENA" },
  { title: "Мания", artist: "XOLIDAYBOY" },
  { title: "Снег идёт", artist: "Gluk'oZa" },
  { title: "Дарите женщинам цветы", artist: "Jazzdauren" },
  { title: "Ратата", artist: "Konfuz" },
  { title: "Кабы не было зимы", artist: "Мультфильм" },
  { title: "Комета", artist: "JONY" },
  { title: "Аллея", artist: "JONY" },
  { title: "Титры", artist: "JONY" },
  { title: "Лали", artist: "JONY" },
  { title: "Тополиный пух", artist: "Иванушки International" },
  { title: "Розовое вино", artist: "Элджей & Feduk" },
  { title: "Минимум", artist: "Макс Корж" },
  { title: "Малиновый закат", artist: "Макс Корж" },
  { title: "Медляк", artist: "Макс Корж" },
  { title: "Пьяный дождь", artist: "Макс Корж" },
  { title: "Жить в кайф", artist: "Макс Корж" },
  { title: "Горы по колено", artist: "Макс Корж" },
  { title: "Мотылёк", artist: "Макс Корж" },
  { title: "Пламенный свет", artist: "Макс Корж" },
  { title: "Самолёт", artist: "Макс Корж" },
  { title: "Крутой", artist: "Макс Корж" },
  { title: "Тает лёд", artist: "Грибы" },
  { title: "Между нами тает лёд", artist: "Грибы" },
  { title: "Хочу к тебе", artist: "Грибы" },
  { title: "Плачу на техно", artist: "Cream Soda & Хлеб" },
  { title: "Комета", artist: "Cream Soda" },
  { title: "Никаких больше вечеринок", artist: "Cream Soda" },
  { title: "Положение 2", artist: "Скриптонит" },
  { title: "Космос", artist: "Скриптонит" },
  { title: "Цвета", artist: "Скриптонит" },
  { title: "Притон", artist: "Скриптонит" },
  { title: "Это любовь", artist: "Скриптонит" },
  { title: "Танцуй сама", artist: "Скриптонит" },
  { title: "Паранойя", artist: "Miyagi & Эндшпиль" },
  { title: "Minor", artist: "Miyagi & Эндшпиль" },
  { title: "I Can Fly", artist: "Miyagi & Эндшпиль" },
  { title: "Captain", artist: "Miyagi & Эндшпиль" },
  { title: "Самурай", artist: "Miyagi & Эндшпиль" },
  { title: "Там ревели горы", artist: "Miyagi & Эндшпиль" },
  { title: "Фея", artist: "Miyagi & Эндшпиль" },
  { title: "Utopia", artist: "Miyagi & Эндшпиль" },
  { title: "I Wanna Feel", artist: "Miyagi & Эндшпиль" },
  { title: "Люби меня", artist: "HammAli & Navai" },
  { title: "А если это любовь", artist: "HammAli & Navai" },
  { title: "Пустите меня на танцпол", artist: "HammAli & Navai" },
  { title: "Не люби меня", artist: "HammAli & Navai" },
  { title: "Прятки", artist: "HammAli & Navai" },
  { title: "Птичка", artist: "HammAli & Navai" },
  { title: "Девочка-война", artist: "HammAli & Navai" },
  { title: "Ты моя химия", artist: "HammAli & Navai" },
  { title: "Как есть", artist: "MOT" },
  { title: "Август - это ты", artist: "MOT" },
  { title: "Капкан", artist: "MOT" },
  { title: "Сопрано", artist: "MOT & ВИА Гра" },
  { title: "Абсолютно всё", artist: "MOT & Бьянка" },
  { title: "На дне", artist: "MOT" },
  { title: "Лилии", artist: "MOT" },
  { title: "Кислород", artist: "MOT & ВИА Гра" },
  { title: "Золотые купола", artist: "MOT" },
  { title: "Перемены", artist: "MOT" },
  { title: "Комета", artist: "Dabro" },
  { title: "Юность", artist: "Dabro" },
  { title: "На часах ноль-ноль", artist: "Dabro" },
  { title: "Ты меня ждёшь", artist: "Dabro" },
  { title: "Мне это не нужно", artist: "Dabro" },
  { title: "Поезда", artist: "Dabro" },
  { title: "Дай мне", artist: "Dabro" },
  { title: "Февраль", artist: "Dabro" },
  { title: "Знаешь", artist: "Dabro" },
  { title: "Мой путь", artist: "Dabro" },
  { title: "Люби меня", artist: "NILETTO" },
  { title: "Любимка", artist: "NILETTO" },
  { title: "Someone Like You", artist: "NILETTO" },
  { title: "Не вспоминай", artist: "NILETTO" },
  { title: "Ты такая красивая", artist: "NILETTO" },
  { title: "Если тебе будет грустно", artist: "NILETTO" },
  { title: "Краш", artist: "NILETTO" },
  { title: "Париж", artist: "NILETTO" },
  { title: "Сон", artist: "NILETTO" },
  { title: "Чика", artist: "NILETTO" },
];



  // ... калган сенин 150 ырың


const songs: Song[] = [
  ...russianHits.map((song, index) => ({
    id: index + 1,
    title: song.title,
    artist: song.artist,
    genre: genres[index % genres.length],
    cover: `https://picsum.photos/seed/russian-${index + 1}/600/600`,
    audio: audioUrls[index % audioUrls.length],
  })),

  ...Array.from({ length: 450 }, (_, index) => {
    const id = index + 151;
    const artist = artists[index % artists.length];
    const genre = genres[index % genres.length];
    const name = songNames[index % songNames.length];

    return {
      id,
      title: `${name} ${id}`,
      artist,
      genre,
      cover: `https://picsum.photos/seed/music-${id}/600/600`,
      audio: audioUrls[index % audioUrls.length],
    };
  }),
];

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [search, setSearch] = useState("");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playing, setPlaying] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [volume, setVolume] = useState(0.7);
  const [genre, setGenre] = useState("All");
  const [page, setPage] = useState("home");

  const filteredSongs = useMemo(() => {
    const text = search.toLowerCase().trim();

    return songs.filter((song) => {
      const searchMatch =
        text === "" ||
        song.title.toLowerCase().includes(text) ||
        song.artist.toLowerCase().includes(text) ||
        song.genre.toLowerCase().includes(text);

      const genreMatch =
        genre === "All" || song.genre === genre;

      return searchMatch && genreMatch;
    });
  }, [search, genre]);

  const favoriteSongs = songs.filter((song) =>
    favorites.includes(song.id)
  );

  const recommendedSongs = songs.filter(
    (song) => song.id % 7 === 0
  );

  const openPage = (name: string) => {
    setPage(name);

    setTimeout(() => {
      document
        .getElementById(name)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  const playSong = async (song: Song) => {
    if (!audioRef.current) return;

    if (currentSong?.id === song.id) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setPlaying(true);
        } catch {
          setPlaying(false);
        }
      }

      return;
    }

    audioRef.current.pause();

    audioRef.current.src = song.audio;
    audioRef.current.volume = volume;
    audioRef.current.currentTime = 0;

    setCurrentSong(song);

    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const toggleFavorite = (id: number) => {
    setFavorites((old) =>
      old.includes(id)
        ? old.filter((item) => item !== id)
        : [...old, id]
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
        onEnded={() => setPlaying(false)}
      />

      {/* HEADER */}

      <header className="header">
        <div
          className="logo"
          onClick={() => openPage("home")}
          style={{ cursor: "pointer" }}
        >
          <span className="logoIcon">◆</span>
          VIBEFY
        </div>

        <nav>
          <button
            className={page === "home" ? "navActive" : ""}
            onClick={() => openPage("home")}
          >
            Башкы бет
          </button>

          <button
            className={page === "music" ? "navActive" : ""}
            onClick={() => openPage("music")}
          >
            Музыка
          </button>

          <button
            className={
              page === "recommendations"
                ? "navActive"
                : ""
            }
            onClick={() =>
              openPage("recommendations")
            }
          >
            Рекомендации
          </button>

          <button
            className={
              page === "favorites"
                ? "navActive"
                : ""
            }
            onClick={() => openPage("favorites")}
          >
            Избранное
          </button>
        </nav>

        <div className="headerRight">
          🎧 MusicBox
        </div>
      </header>

      {/* HOME */}

      <section id="home" className="hero">
        <div className="heroText">
          <span className="badge">
            ✦ YOUR MUSIC WORLD
          </span>

          <h1>
            Музыкаңды
            <br />
            <span>өз дүйнөңө айлант</span>
          </h1>

          <p>
            Сүйүктүү музыкаңды изде, тап,
            угуп көр жана коллекцияңа кош.
          </p>

          <button
            className="heroButton"
            onClick={() => openPage("music")}
          >
            ▶ Музыка угуу
          </button>
        </div>

        <div className="heroVisual">
          <div className="circle circleOne" />
          <div className="circle circleTwo" />
          <div className="musicBig">♫</div>
        </div>
      </section>

      {/* MUSIC */}

      <section id="music" className="searchSection">
        <span className="searchTitle">
          FIND YOUR MUSIC
        </span>

        <h2>Каалаган ырыңды тап 🎧</h2>

        <div className="bigSearch">
          <span>🔎</span>

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage("music");
            }}
            placeholder="Ырдын атын же артистти жаз..."
          />

          {search && (
            <button
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}
        </div>

        <div className="genres">
          <button
            className={
              genre === "All"
                ? "genre active"
                : "genre"
            }
            onClick={() => setGenre("All")}
          >
            Баары
          </button>

          {genres.map((item) => (
            <button
              key={item}
              className={
                genre === item
                  ? "genre active"
                  : "genre"
              }
              onClick={() => {
                setGenre(item);
                setPage("music");
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="songsSection">
        <div className="sectionTop">
          <div>
            <span className="sectionLabel">
              SEARCH RESULTS
            </span>

            <h2>
              {search
                ? `"${search}" боюнча`
                : "Бардык музыка"}
            </h2>

            <p style={{ color: "#888" }}>
              {filteredSongs.length} ыр табылды
            </p>
          </div>
        </div>

        <div className="songGrid">
          {filteredSongs.slice(0, 60).map((song) => {
            const isCurrent =
              currentSong?.id === song.id;

            const isFavorite =
              favorites.includes(song.id);

            return (
              <div
                className={
                  isCurrent && playing
                    ? "songCard playing"
                    : "songCard"
                }
                key={song.id}
              >
                <div className="cover">
                  <img
                    src={song.cover}
                    alt={song.title}
                  />

                  <button
                    className="cardPlay"
                    onClick={() =>
                      playSong(song)
                    }
                  >
                    {isCurrent && playing
                      ? "❚❚"
                      : "▶"}
                  </button>

                  <button
                    className="favoriteButton"
                    onClick={() =>
                      toggleFavorite(song.id)
                    }
                  >
                    {isFavorite ? "♥" : "♡"}
                  </button>
                </div>

                <div className="songDetails">
                  <h3>{song.title}</h3>

                  <p>{song.artist}</p>

                  <div className="songBottom">
                    <span>{song.genre}</span>

                    <button
                      onClick={() =>
                        playSong(song)
                      }
                    >
                      {isCurrent && playing
                        ? "Playing"
                        : "Play"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSongs.length === 0 && (
          <div className="empty">
            <div>😔</div>
            <h2>Ыр табылган жок</h2>
            <p>
              Ырдын атын, артистти же жанрды туура жазып көр.
            </p>
          </div>
        )}
      </section>

      {/* RECOMMENDATIONS */}

      <section
        id="recommendations"
        className="songsSection"
      >
        <div className="sectionTop">
          <div>
            <span className="sectionLabel">
              FOR YOU
            </span>

            <h2>🎯 Рекомендации</h2>
          </div>
        </div>

        <div className="songGrid">
          {recommendedSongs
            .slice(0, 12)
            .map((song) => (
              <div
                className="songCard"
                key={song.id}
              >
                <div className="cover">
                  <img
                    src={song.cover}
                    alt={song.title}
                  />

                  <button
                    className="cardPlay"
                    onClick={() =>
                      playSong(song)
                    }
                  >
                    {currentSong?.id === song.id &&
                    playing
                      ? "❚❚"
                      : "▶"}
                  </button>
                </div>

                <div className="songDetails">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>

                  <div className="songBottom">
                    <span>{song.genre}</span>
                    <button
                      onClick={() =>
                        toggleFavorite(song.id)
                      }
                    >
                      {favorites.includes(song.id)
                        ? "♥"
                        : "♡"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* FAVORITES */}

      <section
        id="favorites"
        className="songsSection"
      >
        <div className="sectionTop">
          <div>
            <span className="sectionLabel">
              YOUR COLLECTION
            </span>

            <h2>❤️ Избранное</h2>

            <p style={{ color: "#888" }}>
              {favoriteSongs.length} ыр сакталды
            </p>
          </div>
        </div>

        {favoriteSongs.length === 0 ? (
          <div className="empty">
            <div>🤍</div>

            <h2>
              Избранное азырынча бош
            </h2>

            <p>
              Ырдын жүрөк белгисин бассаң,
              ушул жерге кошулат.
            </p>
          </div>
        ) : (
          <div className="songGrid">
            {favoriteSongs.map((song) => (
              <div
                className="songCard"
                key={song.id}
              >
                <div className="cover">
                  <img
                    src={song.cover}
                    alt={song.title}
                  />

                  <button
                    className="cardPlay"
                    onClick={() =>
                      playSong(song)
                    }
                  >
                    {currentSong?.id === song.id &&
                    playing
                      ? "❚❚"
                      : "▶"}
                  </button>

                  <button
                    className="favoriteButton"
                    onClick={() =>
                      toggleFavorite(song.id)
                    }
                  >
                    ♥
                  </button>
                </div>

                <div className="songDetails">
                  <h3>{song.title}</h3>

                  <p>{song.artist}</p>

                  <div className="songBottom">
                    <span>{song.genre}</span>

                    <button
                      onClick={() =>
                        playSong(song)
                      }
                    >
                      ▶ Play
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PLAYER */}

      {currentSong && (
        <div className="player">
          <div className="playerSong">
            <img
              src={currentSong.cover}
              alt={currentSong.title}
            />

            <div>
              <strong>
                {currentSong.title}
              </strong>

              <span>
                {currentSong.artist}
              </span>
            </div>
          </div>

          <button
            className="playerPlay"
            onClick={() =>
              playSong(currentSong)
            }
          >
            {playing ? "❚❚" : "▶"}
          </button>

          <div className="volumeBox">
            <span>
              {volume === 0 ? "🔇" : "🔊"}
            </span>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) =>
                changeVolume(
                  Number(e.target.value)
                )
              }
            />
          </div>

          <button
            className="closePlayer"
            onClick={() => {
              audioRef.current?.pause();
              setCurrentSong(null);
              setPlaying(false);
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default App;