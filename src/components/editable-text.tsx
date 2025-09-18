'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useContentEditor } from '@/components/content-editor-provider';
import { Edit3, Check, X, Bold, Italic, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface EditableTextProps {
  id: string;
  section: string;
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  allowFormatting?: boolean;
}

export function EditableText({
  id,
  section,
  children,
  className,
  as: Component = 'div',
  allowFormatting = false
}: EditableTextProps) {
  const { isEditMode, getContent, updateContent } = useContentEditor();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const editRef = useRef<HTMLDivElement>(null);

  // Obter conteúdo salvo ou usar o conteúdo padrão
  const savedContent = getContent(id);
  const currentContent = savedContent?.content || (typeof children === 'string' ? children : '');

  useEffect(() => {
    if (isEditing && editRef.current) {
      editRef.current.focus();
      // Selecionar todo o texto
      const range = document.createRange();
      range.selectNodeContents(editRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    if (!isEditMode) return;
    setEditValue(String(currentContent));
    setIsEditing(true);
  };

  const handleSave = () => {
    const content = editRef.current?.textContent || editValue;
    updateContent(id, content, section, allowFormatting ? 'rich-text' : 'text');
    setIsEditing(false);
    setIsFocused(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsFocused(false);
    if (editRef.current) {
      editRef.current.textContent = String(currentContent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !allowFormatting) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const applyFormatting = (command: string) => {
    document.execCommand(command, false);
    editRef.current?.focus();
  };

  if (!isEditMode) {
    return (
      <Component className={className}>
        {String(currentContent) || children}
      </Component>
    );
  }

  if (isEditing) {
    return (
      <div className="relative group">
        {allowFormatting && (
          <div className="absolute -top-12 left-0 flex items-center gap-1 bg-white border border-gray-200 rounded-md p-1 shadow-lg z-10">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => applyFormatting('bold')}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => applyFormatting('italic')}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => applyFormatting('insertUnorderedList')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div
          ref={editRef}
          contentEditable
          suppressContentEditableWarning
          className={cn(
            className,
            "outline-none border-2 border-primary/50 rounded-md p-2 bg-white min-h-[2rem]",
            "focus:border-primary focus:ring-2 focus:ring-primary/20"
          )}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          dangerouslySetInnerHTML={{ __html: currentContent }}
        />

        <div className="absolute -bottom-10 left-0 flex items-center gap-2 z-10">
          <Button
            size="sm"
            onClick={handleSave}
            className="h-8 bg-green-600 hover:bg-green-700"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            className="h-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Component
      className={cn(
        className,
        "relative group cursor-pointer transition-all",
        "hover:bg-blue-50 hover:border-blue-300 hover:shadow-md",
        "border-2 border-dashed border-blue-200 rounded-md p-2",
        "before:content-['✏️_Clique_para_editar'] before:absolute before:top-0 before:left-0 before:bg-blue-600 before:text-white before:text-xs before:px-2 before:py-1 before:rounded-br-md before:opacity-0 before:transition-opacity before:pointer-events-none",
        "hover:before:opacity-100",
        isFocused && "border-blue-500 shadow-lg"
      )}
      onClick={handleStartEdit}
    >
      {String(currentContent) || children}
      <div className="absolute top-1 right-1 opacity-60 group-hover:opacity-100 transition-opacity bg-blue-600 text-white rounded-full p-1">
        <Edit3 className="h-3 w-3" />
      </div>
    </Component>
  );
}