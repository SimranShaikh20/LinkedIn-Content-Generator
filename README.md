# 🚀 LinkedIn Content Generator

**LinkedIn Content Generator** is a smart AI-powered tool that helps users instantly create professional and impactful LinkedIn posts. Ideal for freshers, job seekers, working professionals, and content creators looking to build their personal brand and share valuable insights with their network.

---

## ✨ Features

- 🧠 **AI-Powered Content Creation** - Generates high-quality LinkedIn posts from simple user input
- 🎯 **Content Categories**:
  - Job Tips
  - Education
  - Personal Experience
  - Hiring Announcements
- ⚡ **Instant Results** - Generates content and displays it on the screen in seconds
- 🌐 **Responsive UI** - Built using React, Tailwind CSS, and shadcn/ui
- 🔌 **Backend Automation** - Powered by `n8n` workflows using Groq API and webhook nodes
- 🖱️ **Copy Feature** - One-click copy to clipboard for easy sharing on LinkedIn
- 🔄 **Regenerate Option** - Generate again with the same inputs if needed

---

## 📸 Live Demo

👉 **Try it now**: [App Link ](https://linkedpost-ai-craft.lovable.app/)

![Demo Screenshot](https://your-image-url.com/demo.gif)

---

## 🧠 How It Works

1. **Fill the Form**  
   User enters name, selects a category, and types a topic.

2. **Send to Backend (n8n)**  
   Data is sent to an n8n workflow using a Production Webhook.

3. **AI Response**  
   Groq's LLM (Mixtral/Mistral) generates a relevant, formatted LinkedIn post.

4. **Display to User**  
   The generated post is instantly shown on the frontend for copy and share.

---

## 🛠 Tech Stack

| Component     | Technology                                                  |
|---------------|-------------------------------------------------------------|
| 💻 Frontend   | React.js, Tailwind CSS, shadcn/ui, React Hook Form          |
| ⚙️ Backend    | [n8n](https://n8n.io/) (cloud or self-hosted)               |
| 🧠 LLM API    | Groq API (Mixtral or LLaMA model)                           |
| ☁️ Hosting    | Lovable (Frontend), n8n Cloud (Backend)                     |

---

## 🚀 Getting Started

### 1. Clone the Project

```bash
git clone https://github.com/SimranShaikh20/linkedin-content-generator.git
cd linkedin-content-generator
npm install
```

### 2. Set Environment Variable

Update `.env` with the production webhook URL from n8n:

```env
REACT_APP_WEBHOOK_URL=https://your-n8n-webhook-url.com
```

### 3. Start Development Server

```bash
npm start
# Visit http://localhost:3000
```

### 4. Deploy Frontend

- Use [Lovable](https://lovable.dev), Vercel, or Netlify
- Set the environment variable in the hosting dashboard

---

## 🧪 Sample Input & Output

### Input
```json
{
  "name": "Simran Shaikh",
  "email": "simranshaikh20@example.com",
  "category": "Job Tips",
  "topic": "Resume writing for freshers"
}
```

### Output (Display on Frontend)

```text
📝 Resume Writing for Freshers

Are you just starting out and unsure how to build your resume?

✅ Highlight your academic achievements
✅ Include internships, projects, and certifications
✅ Keep it concise and tailored to the role

Remember: Your resume is your first impression. Make it count!

#JobTips #FreshersGuide #CareerAdvice #ResumeTips
```

---

## 🎨 Content Categories

| Category             | Description                              |
|----------------------|------------------------------------------|
| 💼 Job Tips          | Interview tips, resume writing, do's & don'ts |
| 📚 Education         | Course suggestions, online learning tips |
| ✍️ Personal Experience | Share stories, lessons, or growth moments |
| 📢 Hiring            | Let others know you’re hiring or looking for talent |

---

## 💡 Pro Tips

- Be specific with your topic (e.g., "Resume tips for CS students")
- Choose the most relevant category
- Keep your topic under 20 words for the best results

---

## 📍 Roadmap

- [x] Frontend: Category-based LinkedIn post generation
- [x] Integration with n8n backend via webhook
- [ ] Add preview card with LinkedIn styling
- [ ] Save generated posts locally or via backend
- [ ] Add user account & history (future enhancement)

---

## 👩‍💻 Author

**Built with ❤️ by [Simran Shaikh](https://linkedin.com/in/simran-shaikh-39207a23b)**

- 💼 [LinkedIn](https://linkedin.com/in/simran-shaikh-39207a23b)
- 💻 [GitHub](https://github.com/SimranShaikh20)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## 🙏 Acknowledgments

- [n8n](https://n8n.io/) for the powerful no-code workflow engine
- [Groq](https://groq.com/) for blazing fast LLM inference
- [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/) for clean UI components
