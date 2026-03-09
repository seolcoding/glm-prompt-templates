// 이미지 검색 API - Pexels/Unsplash에서 고품질 이미지 찾기
// 실행: npx ts-node apps/api/image-search.ts

import http from 'http';

const PORT = 3002;

// Pexels API (무료)
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || '';

// Unsplash API (무료)
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || '';

interface ImageResult {
  id: string;
  url: string;
  thumbnail: string;
  source: string;
  photographer?: string;
  alt_description?: string;
}

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // 이미지 검색
  if (req.method === 'GET' && req.url?.startsWith('/api/images/search')) {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const query = url.searchParams.get('q') || 'ai technology';
    const count = parseInt(url.searchParams.get('count') || '5');
    const source = url.searchParams.get('source') || 'pexels';

    searchImages(query, count, source)
      .then(images => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ images, query, count }));
      })
      .catch(err => {
        console.error('Image search error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      });
    return;
  }

  // 랜덤 이미지
  if (req.method === 'GET' && req.url?.startsWith('/api/images/random')) {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const category = url.searchParams.get('category') || 'technology';

    getRandomImage(category)
      .then(image => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(image));
      })
      .catch(err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      });
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

async function searchPexels(query: string, count: number): Promise<ImageResult[]> {
  if (!PEXELS_API_KEY) {
    return mockImages(query, count, 'pexels');
  }

  return new Promise((resolve, reject) => {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&locale=ko-KR`;

    http.get(url, {
      headers: { 'Authorization': PEXELS_API_KEY }
    }, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        try {
          const json = JSON.parse(data);
          const images: ImageResult[] = json.photos.map((p: any) => ({
            id: `pexels-${p.id}`,
            url: p.src.large,
            thumbnail: p.src.tiny,
            source: 'pexels',
            photographer: p.photographer,
            alt_description: p.alt
          }));
          resolve(images);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function searchUnsplash(query: string, count: number): Promise<ImageResult[]> {
  if (!UNSPLASH_ACCESS_KEY) {
    return mockImages(query, count, 'unsplash');
  }

  return new Promise((resolve, reject) => {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}`;

    http.get(url, {
      headers: { 'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}` }
    }, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        try {
          const json = JSON.parse(data);
          const images: ImageResult[] = json.results.map((r: any) => ({
            id: `unsplash-${r.id}`,
            url: r.urls.regular,
            thumbnail: r.urls.thumb,
            source: 'unsplash',
            photographer: r.user?.name,
            alt_description: r.alt_description
          }));
          resolve(images);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function searchImages(query: string, count: number, source: string): Promise<ImageResult[]> {
  if (source === 'unsplash') {
    return searchUnsplash(query, count);
  }
  return searchPexels(query, count);
}

async function getRandomImage(category: string): Promise<ImageResult> {
  const queries: Record<string, string[]> = {
    technology: ['laptop', 'computer', 'tech', 'coding'],
    business: ['office', 'meeting', 'business', 'startup'],
    marketing: ['marketing', 'social media', 'advertising'],
    productivity: ['workspace', 'desk', 'notes', 'planning'],
    ai: ['artificial intelligence', 'robot', 'automation', 'future']
  };

  const categoryQueries = queries[category] || queries.technology;
  const randomQuery = categoryQueries[Math.floor(Math.random() * categoryQueries.length)];

  const images = await searchPexels(randomQuery, 1);
  return images[0] || mockImages(randomQuery, 1, 'pexels')[0];
}

function mockImages(query: string, count: number, source: string): ImageResult[] {
  // API 키가 없을 때 목업 이미지 반환
  const mockUrls = [
    'https://images.unsplash.com/photo-1485827404703-89b55fcc18f4?w=800',
    'https://images.unsplash.com/photo-1518770660439-463e19f8894?w=800',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc38c3?w=800',
    'https://images.unsplash.com/photo-1550751827-4bd464c1f6c5?w=800',
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `${source}-mock-${i}`,
    url: mockUrls[i % mockUrls.length],
    thumbnail: mockUrls[i % mockUrls.length] + '?w=200',
    source: source,
    photographer: 'Mock Data',
    alt_description: `${query} 관련 이미지 (API 키 필요)`
  }));
}

server.listen(PORT, () => {
  console.log(`🖼️  Image Search API running at http://localhost:${PORT}`);
  console.log(`  GET /api/images/search?q=키워드&count=5&source=pexels`);
  console.log(`  GET /api/images/random?category=technology`);
  console.log(`\n  API 키 설정:`);
  console.log(`  PEXELS_API_KEY - https://www.pexels.com/api/`);
  console.log(`  UNSPLASH_ACCESS_KEY - https://unsplash.com/developers`);
});
