/**
 * OpenAI 기반 콘텐츠 생성 API
 */

interface ContentRequest {
  type: 'tweet' | 'thread' | 'post' | 'email' | 'ad';
  topic: string;
  platform: 'twitter' | 'linkedin' | 'reddit' | 'blog';
  tone?: 'professional' | 'friendly' | 'humorous';
  language?: 'ko' | 'en';
}

interface ContentResponse {
  content: string;
  tokens?: number;
}

// 프롬프트 템플릿
const PROMPTS = {
  twitter: {
    tweet: (topic: string) => `당신은 AI 프롬프트 전문가입니다.

${topic}에 대한 흥미로운 트윗을 작성해주세요.

요구사항:
- 280자 이내
- 이모지 적절히 사용
- 해시태그 2-3개 포함
- 참여를 유도하는 질문이나 CTA 포함

톤: 친근하고 전문적인`,
    thread: (topic: string) => `당신은 AI 프롬프트 전문가입니다.

${topic}에 대한 트위터 스레드를 작성해주세요.

요구사항:
- 5-10개의 트윗으로 구성
- 각 트윗 280자 이내
- 첫 트윗은 훅으로 시작
- 마지막 트윗은 CTA로 마무리
- 이모지 적절히 사용

각 트윗 사이에 ---로 구분해서 출력하세요.`,
  },
  linkedin: {
    post: (topic: string) => `당신은 AI 비즈니스 컨설턴트입니다.

${topic}에 대한 LinkedIn 포스트를 작성해주세요.

요구사항:
- 전문적인 톤
- 500-1000자
- 개인적 경험이나 인사이트 포함
- 명확한 구조 (문제-해결-결과)
- 해시태그 3-5개

한국어로 작성하세요.`,
  },
  blog: {
    post: (topic: string) => `당신은 AI 생산성 전문가입니다.

${topic}에 대한 블로그 포스트를 작성해주세요.

요구사항:
- 제목 (H1)
- 소개
- 3-5개의 섹션
- 실용적인 팁과 예시
- 결론 및 CTA
- SEO 최적화

마크다운 형식으로 작성하세요.`,
  },
};

// OpenAI API로 콘텐츠 생성
export async function generateContent(request: ContentRequest): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.log('⚠️ OpenAI API 키 없음 - Mock 콘텐츠 반환');
    return getMockContent(request);
  }

  const promptTemplate = PROMPTS[request.platform]?.[request.type];
  if (!promptTemplate) {
    throw new Error(`지원하지 않는 콘텐츠 타입: ${request.platform}/${request.type}`);
  }

  const prompt = promptTemplate(request.topic);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: '당신은 AI 콘텐츠 마케팅 전문가입니다. 한국어로 자연스럽고 매력적인 콘텐츠를 작성합니다.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('콘텐츠 생성 실패:', error);
    return getMockContent(request);
  }
}

// Mock 콘텐츠 (API 키 없을 때)
function getMockContent(request: ContentRequest): string {
  const mockContents: Record<string, string> = {
    'twitter/tweet': `🧵 ${request.topic}

AI를 활용하면 생산성을 크게 높일 수 있습니다!

핵심은 정확한 프롬프트입니다.

👉 무료 가이드: [링크]

#AI #ChatGPT #생산성`,
    'twitter/thread': `🧵 ${request.topic} 완벽 가이드

1/ AI를 제대로 활용하면 업무 시간을 70% 줄일 수 있습니다.

---

2/ 하지만 "그냥 써봐"라고만 하면 평범한 결과만 나와요.

---

3/ 핵심은 정확한 프롬프트입니다.

---

💡 무료 체크리스트: [링크]

#AI #ChatGPT`,
    'linkedin/post': `${request.topic}에 대한 인사이트

AI를 제대로 활용하면 마케팅 효율을 70% 높일 수 있습니다.

핵심은:
1. 명확한 목표 설정
2. 구체적인 프롬프트
3. 지속적인 최적화

더 많은 팁은 프로필 링크에서!

#AI #마케팅 #생산성`,
    'blog/post': `# ${request.topic}

## 소개

AI를 활용하면 업무 생산성을 크게 높일 수 있습니다.

## 핵심 원칙

1. 명확한 목표 설정
2. 구체적인 프롬프트 작성
3. 지속적인 개선

## 실전 팁

...

## 결론

지금 바로 시작하세요!

👉 [무료 가이드 다운로드](링크)`,
  };

  const key = `${request.platform}/${request.type}`;
  return mockContents[key] || `# ${request.topic}\n\nOpenAI API 키를 제공하면 자동 생성됩니다.`;
}

// 이미지 검색 (Pexels/Unsplash)
export async function searchImage(query: string): Promise<string | null> {
  const pexelsKey = process.env.PEXELS_API_KEY;
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;

  // Pexels 우선
  if (pexelsKey) {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
        {
          headers: { 'Authorization': pexelsKey },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.photos?.[0]) {
          return data.photos[0].src.large;
        }
      }
    } catch (error) {
      console.error('Pexels 검색 실패:', error);
    }
  }

  // Unsplash fallback
  if (unsplashKey) {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1`,
        {
          headers: { 'Authorization': `Client-ID ${unsplashKey}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.results?.[0]) {
          return data.results[0].urls.regular;
        }
      }
    } catch (error) {
      console.error('Unsplash 검색 실패:', error);
    }
  }

  // Mock 이미지
  console.log('⚠️ 이미지 API 키 없음 - Mock 이미지 반환');
  return `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800`;
}
