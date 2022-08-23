import Http from '../common/services/Http';

export async function getOrder(roomId, tableId, config) {
  return await Http.get('order', {roomId: roomId, tableId: tableId}, config);
}

export async function insertOrder(data, config) {
  return await Http.post('order', data, config);
}

export async function updateOrder(data, config) {
  return await Http.put('order', data, config);
}
