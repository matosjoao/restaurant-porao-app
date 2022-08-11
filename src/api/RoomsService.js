import Http from '../common/services/Http';

export async function getRooms() {
  return await Http.get('rooms');
}
