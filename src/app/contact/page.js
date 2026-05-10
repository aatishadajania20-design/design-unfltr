export default function ContactPage() {
  return (
    <main className="bg-black text-white min-h-screen px-8 py-20">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <h1 className="text-6xl md:text-8xl font-bold">
          Contact
        </h1>

        {/* INSTAGRAM SVG */}
        <a
          href="https://www.instagram.com/unfltrr?igsh=MWN0Y2ozZjk4NHpubQ=="
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-orange-500 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37a4 4 0 1 1-4.74-4.74 4 4 0 0 1 4.74 4.74z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>

      </div>

      <p className="text-gray-400 mt-6 max-w-2xl text-lg">
        Let’s build something powerful together — branding, strategy, marketing, or full creative direction.
      </p>

      {/* FORM */}
      <form
        action="https://formsubmit.co/unfltrstudios@gmail.com"
        method="POST"
        className="mt-16 max-w-xl space-y-6"
      >

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-4 bg-zinc-900 rounded-xl outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-4 bg-zinc-900 rounded-xl outline-none"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          className="w-full p-4 bg-zinc-900 rounded-xl outline-none h-40"
          required
        />

        <button
          type="submit"
          className="bg-orange-500 text-black px-8 py-4 rounded-xl font-medium hover:scale-105 transition"
        >
          Send Message
        </button>

      </form>

    </main>
  );
}