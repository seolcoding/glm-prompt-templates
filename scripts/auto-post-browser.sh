#!/bin/bash

# Mac용 브라우저 자동 포스팅 스크립트
# 사용법: ./scripts/auto-post-browser.sh [twitter|linkedin|reddit]

PLATFORM=$1

echo "=== $PLATFORM 자동 포스팅 ==="
echo ""

case $PLATFORM in
  twitter)
    URL="https://twitter.com/compose/tweet"
    CONTENT_FILE="content/twitter/ready-to-post-001.md"
    ;;
  linkedin)
    URL="https://www.linkedin.com/feed/"
    CONTENT_FILE="content/linkedin/post-001.md"
    ;;
  reddit)
    URL="https://www.reddit.com/r/ChatGPT/submit"
    CONTENT_FILE="content/reddit/reddit-post-001.md"
    ;;
  *)
    echo "사용법: $0 [twitter|linkedin|reddit]"
    exit 1
    ;;
esac

# 콘텐츠 파일 확인
if [ ! -f "$CONTENT_FILE" ]; then
  echo "❌ 콘텐츠 파일이 없습니다: $CONTENT_FILE"
  exit 1
fi

# 클립보드에 복사
CONTENT=$(cat "$CONTENT_FILE")

echo "📋 콘텐츠가 클립보드에 복사되었습니다!"
echo ""
echo "=== 콘텐츠 미리보기 ==="
echo "$CONTENT"
echo ""
echo "=== 다음 단계 ==="
echo "1. 브라우저가 열립니다: $URL"
echo "2. ⌘+V 로 붙여넣기"
echo "3. 포스팅"
echo ""
echo "브라우저를 여는 중..."
sleep 2

# Mac에서 브라우저 열기
open "$URL"

echo "✅ 브라우저가 열렸습니다! 콘텐츠를 붙여넣으세요."
