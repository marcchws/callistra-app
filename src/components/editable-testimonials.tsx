'use client';

import React, { useState } from 'react';
import { useContentEditor } from '@/components/content-editor-provider';
import { TestimonialsContent } from '@/lib/content-editor';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnimatedGroup } from '@/components/animations';
import { Star, Quote } from 'lucide-react';

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

interface EditableTestimonialsProps {
  id: string;
  section: string;
  testimonials: TestimonialData[];
  className?: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialData;
  isEditMode: boolean;
  onEdit: (testimonial: TestimonialData) => void;
}

const TestimonialCard = ({ testimonial, isEditMode, onEdit }: TestimonialCardProps) => {
  const handleClick = () => {
    if (isEditMode) {
      onEdit(testimonial);
    }
  };

  return (
    <div
      className={`relative h-full ${isEditMode ? 'cursor-pointer border-2 border-dashed border-blue-300 p-2 rounded hover:bg-blue-50' : ''}`}
      onClick={handleClick}
    >
      <Card className="h-full shadow-lg border-primary/10 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          <Quote className="w-8 h-8 text-primary/20 mb-4" />

          <p className="text-muted-foreground mb-6 flex-grow italic">
            &ldquo;{testimonial.content}&rdquo;
          </p>

          <div className="flex items-center">
            <Avatar className="w-12 h-12 mr-4">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-primary">{testimonial.name}</div>
              <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              <div className="text-sm text-muted-foreground">{testimonial.company}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {isEditMode && (
        <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl">
          Editar Depoimento
        </span>
      )}
    </div>
  );
};

export function EditableTestimonials({
  id,
  section,
  testimonials: defaultTestimonials,
  className
}: EditableTestimonialsProps) {
  const { isEditMode, getContent, updateContent } = useContentEditor();
  const [isEditing, setIsEditing] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialData | null>(null);
  const [tempTestimonial, setTempTestimonial] = useState<TestimonialData | null>(null);

  // Obter conteúdo salvo ou usar os depoimentos padrão
  const savedContent = getContent(id);
  const currentTestimonials = (savedContent?.content as TestimonialsContent)?.testimonials || defaultTestimonials;

  const handleEditTestimonial = (testimonial: TestimonialData) => {
    setEditingTestimonial(testimonial);
    setTempTestimonial({ ...testimonial });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!tempTestimonial) return;

    const updatedTestimonials = currentTestimonials.map((testimonial: TestimonialData) =>
      testimonial.id === tempTestimonial.id ? tempTestimonial : testimonial
    );

    updateContent(id, { testimonials: updatedTestimonials }, section, 'testimonial');
    setIsEditing(false);
    setEditingTestimonial(null);
    setTempTestimonial(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingTestimonial(null);
    setTempTestimonial(null);
  };

  const updateTempTestimonial = (field: keyof TestimonialData, value: string | number) => {
    if (!tempTestimonial) return;
    setTempTestimonial({ ...tempTestimonial, [field]: value });
  };

  // Se está editando um depoimento específico
  if (isEditing && tempTestimonial) {
    return (
      <div className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg bg-white">
        <h3 className="text-lg font-semibold mb-4">Editando Depoimento</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nome:</label>
            <input
              type="text"
              value={tempTestimonial.name}
              onChange={(e) => updateTempTestimonial('name', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cargo:</label>
            <input
              type="text"
              value={tempTestimonial.role}
              onChange={(e) => updateTempTestimonial('role', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Empresa:</label>
            <input
              type="text"
              value={tempTestimonial.company}
              onChange={(e) => updateTempTestimonial('company', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Depoimento:</label>
            <textarea
              value={tempTestimonial.content}
              onChange={(e) => updateTempTestimonial('content', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Avaliação (1-5 estrelas):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={tempTestimonial.rating}
              onChange={(e) => updateTempTestimonial('rating', Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">URL do Avatar (opcional):</label>
            <input
              type="url"
              value={tempTestimonial.avatar || ''}
              onChange={(e) => updateTempTestimonial('avatar', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="https://exemplo.com/avatar.jpg"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Salvar Depoimento
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
    <AnimatedGroup className={`grid md:grid-cols-3 gap-8 ${className}`}>
      {currentTestimonials.map((testimonial: TestimonialData, index: number) => (
        <TestimonialCard
          key={testimonial.id || index}
          testimonial={testimonial}
          isEditMode={isEditMode}
          onEdit={handleEditTestimonial}
        />
      ))}
    </AnimatedGroup>
  );
}