'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useContentEditor } from '@/components/content-editor-provider';
import { PlanContent } from '@/lib/content-editor';
import { Edit3, Check, X, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

export interface PlanData {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  isVisible?: boolean;
  buttonText: string;
  icon?: string;
}

export interface EditablePricingProps {
  id: string;
  section: string;
  plans: PlanData[];
  className?: string;
}

export function EditablePricing({
  id,
  section,
  plans: defaultPlans,
  className
}: EditablePricingProps) {
  const { isEditMode, getContent, updateContent } = useContentEditor();
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlans, setEditingPlans] = useState<PlanData[]>(defaultPlans);

  // Obter conteúdo salvo ou usar os planos padrão
  const savedContent = getContent(id);
  const currentPlans = (savedContent?.content as PlanContent)?.plans || defaultPlans;
  const visiblePlans = currentPlans.filter((plan) => (plan as PlanData).isVisible !== false);

  const handleStartEdit = () => {
    if (!isEditMode) return;
    setEditingPlans([...currentPlans] as PlanData[]);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateContent(id, { plans: editingPlans }, section, 'plan');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingPlans([...currentPlans] as PlanData[]);
    setIsEditing(false);
  };

  const addNewPlan = () => {
    const newPlan: PlanData = {
      id: crypto.randomUUID(),
      name: 'Novo Plano',
      price: 0,
      description: 'Descrição do plano',
      features: ['Recurso 1', 'Recurso 2'],
      isVisible: true,
      buttonText: 'Contratar'
    };
    setEditingPlans([...editingPlans, newPlan]);
  };

  const updatePlan = (planId: string, updates: Partial<PlanData>) => {
    setEditingPlans(editingPlans.map(plan =>
      plan.id === planId ? { ...plan, ...updates } : plan
    ));
  };

  const deletePlan = (planId: string) => {
    if (confirm('Tem certeza que deseja excluir este plano?')) {
      setEditingPlans(editingPlans.filter(plan => plan.id !== planId));
    }
  };

  const addFeature = (planId: string) => {
    const plan = editingPlans.find(p => p.id === planId);
    if (plan) {
      updatePlan(planId, {
        features: [...plan.features, 'Novo recurso']
      });
    }
  };

  const updateFeature = (planId: string, featureIndex: number, newText: string) => {
    const plan = editingPlans.find(p => p.id === planId);
    if (plan) {
      const newFeatures = [...plan.features];
      newFeatures[featureIndex] = newText;
      updatePlan(planId, { features: newFeatures });
    }
  };

  const removeFeature = (planId: string, featureIndex: number) => {
    const plan = editingPlans.find(p => p.id === planId);
    if (plan) {
      const newFeatures = plan.features.filter((_, index) => index !== featureIndex);
      updatePlan(planId, { features: newFeatures });
    }
  };

  if (!isEditMode) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8", className)}>
        {visiblePlans.map((plan) => (
          <PlanCard key={(plan as PlanData).id} plan={plan as PlanData} />
        ))}
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Editando Planos</h3>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={addNewPlan} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Plano
            </Button>
            <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4 mr-2" />
              Salvar Todos
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {editingPlans.map((plan) => (
            <Card key={plan.id} className="border-2 border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={plan.isVisible !== false}
                      onCheckedChange={(checked) => updatePlan(plan.id, { isVisible: checked })}
                    />
                    {plan.isVisible !== false ? (
                      <Eye className="h-4 w-4 text-green-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deletePlan(plan.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Input
                    value={plan.name}
                    onChange={(e) => updatePlan(plan.id, { name: e.target.value })}
                    placeholder="Nome do plano"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm">R$</span>
                    <Input
                      type="number"
                      value={plan.price}
                      onChange={(e) => updatePlan(plan.id, { price: Number(e.target.value) })}
                      placeholder="Preço"
                    />
                    <span className="text-sm">/mês</span>
                  </div>
                  <Textarea
                    value={plan.description}
                    onChange={(e) => updatePlan(plan.id, { description: e.target.value })}
                    placeholder="Descrição do plano"
                    rows={2}
                  />
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Recursos:</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addFeature(plan.id)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(plan.id, index, e.target.value)}
                        className="text-sm"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFeature(plan.id, index)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  <Input
                    value={plan.buttonText}
                    onChange={(e) => updatePlan(plan.id, { buttonText: e.target.value })}
                    placeholder="Texto do botão"
                    className="mt-3"
                  />

                  <div className="flex items-center gap-2 mt-2">
                    <Switch
                      checked={plan.isPopular || false}
                      onCheckedChange={(checked) => updatePlan(plan.id, { isPopular: checked })}
                    />
                    <span className="text-sm">Marcar como popular</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative group cursor-pointer hover:bg-primary/5 border-2 border-transparent hover:border-primary/30 rounded-lg p-4 transition-all",
        className
      )}
      onClick={handleStartEdit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {visiblePlans.map((plan) => (
          <PlanCard key={(plan as PlanData).id} plan={plan as PlanData} />
        ))}
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit3 className="h-5 w-5 text-primary" />
      </div>
    </div>
  );
}

// Componente auxiliar para renderizar um plano
function PlanCard({ plan }: { plan: PlanData }) {
  const handlePlanClick = () => {
    // Redirecionar para registro com o plano selecionado
    window.location.href = `/registro?plan=${plan.id}`;
  };

  return (
    <Card className={cn(
      "flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-200",
      plan.isPopular && "border-2 border-secondary-foreground relative"
    )}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold bg-secondary-foreground text-white">
          Mais Popular
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-primary">{plan.name}</h3>
          <div className="text-right">
            <span className="text-primary/70 text-lg font-medium">R$</span>
            <span className="text-3xl sm:text-4xl font-bold text-primary">{plan.price}</span>
            <span className="text-muted-foreground text-sm">/mês</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm italic">{plan.description}</p>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-primary/50 text-xs font-semibold uppercase tracking-wider mb-3">Recursos</p>
        <ul className="space-y-2 text-foreground text-sm">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className={cn(
                "w-1.5 h-1.5 rounded-full mr-3",
                plan.isPopular ? "bg-secondary-foreground" : "bg-primary"
              )}></span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>

      <div className="p-6 pt-0">
        <Button 
          className="w-full" 
          variant={plan.isPopular ? "default" : "outline"}
          onClick={handlePlanClick}
        >
          {plan.buttonText}
        </Button>
      </div>
    </Card>
  );
}