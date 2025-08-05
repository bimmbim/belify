export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center space-y-4">
        <img
          src="/sapi.gif"
          alt="Welcome Gif"
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
        <p className="text-xl font-semibold text-black">
          Welcome Home 🐮
        </p>
        <audio src="/lagu_sapi.mp3" autoPlay loop hidden />
      </div>
    </>
  );
}
