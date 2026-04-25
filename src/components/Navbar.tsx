"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Quiz", href: "/quiz" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "About", href: "/about" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              Overwatch Quiz
            </Link>
          </div>
          <div className="hidden sm:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Mobile menu button (could be added later) */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
