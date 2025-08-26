import { useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';

type Attributes = {
  postCount: number;
};

export default function save({ attributes }: BlockSaveProps<Attributes>) {
  const { postCount = 4 } = attributes;

  const blockProps = useBlockProps.save({
    'data-post-count': String(postCount),
  });

  return (
    <div {...blockProps}>
      <div className="lpg-root" />
    </div>
  );
}
