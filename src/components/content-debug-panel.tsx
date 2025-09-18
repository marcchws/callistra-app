'use client';

import React, { useState, useEffect } from 'react';
import { useContentEditor } from '@/components/content-editor-provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Settings,
  Save,
  RotateCcw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ContentDebugPanel() {
  const { isEditMode, setEditMode, getHistory } = useContentEditor();
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({
    editableElements: 0,
    modifiedContent: 0,
    totalSections: 0,
  });

  // Update stats when content changes
  useEffect(() => {
    const history = getHistory();
    const totalElements = history.length;
    const modifiedElements = history.filter(item => 
      item.action === 'update' && item.timestamp
    ).length;
    const sections = new Set(history.map(item => item.contentId?.split('-')[0] || 'unknown')).size;

    setStats({
      editableElements: totalElements,
      modifiedContent: modifiedElements,
      totalSections: sections,
    });
  }, [getHistory]);

  const handleExport = () => {
    const history = getHistory();
    const exported = JSON.stringify(history, null, 2);
    const blob = new Blob([exported], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `callistra-content-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('callistra-content');
      localStorage.removeItem('callistra-content-history');
      window.location.reload();
    }
  };

  // Painel disponível em todos os ambientes para testes

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 flex items-center justify-center group"
      >
        <Settings className="h-6 w-6 transition-transform group-hover:rotate-90" />
      </button>

       {/* Admin Dialog */}
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogContent className="w-[95vw] max-w-[800px] max-h-[95vh] p-0 gap-0 bg-background border-slate-200/60 shadow-2xl overflow-hidden" style={{ width: '95vw', maxWidth: '800px' }}>
          {/* Header Section */}
          <div className="bg-primary border-b border-primary/20 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-white">
                    Painel Administrativo
                  </DialogTitle>
                  <DialogDescription className="text-blue-100">
                    Sistema de gestão de conteúdo • Callistra
                  </DialogDescription>
                </div>
              </div>
              <Badge
                variant={isEditMode ? "default" : "secondary"}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-0",
                  isEditMode
                    ? "bg-green-500 text-white"
                    : "bg-white/20 text-white border border-white/30"
                )}
              >
                {isEditMode ? "MODO EDIÇÃO" : "VISUALIZAÇÃO"}
              </Badge>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-slate-900 mb-2">{stats.editableElements}</div>
                <div className="text-sm text-slate-600">Elementos Editáveis</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-slate-900 mb-2">{stats.modifiedContent}</div>
                <div className="text-sm text-slate-600">Modificações</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-slate-900 mb-2">{stats.totalSections}</div>
                <div className="text-sm text-slate-600">Seções Ativas</div>
              </div>
            </div>

            {/* Edit Mode Control */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Modo de Edição</h3>
                  <p className="text-slate-600">
                    {isEditMode
                      ? "Elementos editáveis estão visíveis e podem ser modificados"
                      : "Modo de visualização ativo - alterações são salvas automaticamente"
                    }
                  </p>
                </div>
                <Switch
                  checked={isEditMode}
                  onCheckedChange={setEditMode}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-6">
              <Button
                onClick={handleExport}
                className="h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Save className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Exportar Conteúdo</div>
                  <div className="text-sm opacity-90">Baixar arquivo de backup</div>
                </div>
              </Button>

              <Button
                onClick={handleClearAll}
                disabled={stats.modifiedContent === 0}
                variant="outline"
                className="h-16 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium disabled:opacity-50 transition-all duration-200"
              >
                <RotateCcw className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Restaurar Original</div>
                  <div className="text-sm text-slate-500">Reverter todas as alterações</div>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}