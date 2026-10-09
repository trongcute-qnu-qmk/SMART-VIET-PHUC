export interface OutfitColor {
  key: string;
  label: string;
  image: string;
}

export interface MaleOutfit {
  id: string;
  name: string;
  category: string;
  tags: string[];
  representativeColor: string;
  colors: OutfitColor[];
}

export const oldMaleOutfits: MaleOutfit[] = [
  // ... hidden ...
];

export const maleOutfits: MaleOutfit[] = [
  {
    id: "nam-bo-disan-remix",
    name: "Áo Dài Nam – Di Sản & Remix",
    category: "Bộ sưu tập kép",
    tags: ["Nam", "Truyền thống", "Gen Z"],
    representativeColor: "navy",
    colors: [
      { key: "black", label: "Đen", image: "/assets/images/male-remix/traditional-black.png" },
      { key: "red", label: "Đỏ đô", image: "/assets/images/male-remix/traditional-red.png" },
      { key: "green", label: "Xanh ngọc trầm", image: "/assets/images/male-remix/traditional-green.png" },
      { key: "navy", label: "Xanh than", image: "/assets/images/male-remix/traditional-navy.png" },
      { key: "cream", label: "Kem ngà", image: "/assets/images/male-remix/traditional-cream.png" }
    ]
  }
];
