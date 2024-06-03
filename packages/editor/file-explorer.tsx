import React from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";

interface File {
  name: string;
  content: string;
}

interface FileExplorerProps {
  files: File[];
  onFileSelect: (fileName: string) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ files, onFileSelect }) => {
  return (
    <div style={{ width: "20%", borderRight: "1px solid #ccc", padding: "10px" }}>
      <TreeView nodeLabel="Files" defaultCollapsed={false}>
        {files.map(file => (
          <div key={file.name} onClick={() => onFileSelect(file.name)} style={{ cursor: "pointer" }}>
            {file.name}
          </div>
        ))}
      </TreeView>
    </div>
  );
};

export default FileExplorer;