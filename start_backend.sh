#!/bin/bash
# Re-born 백엔드 실행 스크립트
# 사용법: bash start_backend.sh [모델경로]

MODEL=${1:-"best_reborn_model_05.keras"}

echo "========================================"
echo "  Re-born 보이스 터치 - 백엔드 서버"
echo "========================================"
echo "  모델 경로: $MODEL"
echo "  서버 주소: http://localhost:5000"
echo "========================================"

export MODEL_PATH="$MODEL"
python app.py
