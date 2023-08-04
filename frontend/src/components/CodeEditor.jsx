/* eslint-disable react/prop-types */
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/theme-github";

const CodeEditor = ({ value, onChange, mode }) => {
	return (
		<AceEditor
			mode={mode} // Change this to the desired language mode
			theme='github' // Change this to the desired theme
			value={value}
			onChange={onChange}
			showGutter={false}
			name='code-editor'
			editorProps={{ $blockScrolling: true }}
			fontSize={14}
			height='500px' // Set the height of the editor as needed
			width='100%' // Set the width of the editor as needed
			setOptions={{
				enableBasicAutocompletion: true,
				enableLiveAutocompletion: true,
				enableSnippets: false,
				showLineNumbers: true,
				tabSize: 2,
			}}
			highlightActiveLine={false}
			placeholder='Start typing your code here...'
		/>
	);
};

export default CodeEditor;
