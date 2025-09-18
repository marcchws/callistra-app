'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useContentEditor } from '@/components/content-editor-provider';
import { ImageContent } from '@/lib/content-editor';
import { cn } from '@/lib/utils';

interface EditableImageSimpleProps {
  id: string;
  section: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function EditableImageSimple({
  id,
  section,
  src,
  alt,
  width,
  height,
  className
}: EditableImageSimpleProps) {
  const { isEditMode, getContent, updateContent } = useContentEditor();
  const [isEditing, setIsEditing] = useState(false);
  const [newAlt, setNewAlt] = useState(alt);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Obter conteúdo salvo ou usar o src padrão
  const savedContent = getContent(id);
  const currentSrc = (savedContent?.content as ImageContent)?.src || src;
  const currentAlt = (savedContent?.content as ImageContent)?.alt || alt;

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      alert('Selecione apenas arquivos de imagem.');
      return;
    }

    // Criar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewSrc(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const imageData = {
      src: previewSrc || currentSrc,
      alt: newAlt
    };
    updateContent(id, imageData, section, 'image');
    setIsEditing(false);
    setPreviewSrc(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPreviewSrc(null);
    setNewAlt(currentAlt);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = () => {
    if (!isEditMode) return;
    setNewAlt(currentAlt);
    setIsEditing(true);
  };

  // Se não está em modo de edição, renderizar normalmente
  if (!isEditMode) {
    return (
      <Image
        src={currentSrc}
        alt={currentAlt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  // Se está editando
  if (isEditing) {
    return (
      <div className="space-y-4 p-4 border border-gray-300 rounded">
        <div>
          <label className="block text-sm font-medium mb-2">Nova imagem:</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Texto alternativo:</label>
          <input
            type="text"
            value={newAlt}
            onChange={(e) => setNewAlt(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {(previewSrc || currentSrc) && (
          <div>
            <label className="block text-sm font-medium mb-2">Preview:</label>
            <Image
              src={previewSrc || currentSrc}
              alt={newAlt}
              width={width || 300}
              height={height || 200}
              className="border rounded"
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Salvar
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  // Modo de edição, não editando - mostrar com indicador
  return (
    <div
      className="relative cursor-pointer border-2 border-dashed border-blue-300 p-2 rounded hover:bg-blue-50"
      onClick={handleEdit}
    >
      <Image
        src={currentSrc}
        alt={currentAlt}
        width={width}
        height={height}
        className={className}
      />
      <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl">
        Editar Imagem
      </span>
    </div>
  );
}