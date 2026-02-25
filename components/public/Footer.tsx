export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-secondary)] border-t mt-24 border-[var(--color-border)] text-[var(--color-text-secondary)]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            AIStore
          </h2>
          <p className="mt-3 text-sm">
            Discover, compare, and use the best AI tools in one place.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-[var(--color-text-primary)] font-medium mb-3">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/tools" className="hover:text-[var(--color-primary-light)]">All Tools</a></li>
            <li><a href="/categories" className="hover:text-[var(--color-primary-light)]">Categories</a></li>
            <li><a href="/trending" className="hover:text-[var(--color-primary-light)]">Trending</a></li>
            <li><a href="/new" className="hover:text-[var(--color-primary-light)]">New Tools</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-[var(--color-text-primary)] font-medium mb-3">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-[var(--color-primary-light)]">About</a></li>
            <li><a href="/contact" className="hover:text-[var(--color-primary-light)]">Contact</a></li>
            <li><a href="/privacy" className="hover:text-[var(--color-primary-light)]">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-[var(--color-primary-light)]">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-[var(--color-text-primary)] font-medium mb-3">
            Stay Updated
          </h3>
          <p className="text-sm mb-4">
            Get the latest AI tools delivered to your inbox.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 text-sm bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-[var(--color-primary)] text-white rounded-r-md hover:bg-[var(--color-primary-dark)]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--color-border)] py-4 text-center text-sm text-[var(--color-text-muted)]">
        © {new Date().getFullYear()}  AIStore. All rights reserved
      </div>
    </footer>
  );
}
