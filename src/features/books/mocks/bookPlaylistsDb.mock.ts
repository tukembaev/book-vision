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
