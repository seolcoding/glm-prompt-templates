// 간단한 이벤트 추적 API 서버
// 실행: npx ts-node apps/api/server.ts

import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3001;
const DATA_DIR = path.join(__dirname, '../../data');
const EVENTS_FILE = path.join(DATA_DIR, 'events.jsonl');

// 이벤트 파일 초기화
if (!fs.existsSync(EVENTS_FILE)) {
  fs.writeFileSync(EVENTS_FILE, '');
}

const server = http.createServer((req, res) => {
  // CORS 헤더
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // 이벤트 수집
  if (req.method === 'POST' && req.url === '/api/events') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const event = JSON.parse(body);
        event.received_at = new Date().toISOString();

        // JSONL에 추가
        fs.appendFileSync(EVENTS_FILE, JSON.stringify(event) + '\n');

        console.log(`📊 Event: ${event.event_type} from ${event.visitor_id}`);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, event_id: Date.now() }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // 이벤트 요약
  if (req.method === 'GET' && req.url === '/api/events/summary') {
    try {
      const events = fs.readFileSync(EVENTS_FILE, 'utf-8')
        .trim()
        .split('\n')
        .filter(line => line)
        .map(line => JSON.parse(line));

      const summary = {
        total_events: events.length,
        by_type: {} as Record<string, number>,
        unique_visitors: new Set(events.map((e: any) => e.visitor_id)).size,
        last_24h: events.filter((e: any) =>
          Date.now() - new Date(e.received_at).getTime() < 24 * 60 * 60 * 1000
        ).length
      };

      events.forEach((e: any) => {
        summary.by_type[e.event_type] = (summary.by_type[e.event_type] || 0) + 1;
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(summary, null, 2));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read events' }));
    }
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`🚀 API server running at http://localhost:${PORT}`);
  console.log(`  POST /api/events - 이벤트 수집`);
  console.log(`  GET /api/events/summary - 요약`);
});
