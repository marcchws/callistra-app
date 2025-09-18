'use client';

import React, { useState, useEffect } from 'react';
import { useContentEditor } from '@/components/content-editor-provider';
import { ContentHistory, ImageContent, PlanContent } from '@/lib/content-editor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  History,
  Eye,
  RotateCcw,
  Clock,
  User,
  FileText,
  Image,
  DollarSign
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function ContentAudit() {
  const { getHistory } = useContentEditor();
  const [history, setHistory] = useState<ContentHistory[]>([]);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  useEffect(() => {
    // Carregar histórico completo
    const fullHistory = getHistory();
    setHistory(fullHistory);
  }, [getHistory]);

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
      case 'rich-text':
        return <FileText className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'plan':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-800';
      case 'update':
        return 'bg-blue-100 text-blue-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'create':
        return 'Criado';
      case 'update':
        return 'Atualizado';
      case 'delete':
        return 'Excluído';
      default:
        return action;
    }
  };

  const filteredHistory = selectedContent
    ? history.filter(h => h.contentId === selectedContent)
    : history;

  const uniqueContentIds = Array.from(new Set(history.map(h => h.contentId)));

  const renderContentPreview = (historyItem: ContentHistory) => {
    const { newContent, previousContent } = historyItem;

    if (typeof newContent === 'string') {
      return (
        <div className="text-sm">
          <div className="bg-red-50 border-l-4 border-red-200 p-2 mb-2">
            <span className="text-red-800 font-medium">Antes:</span>
            <p className="text-red-700 truncate">{String(previousContent) || 'Conteúdo vazio'}</p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-200 p-2">
            <span className="text-green-800 font-medium">Depois:</span>
            <p className="text-green-700 truncate">{newContent}</p>
          </div>
        </div>
      );
    }

    if ((newContent as ImageContent)?.src) {
      return (
        <div className="text-sm">
          <span className="font-medium">Imagem:</span>
          <p className="text-gray-600 truncate">{(newContent as ImageContent).alt || 'Sem descrição'}</p>
        </div>
      );
    }

    if ((newContent as PlanContent)?.plans) {
      return (
        <div className="text-sm">
          <span className="font-medium">Planos atualizados:</span>
          <p className="text-gray-600">{(newContent as PlanContent).plans.length} plano(s)</p>
        </div>
      );
    }

    return (
      <div className="text-sm text-gray-500">
        Conteúdo atualizado
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Histórico de Alterações
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Acompanhe todas as modificações realizadas no conteúdo da landing page
        </p>
      </CardHeader>

      <CardContent>
        <div className="flex gap-4">
          {/* Filtros */}
          <div className="w-64 space-y-2">
            <h4 className="font-medium text-sm">Filtrar por conteúdo:</h4>
            <div className="space-y-1">
              <Button
                variant={selectedContent === null ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setSelectedContent(null)}
              >
                Todos os conteúdos
              </Button>
              {uniqueContentIds.map(contentId => (
                <Button
                  key={contentId}
                  variant={selectedContent === contentId ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start truncate"
                  onClick={() => setSelectedContent(contentId)}
                >
                  {contentId.replace(/-/g, ' ')}
                </Button>
              ))}
            </div>
          </div>

          <Separator orientation="vertical" className="h-96" />

          {/* Lista de histórico */}
          <div className="flex-1">
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {filteredHistory.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma alteração registrada ainda</p>
                  </div>
                ) : (
                  filteredHistory.map((historyItem) => (
                    <Card key={historyItem.id} className="border-l-4 border-l-primary/20">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getContentTypeIcon('text')}
                            <span className="font-medium text-sm">
                              {historyItem.contentId.replace(/-/g, ' ')}
                            </span>
                            <Badge className={getActionColor(historyItem.action)}>
                              {getActionText(historyItem.action)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(historyItem.timestamp), {
                              addSuffix: true,
                              locale: ptBR
                            })}
                          </div>
                        </div>

                        {renderContentPreview(historyItem)}

                        {historyItem.userId && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>Editado por: {historyItem.userId}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 mt-3">
                          <Button size="sm" variant="outline" className="h-7">
                            <Eye className="h-3 w-3 mr-1" />
                            Visualizar
                          </Button>
                          <Button size="sm" variant="outline" className="h-7">
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Reverter
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Componente resumo para o painel admin
export function ContentAuditSummary() {
  const { getHistory } = useContentEditor();
  const [recentChanges, setRecentChanges] = useState<ContentHistory[]>([]);

  useEffect(() => {
    const fullHistory = getHistory();
    // Pegar apenas as 5 mudanças mais recentes
    setRecentChanges(fullHistory.slice(0, 5));
  }, [getHistory]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <History className="h-4 w-4" />
          Atividade Recente
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentChanges.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma atividade recente</p>
        ) : (
          <div className="space-y-3">
            {recentChanges.map((change) => (
              <div key={change.id} className="flex items-center gap-3 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  change.action === 'create' ? 'bg-green-500' :
                  change.action === 'update' ? 'bg-blue-500' : 'bg-red-500'
                }`} />
                <div className="flex-1">
                  <span className="font-medium">
                    {change.contentId.replace(/-/g, ' ')}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    foi {getActionText(change.action).toLowerCase()}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(change.timestamp), {
                    addSuffix: true,
                    locale: ptBR
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getActionText(action: string) {
  switch (action) {
    case 'create':
      return 'Criado';
    case 'update':
      return 'Atualizado';
    case 'delete':
      return 'Excluído';
    default:
      return action;
  }
}