import Http from '../common/services/Http';

export async function getProducts(categoryId, search, config) {
  return await Http.get(
    'products',
    {product_type: categoryId, search: search},
    config,
  );
}
