import Datawise from "../datewise/Datawise";

function Main_menu() {
  return (
    <div className=" w-1/2">
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-4xl text-white">Your Explore of The Week</h1>
        <div className="flex gap-4 ">
          <button className="px-4 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
            All
          </button>
          <button className="px-4 py-2 rounded-full border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            Nature
          </button>
          <button className="px-4 py-2 rounded-full border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            Street
          </button>
          <button className="px-4 py-2 rounded-full border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            Wallpaper
          </button>
          <button className="px-4 py-2 rounded-full border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            Flowers
          </button>
          <button className="px-4 py-2 rounded-full border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            {" "}
            People
          </button>
        </div>
      </div>
      <Datawise />
    </div>
  );
}

export default Main_menu;
