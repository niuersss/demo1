import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialize Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      geminiClient = new GoogleGenAI({ apiKey });
    }
  }
  return geminiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// AI cat profile text generator / polisher
app.post('/api/generate-cat-desc', async (req, res) => {
  try {
    const { name, breed, age, gender, tags, style } = req.body;
    const client = getGeminiClient();

    if (!client) {
      // Fallback creative template when API key is not configured
      const genderText = gender === 'boy' ? '男孩子(弟弟)' : '女孩子(妹妹)';
      const tagsText = Array.isArray(tags) && tags.length > 0 ? tags.join('、') : '超级亲人、温顺粘人';
      const fallbackDesc = `${name || '小可爱'}是一只超治愈的${breed || '小猫咪'}，今年${age || '小宝宝'}，是个性格软糯的${genderText}。平时最喜欢${tagsText}，一摸就开启呼噜小马达，还会用脑袋主动蹭人撒娇！食欲好、身体棒，已经准备好带着满满的治愈力来到你的身边啦～`;
      return res.json({ description: fallbackDesc, source: 'smart_template' });
    }

    const prompt = `你是一个专业的猫咪救助与领养文案专家，请为一只待预约/领养的小猫咪写一段充满暖意、萌感、吸引人且真实的中文介绍（120-180字之间）。
猫咪信息：
- 昵称：${name || '未知小猫'}
- 品种：${breed || '可爱中华田园猫'}
- 年龄：${age || '幼猫'}
- 性别：${gender === 'boy' ? '公(小男猫/弟弟)' : '母(小女猫/妹妹)'}
- 特点标签：${Array.isArray(tags) ? tags.join(', ') : '粘人亲人'}
- 风格诉求：${style || '暖心治愈、可爱萌动'}

要求：
1. 语言温暖亲切，突出小猫的可爱习性和治愈感；
2. 提及身体健康、性格亲人，让人心生喜爱；
3. 直接输出文案本身，不要包含任何前缀、问候或多余解释。`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const description = response.text?.trim() || '这是一只特别健康亲人的小猫咪，非常期待与你的温馨邂逅！';
    res.json({ description, source: 'gemini' });
  } catch (error: any) {
    console.error('Gemini generation error:', error);
    // Fallback gracefully so user experience is smooth
    const { name, breed, age, gender } = req.body;
    const fallback = `${name || '小猫'}是一只${age || '小月龄'}的${breed || '健康小猫'}，性格极其亲人软萌，会主动贴贴蹭手踩奶，体格健康底子好，期待一个温暖的家！`;
    res.json({ description: fallback, source: 'fallback' });
  }
});

async function setupApp() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

setupApp();
