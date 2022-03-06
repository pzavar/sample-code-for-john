import {types} from '../actiontypes';

const initialState = {
  Brands: [],
  specialProduct: '',
  HomeSlider: [],
  FeaturedProducts: [],
  homePageCatg:[],
  bestSeller: [],
  showCaseCategory:[],
  isLoading: false,
};

export const homeReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.GET_BRANDS.start ||
      types.GET_BEST_SELLER.start ||
      types.GET_FEATURED_PRODUCT.start ||
      types.GET_GET_HOME_SLIDER.start ||
      types.GET_HOME_PAGE_CATG.start||
      types.GET_SPECIAL_PRODUCT.start ||
      types.GET_SHOWCASE_CATG.start :
      return {...state, isLoading: true};

    case types.GET_BRANDS.failed ||
      types.GET_BEST_SELLER.failed ||
      types.GET_FEATURED_PRODUCT.failed ||
      types.GET_GET_HOME_SLIDER.failed ||
      types.GET_HOME_PAGE_CATG.failed||
      types.GET_SPECIAL_PRODUCT.failed ||
      types.GET_SHOWCASE_CATG.failed:
      return {...state, isLoading: false};

    case types.GET_SPECIAL_PRODUCT.success:
      return {...state, isLoading: false, specialProduct: payload};

    case types.GET_GET_HOME_SLIDER.success:
      let temp=[], obj={}
      for (const item of payload) {
          obj={
            image:item[0],
            h1:item[1][2][0],
            caption:item[1][2][1]

          }
          temp.push(obj)
        }
      return {...state, isLoading: false, HomeSlider: temp};

      case types.GET_SHOWCASE_CATG.success:
        temp=[], obj={}
        for (const item of payload) {
            obj={
             id:item.id,
             image:item.img_src,
             name:item.name,
             parent:item.parent
            }
            temp.push(obj)
        }
        return {...state, isLoading: false, showCaseCategory: temp};

    case types.GET_BRANDS.success:
      return {...state, isLoading: false, Brands: payload};
    
    case types.GET_HOME_PAGE_CATG.success:
     temp=[], obj={}
      for (const item of payload) {
          obj={
           id:item.id,
           image:item.image.src,
           name:item.name,
           parent:item.parent
          }
          temp.push(obj)
      }
  
      return {...state, isLoading:false, homePageCatg:temp};
    

    case types.GET_BEST_SELLER.success:
      return {...state, isLoading: false, bestSeller: payload};
    case types.GET_FEATURED_PRODUCT.success:
      return {...state, isLoading: false, FeaturedProducts: payload};
    default:
      return state;
  }
};
