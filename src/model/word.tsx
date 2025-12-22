export type Word = {
  id: string;
  name: string;
  meaning: string;
  type: "Noun" | "Verb" | "Adjective" | "Adverb" | "Other";
  sentence?: string;
  isLearned: boolean;
  isReview: boolean;
  isSaved: boolean;
};
