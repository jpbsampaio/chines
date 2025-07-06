'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/flashCards', label: 'FlashCards', icon: '🗃️' },
  ];

  return (
    <div className="relative h-screen">
      {/* Botão de toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${isOpen ? 'left-64' : 'left-16'} top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all duration-300 w-10 h-10 flex items-center justify-center`}
      >
        {isOpen ? '◀' : '▶'}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-[#1e293b] shadow-lg transition-all duration-300 ${
          isOpen ? 'w-64 p-6' : 'w-16 p-3'
        } flex flex-col gap-4 z-10`}
      >
        <h2 className={`font-bold text-white mb-6 ${isOpen ? 'text-2xl' : 'text-xs text-center'}`}>
          {isOpen ? 'Diário de Chinês' : '中文'}
        </h2>
        <nav className={'flex flex-col gap-2'}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded-lg transition ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-[#2d3d53] hover:text-blue-400'
              } ${!isOpen && 'justify-center'}`}
              title={!isOpen ? item.label : ''}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay quando a sidebar estiver aberta em telas pequenas */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}