'use client';

import React, { useState } from 'react';
import { useContentEditor } from '@/components/content-editor-provider';
import { PlanContent } from '@/lib/content-editor';
import { cn } from '@/lib/utils';

interface PlanData {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

interface EditablePricingSimpleProps {
  id: string;
  section: string;
  plans: PlanData[];
  className?: string;
}

export function EditablePricingSimple({
  id,
  section,
  plans: defaultPlans,
  className
}: EditablePricingSimpleProps) {
  const { isEditMode, getContent, updateContent } = useContentEditor();
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [tempPlan, setTempPlan] = useState<PlanData | null>(null);

  // Obter conteúdo salvo ou usar os planos padrão
  const savedContent = getContent(id);
  const currentPlans = (savedContent?.content as PlanContent)?.plans || defaultPlans;

  const handleEditPlan = (plan: PlanData) => {
    if (!isEditMode) return;
    setTempPlan({ ...plan });
    setEditingPlanId(plan.id);
    setIsEditing(true);
  };

  const handleSavePlan = () => {
    if (!tempPlan) return;

    const updatedPlans = currentPlans.map((plan) =>
      (plan as PlanData).id === tempPlan.id ? tempPlan : plan
    );

    updateContent(id, { plans: updatedPlans }, section, 'plan');
    setIsEditing(false);
    setEditingPlanId(null);
    setTempPlan(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingPlanId(null);
    setTempPlan(null);
  };

  const updateTempPlan = (field: keyof PlanData, value: unknown) => {
    if (!tempPlan) return;
    setTempPlan({ ...tempPlan, [field]: value });
  };

  const addFeature = () => {
    if (!tempPlan) return;
    setTempPlan({
      ...tempPlan,
      features: [...tempPlan.features, 'Nova funcionalidade']
    });
  };

  const updateFeature = (index: number, value: string) => {
    if (!tempPlan) return;
    const newFeatures = [...tempPlan.features];
    newFeatures[index] = value;
    setTempPlan({ ...tempPlan, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    if (!tempPlan) return;
    const newFeatures = tempPlan.features.filter((_, i) => i !== index);
    setTempPlan({ ...tempPlan, features: newFeatures });
  };

  // Se não está em modo de edição, renderizar normalmente
  if (!isEditMode) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8", className)}>
        {currentPlans.map((plan) => (
          <PlanCard key={(plan as PlanData).id} plan={plan as PlanData} />
        ))}
      </div>
    );
  }

  // Se está editando um plano específico
  if (isEditing && tempPlan) {
    return (
      <div className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg bg-white">
        <h3 className="text-lg font-semibold mb-4">Editando Plano: {tempPlan.name}</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nome do Plano:</label>
            <input
              type="text"
              value={tempPlan.name}
              onChange={(e) => updateTempPlan('name', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Preço (R$):</label>
            <input
              type="number"
              value={tempPlan.price}
              onChange={(e) => updateTempPlan('price', Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição:</label>
            <textarea
              value={tempPlan.description}
              onChange={(e) => updateTempPlan('description', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Texto do Botão:</label>
            <input
              type="text"
              value={tempPlan.buttonText}
              onChange={(e) => updateTempPlan('buttonText', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Funcionalidades:</label>
              <button
                onClick={addFeature}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Adicionar
              </button>
            </div>
            {tempPlan.features.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <button
                  onClick={() => removeFeature(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={tempPlan.isPopular || false}
              onChange={(e) => updateTempPlan('isPopular', e.target.checked)}
              id="popular"
            />
            <label htmlFor="popular" className="text-sm">Marcar como popular</label>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSavePlan}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Salvar Plano
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

  // Modo de edição, não editando - mostrar com indicadores
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8", className)}>
      {currentPlans.map((plan) => (
        <div
          key={(plan as PlanData).id}
          className="relative cursor-pointer border-2 border-dashed border-blue-300 p-4 rounded hover:bg-blue-50"
          onClick={() => handleEditPlan(plan as PlanData)}
        >
          <PlanCard plan={plan as PlanData} />
          <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            Editar Plano
          </span>
        </div>
      ))}
    </div>
  );
}

// Componente auxiliar para renderizar um plano
function PlanCard({ plan }: { plan: PlanData }) {
  return (
    <div className={cn(
      "bg-white border rounded-lg p-6 h-full flex flex-col shadow-sm",
      plan.isPopular && "border-blue-500 relative"
    )}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
          Mais Popular
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
        <div className="text-right">
          <span className="text-gray-500 text-lg">R$</span>
          <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
          <span className="text-gray-500 text-sm">/mês</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm italic mb-6">{plan.description}</p>

      <div className="flex-1">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Recursos</p>
        <ul className="space-y-2 text-gray-700 text-sm">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors">
        {plan.buttonText}
      </button>
    </div>
  );
}