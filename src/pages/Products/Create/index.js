import React, {useEffect, useState} from "react";
import api from "../../../shared/api";
import {config} from "../../../config/authorization";
import {useHistory} from "react-router-dom";

const CreateProduct = () => {

  const [colors, setColors] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [slug, setSlug] = useState();
  const [firstStock, setFirstStock] = useState();
  const [availableStock, setAvailableStock] = useState();
  const [price, setPrice] = useState();
  const [hasColorVariation, setHasColorVariation] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [variations, setVariations] = useState({})

  const _createProduct = (event) => {
    event.preventDefault();
    setLoading(true)

    let data = {
      name : name,
      description : description,
      slug : slug,
      first_stock : firstStock,
      available_stock : availableStock,
      price : price,
      hasColorVariation : hasColorVariation
    }

    api.post('products', data, config)
      .then(response => {
        alert(response.statusText)
        history.push('/products');
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }

  const _getColors = () => {
    api.get('/colors', config)
      .then(response => setColors(response.data))
      .catch(error => alert(error))
  }

  useEffect(() => {
    _getColors();
  }, [])

  return (
    <div>
      <h1>Novo Produto</h1>
      <form onSubmit={_createProduct}>
        <label>Variação de Cor ?</label>
        <br />
        <select name="hasColorVariation" onChange={(event) => setHasColorVariation(!hasColorVariation)}>
          <option value={false}>Não</option>
          <option value={true}>Sim</option>
        </select>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Nome"
          required
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <label>Descrição</label>
        <br />
        <textarea
          name="description"
          required
          onChange={(event) => setDescription(event.target.value)}
        />
        <br />
        <input
          type="text"
          name="slug"
          placeholder="Chave"
          required
          onChange={(event) => setSlug(event.target.value)}
        />
        <br />
        {
          ! hasColorVariation &&
            <>
              <input
                type="text"
                name="first_stock"
                placeholder="Estoque inicial"
                required
                onChange={(event) => setFirstStock(event.target.value)}
              />
              <br />
              <input
                type="text"
                name="available_stock"
                placeholder="Estoque disponível"
                required
                onChange={(event) => setAvailableStock(event.target.value)}
              />
              <br />
              <input
                type="text"
                name="price"
                placeholder="Preço"
                required
                onChange={(event) => setPrice(event.target.value)}
              />
            </>
        }

        <br />
        {
          loading ?
            <p>Carregando...</p> :
            <button type="submit">Cadastrar</button>
        }
      </form>
    </div>
  )
}

export default CreateProduct;