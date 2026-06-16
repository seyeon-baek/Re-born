import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import VoiceStage from './pages/VoiceStage';
import ComingSoon from './pages/ComingSoon';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/voice" element={<VoiceStage />} />
        <Route
          path="/face"
          element={<ComingSoon title="표정 분석" subtitle="멀티모달 인터랙션 · 2단계" />}
        />
        <Route
          path="/interview"
          element={<ComingSoon title="실전 모의 면접" subtitle="Adaptive Interview · 3단계" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
