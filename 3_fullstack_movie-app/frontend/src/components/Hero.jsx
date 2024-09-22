const Hero = () => {
  return (
    <div className="px-10 py-20 lg:px-20 bg-[linear-gradient(#00000071,#00000071),url('wick.jpg')] bg-center bg-cover text-white">
      <h1 className="text-4xl md:text-5xl">Hoşgeldin.</h1>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
        Milyonlarca Film, Dizi ve Aktörleri Keşfet
      </h2>

      <div className="rounded-lg overflow-hidden flex mt-5">
        <input
          className="w-full py-2 px-4 text-black"
          type="text"
          placeholder="Film, Dizi, Aktör arayın..."
        />
        <button className="bg-blue-500 px-5 font-semibold hover:bg-blue-600">
          Ara
        </button>
      </div>
    </div>
  );
};

export default Hero;
