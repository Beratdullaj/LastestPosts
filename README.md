# Latest Posts Grid (Gutenberg Block)

Custom Gutenberg block written in **TypeScript** and styled with **Tailwind CSS**.  
It fetches latest posts via **WPGraphQL** and displays them in a responsive grid (2 cols on mobile, 3 on tablet, 4 on desktop).

---

## Requirements

- WordPress 6.x with the Block Editor
- [WPGraphQL](https://github.com/wp-graphql/wp-graphql) plugin active
- Node.js 18+ (with npm)

---

## Installation

1. **Build assets**
   ```bash
   cd wp-content/plugins/latest-posts-grid
   npm install
   npm run build

2. **Activate the block**
    In WordPress Admin → Plugins → activate Latest Posts Grid
    In WordPress Admin → Plugins → activate WPGraphQL

**Testing**

The block should display 4 posts by default in a responsive grid:

2 per row on mobile

3 per row on tablet

4 per row on desktop

Change the post count in the block sidebar → the frontend should update after publish.

If WPGraphQL is inactive, the block will fail to load posts (expected).