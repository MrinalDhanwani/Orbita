function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">

      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-10">

          <div className="max-w-xs">
            <div className="text-2xl font-bold text-purple-400 mb-4">
              🪐 Orbita
            </div>
            <p className="text-gray-400 leading-relaxed">
              Find your perfect co-builder. Ship something real in 30 days. Built for the next generation of builders.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Product
            </div>
            <div className="flex flex-col gap-3">
              <a href="#how" className="text-gray-300 hover:text-purple-400 transition">
                How it works
              </a>
              <a href="#why" className="text-gray-300 hover:text-purple-400 transition">
                Why Orbita
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition">
                Join Waitlist
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Connect
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-gray-300 hover:text-purple-400 transition">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition">
                GitHub
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="bg-purple-900 rounded-2xl p-6 max-w-xs">
            <div className="text-lg font-bold mb-2">
              Join the waitlist
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Be the first to know when Orbita launches.
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-full text-sm mb-3 outline-none border border-gray-700 focus:border-purple-400"
            />
            <button className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-2 rounded-full text-sm font-semibold">
              Notify Me →
            </button>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © 2026 Orbita. Built with 🪐 by Team Orbita.
          </div>
          <div className="text-gray-500 text-sm">
            Made with ❤️ 
          </div>
        </div>

      </div>

    </footer>
  );
}

export default Footer;