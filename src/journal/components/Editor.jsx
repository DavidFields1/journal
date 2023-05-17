import React from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill'

const modules = {
	toolbar: [
		[{ header: '1' }, { header: '2' }, { font: [] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[
			{ list: 'ordered' },
			{ list: 'bullet' },
			{ indent: '-1' },
			{ indent: '+1' },
		],
		['link', 'image', 'video'],
		['clean'],
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
	},
};

const formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
	'video',
];

export const Editor = ({ editorState, onEditorStateChange}) => {
	return (
		<ReactQuill
			theme='snow'
			value={editorState}
			onChange={onEditorStateChange}
			placeholder='Write something...'
			className='editing-area'
			modules={modules}
			formats={formats}
		>
		</ReactQuill>
	)
}
