import { atom } from 'jotai';
import { CompatClient } from '@stomp/stompjs';

export const currentChatId = atom<number | undefined>(undefined);

const newIncomingChat = atom<{ [chatId: number]: number }>({});

export const readNewIncomingChat = atom((get) => get(newIncomingChat));

export const writeNewIncomingChat = atom(null, (get, set, chatId: number) => {
  if (get(currentChatId) === chatId) {
    return;
  }
  const previeous = get(newIncomingChat);
  set(newIncomingChat, { ...previeous, [chatId]: (previeous[chatId] ?? 0) + 1 });
});

export const writeToChatIsReaded = atom(null, (get, set, chatId: number) => {
  set(newIncomingChat, { ...get(newIncomingChat), [chatId]: 0 });
});

export const websocketClient = atom<CompatClient | undefined>(undefined);
export const websocketConnected = atom(false);
