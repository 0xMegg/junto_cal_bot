# Junto Calendar Bot

[https://0xmegg.github.io/junto_cal_bot](https://0xmegg.github.io/junto_cal_bot)

일정 관리를 도와주는 AI 챗봇 서비스입니다. 자연스러운 대화를 통해 일정을 등록하고 관리할 수 있습니다.

## 주요 기능

- 💬 자연어로 일정 등록하기
- 📅 직관적인 캘린더 뷰
- 🤖 AI 기반 일정 관리 도우미
- 📱 반응형 디자인

## 기술 스택

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **배포**: GitHub Pages

## 시작하기

1. 저장소 클론:

```bash
git clone https://github.com/0xmegg/junto_cal_bot.git
cd junto_cal_bot
```

2. 의존성 설치:

```bash
npm install
```

3. 개발 서버 실행:

```bash
npm run dev
```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속

## 프로젝트 구조

```
src/
├── app/              # Next.js 앱 라우터
├── components/       # 재사용 가능한 컴포넌트
│   ├── Chatbot.tsx
│   ├── Footer.tsx
│   └── ScheduleGrid.tsx
└── types/           # TypeScript 타입 정의
    └── chat.ts
```

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
