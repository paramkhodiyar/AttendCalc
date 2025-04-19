import React from "react";
import "./notetaker.css";
import { EditorProvider, EditorContent } from '@tiptap/react';
import { FaBold, FaItalic, FaStrikethrough, FaCode, FaListUl, FaListOl, FaUndo, FaRedo, FaPalette } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4, LuHeading5, LuHeading6 } from "react-icons/lu";
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { useCurrentEditor } from '@tiptap/react';

const MenuBar = ({ darkMode }) => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    function downloadfile() {
        const textsofar = editor.getText();
        const blob = new Blob([textsofar], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "note.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function clearwritingarea() {
        editor.commands.setContent("");
    }

    return (
        <>
            <div className={`doc-options ${darkMode ? 'dark-mode' : ''}`}>
                <div className="control-group">
                    <div className="button-group">
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            disabled={!editor.can().chain().focus().toggleBold().run()}
                            className={`${editor.isActive('bold') ? 'is-active' : ''} ${darkMode ? 'dark-mode' : ''}`}
                        >
                            <FaBold />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            disabled={!editor.can().chain().focus().toggleItalic().run()}
                            className={`${editor.isActive('italic') ? 'is-active' : ''} ${darkMode ? 'dark-mode' : ''}`}
                        >
                            <FaItalic />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            disabled={!editor.can().chain().focus().toggleStrike().run()}
                            className={`${editor.isActive('strike') ? 'is-active' : ''} ${darkMode ? 'dark-mode' : ''}`}
                        >
                            <FaStrikethrough />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            disabled={!editor.can().chain().focus().toggleCode().run()}
                            className={`${editor.isActive('code') ? 'is-active' : ''} ${darkMode ? 'dark-mode' : ''}`}
                        >
                            <FaCode />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={`${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''} ${darkMode ? 'dark-mode' : ''}`}
                        >
                            <LuHeading1 style={{ fontSize: "20px" }} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={`${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''} ${darkMode ? 'dark-mode' : ''}`}
                        >
                            <LuHeading2 style={{ fontSize: "20px" }} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            className={`${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''} ${darkMode ? 'dark-mode' : ''}`}
                        >
                            <LuHeading3 style={{ fontSize: "20px" }} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                            className={`${editor.isActive('heading', { level: 4 }) ? 'is-active' : ''} ${darkMode ? 'dark-mode' : ''}`}
                        >
                            <LuHeading4 style={{ fontSize: "20px" }} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                            className={`${editor.isActive('heading', { level: 5 }) ? 'is-active' : ''} ${darkMode ? 'dark-mode' : ''}`}
                        >
                            <LuHeading5 style={{ fontSize: "20px" }} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                            className={`${editor.isActive('heading', { level: 6 }) ? 'is-active' : ''} ${darkMode ? 'dark-mode' : ''}`}
                        >
                            <LuHeading6 style={{ fontSize: "20px" }} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={`${editor.isActive('bulletList') ? 'is-active' : ''} ${darkMode ? 'dark-mode' : ''}`}
                        >
                            <FaListUl />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={`${editor.isActive('orderedList') ? 'is-active' : ''} ${darkMode ? 'dark-mode' : ''}`}
                        >
                            <FaListOl />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().chain().focus().undo().run()}
                            className={`${darkMode ? 'dark-mode' : ''}`}
                        >
                            <FaUndo />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().chain().focus().redo().run()}
                            className={`${darkMode ? 'dark-mode' : ''}`}
                        >
                            <FaRedo />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                            className={`${editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''} ${darkMode ? 'dark-mode' : ''}`}
                        >
                            <FaPalette />
                        </button>
                    </div>
                </div>
                <div className={`main ${darkMode ? "dark-mode": ""}`}>
                    <button
                        onClick={clearwritingarea}
                        className={`clear-button ${darkMode ? 'dark-mode' : ''}`}
                        style={{ backgroundColor: "#ed5e68", display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        Clear
                    </button>
                    <button
                        onClick={downloadfile}
                        className={`download-button ${darkMode ? 'dark-mode' : ''}`}
                        style={{ backgroundColor: "#a6ff4d", color: "#578723" }}
                    >
                        Download
                    </button>
                </div>
            </div>
        </>
    );
};

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
];

function Notetaker({ darkMode }) {
    return (
        <div className={`notetaker-container ${darkMode ? 'dark-mode' : ''}`}>
            <EditorProvider slotBefore={<MenuBar darkMode={darkMode} />} extensions={extensions} content="Welcome to QuikNotes, Happy Writing !!! (Click on the clear button to reset the page and write)">
                <EditorContent />
            </EditorProvider>
        </div>
    );
}

export default Notetaker;