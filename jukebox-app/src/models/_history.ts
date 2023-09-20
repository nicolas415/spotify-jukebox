import { MusicHistoryType } from "../_types/application"

export class HistoryModelClass {
    history: MusicHistoryType[] = []
    count: number = 0

    save(track_id: string) {
        this.history.push({ track_id, count: this.count })
    }

    getHistory() {
        return this.history
    }
}
