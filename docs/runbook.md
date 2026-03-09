# 런북 (Runbook)

## 로컬 실행 방법

### 1. 저장소 클론
```bash
cd /Users/sdh/Dev/glm_make_money
```

### 2. 의존성 설치 (향후)
```bash
npm install  # 또는 bun install
```

### 3. 개발 서버 실행
```bash
npm run dev  # 향후 구현
```

### 4. 테스트 실행
```bash
npm test  # 향후 구현
```

## 일반 작업

### 아이디어 추가
1. `/data/ideas.json` 파일 열기
2. 새 아이디어 객체를 `ideas` 배열에 추가
3. 필수 필드: id, title, problem_statement, buyer_persona, scores
4. 상태를 "pending"으로 설정

### 오퍼 생성
1. 아이디어 점수 기반 우선순위 결정
2. `/data/offers.json`에 오퍼 추가
3. 오퍼 타입: free, low_ticket, core, upsell, subscription

### 실험 설정
1. `/data/experiments.json`에 실험 추가
2. 가설, 지표, 성공 임계값 정의
3. 상태 추적: planned → running → completed/failed

## 문제 해결

### JSON 파일 손상
```bash
# 백업에서 복구
git checkout -- /data/*.json
```

### 의존성 문제
```bash
# 클린 설치
rm -rf node_modules
npm install
```
