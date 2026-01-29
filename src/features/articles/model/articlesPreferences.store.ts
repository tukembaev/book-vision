import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ArticleSectionId =
  | 'shouldRead'
  | 'best'
  | 'popular'
  | 'analysis'
  | 'reviews'
  | 'collections'
  | 'guides'
  | 'comparisons'
  | 'discussions'
  | 'new';

export const articleSectionOrder: Array<{ id: ArticleSectionId; title: string; subtitle: string }> = [
  {
    id: 'shouldRead',
    title: 'Стоит ли читать?',
    subtitle: 'Короткие и честные ответы без спойлеров.',
  },
  {
    id: 'best',
    title: 'Лучшие статьи',
    subtitle: 'Материалы, которые сообщество считает самыми полезными.',
  },
  {
    id: 'popular',
    title: 'Популярные',
    subtitle: 'Больше всего просмотров и обсуждений.',
  },
  {
    id: 'analysis',
    title: 'Разборы',
    subtitle: 'Глубокие анализы книг (пока: 1 разбор = 1 книга).',
  },
  {
    id: 'collections',
    title: 'Подборки',
    subtitle: 'Списки и тематические сборники от сообщества.',
  },
  {
    id: 'reviews',
    title: 'Рецензии',
    subtitle: 'Впечатления и выводы после прочтения.',
  },
  {
    id: 'guides',
    title: 'Гайды',
    subtitle: 'Как читать, как понимать, как подступиться.',
  },
  {
    id: 'comparisons',
    title: 'Сравнения',
    subtitle: 'Сопоставления книг, тем, взглядов и подходов.',
  },
  {
    id: 'discussions',
    title: 'Дискуссии',
    subtitle: 'Точки спора, вопросы и позиции.',
  },
  {
    id: 'new',
    title: 'Новые',
    subtitle: 'Самые свежие публикации.',
  },
];

export type ArticleFeedSectionId = Exclude<ArticleSectionId, 'best' | 'popular' | 'new'> | 'best' | 'popular' | 'new';

export interface ArticlesPreferencesState {
  visibleSections: Record<ArticleSectionId, boolean>;

  toggleSection: (sectionId: ArticleSectionId) => void;
  setAllSections: (value: boolean) => void;
}

const defaultVisibleSections: Record<ArticleSectionId, boolean> = {
  shouldRead: true,
  best: true,
  popular: true,
  analysis: true,
  reviews: true,
  collections: true,
  guides: true,
  comparisons: true,
  discussions: true,
  new: true,
};

export const useArticlesPreferencesStore = create<ArticlesPreferencesState>()(
  persist(
    (set) => ({
      visibleSections: defaultVisibleSections,
      toggleSection: (sectionId) =>
        set((s) => ({
          visibleSections: {
            ...s.visibleSections,
            [sectionId]: !s.visibleSections[sectionId],
          },
        })),
      setAllSections: (value) =>
        set(() => ({
          visibleSections: {
            shouldRead: value,
            best: value,
            popular: value,
            analysis: value,
            reviews: value,
            collections: value,
            guides: value,
            comparisons: value,
            discussions: value,
            new: value,
          },
        })),
    }),
    {
      name: 'articles-preferences-v1',
      partialize: (s) => ({ visibleSections: s.visibleSections }),
    }
  )
);
