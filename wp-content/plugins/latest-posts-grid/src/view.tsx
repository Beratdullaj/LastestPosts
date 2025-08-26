import { request, gql } from 'graphql-request';

type GqlPost = {
  id: string;
  uri: string;
  title: string;
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
};
type GqlResp = { posts?: { nodes?: GqlPost[] } };

const QUERY = gql `
  query GetLatestPosts($count: Int!) {
    posts(first: $count, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        content
        uri
        title
        featuredImage {
          node {
            sourceUrl(size: THUMBNAIL)
            altText
          }
        }
      }
    }
  }
`;

function createCard(post: GqlPost): HTMLDivElement {
  const card = document.createElement('article');
  card.className =
    'flex flex-col bg-white border rounded-2xl overflow-hidden shadow-sm transition-transform duration-200 hover:shadow-lg hover:-translate-y-1';

  const media = document.createElement('div');
  media.className = 'relative w-full pt-[85%] bg-gray-100 overflow-hidden';
  const src = post.featuredImage?.node?.sourceUrl;
  if (src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = post.featuredImage?.node?.altText || post.title || '';
    (img as HTMLImageElement).loading = 'lazy';
    (img as HTMLImageElement).decoding = 'async';
    img.className = 'absolute inset-0 w-full h-full object-cover';
    media.appendChild(img);
  }
  card.appendChild(media);

  const body = document.createElement('div');
  body.className = 'p-5 md:p-6 mt-3';

  const link = document.createElement('a');
  link.href = post.uri;
  link.className = 'block hover:underline';

  const title = document.createElement('h3');
  title.className = 'font-semibold text-xl md:text-2xl leading-snug line-clamp-2';
  title.textContent = post.title;

  link.appendChild(title);
  body.appendChild(link);
  card.appendChild(body);

  return card;
}

function renderGrid(root: HTMLElement, posts: GqlPost[]) {
  root.innerHTML = '';

  // Full‑bleed wrapper: 100vw + negative margins to escape theme constraints
  const outer = document.createElement('div');

  outer.className = 'px-6 w-full';
  outer.style.maxWidth = '100vw !important' ;
  // outer.style.marginLeft = 'calc(50% - 50vw)';
  // outer.style.marginRight = 'calc(50% - 50vw)';

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8';

  posts.forEach((p) => grid.appendChild(createCard(p)));

  outer.appendChild(grid);
  root.appendChild(outer);
}

function init(container: Element) {
  const count = parseInt(
    (container as HTMLElement).getAttribute('data-post-count') || '4',
    10
  );
  const root = container.querySelector('.lpg-root') as HTMLElement | null;
  if (!root) return;

  const endpoint =
    (window as any)?.LATEST_POSTS_GRID_VARS?.graphqlEndpoint ||
    `${window.location.protocol}//${window.location.host}/graphql`;

  request<GqlResp>(endpoint, QUERY, { count })
    .then((data) => renderGrid(root, data?.posts?.nodes ?? []))
    .catch(() => {
      root.innerHTML = '<p>Failed to load posts.</p>';
    });
}

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('.wp-block-custom-latest-posts-grid')
    .forEach((container) => init(container));
});
