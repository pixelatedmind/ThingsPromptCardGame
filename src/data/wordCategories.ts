import { WordCategory } from '../types';

export const wordCategories: Record<string, WordCategory> = {
  future: {
    id: 'future',
    label: 'Future',
    description: 'In a [WORD] future',
    words: [
      'Tomorrow', 'Robotics', 'Evolution', 'Innovation', 'Time-travel', 
      'Singularity', 'Quantum', 'Utopia', 'Nano-tech', 'Intergalactic', 
      'Virtuality', 'Cybernetic', 'Terraform', 'Dystopian', 'Post-apocalyptic',
      'Bioengineered', 'Neural', 'Holographic', 'Synthetic', 'Augmented',
      'Digital', 'Cosmic', 'Transcendent', 'Automated', 'Sustainable'
    ]
  },
  thing: {
    id: 'thing',
    label: 'Thing',
    description: 'There is a [WORD]',
    words: [
      'Object', 'Instrument', 'Gadget', 'Relic', 'Utensil', 'Apparatus', 
      'Device', 'Tool', 'Implement', 'Artifact', 'Commodity', 'Contraption', 
      'Mechanism', 'Interface', 'Portal', 'Beacon', 'Catalyst', 'Vessel',
      'Engine', 'Generator', 'Scanner', 'Transmitter', 'Processor', 'Core',
      'Matrix', 'Network', 'System', 'Protocol', 'Algorithm'
    ]
  },
  theme: {
    id: 'theme',
    label: 'Theme',
    description: 'Related to [WORD]',
    words: [
      'Harmony', 'Chaos', 'Exploration', 'Redemption', 'Survival', 
      'Transformation', 'Adventure', 'Mystery', 'Rebellion', 'Creation', 
      'Conflict', 'Discovery', 'Enlightenment', 'Identity', 'Freedom',
      'Connection', 'Isolation', 'Progress', 'Tradition', 'Balance',
      'Power', 'Sacrifice', 'Hope', 'Fear', 'Unity', 'Diversity'
    ]
  }
};