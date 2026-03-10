/**
 * 콘텐츠 스케줄러
 * - 콘텐츠 큐 관리
 * - 예약 포스팅
 * - OpenAI 기반 콘텐츠 생성
 */

import { postTweet, postThread, addToQueue, getQueue, processQueue } from './twitter-post';
import { generateContent } from './content-generator';

interface ScheduleConfig {
  platform: 'twitter' | 'linkedin' | 'reddit' | 'blog';
  type: 'tweet' | 'thread' | 'post';
  topic?: string;
  scheduledAt: Date;
}

interface ContentItem {
  id: string;
  platform: string;
  type: string;
  content: string;
  status: 'draft' | 'scheduled' | 'posted' | 'failed';
  scheduledAt?: Date;
  postedAt?: Date;
  metrics?: {
    views?: number;
    likes?: number;
    shares?: number;
    clicks?: number;
  };
}

// 콘텐츠 저장소 (실제로는 DB 사용)
const contentStore: ContentItem[] = [];

// 스케줄에 따라 콘텐츠 생성
export async function scheduleContent(config: ScheduleConfig): Promise<ContentItem> {
  const id = `content_${Date.now()}`;

  let content: string;

  if (config.topic) {
    // OpenAI로 콘텐츠 생성
    content = await generateContent({
      type: config.type as any,
      topic: config.topic,
      platform: config.platform,
    });
  } else {
    // 미리 준비된 콘텐츠 사용
    content = await getNextReadyContent(config.platform);
  }

  const item: ContentItem = {
    id,
    platform: config.platform,
    type: config.type,
    content,
    status: 'scheduled',
    scheduledAt: config.scheduledAt,
  };

  contentStore.push(item);
  return item;
}

// 준비된 콘텐츠 가져오기
async function getNextReadyContent(platform: string): Promise<string> {
  const fs = await import('fs');
  const path = await import('path');

  const contentDir = path.join(process.cwd(), 'content', platform);
  const files = fs.readdirSync(contentDir)
    .filter(f => f.startsWith('ready-to-post-') && f.endsWith('.md'))
    .sort();

  if (files.length === 0) {
    return '# 새 콘텐츠\n\nOpenAI API 키를 제공하면 자동 생성됩니다.';
  }

  const filePath = path.join(contentDir, files[0]);
  return fs.readFileSync(filePath, 'utf-8');
}

// 스케줄러 실행 (주기적으로 호출)
export async function runScheduler(): Promise<void> {
  const now = new Date();

  for (const item of contentStore) {
    if (item.status === 'scheduled' && item.scheduledAt && item.scheduledAt <= now) {
      await publishContent(item);
    }
  }

  // Twitter 큐 처리
  await processQueue();
}

// 콘텐츠 발행
async function publishContent(item: ContentItem): Promise<void> {
  try {
    switch (item.platform) {
      case 'twitter':
        if (item.type === 'thread') {
          const tweets = item.content.split('\n\n---\n\n').filter(Boolean);
          await postThread({ tweets });
        } else {
          await postTweet({ text: item.content });
        }
        break;

      case 'linkedin':
        // LinkedIn API 포스팅
        console.log('📝 LinkedIn 포스팅:', item.content.substring(0, 50));
        break;

      case 'reddit':
        // Reddit API 포스팅
        console.log('📝 Reddit 포스팅:', item.content.substring(0, 50));
        break;

      default:
        console.log('📝 블로그 포스팅:', item.content.substring(0, 50));
    }

    item.status = 'posted';
    item.postedAt = new Date();
  } catch (error) {
    console.error('포스팅 실패:', error);
    item.status = 'failed';
  }
}

// 일일 포스팅 스케줄 생성
export function createDailySchedule(): ScheduleConfig[] {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return [
    {
      platform: 'twitter',
      type: 'thread',
      topic: 'ChatGPT 생산성 팁',
      scheduledAt: new Date(now.setHours(9, 0, 0, 0)), // 오전 9시
    },
    {
      platform: 'twitter',
      type: 'tweet',
      topic: '프롬프트 템플릿',
      scheduledAt: new Date(now.setHours(14, 0, 0, 0)), // 오후 2시
    },
    {
      platform: 'linkedin',
      type: 'post',
      topic: 'AI 마케팅 인사이트',
      scheduledAt: new Date(now.setHours(10, 0, 0, 0)), // 오전 10시
    },
    {
      platform: 'blog',
      type: 'post',
      topic: 'ChatGPT 활용 가이드',
      scheduledAt: tomorrow, // 내일
    },
  ];
}

// 상태 조회
export function getStatus(): {
  totalContent: number;
  posted: number;
  scheduled: number;
  failed: number;
  queueLength: number;
} {
  return {
    totalContent: contentStore.length,
    posted: contentStore.filter(c => c.status === 'posted').length,
    scheduled: contentStore.filter(c => c.status === 'scheduled').length,
    failed: contentStore.filter(c => c.status === 'failed').length,
    queueLength: getQueue().length,
  };
}

export { contentStore };
