export interface BookContextBlock {
  id: string;
  title: string;
  text: string;
  sources: string[];
}

export interface BookWordExplanation {
  id: string;
  word: string;
  explanation: string;
  source: string;
}

export interface BookReadingTip {
  id: string;
  text: string;
}

export function getMockBookContextByBookId(bookId: string) {
  const blocks: Record<string, BookContextBlock[]> = {
    '1': [
      {
        id: 'ctx-1-1',
        title: 'Исторический период',
        text: 'Россия середины XIX века: реформы, спор о будущем страны и столкновение мировоззрений.',
        sources: ['Wikipedia: Отцы и дети', 'Wikipedia: Россия в XIX веке'],
      },
      {
        id: 'ctx-1-2',
        title: 'Социальный фон',
        text: 'Дворянская усадьба, провинциальная жизнь и напряжение между «старыми» и «новыми» ценностями.',
        sources: ['Wikipedia: Дворянство'],
      },
    ],
    '2': [
      {
        id: 'ctx-2-1',
        title: 'Город и быт',
        text: 'Петербургская бедность, социальное расслоение и моральное давление среды на человека.',
        sources: ['Wikipedia: Преступление и наказание'],
      },
    ],
    '3': [
      {
        id: 'ctx-3-1',
        title: 'Культурный контекст',
        text: 'Сатирический взгляд на общество и переплетение реальности с мистикой и аллегорией.',
        sources: ['Wikipedia: Мастер и Маргарита'],
      },
    ],
  };

  return blocks[bookId] ?? [];
}

export function getMockBookWordsByBookId(bookId: string) {
  const words: Record<string, BookWordExplanation[]> = {
    '1': [
      {
        id: 'w-1-1',
        word: 'нигилист',
        explanation: 'В контексте романа — отрицание традиционных авторитетов и «готовых» ценностей.',
        source: 'Wikipedia: Нигилизм',
      },
    ],
    '2': [
      {
        id: 'w-2-1',
        word: 'теория',
        explanation: 'Идея, которой герой пытается оправдать поступок, проверяя границы морали.',
        source: 'Литературный разбор (mock)',
      },
    ],
    '3': [
      {
        id: 'w-3-1',
        word: 'аллегория',
        explanation: 'Способ говорить о реальности через символы и вторые смыслы.',
        source: 'Wikipedia: Аллегория',
      },
    ],
  };

  return words[bookId] ?? [];
}

export function getMockBookReadingTipsByBookId(bookId: string) {
  const tips: Record<string, BookReadingTip[]> = {
    '1': [
      { id: 't-1-1', text: 'Смотри на конфликт как на спор методов мышления, а не «хорошо/плохо».' },
      { id: 't-1-2', text: 'Обращай внимание на то, как меняется тон диалогов от главы к главе.' },
    ],
    '2': [
      { id: 't-2-1', text: 'Отмечай моменты самооправдания героя — это ключ к внутреннему конфликту.' },
    ],
    '3': [
      { id: 't-3-1', text: 'Разделяй «поверхностный сюжет» и сатирический слой — они работают параллельно.' },
    ],
  };

  return tips[bookId] ?? [];
}
