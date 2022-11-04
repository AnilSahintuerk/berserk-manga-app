import Head from "next/head";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [chapter, setChapter] = useState();
  const [imagesUrl, setImagesUrl] = useState([]);
  const chapterRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    setChapter(chapterRef.current.value);
    localStorage.setItem("lastChapter", chapterRef.current.value);
  };

  useEffect(() => {
    setChapter(localStorage.getItem("lastChapter"));
  }, []);

  useEffect(() => {
    getChapter();
  }, [chapter]);

  const getChapter = () => {
    let urls = [];
    for (let i = 1; i <= 25; i++) {
      urls.push(
        `https://cdn.berserkchapters.com/file/mangap/1/200${
          chapter < 10 ? "0" + chapter : chapter
        }000/${i}.jpg`
      );
    }
    setImagesUrl(urls);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen lg:w-2/4 mx-auto flex flex-col items-center gap-1 pb-4">
        <form className="flex gap-2 justify-center">
          <label>Kapitel</label>
          <input className="w-24" type="number" ref={chapterRef} />
          <button className="rounded-md bg-rose-800 px-4" onClick={handleClick}>
            Get Manga
          </button>
        </form>
        {chapter && <h1 className="text-3xl my-2">Kapitel {chapter}</h1>}
        {imagesUrl.map((url, index) => (
          <img src={url} alt="" />
        ))}
        <button className="rounded-md bg-rose-800 px-4 py-1 w-48 -mt-2">
          Next
        </button>
      </main>
    </div>
  );
}
