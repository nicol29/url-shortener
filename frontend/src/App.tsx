import { useState, useEffect } from 'react';
import './styles/App.css';
import Header from './components/header';
import Redirect from './components/redirect';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

interface ShortenedLinkInterface {
  longUrl: string;
  shortenedUrl: string;
}

function App() {
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [shortenedLink, setShortenedLink] = useState<ShortenedLinkInterface>({
    longUrl: "",
    shortenedUrl: ""
  });

  const navigate = useNavigate();

  const submitUrl = async () => {
    const url = {
      link: link
    };
    let linkFromServer;

    if(isInputValid()) linkFromServer = await fetch("http://localhost:3000/api", { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url)
    });

    const jsonifiedData = await linkFromServer?.json();

    setShortenedLink({
      ...shortenedLink, 
      longUrl: jsonifiedData.longUrl,
      shortenedUrl: jsonifiedData.shortenedUrl
    });
  }

  const isInputValid = () => {
    if (link === "") {
      setError("Must provide a link");
      return false;
    } else if (!verifyRegex()) {
      setError("Must provide a valid link");
      return false;
    } else {
      setError("");
      return true;
    }
  }

  const verifyRegex = () => {
    const urlPattern = /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;

    return urlPattern.test(link);
  }

  useEffect(() => {
    if (shortenedLink.shortenedUrl !== "") navigate("/shortened");
  }, [shortenedLink]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={
          <section className="input-url-section">
            <p className="intro-para">Welcome to our URL shortening service! Are you tired of sharing long, cumbersome links? Our platform offers a simple and efficient solution to transform your lengthy URLs into short, easy-to-share links. With just a few clicks, you can generate custom, compact URLs that are perfect for social media posts, emails, and any other situation where brevity is key. Say goodbye to long and unwieldy URLs and experience the convenience of our URL shortening service today. http://youtube.com</p>
            <form>
              <div className="form-row">
                <input 
                  type="text" 
                  placeholder="Paste your url here..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <button type="button" onClick={submitUrl}>Shorten</button>
              </div>
              <p className="error">{error !== "" && error}</p>
            </form>
          </section>
        }/>
        <Route path="/shortened" element={
          <section>
            <p style={{textAlign: "center"}}>Your shortened link: {shortenedLink.shortenedUrl}</p>
            <p style={{textAlign: "center"}}>Long URL: {shortenedLink.longUrl}</p>
          </section>
        }/>
        <Route path="/linkTo/:vidId" element={<Redirect />}/>
      </Routes>
    </div>
  )
}

export default App;
