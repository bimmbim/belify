"use client";

import { useRef } from "react";

export default function BelifyText() {
  const audioRef = useRef(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <>
      <span
        onClick={handleClick}
        className="select-none"
        style={{ cursor: "default" }}
      >
        BeliFy.
      </span>
      <audio ref={audioRef} src="/jokowi.mp3" preload="auto" />
    </>
  );
}
