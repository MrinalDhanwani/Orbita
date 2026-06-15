function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
      
      <div className="text-2xl font-bold text-purple-600">
        🪐 Orbita
      </div>

      <div className="flex items-center gap-8">
        <a href="#how" className="text-gray-500 hover:text-purple-600 transition">
          How it works
        </a>
        <a href="#why" className="text-gray-500 hover:text-purple-600 transition">
          Why Orbita
        </a>
        <button className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition font-medium">
          Join Waitlist
        </button>
      </div>

    </nav>
  );
}

export default Navbar;