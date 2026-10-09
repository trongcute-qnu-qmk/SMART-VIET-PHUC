import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Eye, Calendar, Sparkles, Edit2 } from 'lucide-react';
import { useStylingStore } from '../store/useStylingStore';

const Lookbook = () => {
  const navigate = useNavigate();
  const [looks, setLooks] = useState<any[]>([]);
  const { setField } = useStylingStore();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('smart_viet_phuc_lookbook');
      if (saved) {
        setLooks(JSON.parse(saved));
      }
    } catch(e) {
      console.error('Lỗi đọc Lookbook', e);
    }
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bộ phối này?')) {
      const updated = looks.filter(l => l.id !== id);
      setLooks(updated);
      localStorage.setItem('smart_viet_phuc_lookbook', JSON.stringify(updated));
    }
  };

  const handleRestore = (look: any, path: string) => {
    setField('gender', look.gender || 'nu');
    setField('event', look.event || 'Lễ hội');
    setField('clothingId', look.clothingId);
    setField('color', look.colorKey || look.color || 'kem');
    setField('style', look.style || 'Truyền thống');
    setField('accessories', look.accessories || []);
    setField('generatedPreview', look.image);
    navigate(path);
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col relative overflow-x-hidden animate-in fade-in duration-500">
      <div className="max-w-[1400px] mx-auto px-4 py-12 flex-grow flex flex-col w-full relative z-10">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B4A38] mb-4">BỘ SƯU TẬP CỦA TÔI</h1>
          <p className="text-gray-600 font-medium">Những dấu ấn Việt mang sắc màu của riêng bạn.</p>
        </div>

        {looks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white/50 backdrop-blur-sm rounded-[32px] border border-dashed border-[#0B4A38]/20 shadow-sm max-w-2xl mx-auto w-full">
             <div className="w-24 h-24 bg-[#0B4A38]/5 rounded-full flex items-center justify-center text-[#C89B45] mb-6">
               <Sparkles className="w-12 h-12" />
             </div>
             <h3 className="text-2xl font-serif font-bold text-[#0B4A38] mb-3">Bạn chưa lưu dấu ấn Việt nào.</h3>
             <p className="text-gray-500 mb-8 text-center px-6 max-w-md">Mỗi bộ phối là một cách thể hiện bản sắc riêng. Hãy bắt đầu khám phá và lưu lại phong cách bạn yêu thích.</p>
             <button 
               onClick={() => navigate('/step-1')}
               className="px-10 py-4 bg-[#0B4A38] text-[#FFFDF7] font-bold rounded-full hover:bg-[#00FA9A] hover:text-[#0B4A38] transition-all shadow-md tracking-wide uppercase text-sm"
             >
               BẮT ĐẦU PHỐI ĐỒ
             </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {looks.map(look => (
              <div key={look.id} className="bg-white rounded-[24px] overflow-hidden shadow-lg border border-gray-100 group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                  <img src={look.image} alt={look.name} className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>

                <div className="p-6 flex flex-col gap-4 bg-white border-t border-gray-50 relative z-10 flex-grow">
                  <div>
                    <h3 className="text-xl font-serif font-bold mb-1 text-[#0B4A38] line-clamp-1">{look.name}</h3>
                    <p className="text-[11px] uppercase tracking-widest font-bold text-[#C89B45]">{look.event} • {look.gender === 'nam' ? 'NAM' : 'NỮ'}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm text-[#233B33] bg-[#f9f6f0] p-3 rounded-xl border border-[#C89B45]/10 flex-grow">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-gray-400 mb-0.5">Màu sắc</span>
                      <span className="font-bold truncate">{look.color}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-gray-400 mb-0.5">Phong cách</span>
                      <span className="font-bold truncate">{look.style}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                    <Calendar className="w-3.5 h-3.5"/> {new Date(look.createdAt).toLocaleDateString('vi-VN')}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => handleRestore(look, '/result')}
                      className="py-3 rounded-xl bg-[#0B4A38]/5 text-[#0B4A38] font-bold hover:bg-[#0B4A38] hover:text-white transition-colors flex flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-widest"
                    >
                      <Eye className="w-4 h-4" /> Xem lại
                    </button>
                    <button 
                      onClick={() => handleRestore(look, '/step-4')}
                      className="py-3 rounded-xl bg-[#C89B45]/10 text-[#a07c37] font-bold hover:bg-[#C89B45] hover:text-white transition-colors flex flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-widest"
                    >
                      <Edit2 className="w-4 h-4" /> Phối tiếp
                    </button>
                    <button 
                      onClick={() => handleDelete(look.id)}
                      className="py-3 rounded-xl bg-red-50 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-colors flex flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-widest"
                    >
                      <Trash2 className="w-4 h-4" /> Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lookbook;

