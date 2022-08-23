import Http from '../common/services/Http';

export async function getTables(roomId, config) {
  return await Http.get('tables', {roomId: roomId}, config);
}
