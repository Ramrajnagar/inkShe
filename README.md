# InkShe

![InkShe Banner](https://via.placeholder.com/1200x400?text=InkShe+Banner) 


> **"Your words. Your freedom."**

Hey there! 👋 I'm [Ramraj](https://github.com/Ramrajnagar), the creator of **InkShe**.

I built InkShe because I noticed something missing on the internet: a truly safe, cozy, and private place for women and girls to just *write*. Social media is loud, judgmental, and permanent. I wanted to build the opposite—a digital sanctuary where you can scream into the void, share a poem, or document your day without worrying about likes, algorithms, or trolls.

This isn't just another blogging platform. It's an anonymous, supportive community designed from the ground up to be toxic-free.

---

## What makes this special?

Most platforms optimize for engagement. InkShe optimizes for **peace of mind**.

- **Anonymity is a feature, not a bug.** Use a pen name. Be whoever you want to be. The freedom of not being "you" allows for incredible vulnerability and art.
- **Aesthetic matters.** Writing should feel good. I spent a lot of time tweaking the themes (Sakura Pink is a personal favorite) and typography so that the simple act of typing feels premium.
- **Safety isn't an afterthought.** We have strict moderation and community guidelines. This is a sisterhood, not a battleground.

---

## Under the Hood

For the developers out there checking the code—welcome! 🤓

I wanted to build something performant but also scalable. Here’s why I chose this stack:

- **[Next.js 16 (App Router)](https://nextjs.org/)**: It’s just the best way to build React apps right now. Server Components help us keep the initial load fast, which is crucial for mobile users.
- **[Prisma](https://www.prisma.io/) & [PostgreSQL](https://www.postgresql.org/)**: I needed a robust relational database to handle the complex relationships between users, stories, and comments. Prisma makes the DX (Developer Experience) a dream.
- **[Tailwind CSS](https://tailwindcss.com/)**: Speed. Once you get used to utility classes, you can't go back. It allows me to iterate on the design rapidly.
- **[Tiptap](https://tiptap.org/)**: The rich text editor. It's headless, which gave me full control over how the editor looks and feels.

### Running it locally

If you want to poke around or maybe contribute (yes, please!), here is how you get it running:

1.  **Clone it.**
    ```bash
    git clone https://github.com/yourusername/inkshe.git
    cd inkshe
    ```

2.  **Install the goods.**
    ```bash
    npm install
    ```

3.  **Env vars.**
    Grab the `.env.example` (or just create a `.env`) and add your database URL. You'll need a Postgres instance running.
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/inkshe"
    JWT_SECRET="shhh_its_a_secret"
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

4.  **Spin up the DB.**
    ```bash
    npx prisma db push
    ```

5.  **Lift off.** 🚀
    ```bash
    npm run dev
    ```

---

## Future Plans

This is just the beginning. I have a massive Trello board of ideas, but here are the big ones:

- **Mobile App**: A native experience is a must.
- **Audio Stories**: Sometimes you just want to listen.
- **Monetization**: I want writers to be able to earn from their work, but in a way that doesn't feel gross or ad-heavy.

## Contributing

I’d love your help. Seriously. Whether it's fixing a typo, adding a new theme, or refactoring some messy code I wrote at 3 AM.

Check out [CONTRIBUTING.md](CONTRIBUTING.md) for the details.

## License

MIT. Do whatever you want with it, just be cool.

---

*Built with ❤️ (and a lot of coffee) by Ramraj.*
