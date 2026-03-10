/**
 * Twitter API 자동 포스팅
 * Twitter API v2 사용
 */

interface TweetOptions {
  text: string;
  mediaIds?: string[];
}

interface ThreadOptions {
  tweets: string[];
}

// 트윗 단건 포스팅
export async function postTweet(options: TweetOptions): Promise<{ id: string; text: string } | null> {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;
  const apiKey = process.env.TWITTER_API_KEY;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;

  if (!bearerToken || !apiKey || !accessToken) {
    console.log('⚠️ Twitter API 키가 설정되지 않음 - Mock 모드');
    return mockPostTweet(options);
  }

  try {
    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: options.text,
      }),
    });

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      id: data.data.id,
      text: data.data.text,
    };
  } catch (error) {
    console.error('Twitter 포스팅 실패:', error);
    return null;
  }
}

// 스레드 포스팅 (연속 트윗)
export async function postThread(options: ThreadOptions): Promise<{ ids: string[] } | null> {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  if (!bearerToken) {
    console.log('⚠️ Twitter API 키가 설정되지 않음 - Mock 모드');
    return mockPostThread(options);
  }

  const ids: string[] = [];
  let previousTweetId: string | undefined;

  for (const tweet of options.tweets) {
    const body: any = { text: tweet };
    if (previousTweetId) {
      body.reply = { in_reply_to_tweet_id: previousTweetId };
    }

    try {
      const response = await fetch('https://api.twitter.com/2/tweets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error(`트윗 ${ids.length + 1} 실패:`, response.status);
        break;
      }

      const data = await response.json();
      ids.push(data.data.id);
      previousTweetId = data.data.id;

      // Rate limit 방지
      await new Promise(r => setTimeout(r, 1000));
    } catch (error) {
      console.error('스레드 포스팅 실패:', error);
      break;
    }
  }

  return { ids };
}

// Mock 함수들 (API 키 없을 때)
function mockPostTweet(options: TweetOptions): { id: string; text: string } {
  const mockId = `mock_${Date.now()}`;
  console.log('📝 [MOCK] 트윗 포스팅:', options.text.substring(0, 50) + '...');
  return {
    id: mockId,
    text: options.text,
  };
}

function mockPostThread(options: ThreadOptions): { ids: string[] } {
  const ids = options.tweets.map((_, i) => `mock_${Date.now()}_${i}`);
  console.log(`📝 [MOCK] 스레드 포스팅: ${options.tweets.length}개 트윗`);
  return { ids };
}

// 큐 시스템
interface QueuedTweet {
  id: string;
  content: string;
  scheduledAt: Date;
  status: 'pending' | 'posted' | 'failed';
}

const tweetQueue: QueuedTweet[] = [];

export function addToQueue(content: string, scheduledAt: Date): string {
  const id = `queue_${Date.now()}`;
  tweetQueue.push({
    id,
    content,
    scheduledAt,
    status: 'pending',
  });
  return id;
}

export function getQueue(): QueuedTweet[] {
  return tweetQueue;
}

export async function processQueue(): Promise<void> {
  const now = new Date();
  const pending = tweetQueue.filter(
    t => t.status === 'pending' && t.scheduledAt <= now
  );

  for (const item of pending) {
    const result = await postTweet({ text: item.content });
    item.status = result ? 'posted' : 'failed';
  }
}
