# Re-born 보이스 터치 

## 프로젝트 개요

발화 불안을 가진 고립 청년을 위한 음성 재활 앱의 **Flask 백엔드**입니다.  
업로드된 음성 파일을 분석하여 5개 축의 점수를 반환합니다.

- **CNN (PyTorch)** — 음성 안정성 / 발화 지속성 / 발화 에너지
- **Whisper** — 채움말(필러) 탐지
- **librosa** — 멈춤 패턴 분석

## 폴더 구조

backend/
├── app.py                 ← Flask 메인 서버
├── inference_cnn.py       ← CNN 추론 모듈
├── requirements.txt       ← 패키지 목록
├── start_backend.sh       ← 서버 실행 스크립트
└── best_size_large.pth    ← 학습된 모델 파일

## 동작 흐름

음성 파일 업로드 (WAV)
        ↓
Flask 백엔드 /analyze
  ├─ CNN 슬라이딩 윈도우 추론 (3초 / 1초 stride)
  │    → 음성 안정성, 발화 지속성, 발화 에너지 점수
  ├─ librosa + Whisper 채움말 탐지
  │    → 발화 유창성 점수
  └─ librosa 멈춤 분석
       → 침묵 조절력 점수
        ↓
JSON 응답 → React 프론트엔드 레이더 차트 시각화

## 5축 점수 설계

| 축 | 항목 | 분석 방법 |
|---|---|---|
| ① | 음성 안정성 | CNN tremor 확률 |
| ② | 발화 유창성 | librosa + Whisper 채움말 비율 |
| ③ | 침묵 조절력 | librosa 불안 멈춤 비율 |
| ④ | 발화 지속성 | CNN prolongation 확률 |
| ⑤ | 발화 에너지 | CNN energy 확률 |

## API

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/health` | 서버 상태 및 모델 로드 여부 확인 |
| POST | `/analyze` | 음성 파일 분석 (`multipart/form-data`, key=`file`) |

### `/analyze` 응답 예시

```json
{
  "scores": {
    "stability": 78.5,
    "fluency": 65.2,
    "pause_ctrl": 71.0,
    "continuity": 58.3,
    "calm": 68.3
  },
  "filler_detail": {
    "filler_count": 3,
    "sound_segment_count": 22,
    "filler_ratio_pct": 13.6
  },
  "pause_detail": {
    "pause_count": 5,
    "anxious_pause_count": 2,
    "anxious_pause_total_sec": 3.1,
    "total_duration_sec": 18.4
  },
  "demo_mode": false
}
```
