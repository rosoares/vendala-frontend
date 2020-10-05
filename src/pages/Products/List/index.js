import React, {useEffect, useState} from "react";
import {config} from "../../../config/authorization";
import api from "../../../shared/api";
import '../../../App.css';

const ProductsList = () => {

  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const _getProducts = () => {
    api.get('/products', config)
      .then(response => setProducts(response.data))
      .catch(error => alert('Erro ao buscar produtos' + error))
      .finally(() => setLoading(false))
  }

  const _deleteProduct = (id) => {
    api.delete(`products/${id}`, config)
      .then(response => {
        if (response.status === 204) {
          alert("Deleted")
        }
      })
      .catch(error => alert(error))
  }

  useEffect(() => {
    _getProducts();
  }, [])

  return (
    <div>
      {
        loading ?
          <p>Carregando...</p>
          :
          <div>
            <h1>Produtos</h1>
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Descrição</th>
                <th>Chave</th>
              </tr>
              </thead>
              <tbody>
              {
                products.map((product, key) => (
                  <tr key={key}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.slug}</td>
                    <td><Link to={`/prodcuts/show/${product.id}`}>Ver</Link></td>
                    <td><button onClick={() => _deleteProduct(product.id)}>Deletar</button></td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
      }
    </div>
  )
}

export default ProductsList;