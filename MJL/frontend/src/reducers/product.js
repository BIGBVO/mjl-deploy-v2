import { 
    GETTING_SPECIFIC_PRODUCT,
    GET_SPECIFIC_PRODUCT_SUCCESS,
    GET_SPECIFIC_PRODUCT_FAIL,
    GETTING_ALL_PRODUCTS_CODE,
    GET_ALL_PRODUCTS_CODE_SUCCESS,
    GET_ALL_PRODUCTS_CODE_FAIL,
    ADD_PRODUCT_CATEGORY,
    ADD_PRODUCT_CATEGORY_SUCCESS,
    ADD_PRODUCT_CATEGORY_FAIL,
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    GETTING_PRODUCT_CATEGORIES,
    GET_PRODUCT_CATEGORIES_SUCCESS,
    GET_PRODUCT_CATEGORIES_FAIL,
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAIL,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL
} from '../actions/types.js';


const prod = {
    kode: '',
    nama: '',
    kategori: '',
    quantity: '',
    harga_S: '',
    harga_A: '',
    harga_B: '',
    stok: '',
    po: '',
    otw: '',
}

//products reducer
const initialState = {
    categories: [],
    products: [],
    products_code: [],
    isLoading: false,
    product: prod,
};

export default function (state = initialState, action) {
    switch (action.type) {

    case ADD_PRODUCT:
    case ADD_PRODUCT_CATEGORY:
    case GETTING_ALL_PRODUCTS_CODE:
    case GETTING_SPECIFIC_PRODUCT:
    case GETTING_PRODUCT_CATEGORIES:
    case EDIT_PRODUCT:
    case DELETE_PRODUCT:
    return {
    ...state,
    isLoading: true,
    };

    case DELETE_PRODUCT_SUCCESS:
    return{
        ...state,
        isLoading: false,
        product: null,
    }

    case GET_ALL_PRODUCTS_CODE_SUCCESS:
    return{
    ...state,
    products_code: action.payload,
    isLoading: false,
    }

    case EDIT_PRODUCT_SUCCESS:
    case GET_SPECIFIC_PRODUCT_SUCCESS:
    return{
        ...state,
        product: action.payload.product,
        isLoading: false,

    }

    case GET_PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
    }

    case DELETE_PRODUCT_FAIL:
    case EDIT_PRODUCT_FAIL:
    case ADD_PRODUCT_SUCCESS:
    case ADD_PRODUCT_FAIL:
    case ADD_PRODUCT_CATEGORY_SUCCESS:
    case ADD_PRODUCT_CATEGORY_FAIL:
    case GET_ALL_PRODUCTS_CODE_FAIL:
    case GET_PRODUCT_CATEGORIES_FAIL:
    return {
    ...state,
    isLoading: false,
    }

    case GET_SPECIFIC_PRODUCT_FAIL:
        return {
            ...state,
            isLoading: false,
            product: prod
        }

    default:
    return state;
    }
}
