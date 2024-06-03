'use client'

import React, { type ReactNode } from "react";
import MonacoEditor, { loader, type EditorProps } from "@monaco-editor/react";
import FileExplorer from "./file-explorer";

export interface RaulexWebEditorProps { }

const editorOptions = {
    fontFamily: 'Fira Code, monospace',
    fontSize: 14,
    minimap: {
        enabled: true
    }
};

const initialFiles = [
    { name: 'file1.js', content: '// Content of file1.js' },
    { name: 'file2.js', content: '// Content of file2.js' }
];

interface File {
    name: string;
    content: string;
}

interface State {
    files: File[];
    currentFile: File;
}

export class RaulexWebEditor extends React.Component<RaulexWebEditorProps, State> {
    constructor(props: RaulexWebEditorProps) {
        super(props);
        this.state = {
            files: initialFiles,
            currentFile: initialFiles[0]
        };
    }

    componentDidMount(): void {
        loader.init().then((monaco) => {
            monaco.editor.defineTheme('darkTheme', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                    { token: 'comment', foreground: '8b949e' },
                    { token: 'keyword', foreground: 'ff7b72' },
                    { token: 'number', foreground: 'd2a8ff' },
                    { token: 'string', foreground: 'a5d6ff' },
                    { token: 'type', foreground: '79c0ff' },
                    { token: 'identifier', foreground: 'c9d1d9' },
                ],
                colors: {
                    'editor.background': '#0D1526',
                    'editor.foreground': '#c9d1d9',
                    'editor.lineHighlightBackground': '#202E3B',
                    'editorCursor.foreground': '#c9d1d9',
                    'editorLineNumber.foreground': '#858585',
                    'editor.selectionBackground': '#264f78',
                    'editor.inactiveSelectionBackground': '#3a3d41',
                    'editor.selectionHighlightBackground': '#284360',
                    'editor.findMatchBackground': '#264f78',
                    'editor.findMatchHighlightBackground': '#2d5d87',
                },
            });
        });
    }

    handleFileSelect = (fileName: string) => {
        const { files, currentFile } = this.state;
        // Save current file content
        const updatedFiles = files.map(file =>
            file.name === currentFile.name ? { ...file, content: currentFile.content } : file
        );

        // Find the new file
        const newFile = updatedFiles.find(f => f.name === fileName);
        if (newFile) {
            this.setState({ files: updatedFiles, currentFile: newFile });
        }
    };

    handleEditorChange = (newValue: string) => {
        this.setState(prevState => ({
            currentFile: { ...prevState.currentFile, content: newValue }
        }));
    };

    render(): ReactNode {
        const { currentFile } = this.state;
        return (
            <div style={{ display: 'flex', height: '100vh' }}>
                <FileExplorer files={this.state.files} onFileSelect={this.handleFileSelect} />
                <div style={{ flex: 1 }}>
                    <MonacoEditor
                        theme="darkTheme"
                        defaultLanguage="javascript"
                        value={currentFile.content}
                        options={editorOptions}
                        className="w-full h-full"
                        onChange={(value) => this.handleEditorChange(value || '')}
                        height={800}
                    />
                </div>
            </div>
        );
    }
}
