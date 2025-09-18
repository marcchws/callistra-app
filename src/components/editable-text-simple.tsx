'use client';

import React, { useState } from 'react';
import { useContentEditor } from '@/components/content-editor-provider';
import { cn } from '@/lib/utils';

interface EditableTextSimpleProps {
  id: string;
  section: string;
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function EditableTextSimple({
  id,
  section,
  children,
  className,
  as: Component = 'div'
}: EditableTextSimpleProps) {
  const { isEditMode, getContent, updateContent } = useContentEditor();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');

  // Obter conteúdo salvo ou usar o conteúdo padrão
  const savedContent = getContent(id);
  const currentContent = savedContent?.content || (typeof children === 'string' ? children : children?.toString() || '');

  const handleEdit = () => {
    if (!isEditMode) return;
    setTempValue(String(currentContent));
    setIsEditing(true);
  };

  const handleSave = () => {
    updateContent(id, tempValue, section, 'text');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue('');
    setIsEditing(false);
  };

  // Se não está em modo de edição, renderizar normalmente
  if (!isEditMode) {
    return (
      <Component className={className}>
        {String(currentContent)}
      </Component>
    );
  }

  // Se está editando, mostrar textarea
  if (isEditing) {
    return (
      <div className="space-y-2">
        <textarea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={3}
          autoFocus
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm"
          >
            Salvar
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  // Modo de edição, não editando - mostrar com indicador
  return (
    <Component
      className={cn(
        className,
        "relative cursor-pointer border-2 border-dashed border-blue-300 p-2 rounded hover:bg-blue-50"
      )}
      onClick={handleEdit}
    >
      {String(currentContent)}
      <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl">
        Editar
      </span>
    </Component>
  );
}