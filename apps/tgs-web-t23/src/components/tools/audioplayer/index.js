const AudioPlayer = () => {
  return (
    <div style={{ display: "none" }}>
      <audio controls id="audio" loop>
        <source src={process.env.PUBLIC_URL + "/assets/audio/cny.mp3"} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default AudioPlayer;
