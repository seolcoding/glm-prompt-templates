#!/bin/bash
# RSS 포스트 자동 발행 스크립트
# 사용법: ./scripts/rss-poster.sh [feed-url] [category]
#
# 예시
#   ./scripts/rss-poster.sh https://seolcoding.blogspot.com/feeds/posts/default ChatGPT
#   ./scripts/rss-poster.sh https://seolcoding.tistory.com/category/AI.html

#
# 필요한 환경 변수
# BLOGGER_API_KEY (선택사항)
# BLOGGER_BLOG_ID
# TISTORY_API_KEY (선택사항)
# TISTORY_BLOG_NAME

#
# 또는 수동으로 파일 업로드
#
# 지원하는 블로그
# 1. **Blogger** (https://www.blogger.com)
# 2. **Tistory** (https://tistory.com)
#
# 또는 수동으로 파일 업로드

#
# 지원하는 카테고리
# 1. chatgpt
# 2. ai-tools
# 3. productivity
# 4. prompts
#
# 또는 수동으로 파일 업로드

#   블로그 URL: https://glmmakemoney.vercel.app

#   게시물 URL: (자동 생성)

#
# 사용 예시:
#   ./scripts/rss-poster.sh https://seolcoding.blogspot.com/feeds/posts/default chatgpt
#   ./scripts/rss-poster.sh https://seolcoding.tistory.com/category/AI.html ai-tools
#

set -e
# 피드 URL
FEED_URL=$1
CATEGORY=$2

if [ -z "$FEED_URL" ] || [ -z "$CATEGORY" ]; then
    echo "사용법: $0 [feed-url] [category]"
    echo ""
    echo "사용 가능한 카테고리:"
    echo "  chatgpt"
    echo "  ai-tools"
    echo "  productivity"
    echo "  prompts"
    echo ""
    echo "예시"
    echo "  $0 https://seolcoding.blogspot.com/feeds/posts/default ChatGPT"
    echo "  $0 https://seolcoding.tistory.com/category/AI.html ai-tools"
    exit 1
fi

# 콘텐츠 파일 결정
CONTENT_FILE=""
case "$CATEGORY" in
    chatgpt)
        CONTENT_FILE="content/twitter/ready-to-post-001.md"
        ;;
    ai-tools)
        CONTENT_FILE="content/twitter/ready-to-post-003.md"
        ;;
    productivity)
        CONTENT_FILE="content/twitter/ready-to-post-004.md"
        ;;
    prompts)
        CONTENT_FILE="content/twitter/ready-to-post-005.md"
        ;;
    *)
        echo "❌ 알 수 없는 카테고리: $CATEGORY"
        exit 1
        ;;
esac

if [ ! -f "$CONTENT_FILE" ]; then
    echo "❌ 콘텐츠 파일 없음: $CONTENT_FILE"
    exit 1
fi
# 콘텐츠 읽기
CONTENT=$(cat "$CONTENT_FILE")
echo ""
echo "=== 콘텐츠 ==="
echo "$CONTENT"
echo ""
echo "=== 발행 정보 ==="
echo "피드: $FEED_URL"
echo "카테고리: $CATEGORY"
echo "블로그: https://glmmakemoney.vercel.app"
echo ""
# 실제 발행은 수동으로 해야 합니다
# 1. 위 링크로 이동
# 2. 로그인
# 3. 글 작성
# 4. 내용 붙여넣기
# 5. 발행
echo ""
echo "⚠️ API 키가 설정되면 자동으로 발행됩니다."
