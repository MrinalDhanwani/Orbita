function WhyOrbita() {

  const reasons = [
    {
      emoji: "🎯",
      title: "Not just skill match — vibe match",
      description: "Anyone can match you on skills. Orbita matches you on how you actually work — fast or slow, async or sync, beginner or expert. That's why our matches stick."
    },
    {
      emoji: "🔥",
      title: "Built-in accountability",
      description: "No more silent ghosters. Our Proof of Life system means both partners check in daily. Miss 3 days and the match gets flagged. Real commitment, not just good intentions."
    },
    {
      emoji: "🌍",
      title: "Ship something real",
      description: "At day 30 your project goes public automatically. A real project page with your name on it. Not just another side project that died in a folder on your Desktop."
    }
  ];

  return (
    <section id="why" className="py-24 px-6 bg-purple-50">

      <div className="text-center mb-16">
        <div className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          Why Orbita
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900">
          Different by design
        </h2>
        <p className="text-gray-400 mt-4 text-lg max-w-lg mx-auto">
          Every other platform connects you with people. Orbita connects you with the right person and makes sure you both actually ship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {reasons.map((reason) => (
          <div key={reason.title} className="bg-white rounded-2xl p-8 hover:shadow-lg transition">
            <div className="text-5xl mb-6">
              {reason.emoji}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {reason.title}
            </h3>
            <p className="text-gray-500 leading-relaxed">
              {reason.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}

export default WhyOrbita;