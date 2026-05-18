import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { TextInput } from '@/components/ui/TextInput';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import type { ServiceSection, NewHostForm } from '@/types';

interface EditModeFormsProps {
  sections: ServiceSection[];
  onAddSection: (title: string) => void;
  onAddHost: (form: NewHostForm) => void;
}

const EMPTY_HOST: NewHostForm = {
  name: '',
  sectionId: '',
  url: '',
  icon: '🔗',
  description: '',
  port: '',
  tags: '',
};

export function EditModeForms({ sections, onAddSection, onAddHost }: EditModeFormsProps) {
  const [sectionTitle, setSectionTitle] = useState('');
  const [host, setHost] = useState<NewHostForm>({
    ...EMPTY_HOST,
    sectionId: sections[0]?.id ?? '',
  });

  const handleSectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSection(sectionTitle);
    setSectionTitle('');
  };

  const handleHostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddHost(host);
    setHost({ ...EMPTY_HOST, sectionId: sections[0]?.id ?? '' });
  };

  const setField = (field: keyof NewHostForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setHost((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-in">
      {/* Add section */}
      <Card variant="base" className="border-amber-400 dark:border-amber-600">
        <Heading level={3} className="mb-3">➕ Add Custom Category Group</Heading>
        <form onSubmit={handleSectionSubmit} className="flex gap-2">
          <TextInput
            placeholder="Category name (e.g., File Hosting)"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            required
          />
          <Button variant="primary" type="submit">Create</Button>
        </form>
      </Card>

      {/* Add host */}
      <Card variant="base" className="border-amber-400 dark:border-amber-600">
        <Heading level={3} className="mb-3">📍 Fast Node Register</Heading>
        <form onSubmit={handleHostSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <TextInput placeholder="Application Name" value={host.name} onChange={setField('name')} required />
            <Select
              options={sections.map((s) => ({ value: s.id, label: s.name }))}
              value={host.sectionId}
              onChange={setField('sectionId')}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <TextInput placeholder="Port" value={host.port} onChange={setField('port')} />
            <TextInput placeholder="Icon (Emoji)" value={host.icon} onChange={setField('icon')} />
            <TextInput placeholder="Tags (comma-separated)" value={host.tags} onChange={setField('tags')} />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <TextInput placeholder="Endpoint redirection URL" value={host.url} onChange={setField('url')} required />
            </div>
            <Button variant="primary" type="submit">Add Service</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
