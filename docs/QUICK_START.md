# 🚀 즉시 실행 가능한 수익화 경로

## 1분 만에 Gumroad에서 첫 판매까지

이 문서는 **API 키 없이도** 즉시 실행 가능한 단계들을 설명합니다.

---

## 📋 체크리스트 (5분)

### 1. Gumroad 계정 생성
- [ ] https://gumroad.com/ 접속
- [ ] 이메일로 가입
- [ ] 프로필 완성

### 2. 무료 제품 등록
- [ ] Products → Add a product
- [ ] Name: "프롬프트 작성 10계명"
- [ ] Price: $0 (Name your price → Custom → 0)
- [ ] Description: AI 프롬프트 작성의 핵심 원칙
- [ ] File: `products/prompt-templates/free/prompt-checklist.md` 업로드
- [ ] Save

- [ ] 제품 ID 복사 (예: abc123)

### 3. 랜딩 페이지에 연결
- [ ] `apps/web/index.html` 열기
- [ ] GUMROAD_PRODUCTS에 제품 ID 입력:
  ```javascript
  const GUMROAD_PRODUCTS = {
    free: 'abc123',  // ← 방금 복사한 ID로 변경
    starter: '',
    core: ''
  };
  ```
- [ ] 저장 및 재배포

### 4. 소셜 미디어 홍보
- [ ] Twitter에 포스팅
- [ ] LinkedIn에 공유
- [ ] Facebook 그룹에 공유

- [ ] Reddit에 포스팅

---

## 💰 예상 결과

| 시간 | 트래픽 | 이메일 | 판매 | 수익 |
|------|--------|--------|------|------|
| 1시간 | 0 | 0 | 0 | $0 |
| 1일 | 50 | 5 | 0 | $0 |
| 1주 | 500 | 50 | 2 | $18 |
| 1개월 | 2,000 | 200 | 10 | $90 |

---

## 🎯 목표
- **오늘**: 첫 번째 무료 다운로드
- **이번 주**: 첫 유료 결제 ($9)
- **이번 달**: $100 수익

- **3개월**: $500 수익

- **6개월**: $2,000 수익

---

## 📝 준비된 콘텐츠
- 트위터 스레드: 5개 (`content/twitter/`)
- 블로그 포스트: 5개 (`blogs/tistory/`)
- Reddit 포스트: 2개 (`content/reddit/`)

- LinkedIn 포스트: 1개 (`content/linkedin/`)

---

## 🔗 링크
- 랜딩 페이지: https://seolcoding.github.io/glm-prompt-templates/
- GitHub: https://github.com/seolcoding/glm-prompt-templates
