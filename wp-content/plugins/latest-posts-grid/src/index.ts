import './editor.css';
import Edit from './edit';
import save from './save';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType('custom/latest-posts-grid', {
  edit: Edit,
  save,
});
