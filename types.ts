
export type Big5Trait = 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism';
export type Big5Level = 'High' | 'Mid' | 'Low';

export interface Big5State {
    [key: string]: Big5Level | '';
}

export interface Inputs {
    enneagram: string;
    big5: Big5State;
    anchor: string;
    via: string[];
}

export interface ArchetypeDNA {
    how: string;
    what: string;
    why: string;
}

export interface ArchetypePartner {
    role: string;
    reason: string;
}

export interface GrowthGuide {
    discipline: string; // 영적 훈련 (Spiritual Discipline)
    skill: string;      // 직무 스킬 (Professional Skill)
    model: string;      // 롤모델 (Role Model)
    checklist: string[]; // 실천 체크리스트
    education: string;   // 추천 대학원/전공 (Recommended Education)
}

export interface Archetype {
    id: number;
    title: string;
    engTitle: string;
    subtitle: string;
    verse: string;
    traits: {
        big5: Big5Trait;
        enneagram: string[];
        anchor: string[];
        via: string[];
    };
    summary: string;
    details: {
        guide: string;
        synergy: { good: string; bad: string };
        caution: string;
        development: string;
    };
    recommendations: {
        hq: string;
        field: string;
    };
    growthGuide: GrowthGuide;
    roles: string[];
    symbol: string;
    score?: number;
    dna: ArchetypeDNA;
    synergyDesc: string;
    partners: {
        best: ArchetypePartner;
        caution: ArchetypePartner;
    };
    prediction: string;
    activities: string[];
}

export interface SavedTeam {
    id: string;
    name: string;
    myArchetypeId: number; // To verify context if user changes
    partnerIds: number[];
    createdAt: number;
}

export interface SavedAnalysis {
    id: string;
    name: string;
    inputs: Inputs;
    resultTitle: string;
    createdAt: number;
}

export interface ExternalTest {
    id: string;
    name: string;
    desc: string;
    detail: string;
    url: string;
    icon: string;
    color: string;
    // New field for measurement aspect
    measurement: string;
    // Fields for detailed guide
    understanding: string;
    utilization: string;
}

export interface BenefitItem {
    icon: string;
    title: string;
    desc: string;
}

export interface DetailInfo {
    label?: string;
    name?: string;
    desc: string;
    advice?: string;
    high?: string;
    low?: string;
    fit?: string;
}

export interface DetailData {
    enneagram: Record<string, DetailInfo>;
    big5: Record<string, DetailInfo>;
    anchor: Record<string, DetailInfo>;
    via: { desc: string; list?: string[] };
}