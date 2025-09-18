'use client';

import React, { useState } from 'react';
import { useContentEditor } from '@/components/content-editor-provider';
import { ContactMethodsContent } from '@/lib/content-editor';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MessageCircle, LucideIcon } from 'lucide-react';

interface ContactMethodData {
  id: string;
  icon: string;
  title: string;
  value: string;
  action: string;
}

interface EditableContactMethodsProps {
  id: string;
  section: string;
  contactMethods: ContactMethodData[];
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Phone,
  MessageCircle,
  Mail,
};

interface ContactMethodCardProps {
  contactMethod: ContactMethodData;
  isEditMode: boolean;
  onEdit: (contactMethod: ContactMethodData) => void;
}

const ContactMethodCard = ({ contactMethod, isEditMode, onEdit }: ContactMethodCardProps) => {
  const Icon = iconMap[contactMethod.icon] || Phone;

  const handleClick = () => {
    if (isEditMode) {
      onEdit(contactMethod);
    }
  };

  return (
    <div
      className={`relative ${isEditMode ? 'cursor-pointer border-2 border-dashed border-blue-300 p-2 rounded hover:bg-blue-50' : ''}`}
      onClick={handleClick}
    >
      <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-4">
          <a
            href={contactMethod.action}
            target={contactMethod.action.startsWith('http') ? '_blank' : undefined}
            rel={contactMethod.action.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center space-x-4 hover:text-primary transition-colors"
            onClick={(e) => isEditMode && e.preventDefault()}
          >
            <div className="w-12 h-12 bg-secondary-foreground rounded-full flex items-center justify-center">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-primary">{contactMethod.title}</h4>
              <p className="text-muted-foreground">{contactMethod.value}</p>
            </div>
          </a>
        </CardContent>
      </Card>
      {isEditMode && (
        <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl">
          Editar Contato
        </span>
      )}
    </div>
  );
};

export function EditableContactMethods({
  id,
  section,
  contactMethods: defaultContactMethods,
  className
}: EditableContactMethodsProps) {
  const { isEditMode, getContent, updateContent } = useContentEditor();
  const [isEditing, setIsEditing] = useState(false);
  const [editingContactMethod, setEditingContactMethod] = useState<ContactMethodData | null>(null);
  const [tempContactMethod, setTempContactMethod] = useState<ContactMethodData | null>(null);

  const savedContent = getContent(id);
  const currentContactMethods = (savedContent?.content as ContactMethodsContent)?.contactMethods || defaultContactMethods;

  const handleEditContactMethod = (contactMethod: ContactMethodData) => {
    setEditingContactMethod(contactMethod);
    setTempContactMethod({ ...contactMethod });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!tempContactMethod) return;

    const updatedContactMethods = currentContactMethods.map((contactMethod) =>
      contactMethod.id === tempContactMethod.id ? tempContactMethod : contactMethod
    );

    updateContent(id, { contactMethods: updatedContactMethods }, section, 'contact-method');
    setIsEditing(false);
    setEditingContactMethod(null);
    setTempContactMethod(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingContactMethod(null);
    setTempContactMethod(null);
  };

  const updateTempContactMethod = (field: keyof ContactMethodData, value: string) => {
    if (!tempContactMethod) return;
    setTempContactMethod({ ...tempContactMethod, [field]: value });
  };

  if (isEditing && tempContactMethod) {
    return (
      <div className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg bg-white">
        <h3 className="text-lg font-semibold mb-4">Editando Método de Contato</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Título:</label>
            <input
              type="text"
              value={tempContactMethod.title}
              onChange={(e) => updateTempContactMethod('title', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Valor:</label>
            <input
              type="text"
              value={tempContactMethod.value}
              onChange={(e) => updateTempContactMethod('value', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Ex: +55 (11) 4004-1234"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ação/Link:</label>
            <input
              type="text"
              value={tempContactMethod.action}
              onChange={(e) => updateTempContactMethod('action', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Ex: tel:+5511400412 34, mailto:contato@exemplo.com, https://wa.me/5511912345678"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ícone:</label>
            <select
              value={tempContactMethod.icon}
              onChange={(e) => updateTempContactMethod('icon', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Phone">Telefone</option>
              <option value="MessageCircle">WhatsApp</option>
              <option value="Mail">E-mail</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Salvar Contato
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
    <div className={`space-y-4 ${className}`}>
      {currentContactMethods.map((contactMethod, index: number) => (
        <ContactMethodCard
          key={contactMethod.id || index}
          contactMethod={contactMethod}
          isEditMode={isEditMode}
          onEdit={handleEditContactMethod}
        />
      ))}
    </div>
  );
}