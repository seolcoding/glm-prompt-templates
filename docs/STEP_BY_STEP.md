# ⚡ 즉시 실행: 단계별 가이드

## 🎯 지금 당장 10분만에 수익 창출 시작

---

## Step 1: 트위터 계정 생성 (2분)

### 실행 방법
1. 브라우저에서 https://twitter.com 접속
2. "가입하기" 클릭
3. 이름, 이메일, 비밀번호 입력

### 프로필 설정
1. **사용자 이름**: AI프롬프트마스터
2. **소개**: ChatGPT 프롬프트 템플릿 공유 | 매일 팁 & 트릭
3. **프로필 사진**: Canva에서 "AI" 키워드로 검색
4. **배경 이미지**: Pexels에서 "artificial intelligence" 검색

---

## Step 2: 첫 번째 트윗 포스팅 (3분)

### 실행 방법
```bash
cd /Users/sdh/Dev/glm_make_money
./scripts/auto-post-browser.sh twitter
```

1. 스크립트가 트위터 웹사이트를 열고 콘텐츠를 클립보드에 복사
2. 콘텐츠를 붙여넣고 포스팅

### 예상 결과
- 노출: 500-1,000회
- 좋아요: 20-50개
- 리트윗: 10-30개
- 팔로워: 10-30명

---

## Step 3: Gumroad 제품 등록 (5분)

### 실행 방법
1. https://gumroad.com 접속
2. "Start selling" 클릭
3. 이메일로 가입

### 무료 제품 등록
1. **제품명**: AI 프롬프트 체크리스트
2. **가격**: $0 (무료)
3. **설명**:
   ```
   AI에게 더 나은 결과를 얻는 10가지 핵심 원칙

   이 체크리스트 하나면 당신의 프롬프트 작성 실력을 크게 향상시킬 수 있습니다.
   ```
4. **파일**: `products/pdfs/prompt-checklist-pdf-content.md` 업로드
5. **"Publish"** 클릭

### 유료 제품 등록 (선택)
1. **제품명**: 스타터 프롬프트 팩
2. **가격**: $9
3. **파일**: `products/prompt-templates/starter/` 폴더 전체

4. **"Publish"** 클릭

---

## Step 4: 랜딩 페이지에 Gumroad 연결 (2분)

### 실행 방법
1. Gumroad 제품 페이지에서 "Copy link" 클릭
2. `apps/web/index.html` 파일 열기
3. 68번째 줄 근처에서 다음 수정:
   ```javascript
   document.getElementById('free-btn').href = 'https://gum.co/YOUR_PRODUCT_ID';
   ```

---

## 💰 예상 즉시 수익

### 첫 번째 트윗 포스팅 후
- **방문자**: 50-200명
- **이메일 수집**: 5-20개
- **잠재 고객**: 5-20명

### 첫 Gumroad 판매 후 (1주 이내)
- **판매**: 1-5건
- **수익**: $9-45
- **이메일**: 10-30개

---

## ⏰ 총 소요 시간: 12분

## 🚀 그 다음 단계
- LinkedIn 포스팅
- 블로그 포스팅
- Reddit 포스팅
- OpenAI API 키 제공 (자동화)
