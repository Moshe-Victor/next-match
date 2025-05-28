import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

export type PresenceState = {
    members: string[];
    add: (id: string) => void;
    remove: (id: string) => void;
    set: (id: string[]) => void;
}

const usePresenceStore = create<PresenceState>()(devtools((set) => ({
    members: [],
    add: (id: string) => set((state) => ({members: [...state.members, id]})),
    remove: (id: string) => set((state) => ({members: state.members.filter(member => member !== id)})),
    set: (ids) => set({members: ids})
}), {name: 'PresenceStore'}))

export default PresenceState;