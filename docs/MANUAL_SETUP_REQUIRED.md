# 수동 설정 필요 사항

이 문서는 자동화할 수 없어서 사용자가 직접 설정해야 하는 항목들입니다.

---

## 🔴 즉시 설정 필요 (결제 활성화)

### 1. Gumroad 계정 및 제품 등록

**왜 필요한가**: 실제 결제 처리를 위해

**설정 방법**:
1. https://gumroad.com 접속 → "Start selling" 클릭
2. 이메일로 가입
3. 제품 4개 생성:

| 제품명 | 가격 | 파일 | 설명 |
|--------|------|------|------|
| 프롬프트 작성 10계정 | $0 | `products/prompt-templates/free/prompt-checklist.md` | 무료 리드마그넷 |
| 스타터 팩 | $9 | `products/starter-pack.zip` | 10개 템플릿 |
| 코어 팩 | $29 | 전체 50개 템플릿 | 메인 제품 |
| 1:1 커스터마이징 | $99 | (서비스) | 30분 화상 통화 |

4. 각 제품의 ID를 복사하여 `apps/web/index.html`의 `GUMROAD_PRODUCTS` 객체에 입력:
```javascript
const GUMROAD_PRODUCTS = {
  free: 'actual_product_id_here',
  starter: 'actual_product_id_here',
  core: 'actual_product_id_here'
};
```

**현재 상태**: ❌ 미설정 (mock 모드)

---

## 🟡 중기 설정 (트래픽 확보)

### 2. 트래픽 소스별 계정

| 플랫폼 | 용도 | 설정 방법 |
|--------|------|-----------|
| **Twitter/X** | 프롬프트 팁 스레드 | 계정 생성 → Bio에 랜딩페이지 링크 |
| **LinkedIn** | B2B 타겟팅 | 회사 페이지 생성 |
| **Reddit** | r/ChatGPT, r/ClaudeAI | 계정 생성 → 카르마 쌓기 |
| **Product Hunt** | 런칭 | 계정 생성 → 런칭 날짜 예약 |

### 3. 이메일 마케팅 (선택)

**추천 도구**:
- ConvertKit (무료 플랜 있음)
- Mailchimp (무료 500명까지)
- Buttondown (간단함)

**설정 방법**:
1. 계정 생성
2. 폼 생성 → 이메일 수집
3. 자동 이메일 시퀀스 설정:
   - Day 0: 무료 체크리스트 전송
   - Day 1: 스타터 팩 소개
   - Day 3: 코어 팩 할인 쿠폰
   - Day 7: 1:1 세션 제안

**현재 상태**: ❌ 미설정 (이메일은 이벤트로만 저장됨)

---

## 🟢 장기 설정 (확장)

### 4. 광고 (유료 트래픽)

| 플랫폼 | 최소 예산 | 타겟팅 |
|--------|-----------|--------|
| **Google Ads** | $10/일 | "AI 프롬프트", "ChatGPT 팁" 검색어 |
| **Facebook/Instagram** | $5/일 | 25-45세, 관심사: AI, 생산성 |
| **Twitter Ads** | $10/일 | AI 트위터 계정 팔로워 |

### 5. API 서버 배포 (프로덕션)

**현재**: localhost:3001 (개발용)

**배포 옵션**:
- **Railway**: $5/월부터, 쉬운 배포
- **Fly.io**: 무료 티어 있음
- **Render**: 무료 티어 있음

**배포 후**:
1. `apps/web/index.html`의 `API_BASE`를 프로덕션 URL로 변경
2. 재배포

### 6. 커스텀 도메인 (선택)

**현재 URL**: https://seolcoding.github.io/glm-prompt-templates/

**커스텀 도메인 예**:
- `prompttemplates.kr` (₩15,000/년)
- `aiprompts.co` ($12/년)

---

## 📋 체크리스트

### 오늘 바로 가능
- [ ] Gumroad 계정 생성
- [ ] 무료 제품 등록
- [ ] 스타터 팩 등록
- [ ] 코어 팩 등록
- [ ] 제품 ID를 랜딩페이지에 연결

### 이번 주
- [ ] Twitter/X 계정 생성
- [ ] 첫 스레드 작성
- [ ] LinkedIn 포스트
- [ ] Reddit에 유용한 팁 공유

### 이번 달
- [ ] Product Hunt 런칭
- [ ] 이메일 마케팅 도구 설정
- [ ] API 서버 배포

---

## 🔗 관련 파일

- 랜딩 페이지: `apps/web/index.html`
- Gumroad 설정 가이드: `docs/GUMROAD_SETUP.md`
- 제품 파일: `products/prompt-templates/`
- 진행 상황: `state/progress.md`

---

## 💡 팁

1. **먼저 Gumroad만 설정하면 바로 판매 가능** - 나머지는 점진적으로
2. **무료 체크리스트가 가장 중요** - 이메일 수집의 핵심
3. **트래픽은 품질이 중요** - 양보다는 타겟팅된 트래픽
4. **Product Hunt 런칭은 신중하게** - 준비된 상태에서
