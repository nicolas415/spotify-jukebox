import test from "ava";
import { TracksModelClass } from "../_tracks";

const TracksModel = new TracksModelClass()

const teardownFn = () => {
  TracksModel.data = {}
  TracksModel.count = 0
}

test("save a track and get it", (t) => {
  const fakeTrack = { id: "fake_track_id" } as any
  TracksModel.save(fakeTrack)

  const track = TracksModel.get(fakeTrack.id)

  t.is(track, fakeTrack)
  t.teardown(teardownFn)
})
