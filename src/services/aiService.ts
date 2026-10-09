export interface AiStylistResponse {
  message: string;
  changes: {
    color: string | null;
    style: string | null;
  };
  reason: string;
}

const fallbackResponse = (context: any): AiStylistResponse => {
  const isMale = context.gender === 'nam';
  const colors = context.validColors || [];
  
  // Try to pick a different style
  const newStyle = context.currentStyle === 'Truyền thống' ? 'Gen Z' : 'Truyền thống';
  
  // Try to pick a different color, otherwise pick first
  let newColor = colors.length > 0 ? colors[0].id : (isMale ? 'navy' : 'cream');
  if (colors.length > 1) {
    const otherColors = colors.filter((c: any) => c.id !== context.currentColor);
    if (otherColors.length > 0) {
      newColor = otherColors[Math.floor(Math.random() * otherColors.length)].id;
    }
  }

  return {
    message: "Gợi ý tự động (Chế độ Demo) ✨",
    changes: {
      color: newColor,
      style: newStyle
    },
    reason: 'Với không gian ' + context.event + ', phong cách ' + newStyle + ' và tông màu này tạo nên sự cân bằng hoàn hảo, giúp bạn nổi bật mà vẫn tinh tế.'
  };
};

export const getAiSuggestion = async (context: any): Promise<AiStylistResponse> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    return new Promise(resolve => setTimeout(() => resolve(fallbackResponse(context)), 800));
  }

  const validColorsStr = context.validColors ? context.validColors.map((c: any) => c.id).join(', ') : '';
  const validStylesStr = context.validStyles ? context.validStyles.join(', ') : 'Truyền thống, Gen Z';

  const prompt = 'Bạn là AI Stylist chuyên về Việt phục.\n' +
'Context hiện tại:\n' +
'- Giới tính: ' + context.gender + '\n' +
'- Dịp: ' + context.event + '\n' +
'- Đang chọn bộ: ' + context.clothingName + '\n' +
'- Các màu hợp lệ của bộ này (CHỈ ĐƯỢC CHỌN 1 TRONG SỐ NÀY): ' + validColorsStr + '\n' +
'- Màu đang mặc: ' + context.currentColor + '\n' +
'- Phong cách hiện tại: ' + context.currentStyle + '\n\n' +
'Hãy đưa ra MỘT gợi ý MỚI (ưu tiên khác với màu/phong cách hiện tại) phù hợp nhất với dịp sự kiện.\n' +
'Trả về JSON chính xác theo format (không Markdown, không bọc `json):\n' +
'{\n' +
'  "message": "lời nhận xét 1 câu",\n' +
'  "changes": {\n' +
'    "color": "id_màu_được_chọn",\n' +
'    "style": "tên_phong_cách_được_chọn"\n' +
'  },\n' +
'  "reason": "Giải thích vì sao lại gợi ý như vậy"\n' +
'}\n\n' +
'RÀNG BUỘC TUYỆT ĐỐI:\n' +
'1. "color" PHẢI nằm trong danh sách màu hợp lệ: [' + validColorsStr + ']. Không được bịa ra màu khác.\n' +
'2. "style" PHẢI là một trong: [' + validStylesStr + '].';

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7 }
      })
    });

    if (!response.ok) throw new Error("API Error");

    const data = await response.json();
    let text = data.candidates[0].content.parts[0].text;
    text = text.replace(/`json/g, '').replace(/`/g, '').trim();
    
    const parsed = JSON.parse(text) as AiStylistResponse;
    // Validate output
    if (context.validColors && !context.validColors.some((c: any) => c.id === parsed.changes?.color)) {
      throw new Error("AI trả về màu không hợp lệ");
    }
    if (parsed.changes?.style !== 'Truyền thống' && parsed.changes?.style !== 'Gen Z') {
      throw new Error("AI trả về phong cách không hợp lệ");
    }
    return parsed;
  } catch (error) {
    console.error("AI Stylist Error:", error);
    return fallbackResponse(context);
  }
};

export interface GenerateImageContext {
  outfitName: string;
  selectedColor: string;
  selectedAccessory: string;
  selectedStyle: string;
  baseImageSrc: string;
}

export const generateVisualTryOn = async (context: GenerateImageContext): Promise<string> => {
  try {
    const response = await fetch('/api/gemini-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(context)
    });
    
    if (!response.ok) {
      throw new Error('Backend missing or error: ' + response.status);
    }
    
    const data = await response.json();
    return data.generatedImageBase64 || data.generatedImageUrl;
  } catch (error) {
    console.error("Visual Try-on Error:", error);
    throw error;
  }
};
