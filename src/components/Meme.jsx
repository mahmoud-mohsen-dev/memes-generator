import { useEffect, useState } from "react";

export default function Meme() {
    const [allMemeImages, setAllMemeImages] = useState([]);
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    });

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((response) => response.json())
            .then((data) => {
                setAllMemeImages(data.data.memes);
            });
    }, []);

    function getRandomImg() {
        const memes = allMemeImages;
        const randomNumber = Math.round(Math.random() * memes.length);
        const randomImg = memes[randomNumber].url;

        setMeme((prevMeme) => {
            return {
                ...prevMeme,
                randomImage: randomImg,
            };
        });
    }

    function handleChange(event) {
        const { value, name } = event.target;
        setMeme((prevMeme) => ({
            ...prevMeme,
            [name]: value,
        }));
    }

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="topText"
                    className="meme--input"
                    placeholder="Top Text"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="bottomText"
                    className="meme--input"
                    placeholder="Bottom Text"
                    onChange={handleChange}
                />
                <input
                    type="button"
                    value="Get a new meme image 🖼️ "
                    onClick={getRandomImg}
                />
                <div className="form--image_container meme">
                    <img src={meme.randomImage} className="meme--image" />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
            </form>
        </>
    );
}
