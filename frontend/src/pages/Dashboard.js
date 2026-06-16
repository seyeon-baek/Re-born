import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const voiceCompleted = localStorage.getItem('voiceStageCompleted') === 'true';
  const voiceScore = localStorage.getItem('voiceStageScore');

  const STAGES = [
    {
      id: 1,
      title: '음성 정밀 진단',
      subtitle: '보이스 터치',
      desc: voiceCompleted
        ? `음성 분석 완료 · 종합 점수 ${voiceScore}점`
        : '음성 파형을 분석해 발화 안정성, 유창성, 침묵 조절력 등을 진단합니다.',
      icon: '🎙️',
      path: '/voice',
      status: voiceCompleted ? 'done' : 'available', // available | locked | done
    },
    {
      id: 2,
      title: '표정 분석',
      subtitle: '멀티모달 인터랙션',
      desc: '시선 처리와 표정을 분석해 비언어적 소통 능력을 교정합니다.',
      icon: '🙂',
      path: '/face',
      status: 'locked',
    },
    {
      id: 3,
      title: '실전 모의 면접',
      subtitle: 'Adaptive Interview',
      desc: '앞 단계 결과를 바탕으로 맞춤형 난이도의 모의 면접을 진행합니다.',
      icon: '💼',
      path: '/interview',
      status: 'locked',
    },
  ];

  const completedCount = STAGES.filter(s => s.status === 'done').length;
  const totalCount = STAGES.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const handleReset = () => {
    if (window.confirm('진행 상황을 초기화할까요?')) {
      localStorage.removeItem('voiceStageCompleted');
      localStorage.removeItem('voiceStageScore');
      window.location.reload();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.badge}>AI 기반 디지털 재활 솔루션</div>
          <h1 style={styles.h1}>Re-born: 나의 재활 훈련</h1>
          <p style={styles.headerSub}>3단계로 차근차근, 나만의 속도로</p>
        </div>

        <div style={styles.body}>

          {/* 진행 현황 요약 카드 */}
          <div style={styles.progressCard}>
            <div style={styles.progressTop}>
              <div>
                <div style={styles.progressLabel}>진행 현황</div>
                <div style={styles.progressCount}>
                  {completedCount} <span style={styles.progressTotal}>/ {totalCount} 단계 완료</span>
                </div>
              </div>
              <div style={styles.progressCircle}>
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#EAF8F0" strokeWidth="6" />
                  <circle
                    cx="28" cy="28" r="24" fill="none"
                    stroke="#3FBB7F" strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 24}`}
                    strokeDashoffset={`${2 * Math.PI * 24 * (1 - progressPct / 100)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 28 28)"
                  />
                </svg>
                <span style={styles.progressPctText}>{progressPct}%</span>
              </div>
            </div>

            <div style={styles.progressSteps}>
              {STAGES.map((s, i) => (
                <React.Fragment key={s.id}>
                  <div style={styles.progressStepItem}>
                    <div style={{
                      ...styles.progressDot,
                      ...(s.status === 'done' ? styles.progressDotDone : {}),
                      ...(s.status === 'available' ? styles.progressDotActive : {}),
                    }}>
                      {s.status === 'done' ? '✓' : s.id}
                    </div>
                    <span style={styles.progressStepLabel}>{s.title}</span>
                  </div>
                  {i < STAGES.length - 1 && <div style={styles.progressLine} />}
                </React.Fragment>
              ))}
            </div>

            <p style={styles.encourageText}>
              {completedCount === 0
                ? '천천히, 당신의 속도로 시작해보세요 🌱'
                : completedCount === totalCount
                  ? '모든 단계를 완료했어요! 정말 잘하셨어요 🎉'
                  : '꾸준히 잘 나아가고 있어요 💪'}
            </p>
          </div>

          <div style={styles.sectionLabel}>훈련 단계</div>

          {STAGES.map((stage) => {
            const locked = stage.status === 'locked';
            return (
              <div
                key={stage.id}
                style={{
                  ...styles.stageCard,
                  ...(locked ? styles.stageCardLocked : {}),
                }}
                onClick={() => !locked && navigate(stage.path)}
              >
                <div style={styles.stageIconWrap}>
                  <span style={styles.stageIcon}>{stage.icon}</span>
                </div>
                <div style={styles.stageContent}>
                  <div style={styles.stageTopRow}>
                    <span style={styles.stageNumber}>STEP {stage.id}</span>
                    {locked && <span style={styles.lockBadge}>준비 중</span>}
                    {stage.status === 'done' && <span style={styles.doneBadge}>완료 ✓</span>}
                  </div>
                  <div style={styles.stageTitle}>{stage.title}</div>
                  <div style={styles.stageSubtitle}>{stage.subtitle}</div>
                  <p style={styles.stageDesc}>{stage.desc}</p>
                </div>
                <div style={styles.stageArrow}>
                  {locked ? '🔒' : '→'}
                </div>
              </div>
            );
          })}

          {/* 초기화 버튼 */}
          <button onClick={handleReset} style={styles.resetBtn}>
            ↺ 진행 상황 초기화
          </button>

        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(160deg,#F2FAE6 0%,#E8F8F0 100%)',
    fontFamily: '"Noto Sans KR",sans-serif',
    paddingBottom: 60,
  },
  container: { maxWidth: 700, margin: '0 auto', paddingTop: 40 },
  header: {
    background: 'linear-gradient(135deg,#1E8A57 0%,#3FBB7F 60%,#8BC34A 100%)',
    padding: '2.5rem 2rem 2rem',
    borderRadius: '0 0 24px 24px',
    marginBottom: 8,
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.2)',
    color: '#fff', fontSize: 11, fontWeight: 500,
    padding: '3px 12px', borderRadius: 20,
    marginBottom: 10, letterSpacing: '0.5px',
  },
  h1: {
    fontFamily: '"Gowun Dodum",serif',
    fontSize: 30, fontWeight: 700,
    color: '#fff', margin: 0, lineHeight: 1.3,
  },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 8, lineHeight: 1.6 },
  body: { padding: '0 1rem' },

  progressCard: {
    background: '#fff',
    border: '1px solid rgba(63,187,127,0.25)',
    borderRadius: 16,
    padding: '1.25rem',
    marginTop: '1.2rem',
    boxShadow: '0 2px 12px rgba(30,138,87,0.06)',
  },
  progressTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 11, fontWeight: 600, letterSpacing: '1px',
    color: '#1E8A57', textTransform: 'uppercase', marginBottom: 4,
  },
  progressCount: { fontSize: 22, fontWeight: 700, color: '#1a1a1a' },
  progressTotal: { fontSize: 13, fontWeight: 400, color: '#888' },
  progressCircle: {
    position: 'relative',
    width: 56, height: 56,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  progressPctText: {
    position: 'absolute',
    fontSize: 12, fontWeight: 700, color: '#1E8A57',
  },

  progressSteps: {
    display: 'flex', alignItems: 'center', marginBottom: 14,
  },
  progressStepItem: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 6, flex: '0 0 auto',
  },
  progressDot: {
    width: 28, height: 28, borderRadius: '50%',
    background: '#F0F0F0', color: '#aaa',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 700,
    flexShrink: 0,
  },
  progressDotActive: {
    background: '#EAF8F0', color: '#1E8A57', border: '2px solid #3FBB7F',
  },
  progressDotDone: {
    background: '#3FBB7F', color: '#fff',
  },
  progressStepLabel: {
    fontSize: 10, color: '#888', textAlign: 'center', width: 64,
    lineHeight: 1.3,
  },
  progressLine: {
    flex: 1, height: 2, background: '#EAF8F0', marginBottom: 22,
  },

  encourageText: {
    fontSize: 13, color: '#1E8A57', textAlign: 'center',
    margin: 0, fontWeight: 500,
    background: '#F2FAE6', borderRadius: 10, padding: '10px',
  },

  sectionLabel: {
    fontSize: 11, fontWeight: 600, letterSpacing: '1px',
    color: '#1E8A57', textTransform: 'uppercase',
    margin: '1.4rem 0 12px',
  },
  stageCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: '#fff',
    border: '1px solid rgba(63,187,127,0.25)',
    borderRadius: 16,
    padding: '1.25rem',
    marginBottom: 14,
    boxShadow: '0 2px 12px rgba(30,138,87,0.06)',
    cursor: 'pointer',
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  stageCardLocked: {
    opacity: 0.55,
    cursor: 'default',
    background: '#F8FAF7',
  },
  stageIconWrap: {
    flexShrink: 0,
    width: 56, height: 56,
    borderRadius: 14,
    background: 'linear-gradient(135deg,#EAF8F0,#F2FAE6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  stageIcon: { fontSize: 28 },
  stageContent: { flex: 1, minWidth: 0 },
  stageTopRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 },
  stageNumber: {
    fontSize: 11, fontWeight: 700, color: '#1E8A57',
    letterSpacing: '1px',
  },
  lockBadge: {
    fontSize: 10, fontWeight: 600, color: '#999',
    background: '#eee', padding: '2px 8px', borderRadius: 10,
  },
  doneBadge: {
    fontSize: 10, fontWeight: 600, color: '#1E8A57',
    background: '#EAF8F0', padding: '2px 8px', borderRadius: 10,
  },
  stageTitle: { fontSize: 17, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 },
  stageSubtitle: { fontSize: 12, color: '#888', marginBottom: 6 },
  stageDesc: { fontSize: 13, color: '#666', lineHeight: 1.6, margin: 0 },
  stageArrow: {
    flexShrink: 0, fontSize: 20, color: '#3FBB7F', fontWeight: 700,
  },

  resetBtn: {
    display: 'block',
    width: '100%', marginTop: 6,
    background: 'none', border: '1px solid #ddd',
    borderRadius: 10, padding: '10px',
    fontSize: 12, color: '#bbb',
    fontFamily: '"Noto Sans KR",sans-serif',
    cursor: 'pointer',
  },
};
