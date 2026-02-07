# 🤝 Contributing to InkShe

First off, thank you for considering contributing to InkShe! It's people like you who make this community such a safe and wonderful place for everyone.

**InkShe** is built on the values of **empathy**, **inclusivity**, and **creativity**. We welcome contributions from developers, designers, writers, and anyone who wants to help us build the best safe space for women and girls on the internet.

---

## 🌸 Our Pledge (Code of Conduct)

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

**We are committed to:**
- Being kind and inclusive.
- Using welcoming and inclusive language.
- Accepting constructive criticism gracefully.
- Focusing on what is best for the community.
- Showing empathy towards other community members.

---

## 🚀 How to Contribute

### 1. 🐞 Reporting Bugs
If you find a bug, please create an issue!
- **Search existing issues** to see if it has already been reported.
- **Use a clear title** and description.
- **Include screenshots** or code snippets if possible.
- **Tag the issue** with `bug`.

### 2. 💡 Suggesting Enhancements
Have an idea to make InkShe better? We'd love to hear it!
- **Open an issue** with the tag `enhancement`.
- **Explain why** this change would be useful to the community.
- **Provide examples** or mockups if you have them.

### 3. 💻 Contributing Code
Ready to get your hands dirty? Here's how to get started:

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/your-username/inkshe.git
    cd inkshe
    ```
3.  **Create a branch** for your feature or fix:
    ```bash
    git checkout -b feature/amazing-feature
    # or
    git checkout -b fix/annoying-bug
    ```
4.  **Make your changes.** Ensure your code follows our style guide (see below).
5.  **Commit your changes** with a descriptive message:
    ```bash
    git commit -m "feat: add amazing feature"
    ```
    *We recommend following [Conventional Commits](https://www.conventionalcommits.org/).*
6.  **Push to your fork:**
    ```bash
    git push origin feature/amazing-feature
    ```
7.  **Open a Pull Request (PR)** on the main repository.
    - Describe your changes clearly.
    - Link any related issues (e.g., `Closes #123`).
    - Wait for a review! We aim to review all PRs within 48 hours.

---

## 🎨 Style Guide

To keep our codebase clean and consistent, please follow these guidelines:

### Development
- **Framework**: We use **Next.js 16**. Please adhere to Next.js best practices.
- **Language**: **TypeScript** is strictly enforced. Avoid `any` types whenever possible.
- **Styling**: use **Tailwind CSS**. Avoid custom CSS files unless absolutely necessary.
- **Formatting**: We use **Prettier** and **ESLint**. Run `npm run lint` before committing.

### UI/UX Design
- **Aesthetics**: InkShe has a specific "premium, soft, and safe" aesthetic. Use our defined color palette (`ink-pink`, `ink-blush`, etc.).
- **Components**: Reuse existing UI components from `components/ui` whenever possible (based on Shadcn UI).
- **Responsiveness**: All features must be fully responsive and work seamlessly on mobile devices.

---

## 🛠️ Local Development Setup

Refer to the [README.md](README.md#getting-started) for detailed installation instructions.

1.  `npm install`
2.  `npx prisma generate`
3.  `npm run dev`

---

## ❓ Need Help?

If you have any questions, feel free to reach out to us by opening an issue or contacting the maintainers directly.

We can't wait to see what you build! 💖
