'use client';

import React, { useState } from 'react';

export default function SearchInput({
  onSubmit,
  onChange,
  onClear,
  placeholder
}: {
  onSubmit?: (query: string) => any;
  onChange?: (query: string) => any;
  onClear?: (query: string) => any;
  placeholder?: string;
}) {
  const [query, setQuery] = useState('');

  function submit(event: React.FormEvent): void {
    event.preventDefault();
    if (!onChange && onSubmit) onSubmit(query);
  }

  function change(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    setQuery(value);
    if (onChange) onChange(value);
    if (value === '' && onClear) onClear('');
  }

  function clear() {
    setQuery('');
    if (onClear) onClear('');
  }

  return (
    <form className="relative" onSubmit={submit}>
      <input
        type="text"
        className="px-10 py-2 rounded-lg w-full"
        placeholder={placeholder}
        autoComplete="false"
        value={query}
        onChange={change}
      />
      <i className="bi bi-search absolute left-0 top-1/2 -translate-y-1/2 px-3" />
      {query !== '' && (
        <button
          className="px-3 py-2 absolute right-0 top-1/2 -translate-y-1/2"
          type="button"
          onClick={clear}
        >
          <i className="bi bi-x"></i>
        </button>
      )}
    </form>
  );
}
