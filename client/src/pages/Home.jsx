import React from 'react';

function Home() {
  return (
    <section className="h-[81vh] flex items-center justify-center bg-gradient-to-r from-[#312e81] via-black to-gray-900 text-white">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Welcome to the Blog Website
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-light">
          Here you can <span className="font-semibold text-indigo-400">"CREATE"</span> and <span className="font-semibold text-indigo-400">"READ"</span> blogs with ease.
        </p>
        <div className="mt-8">
          <button
            className="px-6 py-3 bg-[#4c3fc4] hover:bg-[#6357e5] text-white font-medium text-lg rounded-full shadow-lg transition duration-300"
            onClick={() => window.location.href = '/feed'}
          >
            Explore Blogs
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
