function Hero({ onStartClick }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-purple-50 to-white">

      <div className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1 rounded-full mb-6">
        🚀 Built for builders like you
      </div>

      <h1 className="text-5xl font-extrabold text-gray-900 max-w-3xl leading-tight mb-6">
        Find your perfect 
        <span className="text-purple-600"> co-builder.</span>
        <br />
        Ship something real in
        <span className="text-purple-600"> 30 days.</span>
      </h1>

      <p className="text-xl text-gray-500 max-w-xl mb-10 leading-relaxed">
        Orbita matches you with the right collaborator based on your project idea 
        and working style — then keeps you both accountable with a structured 
        30-day sprint.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <button onClick={onStartClick} className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition">
          Start Building →
        </button>
        <button className="border-2 border-purple-200 text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-50 transition">
          See How It Works
        </button>
      </div>

      <div className="mt-16 flex gap-10 text-center">
        <div>
          <div className="text-3xl font-bold text-purple-600">500+</div>
          <div className="text-gray-400 text-sm mt-1">Builders waiting</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-purple-600">30</div>
          <div className="text-gray-400 text-sm mt-1">Day sprints</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-purple-600">100%</div>
          <div className="text-gray-400 text-sm mt-1">Free to start</div>
        </div>
      </div>

    </section>
  );
}

export default Hero;