import { useEffect, useState } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl, Spinner, Notice } from '@wordpress/components';
import { request, gql } from 'graphql-request';
import type { BlockEditProps } from '@wordpress/blocks';

type Attributes = { postCount: number };

type GqlPost = {
  id: string;
  uri: string;
  title: string;
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
};

type GqlResp = { posts?: { nodes?: GqlPost[] } };

const QUERY = gql/* GraphQL */ `
  query GetLatestPosts($count: Int!) {
    posts(first: $count, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
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

export default function Edit({ attributes, setAttributes }: BlockEditProps<Attributes>) {
  const { postCount = 4 } = attributes;

  const [posts, setPosts] = useState<GqlPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const endpoint =
    (window as any)?.LATEST_POSTS_GRID_VARS?.graphqlEndpoint ||
    `${window.location.protocol}//${window.location.host}/graphql`;

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const data = await request<GqlResp>(endpoint, QUERY, { count: postCount });
        if (mounted) setPosts(data?.posts?.nodes ?? []);
      } catch (e: any) {
        if (mounted) setErr(e?.message ?? 'Error fetching posts');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [endpoint, postCount]);

  const blockProps = useBlockProps({ className: 'p-2' });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Latest Posts Grid Settings" initialOpen>
          <RangeControl
            label="Number of posts"
            value={postCount}
            min={4}
            max={12}
            onChange={(v?: number) => {
              const clamped = Math.max(4, Math.min(12, Number(v ?? 4)));
              setAttributes({ postCount: clamped });
            }}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {loading && <Spinner />}
        {err && <Notice status="error" isDismissible={false}>{err}</Notice>}

        {!loading && !err && (
          // Full‑bleed wrapper: breaks out of theme container
          <div
            className="px-6 md:px-10"
            style={{
              width: '100vw',
              marginLeft: 'calc(50% - 50vw)',
              marginRight: 'calc(50% - 50vw)',
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
              {posts.map((p) => (
                <article
                  key={p.id}
                  className="flex flex-col bg-white border rounded-2xl overflow-hidden shadow-sm transition-transform duration-200 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Taller media makes cards feel bigger */}
                  <div className="relative w-full pt-[85%] bg-gray-100 overflow-hidden">
                    {p.featuredImage?.node?.sourceUrl && (
                      <img
                        src={p.featuredImage.node.sourceUrl}
                        alt={p.featuredImage.node.altText || p.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="eager"
                        decoding="async"
                      />
                    )}
                  </div>

                  <div className="p-5 md:p-6 mt-3">
                    <a href={p.uri} target="_blank" rel="noreferrer" className="block hover:underline">
                      <h3 className="font-semibold text-xl md:text-2xl leading-snug line-clamp-2">
                        {p.title}
                      </h3>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
