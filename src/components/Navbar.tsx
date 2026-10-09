import { Menu, X, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AboutModal from './AboutModal';

const navLinks = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Về chúng tôi', to: '/' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFDF7]/85 backdrop-blur-[8px] border-b border-[#0B4A38]/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all h-[76px] flex items-center">
      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
          <div className="h-[54px] w-[54px] rounded-full overflow-hidden border border-[#C89B45]/30 bg-white p-0.5 transition-transform group-hover:scale-105 shadow-sm">
            <img src="/assets/logo.png" alt="Smart Việt Phục" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-black text-[#0B4A38] text-[17px] tracking-wide font-serif">SMART VIỆT PHỤC</div>
            <div className="text-[10px] text-[#C89B45] font-bold tracking-widest uppercase">MẶC BẢN SẮC - ĐI MUÔN NƠI</div>
          </div>
        </Link>

                {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            link.label === 'Về chúng tôi' ? (
              <button
                key={link.label}
                onClick={() => { setIsAboutOpen(true); setIsOpen(false); }}
                className="text-[16px] font-bold text-[#233B33] hover:text-[#0B4A38] hover:underline underline-offset-4 decoration-2 decoration-[#C89B45]/60 transition-all whitespace-nowrap"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className="text-[16px] font-bold text-[#233B33] hover:text-[#0B4A38] hover:underline underline-offset-4 decoration-2 decoration-[#C89B45]/60 transition-all whitespace-nowrap"
              >
                {link.label}
              </Link>
            )
          ))}
          <Link
            to="/lookbook"
            className="flex items-center gap-1.5 text-[16px] font-bold text-[#0B4A38] hover:text-[#1b5b43] hover:underline underline-offset-4 decoration-2 decoration-[#C89B45]/60 transition-all whitespace-nowrap"
          >
            <Bookmark className="w-4 h-4 fill-current" />
            BỘ SƯU TẬP CỦA TÔI
          </Link>
        </div>

        {/* Right: Mobile menu button only */}
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#0B4A38] p-2 rounded-lg hover:bg-black/5 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

            {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-[76px] left-0 w-full bg-[#FFFDF7] border-b border-gray-100 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-6 py-6 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              link.label === 'Về chúng tôi' ? (
                <button
                  key={link.label}
                  onClick={() => { setIsAboutOpen(true); setIsOpen(false); }}
                  className="block text-left text-lg font-bold text-[#233B33] hover:text-[#0B4A38] w-full"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-bold text-[#233B33] hover:text-[#0B4A38]"
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link
              to="/lookbook"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-lg font-bold text-[#0B4A38]"
            >
              <Bookmark className="w-5 h-5 fill-current" />
              BỘ SƯU TẬP CỦA TÔI
            </Link>
          </div>
        </div>
      )}

      {/* About Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </nav>
  );
};

export default Navbar;



