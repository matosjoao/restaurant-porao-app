import Http from '../common/services/Http';

export async function getCategories(config) {
  return await Http.get('products-types', null, config);
}
