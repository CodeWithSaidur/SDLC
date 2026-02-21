"use client";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
    Save,
    History,
    Paperclip,
    Send,
    Bold,
    Italic,
    List,
    Heading1,
    Heading2
} from "lucide-react";
import { cn } from "@/lib/utils";

export const EntrepreneurWorkspace = () => {
    const [title, setTitle] = useState("");
    const [version, setVersion] = useState(1);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Describe your revolutionary idea here...",
            }),
        ],
        content: "",
        editorProps: {
            attributes: {
                class: "prose prose-invert focus:outline-none max-w-none min-h-[300px]",
            },
        },
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex-1 max-w-2xl">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Untitled Idea"
                        className="text-4xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 w-full placeholder:opacity-30"
                    />
                </div>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
                        <History className="w-3 h-3" />
                        <span>v{version}.0.0</span>
                    </div>
                    <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                        <Save className="w-4 h-4" />
                        <span>Save Draft</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-4">
                    <div className="glass-morphism rounded-xl overflow-hidden border border-border/50">
                        {/* Toolbar */}
                        <div className="border-b border-border/50 px-4 py-2 flex items-center space-x-2 bg-background/30">
                            <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')}>
                                <Bold className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')}>
                                <Italic className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} active={editor?.isActive('heading', { level: 1 })}>
                                <Heading1 className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')}>
                                <List className="w-4 h-4" />
                            </ToolbarButton>
                            <div className="w-[1px] h-4 bg-border mx-2" />
                            <ToolbarButton>
                                <Paperclip className="w-4 h-4" />
                            </ToolbarButton>
                        </div>

                        {/* Editor Content */}
                        <div className="p-8">
                            <EditorContent editor={editor} />
                        </div>
                    </div>

                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Attachments</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button className="aspect-square border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-all group">
                                <Paperclip className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xs">Add File</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4">Status</h3>
                        <div className="space-y-4">
                            <StatusItem label="Readiness" value="Draft" color="orange" />
                            <StatusItem label="Collaborators" value="3 Active" color="blue" />
                            <StatusItem label="Last Edited" value="2m ago" />
                        </div>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                        Submit for Review
                    </button>
                </div>
            </div>
        </div>
    );
};

const ToolbarButton = ({ children, onClick, active = false }: { children: React.ReactNode, onClick?: () => void, active?: boolean }) => (
    <button
        onClick={onClick}
        className={cn(
            "p-2 rounded-md hover:bg-accent transition-colors",
            active ? "text-primary bg-primary/10" : "text-muted-foreground"
        )}
    >
        {children}
    </button>
);

const StatusItem = ({ label, value, color }: { label: string, value: string, color?: string }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={cn(
            "font-medium",
            color === 'orange' ? "text-orange-400" : color === 'blue' ? "text-blue-400" : ""
        )}>{value}</span>
    </div>
);
