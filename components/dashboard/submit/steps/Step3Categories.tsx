'use client';


import { cardBase, SubSection, EntitySelect } from '..';
import { FormData } from '../renders/types';

interface Props {
  form: FormData;
  toggleArr: <T>(key: keyof FormData, val: T) => void;
  // Real API data — IDs are actual UUIDs from the database
  categories:  { id: string; name: string }[];
  tags:        { id: string; name: string }[];
  industries:  { id: string; name: string }[];
  useCases:    { id: string; name: string }[];  // already normalised (title → name)
  loading: boolean;
}

export default function Step3Categories({
  form, toggleArr,
  categories, tags, industries, useCases,
  loading,
}: Props) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">

      {/* Categories — max 5, first = primary */}
      <div className="p-4 sm:p-5 rounded-xl flex flex-col gap-3" style={cardBase}>
        <SubSection
          title="Categories"
          description="Select up to 5 categories. The first selected becomes the primary."
        />
        <EntitySelect
          options={categories}
          selected={form.categoryIds}
          onToggle={id => toggleArr('categoryIds', id)}
          max={5}
          placeholder="Search categories…"
          loading={loading}
        />
        {form.categoryIds.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>Primary:</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: 'rgba(138,18,18,0.12)',
                color: 'var(--color-primary-light)',
                border: '1px solid var(--color-primary)',
              }}>
              {categories.find(c => c.id === form.categoryIds[0])?.name}
            </span>
          </div>
        )}
      </div>

      {/* Tags — max 10 */}
      <div className="p-4 sm:p-5 rounded-xl flex flex-col gap-3" style={cardBase}>
        <SubSection title="Tags" description="Up to 10 tags describing your tool's features." />
        <EntitySelect
          options={tags}
          selected={form.tagIds}
          onToggle={id => toggleArr('tagIds', id)}
          max={10}
          placeholder="Search tags…"
          loading={loading}
        />
      </div>

      {/* Use Cases + Industries side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-xl flex flex-col gap-3" style={cardBase}>
          <SubSection title="Use Cases" description="What problems does your tool solve? Max 8." />
          <EntitySelect
            options={useCases}
            selected={form.useCaseIds}
            onToggle={id => toggleArr('useCaseIds', id)}
            max={8}
            placeholder="Search use cases…"
            loading={loading}
          />
        </div>
        <div className="p-4 sm:p-5 rounded-xl flex flex-col gap-3" style={cardBase}>
          <SubSection title="Industries" description="Relevant industries. Max 5." />
          <EntitySelect
            options={industries}
            selected={form.industryIds}
            onToggle={id => toggleArr('industryIds', id)}
            max={5}
            placeholder="Search industries…"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}