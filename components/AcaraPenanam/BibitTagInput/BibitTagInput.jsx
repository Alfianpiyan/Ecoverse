"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { X } from 'lucide-react'; 

const ALL_BIBIT = [
  "Pohon Mahoni",
  "Pohon Jati Putih",
  "Pohon Sengon",
  "Pohon Pinus",
];

const bibitColorMap = {
  "Pohon Mahoni": { bg: 'bg-purple-200/80', text: 'text-purple-800', dot: 'bg-purple-600' },
  "Pohon Jati Putih": { bg: 'bg-blue-200/80', text: 'text-blue-800', dot: 'bg-blue-600' },
  "Pohon Sengon": { bg: 'bg-green-200/80', text: 'text-green-800', dot: 'bg-green-600' },
  "Pohon Pinus": { bg: 'bg-orange-200/80', text: 'text-orange-800', dot: 'bg-orange-600' },
};

export function BibitTagInput({ onTagsChange, initialTags = [] }) {
  const [selectedTags, setSelectedTags] = useState(initialTags);
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    onTagsChange(selectedTags);
  }, [selectedTags]); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);


  const TagItem = ({ tag, onRemove, clickable = false }) => {
    const colorStyle = bibitColorMap[tag] || { bg: 'bg-gray-200', text: 'text-gray-800', dot: 'bg-gray-500' };
    const isTagSelected = selectedTags.includes(tag);

    return (
      <span 
        className={`flex items-center space-x-1 py-1 px-2.5 m-1 rounded-lg font-medium text-xs transition-colors ${colorStyle.bg} ${colorStyle.text} 
                   ${clickable && !isTagSelected ? 'cursor-pointer hover:bg-opacity-70' : isTagSelected ? 'opacity-70 cursor-default' : ''}`}
        onClick={clickable && !isTagSelected ? () => addTag(tag) : undefined}
      >
        <span>{tag}</span>
        {onRemove && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
            className={`text-current opacity-70 hover:opacity-100 p-0.5 rounded-full -mr-1`}
            aria-label={`Hapus ${tag}`}
          >
            <X className="w-3.5 h-3.5" /> 
          </button>
        )}
      </span>
    );
  };

  const addTag = (tag) => {
    const normalizedTag = tag.trim();
    if (normalizedTag && !selectedTags.includes(normalizedTag) && ALL_BIBIT.includes(normalizedTag)) {
      setSelectedTags(prev => [...prev, normalizedTag]);
      setInputValue(''); 
      setShowDropdown(false); 
      inputRef.current?.focus();
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };
  
  const availableBibit = useMemo(() => {
      const unselected = ALL_BIBIT.filter(bibit => !selectedTags.includes(bibit));
      if (!inputValue) return unselected;
      return unselected.filter(bibit => 
          bibit.toLowerCase().includes(inputValue.toLowerCase())
      );
  }, [selectedTags, inputValue]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      if (availableBibit.length > 0) {
        addTag(availableBibit[0]);
      }
    }
  };
  
  const clearAllTags = () => {
      setSelectedTags([]);
      setInputValue('');
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div 
        className="flex flex-wrap items-center w-full border border-[#D1D5DB] rounded-lg min-h-[44px] focus-within:border-[#10B981] transition duration-150 text-base py-2"
        onClick={() => inputRef.current?.focus()}
      >
        {selectedTags.map(tag => (
          <TagItem key={tag} tag={tag} onRemove={removeTag} />
        ))}
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          placeholder={selectedTags.length > 0 ? "" : "Pilih jenis bibit..."}
          className="flex-grow min-w-[50px] bg-transparent outline-none px-2 text-sm text-gray-800 placeholder-gray-400" 
        />

        {selectedTags.length > 0 && (
            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); clearAllTags(); }}
                className="text-gray-400 hover:text-gray-700 p-1 mr-1" 
                aria-label="Hapus semua tag"
            >
                <X className="w-4 h-4" /> 
            </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-md p-3 max-h-[150px] overflow-y-auto">
             {availableBibit.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {availableBibit.map(bibit => (
                        <TagItem key={bibit} tag={bibit} clickable={true} />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500 p-1">Tidak ada bibit yang tersedia atau belum dipilih.</p>
            )}
        </div>
      )}
      
    </div>
  );
}