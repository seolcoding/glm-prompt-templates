# 크레덴셜 관리 가이드

## 🔐 환경 변수 구조

### .env 파일 (루트)
```bash
# API Keys
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
CHATGPT_API_KEY=xxx

# Gumroad
GUMROAD_API_KEY=xxx
GUMROAD_PRODUCT_FREE=xxx
GUMROAD_PRODUCT_STARTER=xxx
GUMROAD_PRODUCT_CORE=xxx

# Social Media
TWITTER_API_KEY=xxx
TWITTER_API_SECRET=xxx
TWITTER_ACCESS_TOKEN=xxx
TWITTER_ACCESS_SECRET=xxx

# Analytics
GOOGLE_ANALYTICS_ID=G-xxx
MIXPANEL_TOKEN=xxx

# Database (프로덕션)
DATABASE_URL=postgresql://xxx

# Payment
STRIPE_SECRET_KEY=sk-xxx
STRIPE_PUBLISHABLE_KEY=pk-xxx
```

### .env.local (로컬 개발용)
```bash
# 개발 전용
NODE_ENV=development
DEBUG=true
API_BASE=http://localhost:3001
```

## 🔒 보안 규칙

### ✅ DO
- `.env` 파일은 절대 커밋하지 않기
- API 키는 환경 변수로만 관리
- 프로덕션 키는 별도의 비밀 관리 도구 사용
- 키 로테이션 정기적으로 수행

### ❌ DON'T
- 코드에 API 키 하드코딩
- 공개 저장소에 `.env` 푸시
- 스크린샷에 키 노출
- 로그에 키 출력

## 📁 파일 구조

```
config/
├── credentials/
│   ├── .env.template      # 템플릿 (커밋 OK)
│   ├── .env               # 실제 키 (gitignore)
│   └── .env.production    # 프로덕션 (gitignore)
├── platforms/
│   ├── gumroad.json       # Gumroad 설정
│   ├── social.json        # 소셜 미디어 설정
│   └── analytics.json     # 분석 도구 설정
└── secrets/
    └── .gitkeep
```

## 🔧 설정 파일 템플릿

### platforms/gumroad.json
```json
{
  "products": {
    "free_checklist": {
      "id": "${GUMROAD_PRODUCT_FREE}",
      "name": "프롬프트 체크리스트",
      "price": 0
    },
    "starter_pack": {
      "id": "${GUMROAD_PRODUCT_STARTER}",
      "name": "스타터 팩",
      "price": 900
    },
    "core_pack": {
      "id": "${GUMROAD_PRODUCT_CORE}",
      "name": "코어 팩",
      "price": 2900
    }
  }
}
```

### platforms/social.json
```json
{
  "twitter": {
    "account": "@your_account",
    "posting_schedule": {
      "timezone": "Asia/Seoul",
      "slots": ["09:00", "19:00", "22:00"]
    }
  },
  "linkedin": {
    "company_page": "your-company"
  }
}
```

## 🚀 배포 시 크레덴셜 주입

### Vercel
```bash
vercel env add OPENAI_API_KEY
vercel env add ANTHROPIC_API_KEY
```

### GitHub Actions
```yaml
env:
  OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

### Docker
```bash
docker run --env-file .env.production myapp
```

## 📋 체크리스트

### 초기 설정
- [ ] `.env.template` 복사해서 `.env` 생성
- [ ] 각 서비스에서 API 키 발급
- [ ] `.env`에 키 입력
- [ ] `.gitignore`에 `.env` 추가 확인

### 서비스별 키 발급
- [ ] OpenAI: https://platform.openai.com/api-keys
- [ ] Anthropic: https://console.anthropic.com/
- [ ] Gumroad: https://gumroad.com/settings/api
- [ ] Twitter: https://developer.twitter.com/
