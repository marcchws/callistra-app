'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { EditableContent, ContentHistory } from '@/lib/content-editor';

interface ContentEditorContextType {
  isEditMode: boolean;
  setEditMode: (enabled: boolean) => void;
  getContent: (id: string) => EditableContent | undefined;
  updateContent: (id: string, content: unknown, section: string, type: EditableContent['type']) => void;
  getHistory: (contentId?: string) => ContentHistory[];
  saveChanges: () => void;
  loadContent: () => void;
}

const ContentEditorContext = createContext<ContentEditorContextType | undefined>(undefined);

export function ContentEditorProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState<Map<string, EditableContent>>(new Map());
  const [history, setHistory] = useState<ContentHistory[]>([]);

  const loadContent = useCallback(() => {
    if (typeof window !== 'undefined') {
      const contentData = localStorage.getItem('callistra-content');
      const historyData = localStorage.getItem('callistra-content-history');

      if (contentData) {
        try {
          const entries = JSON.parse(contentData);
          setContent(new Map(entries));
        } catch (error) {
          console.error('Erro ao carregar conteúdo:', error);
        }
      }

      if (historyData) {
        try {
          setHistory(JSON.parse(historyData));
        } catch (error) {
          console.error('Erro ao carregar histórico:', error);
        }
      }
    }
  }, []);

  const saveChanges = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('callistra-content', JSON.stringify(Array.from(content.entries())));
        localStorage.setItem('callistra-content-history', JSON.stringify(history));
      } catch (error) {
        console.error('Erro ao salvar:', error);
      }
    }
  }, [content, history]);

  const getContent = useCallback((id: string) => {
    return content.get(id);
  }, [content]);

  const updateContent = useCallback((
    id: string,
    newContent: unknown,
    section: string,
    type: EditableContent['type'] = 'text'
  ) => {
    const existing = content.get(id);

    // Adicionar ao histórico se for uma atualização
    if (existing) {
      const historyItem: ContentHistory = {
        id: crypto.randomUUID(),
        contentId: id,
        content: newContent,
        section: section,
        type: type,
        previousContent: existing.content,
        newContent: newContent,
        timestamp: new Date(),
        modifiedBy: 'user',
        action: 'update'
      };
      setHistory(prev => [historyItem, ...prev.slice(0, 99)]);
    }

    const contentItem: EditableContent = {
      id,
      type,
      section,
      content: newContent,
      lastModified: new Date(),
      modifiedBy: 'user'
    };

    setContent(prev => new Map(prev.set(id, contentItem)));
  }, [content]);

  const getHistory = useCallback((contentId?: string) => {
    if (contentId) {
      return history.filter(h => h.contentId === contentId);
    }
    return history;
  }, [history]);

  const setEditMode = useCallback((enabled: boolean) => {
    setIsEditMode(enabled);
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  useEffect(() => {
    saveChanges();
  }, [content, history, saveChanges]);

  const value: ContentEditorContextType = {
    isEditMode,
    setEditMode,
    getContent,
    updateContent,
    getHistory,
    saveChanges,
    loadContent
  };

  return (
    <ContentEditorContext.Provider value={value}>
      {children}
    </ContentEditorContext.Provider>
  );
}

export function useContentEditor() {
  const context = useContext(ContentEditorContext);
  if (!context) {
    throw new Error('useContentEditor deve ser usado dentro de ContentEditorProvider');
  }
  return context;
}