function HowItWorks() {

  const steps = [
    {
      number: "01",
      emoji: "🧠",
      title: "Brain Scan",
      description: "Type your project idea in plain language. Our AI reads it and builds your complete Project DNA — what it needs, what skills are required, what kind of person fits."
    },
    {
      number: "02",
      emoji: "✨",
      title: "The Match",
      description: "Answer 5 quick questions about how you work. Orbita finds your perfect collaborator — not just skill match, but personality match too. No more ghosters."
    },
    {
      number: "03",
      emoji: "🚀",
      title: "Sprint Room",
      description: "Get a private 30-day workspace together. Daily check-ins, shared tasks, milestone tracking and a streak system. Real structure. Real accountability."
    },
    {
      number: "04",
      emoji: "🌍",
      title: "Launch Pad",
      description: "On day 30 your project gets a public page automatically. Your name on it. Your work. Visible to the world — clients, companies, investors."
    }
  ];

  return (
    <section id="how" className="py-24 px-6 bg-white">

      <div className="text-center mb-16">
        <div className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          How it works
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900">
          From idea to shipped in 4 steps
        </h2>
        <p className="text-gray-400 mt-4 text-lg max-w-lg mx-auto">
          No more building alone. No more dead projects. Just you, the right person, and 30 days.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div key={step.number} className="bg-purple-50 rounded-2xl p-6 hover:shadow-lg transition">
            <div className="text-purple-300 font-bold text-sm mb-3">
              {step.number}
            </div>
            <div className="text-4xl mb-4">
              {step.emoji}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-500 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}

export default HowItWorks;