import { outfitCombinations } from '../data/outfitCombinations';

export const getOutfitImage = (outfit: any, color: string, style?: string | null) => {
  if (!outfit) return '/assets/images/default.jpg';

  if (outfit.id === 'nam-bo-disan-remix') {
    const prefix = style === 'Gen Z' ? 'genz' : 'traditional';
    const safeColor = color || outfit.representativeColor || 'navy';
    return `/assets/images/male-remix/${prefix}-${safeColor}.png`;
  }
  
  if (outfit.id === 'nu-di-san-remix') {
    const prefix = style === 'Gen Z' ? 'genz' : 'traditional';
    const safeColor = color || outfit.representativeColor || 'cream';
    return `/assets/images/female-remix/${prefix}-${safeColor}.jpg`;
  }

  const selected = outfit.colors?.find((c: any) => c.key === color);
  if (selected?.image) return selected.image;

  const representative = outfit.colors?.find(
    (c: any) => c.key === outfit.representativeColor
  );
  if (representative?.image) return representative.image;

  if (outfit.colors?.[0]?.image) return outfit.colors[0].image;

  return outfit.image ?? '/assets/images/default.jpg';
};

export const getCombinationImage = (clothingId: string | null | undefined, colorKey: string | null | undefined, accessories: string[] | null | undefined): string | null => {
  if (!clothingId || !colorKey) return null;
  
  // Không dùng ảnh phối phụ kiện cũ ghi đè lên 20 ảnh preset mới
  if (clothingId === 'nam-bo-disan-remix' || clothingId === 'nu-di-san-remix') {
    return null;
  }
  
  const normalize = (str: string) => str.toLowerCase().replace(/đ/g, 'd').normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
  const safeAccs = accessories || [];
  const acc = safeAccs.find(a => a !== 'Không dùng');
  const accSlug = acc ? normalize(acc) : 'khong-dung';
  
  const match = outfitCombinations.find(c => 
    c.outfitId === clothingId && 
    c.colorKey === colorKey && 
    (c.accessoryId === accSlug || c.accessoryId === acc)
  );
  
  return match ? match.imagePath : null;
};