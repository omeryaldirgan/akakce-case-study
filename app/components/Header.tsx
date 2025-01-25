import { useState, useEffect } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" className="flex items-center">
          <img
            src={darkMode ? "/logo-dark.svg" : "/logo-light.svg"}
            alt="Akakçe"
            className="h-12"
          />
        </a>
        <div className="flex items-center space-x-4">
          <a
            href="/signup"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            Hesap Aç
          </a>
          <a
            href="/login"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            Giriş Yap
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}
