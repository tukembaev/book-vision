import type { Playlist } from '@/types/core';

export interface BookPlaylistLink {
  id: string;
  platform: 'spotify' | 'youtube' | 'text';
  title: string;
  url?: string;
  tracks: string[];
  createdBy: 'system' | 'user';
  moodTag?: string;
}

export function getMockBookPlaylistsByBookId(bookId: string) {
  const playlists: Record<string, BookPlaylistLink[]> = {
    '1': [
      {
        id: 'pl-1-u1',
        platform: 'text',
        title: 'Тишина и спор',
        tracks: ['Philip Glass — Opening', 'Ludovico Einaudi — Experience'],
        createdBy: 'user',
      },
      {
        id: 'pl-1-sys',
        platform: 'text',
        title: 'MELANCHOLY (auto suggested)',
        tracks: ['Radiohead — No Surprises', 'Massive Attack — Teardrop'],
        createdBy: 'system',
        moodTag: 'MELANCHOLY',
      },
    ],
    '2': [
      {
        id: 'pl-2-sys',
        platform: 'text',
        title: 'TRAGEDY (auto suggested)',
        tracks: ['Hans Zimmer — Time', 'Max Richter — On The Nature Of Daylight'],
        createdBy: 'system',
        moodTag: 'TRAGEDY',
      },
    ],
    '3': [
      {
        id: 'pl-3-u2',
        platform: 'youtube',
        title: 'Плейлист читателя (YouTube)',
        url: 'https://youtube.com',
        tracks: ['(link) youtube.com/...'],
        createdBy: 'user',
      },
      {
        id: 'pl-3-sys',
        platform: 'text',
        title: 'MYSTERY (auto suggested)',
        tracks: ['Boards of Canada — Reach for the Dead', 'Burial — Archangel'],
        createdBy: 'system',
        moodTag: 'MYSTERY',
      },
    ],
  };

  return playlists[bookId] ?? [];
}

export function toCorePlaylist(link: BookPlaylistLink): Playlist {
  return {
    id: link.id,
    title: link.title,
    moodTag: link.moodTag ?? 'CUSTOM',
    tracks: link.tracks,
    createdBy: link.createdBy,
  };
}

export function getMockPlaylistsByPartId(bookId: string, partId: string): BookPlaylistLink[] {
  const mapping: Record<string, Record<string, BookPlaylistLink[]>> = {
    '1': {
      'p1': [
        {
          id: 'pl-p1-1',
          platform: 'text',
          title: 'Приезд и первые впечатления',
          tracks: ['Philip Glass — Opening', 'Ólafur Arnalds — Near Light'],
          createdBy: 'user',
          moodTag: 'CALM',
        },
        {
          id: 'pl-p1-2',
          platform: 'text',
          title: 'DRAMA (auto)',
          tracks: ['Max Richter — On The Nature Of Daylight'],
          createdBy: 'system',
          moodTag: 'DRAMA',
        },
      ],
      'p2': [
        {
          id: 'pl-p2-1',
          platform: 'text',
          title: 'Философские споры',
          tracks: ['Ludovico Einaudi — Experience', 'Nils Frahm — Says'],
          createdBy: 'user',
          moodTag: 'TENSION',
        },
      ],
      'p3': [
        {
          id: 'pl-p3-1',
          platform: 'text',
          title: 'MELANCHOLY (auto)',
          tracks: ['Radiohead — No Surprises', 'Sigur Rós — Svefn-g-englar'],
          createdBy: 'system',
          moodTag: 'MELANCHOLY',
        },
      ],
    },
    '2': {
      'p4': [
        {
          id: 'pl-p4-1',
          platform: 'text',
          title: 'TENSION (auto)',
          tracks: ['Hans Zimmer — Time', 'Clint Mansell — Lux Aeterna'],
          createdBy: 'system',
          moodTag: 'TENSION',
        },
      ],
      'p5': [
        {
          id: 'pl-p5-1',
          platform: 'text',
          title: 'Глубокая драма',
          tracks: ['Max Richter — On The Nature Of Daylight', 'Jóhann Jóhannsson — Flight From The City'],
          createdBy: 'user',
          moodTag: 'DRAMA',
        },
      ],
    },
    '3': {
      'p9': [
        {
          id: 'pl-p9-1',
          platform: 'text',
          title: 'MYSTERY (auto)',
          tracks: ['Boards of Canada — Reach for the Dead', 'Burial — Archangel'],
          createdBy: 'system',
          moodTag: 'MYSTERY',
        },
        {
          id: 'pl-p9-2',
          platform: 'youtube',
          title: 'Мистика Воланда (YouTube)',
          url: 'https://youtube.com',
          tracks: ['(link) youtube.com/...'],
          createdBy: 'user',
        },
      ],
      'p10': [
        {
          id: 'pl-p10-1',
          platform: 'text',
          title: 'Романтика Мастера',
          tracks: ['Erik Satie — Gymnopédie No.1', 'Debussy — Clair de Lune'],
          createdBy: 'user',
          moodTag: 'ROMANCE',
        },
      ],
      'p11': [
        {
          id: 'pl-p11-1',
          platform: 'text',
          title: 'TRAGEDY (auto)',
          tracks: ['Samuel Barber — Adagio for Strings', 'Arvo Pärt — Spiegel im Spiegel'],
          createdBy: 'system',
          moodTag: 'TRAGEDY',
        },
      ],
    },
  };

  return mapping[bookId]?.[partId] ?? [];
}
