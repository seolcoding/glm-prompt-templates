#!/bin/bash
PLATFORM=$1
CONTENT_DIR="content/$PLATFORM"

echo "=== $PLATFORM 포스팅 도우미 ==="
echo ""

if [ -d "$CONTENT_DIR" ]; then
  echo "📁 대기 중인 콘텐츠:"
  ls "$CONTENT_DIR"
  echo ""
  
  NEXT_POST=$(ls -t "$CONTENT_DIR" | tail -1)
  if [ -n "$NEXT_POST" ]; then
    echo "📝 다음 포스팅: $NEXT_POST"
    echo ""
    echo "=== 미리보기 ==="
    cat "${CONTENT_DIR}/${NEXT_POST}"
  fi
else
  echo "❌ 디렉토리 없음"
fi
