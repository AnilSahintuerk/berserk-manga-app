import Head from "next/head";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [chapter, setChapter] = useState();
  const [imagesUrl, setImagesUrl] = useState([]);
  const chapterRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    setChapter(chapterRef.current.value);
    localStorage.setItem("lastChapter", chapter);
  };

  useEffect(() => {
    setChapter(localStorage.getItem("lastChapter"));
  }, []);

  useEffect(() => {
    getChapter();
  }, [chapter]);

  const getChapter = () => {
    let urls = [];
    if (chapter) {
      for (let i = 0; i < 40; i++) {
        let link = `https://cdn.berserkchapters.com/file/mangap/1/200${
          chapter < 10 ? `0${chapter}` : chapter
        }000/${i}.jpg`;
        urls.push(link);
        setImagesUrl(urls);
      }
    }
  };

  const handleNextChapter = (e) => {
    setChapter(parseInt(chapter) + 1);
    localStorage.setItem("lastChapter", chapter);
    scroll(0, 0);
  };

  return (
    <div>
      <Head>
        <title>Berserk Manga</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center w-screen gap-1 py-4 mx-auto lg:w-2/4">
        <form className="flex justify-center gap-2">
          <label>Kapitel</label>
          <input className="w-24 border" type="number" ref={chapterRef} />
          <button
            className="px-4 text-white rounded-md bg-rose-800"
            onClick={handleClick}
          >
            Get Manga
          </button>
        </form>
        {chapter && <h1 className="my-2 text-3xl">Kapitel {chapter}</h1>}
        {imagesUrl.map((url, index) => (
          <img
            key={index}
            src={url}
            alt=""
            onError={(event) => (event.target.style.display = "none")}
          />
        ))}
        {chapter && (
          <button
            className="w-48 px-4 py-1 mt-1 text-white rounded-md bg-rose-800"
            onClick={handleNextChapter}
          >
            Next
          </button>
        )}
      </main>
    </div>
  );
}
