import Http from '../common/services/Http';

export async function getRooms(config) {
  return await Http.get('rooms', null, config);
}
