#!/usr/bin/env npx tsx
/**
 * 콘텐츠 스케줄러 CLI
 * 사용법: npx tsx cli/scheduler-cli.ts [command]
 */

import { scheduleContent, runScheduler, getStatus, createDailySchedule } from '../apps/api/content-scheduler.js';
import { generateContent } from '../apps/api/content-generator.js';

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  // .env 로드
  require('dotenv').config({ path: 'config/credentials/.env' });

  switch (command) {
    case 'generate':
      await handleGenerate(args[1], args[2]);
      break;

    case 'schedule':
      await handleSchedule();
      break;

    case 'run':
      await handleRun();
      break;

    case 'status':
      handleStatus();
      break;

    case 'daily':
      await handleDaily();
      break;

    default:
      printHelp();
  }
}

async function handleGenerate(type: string, topic: string) {
  if (!type || !topic) {
    console.log('사용법: npx tsx cli/scheduler-cli.ts generate [tweet|thread|post] [topic]');
    return;
  }

  console.log(`📝 콘텐츠 생성 중: ${type} - ${topic}`);

  const content = await generateContent({
    type: type as any,
    topic,
    platform: type === 'tweet' || type === 'thread' ? 'twitter' : 'linkedin',
  });

  console.log('\n=== 생성된 콘텐츠 ===\n');
  console.log(content);
  console.log('\n=====================\n');
}

async function handleSchedule() {
  console.log('📅 일일 스케줄 생성 중...');

  const schedules = createDailySchedule();

  for (const schedule of schedules) {
    const item = await scheduleContent(schedule);
    console.log(`✅ 예약됨: ${item.platform}/${item.type} - ${item.scheduledAt?.toLocaleString()}`);
  }
}

async function handleRun() {
  console.log('🚀 스케줄러 실행 중...');
  await runScheduler();
  console.log('✅ 완료');
}

function handleStatus() {
  const status = getStatus();
  console.log('\n📊 스케줄러 상태');
  console.log('─'.repeat(30));
  console.log(`총 콘텐츠: ${status.totalContent}`);
  console.log(`발행됨: ${status.posted}`);
  console.log(`예약됨: ${status.scheduled}`);
  console.log(`실패: ${status.failed}`);
  console.log(`큐 대기: ${status.queueLength}`);
  console.log('─'.repeat(30));
}

async function handleDaily() {
  console.log('📆 오늘의 콘텐츠 스케줄');
  console.log('');

  const schedules = createDailySchedule();

  for (const s of schedules) {
    console.log(`• ${s.platform}/${s.type}: ${s.topic || '준비된 콘텐츠'}`);
    console.log(`  예약: ${s.scheduledAt.toLocaleString()}`);
    console.log('');
  }
}

function printHelp() {
  console.log(`
📋 콘텐츠 스케줄러 CLI

사용법: npx tsx cli/scheduler-cli.ts [command]

Commands:
  generate <type> <topic>  콘텐츠 생성 (tweet|thread|post)
  schedule                 일일 스케줄 생성
  run                      스케줄러 실행 (예약된 콘텐츠 발행)
  status                   상태 확인
  daily                    오늘의 스케줄 보기

Examples:
  npx tsx cli/scheduler-cli.ts generate tweet "ChatGPT 팁"
  npx tsx cli/scheduler-cli.ts schedule
  npx tsx cli/scheduler-cli.ts run
  npx tsx cli/scheduler-cli.ts status

환경변수:
  config/credentials/.env 파일에 API 키 설정 필요
  - OPENAI_API_KEY: 콘텐츠 생성용
  - TWITTER_BEARER_TOKEN: 트위터 포스팅용
  - PEXELS_API_KEY: 이미지 검색용
`);
}

main().catch(console.error);
