const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/dataset.json', 'utf8'));

// Filter out old female outfits
data.items = data.items.filter(item => item.gender !== 'female');

// Add new female outfit
data.items.push({
  id: "nu-di-san-remix",
  gender: "female",
  name: "Áo Tấc Nữ – Di Sản & Remix",
  category: "Bộ sưu tập kép",
  period_region: "Nữ - Di sản & Hiện đại",
  source: "Smart Việt Phục",
  images: [
    "images/female-remix/traditional-cream.jpg",
    "images/female-remix/genz-cream.jpg"
  ],
  image: "/assets/images/female-remix/traditional-cream.jpg",
  representativeColor: "cream",
  origin: "Truyền thống: Áo Tấc gắn với lịch sử trang phục Việt Nam thời Nguyễn, mang tính trang trọng, sử dụng trong nghi lễ. \nGen Z: Áo dài nữ cách tân lấy cảm hứng từ trang phục truyền thống Việt Nam, giữ tinh thần kín đáo thanh lịch.",
  features: "Mẫu Truyền thống: áo dáng rộng, tay rộng, chi tiết trang trí nghi lễ, khăn đội đầu và cách phối cổ điển. \nMẫu Gen Z: áo dài nữ cách tân kết hợp kính mắt, túi cói, trang sức và cách phối đương đại.",
  meaning_context: "Truyền thống: Phù hợp những bối cảnh lễ nghi, trang trọng, kế thừa di sản văn hóa. \nGen Z: Kế thừa tinh thần truyền thống kết hợp thẩm mỹ hiện đại trẻ trung.",
  web_tags: ["nữ", "áo tấc", "truyền thống", "gen z"],
  colors: [
    { key: "cream", name: "Trắng/kem", hex: "#f9f6f0", image: "/assets/images/female-remix/traditional-cream.jpg" },
    { key: "red", name: "Đỏ", hex: "#dc2626", image: "/assets/images/female-remix/traditional-red.jpg" },
    { key: "blue", name: "Xanh dương", hex: "#2563eb", image: "/assets/images/female-remix/traditional-blue.jpg" },
    { key: "yellow", name: "Vàng", hex: "#eab308", image: "/assets/images/female-remix/traditional-yellow.jpg" },
    { key: "green", name: "Xanh lá", hex: "#16a34a", image: "/assets/images/female-remix/traditional-green.jpg" }
  ]
});

fs.writeFileSync('src/data/dataset.json', JSON.stringify(data, null, 2));
console.log('Successfully patched dataset.json');
