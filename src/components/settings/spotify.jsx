import React from "react";
const SpotifyPlayer = () => {
    return (
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/37i9dQZF1EIeU3RFfPV9ui?utm_source=generator&theme=0"
        width="80%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    );
  };
  
  export default SpotifyPlayer;
  