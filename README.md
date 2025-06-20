# SegmentFlow - User Segmentation & Campaign Management

![SegmentFlow Screenshot](https://./screenshot.png) <!-- Replace with actual screenshot URL if available -->

## 🚀 Overview

**SegmentFlow** is a React + TypeScript-based application designed to help marketers and product teams manage user segmentation, launch targeted email campaigns, and analyze engagement metrics efficiently.

---

## 🎯 Key Features

### ✅ Segment Builder
- Combine multiple filters using **AND/OR logic**
- Filter users based on:
  - Last login
  - Features used
  - Subscription plan
- Real-time preview of matched users

### 📤 Campaign Management
- Create email campaigns for selected segments
- Save campaigns as drafts, send immediately, or schedule for later
- Track status: **Draft**, **Sent**, or **Scheduled**

### 📊 Analytics Dashboard
- Monitor **open rates** and **click-through rates**
- Visualize engagement over time
- Compare performance across campaigns

---

## 🗂️ Project Structure

segment-flow/
├── public/
├── src/
│ ├── components/
│ │ ├── AnalyticsDashboard.tsx
│ │ ├── CampaignList.tsx
│ │ ├── CampaignModal.tsx
│ │ ├── FilterCard.tsx
│ │ ├── Header.tsx
│ │ ├── TabButton.tsx
│ │ └── UserList.tsx
│ ├── constants/
│ │ └── index.ts
│ ├── types/
│ │ └── index.ts
│ ├── App.tsx
│ └── index.tsx
├── package.json
└── README.md


---

## 🛠 Getting Started

### ✅ Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 📦 Installation

```bash
git clone https://github.com/yourusername/segment-flow.git
cd segment-flow

# Install dependencies
npm install
# or
yarn install

