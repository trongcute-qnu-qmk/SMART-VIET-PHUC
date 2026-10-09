import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStylingStore } from '../store/useStylingStore';
import dataset from '../data/dataset.json';
import { maleOutfits } from '../data/maleOutfits';
import { Bookmark, RefreshCw, LayoutGrid, Sparkles } from 'lucide-react';
import { Stepper } from '../components/Stepper';
import { Button } from '../components/Button';
import { getModelImage } from '../utils/modelImage';
import { getOutfitImage, getCombinationImage } from '../utils/imageHelper';

const defaultFemaleColors = [
  { id: 'xanh-luc', name: 'Xanh lục trầm', hex: '#1b5b43' },
  { id: 'kem', name: 'Kem', hex: '#f9f6f0' },
  { id: 'xanh-than', name: 'Xanh than', hex: '#1e3a8a' },
  { id: 'nau-dat', name: 'Nâu đất', hex: '#78350f' },
  { id: 'do-do', name: 'Đỏ đô', hex: '#7f1d1d' },
];

const colorHexMap: Record<string, string> = {
  red: '#7f1d1d',
  brown: '#78350f',
  cream: '#f9f6f0',
  green: '#1b5b43',
  navy: '#1e3a8a'
};

const Result = () => {
  const navigate = useNavigate();
  const { gender, event, clothingId, color, style, accessories, reset, generatedPreview } = useStylingStore();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!clothingId) {
      navigate('/step-1');
    }
  }, [clothingId, navigate]);

  useEffect(() => {
    setIsSaved(false);
  }, [clothingId, color, style, gender, event]);

  if (!clothingId) {
    return null;
  }

  const isMale = gender === 'nam';

  let item: any = null;
  let activeColors: { id: string; name: string; hex: string }[] = [];
  let mainImageSrc = getModelImage(gender);
  let saveImageSrc = '';

  if (isMale) {
    const maleItem = (maleOutfits || []).find(o => o.id === clothingId);
    item = maleItem;
    if (maleItem) {
      const safeColors = maleItem.colors || [];
      activeColors = safeColors.map(c => ({
        id: c.key,
        name: c.label || c.key,
        hex: colorHexMap[c.key] || '#cccccc'
      }));
      
      const fallbackImage = getOutfitImage(maleItem, color || '', style);
      const combinationImage = getCombinationImage(clothingId, color || '', accessories || []);
      
      mainImageSrc = (clothingId === 'nam-bo-disan-remix' || clothingId === 'nu-di-san-remix') ? fallbackImage : (generatedPreview || combinationImage || fallbackImage);
      saveImageSrc = mainImageSrc;
    }
  } else {
    item = (dataset?.items || []).find((i: any) => i.id === clothingId);
    if (item && item.colors) {
      activeColors = item.colors.map((c: any) => ({
        id: c.key,
        name: c.name,
        hex: c.hex
      }));
      const fallbackImage = getOutfitImage(item, color || '', style);
      const combinationImage = getCombinationImage(clothingId, color || '', accessories || []);
      mainImageSrc = (clothingId === 'nam-bo-disan-remix' || clothingId === 'nu-di-san-remix') ? fallbackImage : (generatedPreview || combinationImage || fallbackImage);
      saveImageSrc = mainImageSrc;
    } else {
      activeColors = defaultFemaleColors;
      if (item) {
        mainImageSrc = generatedPreview || getModelImage(gender);
        saveImageSrc = generatedPreview || (item.images && item.images.length > 0 ? `/assets/${item.images[0]}` : '');
      }
    }
  }

  if (!item) return null;

  const colorData = activeColors.find(c => c.id === color) || { id: color, name: color || 'Nguyên bản', hex: '#cccccc' };
  const safeAccessories = accessories || [];
  
  const aiReason = `Bộ trang phục ${item?.name || ''} kết hợp cùng màu ${colorData?.name || 'nguyên bản'} và phong cách ${style || 'truyền thống'} tạo nên sự cân bằng hoàn hảo. Các chi tiết tôn vinh nét đẹp văn hóa Việt, rất phù hợp cho không gian ${event}.`;

  const handleSaveLookbook = () => {
    if (isSaved) return;

    const newLook = {
      id: Date.now().toString(),
      clothingId,
      image: saveImageSrc,
      name: item?.name || 'Outfit',
      gender,
      event,
      color: colorData?.name || 'Nguyên bản',
      colorKey: color,
      style: style || 'Tự do',
      accessories: safeAccessories,
      createdAt: new Date().toISOString()
    };

    let existing = [];
    try {
      const existingStr = localStorage.getItem('smart_viet_phuc_lookbook');
      if (existingStr) existing = JSON.parse(existingStr);
    } catch(e) {
      console.error('Lỗi khi đọc Lookbook', e);
    }
    
    try {
      localStorage.setItem('smart_viet_phuc_lookbook', JSON.stringify([newLook, ...existing]));
      setIsSaved(true);
      alert('Đã lưu bộ phối của bạn!');
    } catch(e) {
      alert('Không thể lưu bộ sưu tập. Bộ nhớ có thể đã đầy.');
    }
  };

  const handleRestart = () => {
    reset();
    navigate('/step-1');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col relative overflow-x-hidden animate-in fade-in duration-500">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex-grow flex flex-col w-full relative z-10">
        
        <Stepper currentStep={6} />

        <div className="text-center mb-10">
           <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B4A38] drop-shadow-sm mb-4">
             DẤU ẤN VIỆT CỦA BẠN
           </h2>
           <p className="text-gray-600 font-medium max-w-2xl mx-auto">Một sắc màu riêng, một phong cách riêng, mang tinh thần Việt.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 flex-grow items-start">
          
          <div className="lg:w-[55%] w-full flex flex-col gap-6">
             <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[750px] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/50 bg-gray-50 flex items-center justify-center">
               <img
                 src={mainImageSrc}
                 alt={item.name}
                 className="absolute inset-0 w-full h-full object-contain"
               />
             </div>
             
             <div className="bg-white/95 backdrop-blur-md rounded-[24px] p-6 shadow-xl border border-white/50 text-center mx-auto w-full max-w-md relative -mt-12 z-10">
               <h2 className="text-3xl font-serif font-bold text-[#0B4A38] mb-1">{item.name}</h2>
               <p className="text-[12px] font-bold uppercase tracking-widest text-[#C89B45]">{event} • {gender === 'nam' ? 'NAM' : 'NỮ'}</p>
             </div>
          </div>

          <div className="lg:w-[45%] w-full flex flex-col gap-6 sticky top-24">
             
             <div className="bg-white/95 backdrop-blur-md rounded-[24px] p-8 shadow-xl border border-white/50">
               
               <div className="bg-[#f9f6f0] rounded-[20px] p-6 border border-[#C89B45]/10 mb-8 relative">
                 <div className="absolute -top-3 left-8 w-6 h-6 bg-[#f9f6f0] transform rotate-45 border-l border-t border-[#C89B45]/10"></div>
                 <h4 className="font-bold text-[#0B4A38] text-[13px] mb-3 flex items-center gap-2 uppercase tracking-wide">
                   <Sparkles className="w-4 h-4 text-[#C89B45]" /> CÂU CHUYỆN ĐẰNG SAU BỘ PHỐI
                 </h4>
                 <p className="text-gray-700 text-sm leading-relaxed font-medium">
                   "{aiReason}"
                 <p className="text-[11px] text-[#0B4A38]/50 mt-4 italic text-center leading-relaxed">Gợi ý phối đồ mang tính tham khảo, không phải đánh giá tuyệt đối về thẩm mỹ hoặc quy chuẩn văn hóa.</p>
                 </p>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Màu sắc</p>
                   <div className="flex items-center gap-2">
                     {colorData?.hex && <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: colorData.hex }}></div>}
                     <span className="font-bold text-gray-800 text-sm">{colorData?.name || color || 'Nguyên bản'}</span>
                   </div>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phong cách</p>
                   <p className="font-bold text-gray-800 text-sm">{style || 'Tự do'}</p>
                 </div>
               </div>

               <div className="flex flex-col gap-3">
                 <Button 
                   variant="primary"
                   onClick={() => isSaved ? navigate('/lookbook') : handleSaveLookbook()}
                   fullWidth
                   className="!h-14 flex items-center justify-center gap-2"
                 >
                   <Bookmark className="w-5 h-5" />
                   <span className="tracking-[0.1em] whitespace-nowrap font-black uppercase text-[15px]">
                     {isSaved ? 'XEM BỘ SƯU TẬP' : 'LƯU VÀO BỘ SƯU TẬP'}
                   </span>
                 </Button>
                 <div className="grid grid-cols-2 gap-3">
                   <Button 
                     variant="outline"
                     onClick={handleRestart}
                     fullWidth
                   >
                     <RefreshCw className="w-4 h-4 mr-2" /> PHỐI LẠI
                   </Button>
                   <Button 
                     variant="outline"
                     onClick={() => navigate('/step-3')}
                     fullWidth
                   >
                     <LayoutGrid className="w-4 h-4 mr-2" /> KHÁC
                   </Button>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Result;




