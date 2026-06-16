# Re-born 보이스 터치

발화 불안을 가진 고립 청년을 위한 음성 재활 웹 애플리케이션입니다.  
음성을 업로드하면 AI가 5개 축으로 분석하여 레이더 차트로 시각화합니다.

---

## 기술 스택

| 구분 | 기술 |
|---|---|
| Frontend | React |
| Backend | Python Flask |
| AI 모델 | PyTorch CNN, OpenAI Whisper, librosa |

---

## 동작 흐름

음성 파일 업로드 (WAV / MP3 / M4A)
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

---

## 5축 분석 설계

| 축 | 항목 | 분석 방법 |
|---|---|---|
| ① | 음성 안정성 | CNN tremor 확률 |
| ② | 발화 유창성 | librosa + Whisper 채움말 탐지 |
| ③ | 침묵 조절력 | librosa 불안 멈춤 비율 |
| ④ | 발화 지속성 | CNN prolongation 확률 |
| ⑤ | 발화 에너지 | CNN energy 확률 |

---

## API

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/health` | 서버 상태 및 모델 로드 여부 확인 |
| POST | `/analyze` | 음성 파일 분석 (`multipart/form-data`, key=`file`) |