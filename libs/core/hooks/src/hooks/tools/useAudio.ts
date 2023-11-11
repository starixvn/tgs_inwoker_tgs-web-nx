export function useAudio() {
  const handleCloseAudio = () => {
    const audioDom = document.getElementById("audio") as HTMLAudioElement | null;
    if (!audioDom) return;

    audioDom.play();
  };

  return {
    handleCloseAudio,
  };
}
