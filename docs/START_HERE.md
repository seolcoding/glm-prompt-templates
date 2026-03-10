# 🎯 즉시 실행 가이드

## 💰 지금 당장 10분 안에 수익 창출 시작

### 1️⃣ 트위터 계정 생성 (3분)

**이유**: 가장 빠르게 트래픽을 얻을 수 있음

**방법**:
1. https://twitter.com 접속
2. "가입하기" 클릭
3. 이름: [AIPromptsKR] 또는 [PromptMaster] 추천
4. 프로필 사진: Canva에서 무료 제작
5. Bio에 "AI 프롬프트 템플릿 공유" 추가

---

### 2️⃣ 첫 번째 트윗 포스팅 (2분)

**실행**:
```bash
cd /Users/sdh/Dev/glm_make_money
./scripts/auto-post-browser.sh twitter
```

**기대 효과**:
- 100-500 노출
- 10-50 좋아요
- 5-20 리트윗
- 5-10 팔로워

---

### 3️⃣ Gumroad 무료 제품 등록 (5분)

**이유**: 이메일 수집 시작

**방법**:
1. https://gumroad.com 가입
2. "Add a product" 클릭
3. **무료 체크리스트** 등록:
   - 제목: "AI 프롬프트 작성 10계명"
   - 가격: $0
   - 파일: `products/prompt-templates/free/prompt-checklist.md`
   - 설명: "AI에게 더 나은 결과를 얻는 10가지 핵심 원칙"

---

### 4️⃣ 랜딩 페이지 Gumroad 연결 (2분)

**방법**:
1. Gumroad 제품 페이지에서 "Copy link" 클릭
2. 랜딩 페이지 `index.html`에서 다음 수정:
   ```javascript
   // 60번째 줄 근처
   document.getElementById('free-btn').href = 'https://gum.co/YOUR_PRODUCT_ID';
   ```

---

### 5️⃣ 티스토리 블로그 개설 (3분)

**이유**: AdSense 승인 빠름

**방법**:
1. https://www.tistory.com/ 접속
2. 카카오 계정으로 로그인
3. 블로그 이름: "AI 생산성 가이드"
4. 첫 포스트:
   ```bash
   # HTML 파일 복사
   cp blogs/tistory/10-chatgpt-prompts-marketer.html [새파일명].html
   ```
   또는 직접 붙여넣기

---

## ⏰ 총 소요 시간: 15분

## 💰 예상 즉시 효과:
- 이메일 5-20개 수집
- 트위터 팔로워 10-50개
- 블로그 방문자 50-200명

## 🚀 그 다음 단계 (나중에)
- LinkedIn 포스팅
- Reddit 포스팅
- OpenAI API 키 제공 (자동화)
- 유료 제품 ($9/$29) 등록
