'use client';

import React, { useState, useEffect } from 'react';
import { useContentEditor } from '@/components/content-editor-provider';
import { StatsContent } from '@/lib/content-editor';
import { AnimatedGroup } from '@/components/animations';

interface StatData {
  id: string;
  number: number;
  label: string;
  suffix: string;
}

interface EditableStatsProps {
  id: string;
  section: string;
  stats: StatData[];
  className?: string;
}

interface StatItemProps {
  stat: StatData;
  isEditMode: boolean;
  onEdit: (stat: StatData) => void;
}

const StatItem = ({ stat, isEditMode, onEdit }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const animateCount = React.useCallback(() => {
    if (isEditMode) {
      setCount(stat.number);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const increment = stat.number / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.number) {
        setCount(stat.number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
  }, [stat.number, isEditMode]);

  useEffect(() => {
    if (isEditMode) {
      setCount(stat.number);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCount();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`stat-${stat.id}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [isVisible, animateCount, stat.id, isEditMode]);

  const handleClick = () => {
    if (isEditMode) {
      onEdit(stat);
    }
  };

  return (
    <div
      id={`stat-${stat.id}`}
      className={`text-center ${isEditMode ? 'cursor-pointer border-2 border-dashed border-blue-300 p-4 rounded hover:bg-blue-50' : ''}`}
      onClick={handleClick}
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-medium">
        {stat.label}
      </div>
      {isEditMode && (
        <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl">
          Editar
        </span>
      )}
    </div>
  );
};

export function EditableStats({
  id,
  section,
  stats: defaultStats,
  className
}: EditableStatsProps) {
  const { isEditMode, getContent, updateContent } = useContentEditor();
  const [isEditing, setIsEditing] = useState(false);
  const [editingStat, setEditingStat] = useState<StatData | null>(null);
  const [tempStat, setTempStat] = useState<StatData | null>(null);

  // Obter conteúdo salvo ou usar as stats padrão
  const savedContent = getContent(id);
  const currentStats = (savedContent?.content as StatsContent)?.stats || defaultStats;

  const handleEditStat = (stat: StatData) => {
    setEditingStat(stat);
    setTempStat({ ...stat });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!tempStat) return;

    const updatedStats = currentStats.map((stat) =>
      stat.id === tempStat.id ? tempStat : stat
    );

    updateContent(id, { stats: updatedStats }, section, 'stat');
    setIsEditing(false);
    setEditingStat(null);
    setTempStat(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingStat(null);
    setTempStat(null);
  };

  const updateTempStat = (field: keyof StatData, value: string | number) => {
    if (!tempStat) return;
    setTempStat({ ...tempStat, [field]: value });
  };

  // Se está editando uma estatística específica
  if (isEditing && tempStat) {
    return (
      <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white">
        <h3 className="text-lg font-semibold mb-4">Editando Estatística</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Número:</label>
            <input
              type="number"
              value={tempStat.number}
              onChange={(e) => updateTempStat('number', Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Label:</label>
            <input
              type="text"
              value={tempStat.label}
              onChange={(e) => updateTempStat('label', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sufixo (ex: +, %, /7):</label>
            <input
              type="text"
              value={tempStat.suffix}
              onChange={(e) => updateTempStat('suffix', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
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

  return (
    <AnimatedGroup className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 ${className}`}>
      {currentStats.map((stat, index: number) => (
        <div key={stat.id || index} className="relative">
          <StatItem
            stat={stat as StatData}
            isEditMode={isEditMode}
            onEdit={handleEditStat}
          />
        </div>
      ))}
    </AnimatedGroup>
  );
}