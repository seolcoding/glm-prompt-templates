# 🚀 즉시 수익 창출 가이드

## API 키 없이 5분 안에 수익 시작

### 1️⃣ Ko-fi 설정 (2분)

1. https://ko-fi.com 접속
2. "Sign up" → 이메일로 가입
3. 프로필 설정:
   - **페이지 이름**: AI 프롬프트 템플릿
   - **소개**: ChatGPT/Claude 프롬프트 템플릿 판매
4. Shop → Add Item:
   - **제품명**: AI 프롬프트 스타터 팩
   - **가격**: $9
   - **파일**: `products/starter-pack.zip` 업로드
5. 링크 복사 → `apps/web/index.html`의 `YOUR_KOFI` 교체

### 2️⃣ Buy Me a Coffee (2분)

1. https://www.buymeacoffee.com 접속
2. "Create your page" 클릭
3. 프로필 설정
4. Extras → Digital Downloads:
   - **제품명**: AI 프롬프트 템플릿
   - **가격**: $9 (3 coffees)
   - **파일**: 업로드
5. 링크 복사 → `YOUR_BMC` 교체

### 3️⃣ PayPal.me (1분)

1. https://www.paypal.me 접속
2. 로그인 또는 가입
3. 링크 생성: `paypal.me/yourname/9USD`
4. `YOUR_PAYPAL` 교체

---

## 수익 전략

### 즉시 실행 (0원 투자)

| 플랫폼 | 수수료 | 장점 | 단점 |
|--------|--------|------|------|
| Ko-fi | 0-5% | 파일 판매 지원, 한국어 OK | 브랜딩 제한 |
| BMC | 5% | 간편함 | 파일 판매 제한 |
| PayPal | 2.9%+$0.30 | 보편적 | 수동 처리 |

### 추천 순서

1. **Ko-fi** - 파일 판매 가능, 무료로 시작
2. **Gumroad** - 더 나은 UX, 10% 수수료
3. **자체 결제** - Stripe/PayPal 직접 연동

---

## 랜딩 페이지 수정

`apps/web/index.html`에서 다음 부분을 본인 링크로 교체:

```html
<a href="https://ko-fi.com/YOUR_KOFI">☕ Ko-fi로 후원</a>
<a href="https://www.buymeacoffee.com/YOUR_BMC">☕ 커피 사주기</a>
<a href="https://paypal.me/YOUR_PAYPAL/9usd">💳 PayPal</a>
```

---

## 웹사이트 배포 (무료)

### Vercel (추천)

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 배포
cd /Users/sdh/Dev/glm_make_money
vercel

# 3. 생성된 URL 확인
# 예: https://glm-make-money.vercel.app
```

### Netlify (대안)

```bash
# 1. Netlify CLI 설치
npm i -g netlify-cli

# 2. 배포
netlify deploy --dir=apps/web --prod
```

### GitHub Pages (무료)

```bash
# 1. GitHub 저장소 생성 후
git push origin main

# 2. Settings → Pages → main 브랜치 선택
# 3. https://username.github.io/glm_make_money
```

---

## 수익 추적

### 방문자 → 구매 전환율

| 단계 | 예상 비율 | 100방문자 기준 |
|------|----------|---------------|
| 방문 | 100% | 100명 |
| 이메일 등록 | 5-10% | 5-10명 |
| 무료 다운로드 | 3-5% | 3-5명 |
| 유료 구매 | 1-2% | 1-2명 |
| **수익** | - | **$9-18** |

### 트래픽 소스별 수익

| 소스 | 예상 일일 방문 | 예상 일일 수익 |
|------|---------------|---------------|
| Twitter | 50-200 | $5-20 |
| LinkedIn | 20-100 | $2-10 |
| Reddit | 100-500 | $10-50 |
| 블로그 | 10-50 | $1-5 |

---

## 다음 단계

1. ✅ 결제 플랫폼 설정 (Ko-fi/BMC)
2. ✅ 웹사이트 배포 (Vercel)
3. ⏳ 트위터 포스팅 (API 키 대기)
4. ⏳ 자동화 시작 (OpenAI 키 대기)
