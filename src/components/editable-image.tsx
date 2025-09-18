'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useContentEditor } from '@/components/content-editor-provider';
import { ImageContent } from '@/lib/content-editor';
import { Upload, Edit3, Check, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface EditableImageProps {
  id: string;
  section: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
}

export function EditableImage({
  id,
  section,
  src,
  alt,
  width,
  height,
  className,
  placeholder = 'Clique para alterar imagem'
}: EditableImageProps) {
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

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
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
      alt: newAlt,
      originalFile: previewSrc ? fileInputRef.current?.files?.[0]?.name : null
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

  const handleStartEdit = () => {
    if (!isEditMode) return;
    setNewAlt(currentAlt);
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja remover esta imagem?')) {
      updateContent(id, { src: '', alt: '', deleted: true }, section, 'image');
    }
  };

  const displaySrc = previewSrc || currentSrc;
  const displayAlt = newAlt || currentAlt;

  // Se a imagem foi deletada
  if ((savedContent?.content as ImageContent)?.deleted) {
    return isEditMode ? (
      <div
        className={cn(
          "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors",
          className
        )}
        onClick={handleStartEdit}
      >
        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">{placeholder}</p>
      </div>
    ) : null;
  }

  if (!isEditMode) {
    return (
      <Image
        src={displaySrc}
        alt={displayAlt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  if (isEditing) {
    return (
      <div className="relative">
        <div className="space-y-4 p-4 border-2 border-primary/50 rounded-lg bg-white">
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageSelect}
              className="flex-1"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>

          <Input
            placeholder="Texto alternativo da imagem"
            value={newAlt}
            onChange={(e) => setNewAlt(e.target.value)}
          />

          {displaySrc && (
            <div className="relative">
              <Image
                src={displaySrc}
                alt={displayAlt}
                width={width || 400}
                height={height || 300}
                className={cn("rounded-md", className)}
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4" />
              Salvar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
              Cancelar
            </Button>
            {currentSrc && (
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
                Remover
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative group cursor-pointer"
      onClick={handleStartEdit}
    >
      <Image
        src={displaySrc}
        alt={displayAlt}
        width={width}
        height={height}
        className={cn(
          className,
          "hover:ring-2 hover:ring-primary/50 transition-all rounded-md"
        )}
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
        <Edit3 className="h-6 w-6 text-white" />
      </div>
    </div>
  );
}