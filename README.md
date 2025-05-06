# 📰 AI News

AI News is a modern web application that delivers AI-generated summaries of news articles using the Gemini API. It includes an admin panel for managing content and features a clean, responsive UI built with React and Vite.

## 🌐 Live Demo

👉 https://ai-news-frontend.onrender.com

## 📁 Project Structure
```bash
ai-news/
├── client/       # Frontend - React + Vite + TypeScript + Mantine
├── server/       # Backend - Node.js + Express + Gemini API
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-news.git
cd ai-news
```
### 2. Backend Setup
In the terminal run:
```bash
   cd server
   npm install
```
Create a .env file in the server folder and add your Gemini API key:
```bash
   GEMINI_API_KEY=your_gemini_api_key_here
```
In the terminal run:
```bash
  node index.js
```
### 3. Frontend Setup
In a new terminal window run:
```bash
   cd client
   npm install
   npm run dev
```

The frontend will be available at: http://localhost:5173
Your site is live!!


