import React, { useState } from 'react';

const Help: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full max-w-4xl mt-6">
            <div className="bg-slate-700 rounded-lg shadow-lg">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-4 flex justify-between items-center text-left text-lg font-semibold text-slate-200 hover:bg-slate-600 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-expanded={isOpen}
                    aria-controls="help-content"
                >
                    <span>Справка</span>
                    <svg
                        className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div
                    id="help-content"
                    className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60' : 'max-h-0'} ${isOpen ? 'overflow-y-auto' : 'overflow-hidden'}`}
                >
                    <div className="p-4 border-t border-slate-600 text-slate-300">
                        <h3 className="font-bold text-slate-100 mb-2">Цель игры</h3>
                        <p className="mb-4">Открыть все ячейки на поле, не содержащие мин. Числа на открытых ячейках показывают, сколько мин находится в соседних восьми ячейках.</p>
                        
                        <h3 className="font-bold text-slate-100 mb-2">Управление</h3>
                        <div className="space-y-2">
                            <div>
                                <h4 className="font-semibold text-slate-200">На компьютере:</h4>
                                <ul className="list-disc list-inside ml-4">
                                    <li><span className="font-bold">Левый клик:</span> Открыть ячейку.</li>
                                    <li><span className="font-bold">Правый клик:</span> Поставить флаг 🚩, затем вопрос❓, затем убрать отметку.</li>
                                </ul>
                            </div>
                             <div>
                                <h4 className="font-semibold text-slate-200">На телефоне/планшете:</h4>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Используйте кнопки ⛏️/🚩 для переключения режима.</li>
                                    <li><span className="font-bold">Режим ⛏️ (Кирка):</span> Касание открывает ячейку.</li>
                                    <li><span className="font-bold">Режим 🚩 (Флаг):</span> Касание ставит флаг 🚩, затем вопрос❓, затем убирает отметку.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;