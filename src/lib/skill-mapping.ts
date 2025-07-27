
export type PowerLevels = {
    logic: number;
    creativity: number;
    leadership: number;
    technical: number;
    social: number;
};

export const categoryToSkillMapping: { [key: string]: keyof PowerLevels } = {
    'Software Development': 'technical',
    'Data Science & AI': 'technical',
    'Cybersecurity': 'technical',
    'Cloud Computing': 'technical',
    'AI Prompt Engineering': 'technical',
    'Game Development': 'technical',
    'Graphic Design': 'creativity',
    'Content Creation': 'creativity',
    'Digital Marketing': 'social',
    'Sales & Business Development': 'social',
    'Project Management': 'leadership',
    'Business & Finance': 'logic',
};
