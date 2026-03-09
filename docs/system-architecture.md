# 시스템 아키텍처

## 개요
간단하고 확장 가능한 로컬 우선 아키텍처를 사용합니다.

## 디렉토리 구조
```
/docs/          # 문서화
/state/         # 실행 상태 추적
/data/          # JSON 데이터베이스
/apps/web/      # 프론트엔드
/apps/api/      # 백엔드 API
/apps/worker/   # 백그라운드 작업
/apps/admin/    # 관리자 대시보드
/tests/         # 테스트
```

## 기술 스택
- **언어**: TypeScript
- **데이터 저장**: JSON 파일 (초기) → SQLite (필요시)
- **프론트엔드**: 간단한 HTML/TypeScript
- **API**: Express 또는 Fastify
- **워커**: Node.js 스크립트

## 데이터 흐름
```
아이디어 발견 → 점수 매기기 → 오퍼 생성 → 퍼널 구축 → 트래픽 → 전환 → 측정 → 개선
```

## 모듈별 책임
1. **MarketScout**: 아이디어 발견 및 평가
2. **OfferArchitect**: 오퍼 설계
3. **FunnelBuilder**: 랜딩 페이지 및 전환 흐름
4. **ContentEngine**: 콘텐츠 생성
5. **ExperimentAnalyst**: 실험 설계 및 분석
6. **ComplianceGuard**: 규정 준수 검토
7. **GrowthEngineer**: 성장 인프라
8. **DataEngineer**: 스키마 및 데이터 관리
