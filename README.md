# BiteSpeed Chatbot Flow Builder

This project is a **frontend assignment submission for BiteSpeed**.

It is a simple visual chatbot flow builder where users can create message flows by dragging, connecting, editing, and saving nodes.

---

##  Features

- Drag and drop **Message Nodes** into canvas
- Connect nodes using edges
- Restrict to **one outgoing connection per node**
- Multiple incoming connections allowed
- Click node to **edit message text**
- **Save flow with validation**
- Flow stored using **localStorage**

---

##  Validation Rules

When saving:

- If more than one node has **no outgoing connection**, an error is shown
- Valid flows are saved successfully

---

##  Tech Stack

- React (Vite)
- React Flow
- Tailwind CSS
- JavaScript

---

##  Project Structure


src/
├── components/
│ ├── FlowBuilder.jsx
│ └── TextNode.jsx
├── App.jsx
└── main.jsx


---

##  How to Run Locally

```bash
git clone https://github.com/your-username/bitespeed-chatbot-builder.git
cd bitespeed-chatbot-builder
npm install
npm run dev


Assignment Notes

This project fulfills all requirements of the BiteSpeed Frontend Task:

Text Node creation

Drag & drop functionality

Edge connections with constraints

Settings panel for editing text

Save button with validation

👨 Author

Ashkar

GitHub: https://github.com/ashkarev

Portfolio: https://my-portfolio-llfn.vercel.app/