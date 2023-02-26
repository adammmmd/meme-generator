import React from "react";
import memeData from "../memeData";

export default function Form() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomUrl: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMeme, setAllMeme] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMeme(data.data.memes))
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        const urlRandom = allMeme[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomUrl: urlRandom 
        }))
        
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    
    return (
        <main action="">
            <form className="form" action="">
                <input 
                    placeholder="top text" 
                    className="form-input" 
                    type="text" 
                    name= "topText"
                    value={meme.topText}
                    onChange= {handleChange}
                />
                <input 
                    placeholder="bottom text" 
                    className="form-input" 
                    type="text"
                    name="bottomText"
                    value= {meme.bottomText}
                    onChange= {handleChange}
                />
                <button className="form-button" onClick={getMemeImage}>Get a new meme image  🖼</button>
            </form>
            <div className="meme">
                <img className="meme-img" src={meme.randomUrl} />
                <h2 className="top text">{meme.topText}</h2>
                <h2 className="bottom text">{meme.bottomText}</h2>
            </div>
        </main>
    )
}