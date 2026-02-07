# 🌸 InkShe
## A safe space created just for her.

> **"Your words. Your freedom."**

---

## 📖 About InkShe

**InkShe** is more than just a writing platform; it's a digital sanctuary. Designed exclusively for women and girls, InkShe provides a cozy, judgment-free corner of the internet where you can express your thoughts, share your stories, and connect with a supportive community.

Whether you're a poet, a storyteller, or someone who just needs to vent, InkShe offers the perfect canvas for your words. With anonymous pen names and a focus on positivity, you can be your true self without fear.

### 🌟 Why InkShe?

- **Zero Judgment:** A community built on empathy and support.
- **Total Anonymity:** Write under a pen name. No real names required.
- **Premium Experience:** A beautiful, distraction-free writing environment.

---

## ✨ Key Features

### 🖋️ Creative Freedom
- **Rich Text Editor**: Powered by **Tiptap**, our editor supports unparalleled formatting options for your stories, poems, and diaries.
- **Drafts & Publishing**: Save your work as drafts or publish them to the community when you're ready.

### 🛡️ Safety First
- **Anonymous Pen Names**: Your identity is safe with us. Choose a unique pen name to represent your creative self.
- **Toxic-Free Community**: Advanced moderation ensures a positive and uplifting environment.
- **Private Diaries**: Keep your personal thoughts locked away in your encrypted digital diary.

### 🎨 Personalized For You
- **Themes**: Choose from curated themes like *Sakura Pink*, *Lavender Dream*, and *Midnight calmness*.
- **Visual Customization**: Customize your reading and writing experience with adjustable fonts and layouts.

### 🤝 Community Connection
- **Supportive Feedback**: Engage with readers through comments and likes designed to uplift.
- **Featured Stories**: Get discovered! Our curation team highlights the best stories every week.

---

## 🛠️ Tech Stack

InkShe is built with cutting-edge technologies to ensure performance, scalability, and a premium user experience.

- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) (Animations), [Lucide React](https://lucide.dev/) (Icons)
- **Backend**: Next.js API Routes, [Prisma](https://www.prisma.io/) (ORM)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: Custom JWT & bcryptjs auth system
- **Validation**: [Zod](https://zod.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Shadcn UI](https://ui.shadcn.com/)

---

## 🚀 Getting Started

Follow these steps to set up InkShe locally on your machine.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/inkshe.git
    cd inkshe
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/inkshe"
    JWT_SECRET="your_jwt_secret_key"
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

4.  **Set up the database:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

6.  **Open your browser:**
    Navigate to `http://localhost:3000` to see InkShe in action!

---

## 🗺️ Roadmap

We are constantly improving InkShe. Here's what's coming next:

- [ ] **Mobile App**: A native mobile experience for iOS and Android.
- [ ] **AI Writing Assistant**: Get suggestions and prompts to spark your creativity.
- [ ] **Audio Stories**: Listen to stories narrated by the community.
- [ ] **Monetization**: Support your favorite writers with tips and subscriptions.

---

## 🤝 Contributing

We welcome contributions from everyone, especially those who share our vision of a safe and inclusive internet.

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

Please read our [Contribution Guidelines](CONTRIBUTING.md) for more details.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 💖 Support

Give a ⭐️ if you like this project!

**Connect with me:**

- [Twitter](https://twitter.com/yourhandle)
- [LinkedIn](https://linkedin.com/in/yourprofile)
- [Portfolio](https://yourportfolio.com)

---
*Built with ❤️ by [Ramraj](https://github.com/yourusername)*
