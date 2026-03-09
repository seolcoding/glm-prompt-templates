# 블로그 이미지 전략

## 🎨 이미지 소싱 옵션

### 1. AI 생성 (무료/저렴)

| 도구 | 가격 | 상업적 사용 | 품질 | 비고 |
|------|------|-----------|------|------|
| **Leonardo.ai** | 무료 150토큰/일 | ✅ | ⭐⭐⭐⭐⭐ | 최고 품질 |
| **DALL-E 3 (ChatGPT)** | 무료 (Plus 구독) | ✅ | ⭐⭐⭐⭐ | 간편함 |
| **Ideogram** | 무료 25장/일 | ✅ | ⭐⭐⭐⭐ | 텍스트 표현 우수 |
| **Adobe Firefly** | 무료 25크레딧/월 | ✅ | ⭐⭐⭐ | 웹에서 사용 |
| **Stable Diffusion** | 무료 (로컬) | ✅ | ⭐⭐⭐⭐ | GPU 필요 |
| **Microsoft Designer** | 무료 | ✅ | ⭐⭐⭐ | Bing 계정 필요 |

### 2. 스톡 이미지 (무료)

| 사이트 | 특징 | 라이선스 |
|--------|------|---------|
| **Unsplash** | 고품질, 다양함 | CC0 (상업 OK) |
| **Pexels** | AI 검색 지원 | CC0 (상업 OK) |
| **Pixabay** | 한국어 지원 | CC0 (상업 OK) |
| **Freepik** | 벡터, 아이콘 | 링크 표기 필요 |
| **Kaboompics** | 라이프스타일 | CC0 (상업 OK) |

### 3. 스크린샷/스크린캡처 (직접)

```bash
# macOS 스크린샷
Cmd + Shift + 4  # 전체 화면
Cmd + Shift + 5  # 선택 영역

# 웹페이지 캡처 (Chrome 확장)
Full Page Screen Capture
Awesome Screenshot
```

## 🔄 이미지 워크플로우

### 썸네일/피처드 이미지
```bash
# AI 생성 프롬프트
"Create a modern, minimalist illustration of [topic] for a blog post.
Style: Clean lines, professional color palette (blue, gray, white).
No text. Aspect ratio 16:9."
```

### 인포그래픽
```
# Canva 또는 Figma로 제작
- 무료 템플릿 활용
- 브랜드 컬러 적용
- 데이터 시각화
```

### 스크린샷
```bash
# 제품/도구 스크린샷
1. 실제 사용 화면 캡처
2. 민감 정보 블러 처리
3. 화살표/하이라이트 추가 (Canva)
```

## 📐 이미지 규격

| 용도 | 크기 | 포맷 | 파일 크기 |
|------|------|------|-----------|
| 썸네일 | 1200x630 | WebP/JPG | < 100KB |
| 본문 이미지 | 800x600 | WebP/JPG | < 150KB |
| 인포그래픽 | 1200x800 | PNG | < 300KB |
| 소셜 미디어 | 1080x1080 | JPG | < 200KB |

## 🛠️ 자동화 스크립트 (예시)

### 이미지 최적화
```bash
# ImageMagick으로 리사이징
convert input.png -resize 1200x630 -quality 85 output.webp

# 일괄 처리
for f in *.png; do
  convert "$f" -resize 1200x630 -quality 85 "${f%.png}.webp"
done
```

### 워터마크 추가
```bash
# 워터마크
composite -gravity southeast -geometry +10+10 watermark.png input.png output.png
```

## 📁 저장 구조
```
content/images/
├── ai-generated/     # AI로 생성한 이미지
├── stock/            # 스톡 이미지 다운로드
├── screenshots/      # 직접 캡처한 스크린샷
├── infographics/     # 직접 제작한 인포그래픽
└── optimized/        # 최적화된 최종 이미지
```

## ✅ 체크리스트
- [ ] Leonardo.ai 계정 생성
- [ ] Pexels/Unsplash 계정 생성
- [ ] Canva 무료 계정 생성
- [ ] ImageMagick 설치
- [ ] 첫 썸네일 이미지 5개 생성
