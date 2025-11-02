import React from 'react';
import { CheckCircle, Clock, TreePalm } from 'lucide-react';

const STATUS_OPTIONS = [
    { label: 'Menunggu Acara', icon: Clock },
    { label: 'Sedang Berlangsung', icon: TreePalm },
    { label: 'Sudah Ditanam', icon: CheckCircle },
];

export function BagianStatus({ currentStatus, activeStatus, onStatusChange, onUpdateAcara, isLoading }) {
    
    const ButtonClass = ({ isActive, isCurrent }) => 
        `px-4 py-4 text-sm font-semibold rounded-[15px] transition-all duration-300
        ${isActive 
            ? 'bg-emerald-700 text-white shadow-md' 
            : isCurrent
                ? 'bg-[#A7F3D0] text-[#064E3B] hover:bg-[#6EE7B7] shadow-sm' 
                : 'bg-[#D1FAE5] text-gray-700 hover:bg-[#AFD8C3]'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#064E3B]">Status Acara</h3>
                <button
                    onClick={onUpdateAcara}
                    disabled={isLoading}
                    className={`bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-[#047857] transition ${isLoading ? 'opacity-50' : ''}`}
                >
                    Update Acara
                </button>
            </div>
            
            <div className="flex space-x-3 overflow-x-auto pb-2">
                {STATUS_OPTIONS.map((status) => {
                    const isActive = activeStatus === status.label;
                    const isCurrent = currentStatus === status.label;
                    const Icon = status.icon;

                    return (
                        <button
                            key={status.label}
                            onClick={() => onStatusChange(status.label)} 
                            disabled={isLoading}
                            className={ButtonClass({ isActive, isCurrent })}
                        >
                            <span className="flex items-center space-x-1">
                                {React.createElement(Icon, { className: 'w-4 h-4' })}
                                <span>{status.label}</span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}