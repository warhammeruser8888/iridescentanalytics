import { useState, useRef, useEffect } from 'react';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Minus } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const insertHR = () => {
    document.execCommand('insertHTML', false, '<hr style="border: 1px solid #ccc; margin: 1rem 0;" />');
    editorRef.current?.focus();
    handleInput();
  };

  return (
    <div className="border border-teal-300 rounded-lg overflow-hidden bg-white">
      <div className="border-b border-teal-200 bg-teal-50/30 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          className="p-2 hover:bg-teal-100 rounded transition-colors"
          title="Bold"
        >
          <Bold className="w-4 h-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          className="p-2 hover:bg-teal-100 rounded transition-colors"
          title="Italic"
        >
          <Italic className="w-4 h-4 text-gray-700" />
        </button>
        <div className="w-px bg-teal-300 mx-1" />
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<h1>')}
          className="p-2 hover:bg-teal-100 rounded transition-colors"
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<h2>')}
          className="p-2 hover:bg-teal-100 rounded transition-colors"
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<p>')}
          className="px-3 py-2 hover:bg-teal-100 rounded transition-colors text-xs font-medium text-gray-700"
          title="Paragraph"
        >
          P
        </button>
        <div className="w-px bg-teal-300 mx-1" />
        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          className="p-2 hover:bg-teal-100 rounded transition-colors"
          title="Bullet List"
        >
          <List className="w-4 h-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          className="p-2 hover:bg-teal-100 rounded transition-colors"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4 text-gray-700" />
        </button>
        <div className="w-px bg-teal-300 mx-1" />
        <button
          type="button"
          onClick={insertHR}
          className="p-2 hover:bg-teal-100 rounded transition-colors"
          title="Horizontal Line"
        >
          <Minus className="w-4 h-4 text-gray-700" />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`p-4 min-h-[400px] max-h-[600px] overflow-y-auto focus:outline-none prose prose-sm max-w-none ${
          isFocused ? 'ring-2 ring-teal-500 ring-inset' : ''
        }`}
        style={{
          whiteSpace: 'pre-wrap',
        }}
      />
      {!value && !isFocused && placeholder && (
        <div className="absolute top-14 left-4 text-gray-400 pointer-events-none">
          {placeholder}
        </div>
      )}
    </div>
  );
}
