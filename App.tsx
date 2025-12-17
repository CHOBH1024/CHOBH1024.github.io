import React, { useState } from 'react';
import { Icon } from './components/Icon';
import { HomeView } from './components/HomeView';
import { DiagnosisView } from './components/DiagnosisView';
import { AnalysisView } from './components/AnalysisView';
import { LibraryView } from './components/LibraryView';
import { GuideView } from './components/GuideView';
import { archetypes } from './data';
import { Inputs, Archetype } from './types';

export default function App() {
    const [activeTab, setActiveTab] = useState<string>('home');
    const [inputs, setInputs] = useState<Inputs>({ 
        enneagram: '', 
        big5: { openness: '', conscientiousness: '', extraversion: '', agreeableness: '', neuroticism: '' }, 
        anchor: '', 
        via: [] 
    });
    // Changed state to store an array of results
    const [results, setResults] = useState<Archetype[]>([]);

    // Extracted scoring logic to be reusable
    const calculateResults = (targetInputs: Inputs): Archetype[] => {
        const scores = archetypes.map(t => {
            let score = 0;
            if (t.traits.enneagram.includes(targetInputs.enneagram)) score += 3;
            if (t.traits.anchor.includes(targetInputs.anchor)) score += 2;
            
            // Big 5 Logic: If archetype needs High trait X, and user is High X -> +2
            const targetBig5 = t.traits.big5; 
            if (targetInputs.big5[targetBig5] === 'High') score += 2;

            const viaMatches = targetInputs.via.filter(v => t.traits.via.includes(v)).length;
            score += viaMatches * 1.5;
            return { ...t, score };
        });
        scores.sort((a, b) => (b.score || 0) - (a.score || 0));
        return scores;
    };

    const handleAnalyze = (manualInputs?: Inputs) => {
        // Use manualInputs if provided (from quick select), otherwise use state inputs
        const targetInputs = manualInputs || inputs;
        const scores = calculateResults(targetInputs);
        setResults(scores);
        setActiveTab('analysis');
        window.scrollTo(0,0);
    };

    const handleRestore = (savedInputs: Inputs) => {
        setInputs(savedInputs);
        const scores = calculateResults(savedInputs);
        setResults(scores);
        // Ensure we are on analysis tab and scrolled to top
        if (activeTab !== 'analysis') {
            setActiveTab('analysis');
        }
        window.scrollTo(0,0);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#fcfbf9]">
            <header className="bg-white/95 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('home')}>
                        <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white shadow-md hover:bg-blue-800 transition-colors">
                            <Icon name="User" size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-blue-900 font-serif leading-none tracking-tight">가정연합 목회공직자 유형진단</h1>
                            <span className="text-[10px] text-stone-400 tracking-[0.2em] uppercase font-bold">Cheon Il Guk Pastoral Archetype v5</span>
                        </div>
                    </div>
                    <nav className="hidden lg:flex gap-8">
                        {['home', 'diagnosis', 'analysis', 'library', 'guide'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`py-6 text-sm font-bold tracking-wide transition-all border-b-2 ${activeTab === tab ? 'border-blue-900 text-blue-900' : 'border-transparent text-stone-400 hover:text-stone-600'}`}>
                                {tab==='home'?'소명의 여정':tab==='diagnosis'?'성향 진단':tab==='analysis'?'종합 분석 결과':tab==='library'?'아키타입 도서관':'지표 가이드'}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>
            <main className="flex-grow">
                {activeTab === 'home' && <HomeView onStart={() => setActiveTab('diagnosis')} />}
                {activeTab === 'diagnosis' && <DiagnosisView inputs={inputs} setInputs={setInputs} onFinish={handleAnalyze} />}
                {/* Pass results array and restore handler */}
                {activeTab === 'analysis' && <AnalysisView results={results} inputs={inputs} onRestore={handleRestore} />}
                {activeTab === 'library' && <LibraryView />}
                {activeTab === 'guide' && <GuideView />}
            </main>
            <footer className="bg-stone-100 border-t border-stone-200 py-12 text-center text-stone-500 text-sm font-serif">
                Cheon Il Guk Public Official Assessment Tool © 2024
            </footer>
        </div>
    );
}