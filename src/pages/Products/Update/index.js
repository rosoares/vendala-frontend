import React, {useEffect, useState} from "react";
import api from "../../../shared/api";
import {config} from "../../../config/authorization";
import {useHistory, useParams} from "react-router-dom";

const UpdateProduct = () => {

  const {id} = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [slug, setSlug] = useState();
  const [firstStock, setFirstStock] = useState();
  const [availableStock, setAvailableStock] = useState();
  const [price, setPrice] = useState();
  const [color, setColor] = useState();
  const [editingVariation, setEditingVariation] = useState();
  const [editingVariationIndex, setEditingVariationIndex] = useState();
  const history = useHistory();
  const [variations, setVariations] = useState([])
  const [hasColorVariation, setHasColorVariation] = useState();

  const _getProduct = () => {
    api.get(`products/${id}`, config)
      .then(response => setProduct(response.data))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }

  const _getColors = () => {
    api.get('/colors', config)
      .then(response => setColors(response.data))
      .catch(error => alert(error))
  }

  const _setInitialState = () => {
    setName(product.name);
    setDescription(product.description);
    setSlug(product.slug);
    if(product.color_variations[0].color == null) {
      setFirstStock(product.color_variations[0].first_stock);
      setAvailableStock(product.color_variations[0].available_stock);
      setPrice(product.color_variations[0].price);
      setHasColorVariation(false)
    } else {
      setVariations(product.color_variations);
      setHasColorVariation(true)
    }
  }

  useEffect(() => {
    _getProduct();
    _getColors();
  }, [])

  useEffect(() => {
    if(product) {
      _setInitialState();
    }
  }, [product])

  const _updateProduct = (event) => {
    event.preventDefault();
    setLoading(true)
    let data = undefined;

    if (! hasColorVariation) {
      data = {
        name : name,
        description : description,
        slug : slug,
        first_stock : firstStock,
        available_stock : availableStock,
        price : price,
        hasColorVariation : hasColorVariation
      }
    }
    else {
      data = {
        name : name,
        description : description,
        slug : slug,
        hasColorVariation : hasColorVariation,
        variations: variations
      }
    }

    console.log(data)

    api.put(`products/${id}`, data, config)
      .then(response => {
        alert(response.statusText)
        history.push('/products');
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }

  const _addColorVariation = () => {
    let newVariations = variations;

    newVariations.push({
      color_id: color,
      first_stock: firstStock,
      available_stock: availableStock,
      price: price
    });

    setVariations(newVariations);
    setColor(null);
    setFirstStock(null);
    setAvailableStock(null);
    setPrice(null);
  }

  const _editVariation = (variation, index) => {
    setEditingVariation(variation);
    setEditingVariationIndex(index);
    setColor(variation.color_id);
    setFirstStock(variation.first_stock);
    setAvailableStock(variation.available_stock);
    setPrice(variation.price);
  }

  const _updateVariation = () => {
    let newVariations = variations;
    newVariations.splice(editingVariationIndex, 1);

    newVariations.push({
      color_id: color,
      first_stock: firstStock,
      available_stock: availableStock,
      price: price
    });

    setVariations(newVariations);
    setColor(null);
    setFirstStock(null);
    setAvailableStock(null);
    setPrice(null);
  }

  return (
    <div>
      {
        !! product && !!colors &&
          <div>
            <h1>Atualizar Produto {id}</h1>
            <form onSubmit={_updateProduct}>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                required
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
              <br />
              <label>Descrição</label>
              <br />
              <textarea
                name="description"
                required
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
              <br />
              <input
                type="text"
                name="slug"
                placeholder="Chave"
                required
                onChange={(event) => setSlug(event.target.value)}
                value={slug}
              />
              <br />
              {
                product.color_variations[0].color == null &&
                <>
                  <input
                    type="text"
                    name="first_stock"
                    placeholder="Estoque inicial"
                    required
                    onChange={(event) => setFirstStock(event.target.value)}
                    value={firstStock}
                  />
                  <br />
                  <input
                    type="text"
                    name="available_stock"
                    placeholder="Estoque disponível"
                    required
                    onChange={(event) => setAvailableStock(event.target.value)}
                    value={availableStock}
                  />
                  <br />
                  <input
                    type="text"
                    name="price"
                    placeholder="Preço"
                    required
                    onChange={(event) => setPrice(event.target.value)}
                    value={price}
                  />
                </>
              }
              {
                product.color_variations[0].color !== null &&
                <>
                  <select onChange={(event) => setColor(event.target.value)}>
                    <option value="">Selecione a cor</option>
                    {
                      colors.map((color, index) => (
                        <option key={index} value={color.id} selected={editingVariation?.color_id === color.id}>
                          {color.name}
                        </option>
                      ))
                    }
                  </select>
                  <br />
                  <input
                    type="text"
                    name="first_stock"
                    placeholder="Estoque inicial"
                    required
                    onChange={(event) => setFirstStock(event.target.value)}
                    value={firstStock}
                  />
                  <br />
                  <input
                    type="text"
                    name="available_stock"
                    placeholder="Estoque disponível"
                    required
                    onChange={(event) => setAvailableStock(event.target.value)}
                    value={availableStock}
                  />
                  <br />
                  <input
                    type="text"
                    name="price"
                    placeholder="Preço"
                    required
                    onChange={(event) => setPrice(event.target.value)}
                    value={price}
                  />
                  <br />
                  {
                    !! editingVariation ?
                      <button type="button" onClick={_updateVariation}>Atualizar Variação</button>
                      :
                      <button type="button" onClick={_addColorVariation}>Adicionar Variação</button>
                  }
                  <br />
                  <table>
                    <thead>
                    <tr>
                      <th>Cor</th>
                      <th>Estoque inicial</th>
                      <th>Estoque disponível</th>
                      <th>Preço</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      variations.map((variation, index) => (
                        <tr key={index}>
                          <td>{variation.color_id}</td>
                          <td>{variation.first_stock}</td>
                          <td>{variation.available_stock}</td>
                          <td>{variation.price}</td>
                          <td><button type="button" onClick={() => _editVariation(variation, index)}>Editar</button></td>
                        </tr>
                      ))
                    }
                    </tbody>
                  </table>
                </>
              }
              <br />
              {
                loading ?
                  <p>Carregando...</p> :
                  <button type="submit">Atualizar</button>
              }
            </form>
          </div>
      }
    </div>
  )
}

export default UpdateProduct;