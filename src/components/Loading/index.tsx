export default function Loading() {
  return (
    <div className="h-screen w-full absolute top-0 left-0 flex items-center justify-center bg-transparent opacity-75 backdrop-blur-lg">
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
    </div>
  );
}
