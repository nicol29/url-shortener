import { useState } from 'react';
import './styles/App.css';
import Header from './components/header';

function App() {
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const submitUrl = () => {
    if(isInputValid()) console.log("submitted");
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
    const urlPattern = new RegExp(
      /^(ftp|http|https):\/\/[^ "]+$/,
      'i'
    );
  
    return urlPattern.test(link);
  }
  

  return (
    <div>
      <Header />
      <section className="input-url-section">
        <p className="intro-para">Welcome to our URL shortening service! Are you tired of sharing long, cumbersome links? Our platform offers a simple and efficient solution to transform your lengthy URLs into short, easy-to-share links. With just a few clicks, you can generate custom, compact URLs that are perfect for social media posts, emails, and any other situation where brevity is key. Say goodbye to long and unwieldy URLs and experience the convenience of our URL shortening service today.</p>
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
    </div>
  )
}

export default App;
